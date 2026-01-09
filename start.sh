#!/bin/bash

# Unified Start Script for AI Engineer Challenge
# Automatically starts backend if needed, then starts frontend

set -e

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

print_header() {
    echo -e "\n${BLUE}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}${BOLD}  AI Engineer Challenge - Starting Application${NC}"
    echo -e "${BLUE}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Get project root directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
BACKEND_DIR="$PROJECT_ROOT"

print_header

# Function to check if backend is running
check_backend() {
    if curl -s http://localhost:8000/api/health >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to wait for backend to be ready
wait_for_backend() {
    print_info "Waiting for backend to be ready..."
    local max_attempts=30
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if check_backend; then
            print_success "Backend is ready!"
            return 0
        fi
        attempt=$((attempt + 1))
        sleep 1
        echo -n "."
    done
    echo ""
    return 1
}

# Check if npm is available
if ! command -v npm >/dev/null 2>&1 || ! npm --version >/dev/null 2>&1; then
    print_error "npm is not working. Please run frontend/repair-npm.sh first"
    print_info "Or run: frontend/fix-npm-permanent.sh"
    exit 1
fi

# Check if frontend dependencies are installed
if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
    print_warning "Frontend dependencies not installed. Installing..."
    cd "$FRONTEND_DIR"
    npm install || {
        print_error "Failed to install frontend dependencies"
        exit 1
    }
    print_success "Frontend dependencies installed"
fi

# Check if backend is already running
print_info "Checking if backend is running..."
if check_backend; then
    print_success "Backend is already running at http://localhost:8000"
    BACKEND_STARTED=false
else
    print_info "Backend is not running. Starting it now..."
    
    # Check if uv is available
    if ! command -v uv >/dev/null 2>&1; then
        print_error "uv is not installed. Backend cannot start."
        print_info "Install with: pip install uv"
        print_info "Please install uv and try again, or start backend manually"
        exit 1
    fi
    
    # Check if OPENAI_API_KEY is set
    if [ -z "$OPENAI_API_KEY" ]; then
        print_warning "OPENAI_API_KEY is not set"
        print_info "The backend requires an OpenAI API key to run."
        echo ""
        read -p "Enter your OPENAI_API_KEY (or press Enter to skip): " api_key_input
        
        if [ -n "$api_key_input" ]; then
            export OPENAI_API_KEY="$api_key_input"
            print_success "API key set for this session"
        else
            print_error "Cannot start backend without OPENAI_API_KEY"
            print_info "Please set it and try again:"
            echo "    export OPENAI_API_KEY=sk-..."
            exit 1
        fi
    fi
    
    # Determine OS and start backend in new terminal
    OS="$(uname -s)"
    cd "$BACKEND_DIR"
    
    if [[ "$OS" == "Darwin" ]]; then
        # macOS - use osascript to open new Terminal window
        print_info "Starting backend in new Terminal window (macOS)..."
        
        # Create a temporary script to run backend
        BACKEND_SCRIPT="/tmp/start_backend_$$.sh"
        cat > "$BACKEND_SCRIPT" << EOF
#!/bin/bash
cd "$BACKEND_DIR"
export OPENAI_API_KEY="$OPENAI_API_KEY"
echo "Starting backend server..."
echo "Backend will run on http://localhost:8000"
echo ""
uv run uvicorn api.index:app --reload --host 0.0.0.0 --port 8000
echo ""
echo "Backend stopped. Press any key to close this window..."
read -n 1
EOF
        chmod +x "$BACKEND_SCRIPT"
        
        # Open in new Terminal window
        osascript << EOF
tell application "Terminal"
    do script "$BACKEND_SCRIPT"
    activate
end tell
EOF
        
        print_success "Backend starting in new Terminal window"
        
    elif [[ "$OS" == "Linux" ]]; then
        # Linux - try to detect desktop environment
        if command -v gnome-terminal >/dev/null 2>&1; then
            print_info "Starting backend in new gnome-terminal window..."
            gnome-terminal -- bash -c "cd '$BACKEND_DIR' && export OPENAI_API_KEY='$OPENAI_API_KEY' && echo 'Starting backend server...' && uv run uvicorn api.index:app --reload --host 0.0.0.0 --port 8000; exec bash" &
        elif command -v xterm >/dev/null 2>&1; then
            print_info "Starting backend in new xterm window..."
            xterm -e "cd '$BACKEND_DIR' && export OPENAI_API_KEY='$OPENAI_API_KEY' && echo 'Starting backend server...' && uv run uvicorn api.index:app --reload --host 0.0.0.0 --port 8000" &
        else
            # Fallback: start in background in current terminal
            print_warning "Could not detect terminal. Starting backend in background..."
            cd "$BACKEND_DIR"
            export OPENAI_API_KEY="$OPENAI_API_KEY"
            uv run uvicorn api.index:app --reload --host 0.0.0.0 --port 8000 > /tmp/backend.log 2>&1 &
            BACKEND_PID=$!
        fi
    else
        # Windows (Git Bash or WSL) - start in background
        print_info "Starting backend in background..."
        cd "$BACKEND_DIR"
        export OPENAI_API_KEY="$OPENAI_API_KEY"
        uv run uvicorn api.index:app --reload --host 0.0.0.0 --port 8000 > /tmp/backend.log 2>&1 &
        BACKEND_PID=$!
    fi
    
    BACKEND_STARTED=true
    
    # Wait for backend to be ready
    if ! wait_for_backend; then
        print_error "Backend failed to start or is not responding"
        print_info "Check the backend terminal window for errors"
        exit 1
    fi
fi

# Start frontend
print_info "Starting frontend development server..."
cd "$FRONTEND_DIR"

print_success "\n${BOLD}Application Starting!${NC}"
echo ""
print_success "Frontend: ${BOLD}http://localhost:3000${NC}"
print_success "Backend:  ${BOLD}http://localhost:8000${NC}"
echo ""

if [ "$BACKEND_STARTED" = true ]; then
    print_info "Backend is running in a separate terminal window"
    print_info "You can close that window to stop the backend"
fi

echo ""
print_info "Press Ctrl+C to stop the frontend server"
echo ""
print_info "Starting frontend..."
echo ""

# Start the frontend (this blocks)
npm run dev

