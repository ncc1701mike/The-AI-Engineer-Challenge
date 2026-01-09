<p align="center" draggable="false">
  <img src="https://github.com/AI-Maker-Space/LLM-Dev-101/assets/37101144/d1343317-fa2f-41e1-8af1-1dbb18399719" 
       width="200px"
       height="auto"/>
</p>

<h1 align="center">👋 Welcome to the AI Engineer Challenge</h1>

<h2 align="center">🤖 Your First Vibe Coding LLM Application</h2>

---

## 📱 About the Application

**AI Mental Coach** is a supportive mental health companion application designed for knowledge workers and founders. Built with modern web technologies, it provides a calming, beautiful interface for users to discuss stress, motivation, habits, and confidence with an AI-powered coach.

### ✨ Key Features

- **🎨 Beautiful Mid-Century Modern Design**: Contemporary aesthetic with animated blue/silver gradient backgrounds
- **🎵 Soothing Ambient Soundscape**: Minecraft-inspired background music for enhanced focus and relaxation
- **💬 Intelligent Mental Coaching**: AI-powered conversations that help with stress, motivation, habits, and confidence
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **⚡ One-Command Startup**: Automated scripts handle backend and frontend setup
- **🔒 Secure API Key Management**: Easy setup with interactive environment configuration

### 🏗️ Tech Stack

- **Backend**: FastAPI (Python) with OpenAI GPT integration
- **Frontend**: Next.js (React) with TypeScript
- **Package Management**: `uv` for Python, `npm` for Node.js
- **Deployment Ready**: Configured for Vercel deployment

---

## 🚀 Quick Start

**Get up and running in under 2 minutes:**

### Prerequisites

- Python 3.12+ (automatically managed by `uv`)
- Node.js 18+ (for frontend)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Git installed

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:ncc1701mike/The-AI-Engineer-Challenge.git
   cd The-AI-Engineer-Challenge
   ```

2. **Set your OpenAI API key:**
   ```bash
   # Option 1: Use the interactive setup script (recommended)
   ./setup-env.sh
   
   # Option 2: Create .env file manually
   echo "OPENAI_API_KEY=sk-your-key-here" > .env
   ```

3. **Start the application:**
   ```bash
   ./start.sh
   ```

That's it! The unified start script will:
- ✅ Automatically check and install dependencies
- ✅ Start the backend server (if not already running)
- ✅ Launch the frontend development server
- ✅ Open http://localhost:3000 in your browser

**No need to manage multiple terminals manually!**

---

## 📚 Documentation

### Technical Documentation

- **[Backend API Documentation](api/README.md)**: Complete guide to the FastAPI backend, including endpoints, setup, and configuration
- **[Frontend Documentation](frontend/README.md)**: Detailed frontend guide covering design, components, setup, and deployment
- **[Testing Guide](TESTING_GUIDE.md)**: Comprehensive testing instructions for the unified start script and application components

### Additional Resources

- **[Git Setup Guide](docs/GIT_SETUP.md)**: Detailed instructions for git configuration and best practices
- **[Interactive Dev Environment](https://github.com/AI-Maker-Space/Interactive-Dev-Environment-for-AI-Engineers)**: Additional context on LLM development environments

---

## 🏗️ Project Structure

```
The-AI-Engineer-Challenge/
├── api/                    # Backend FastAPI application
│   ├── index.py           # Main API endpoints
│   └── README.md           # Backend documentation
├── frontend/               # Next.js frontend application
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   ├── public/             # Static assets
│   └── README.md           # Frontend documentation
├── start.sh                # Unified startup script
├── setup-env.sh            # API key setup script
├── TESTING_GUIDE.md        # Testing documentation
└── README.md               # This file
```

---

## 🎯 How It Works

### Backend (FastAPI)

The backend provides a RESTful API that:
- Accepts chat messages from the frontend
- Processes requests through OpenAI's GPT model
- Returns supportive, practical coaching responses
- Handles CORS for frontend communication

**Key Endpoints:**
- `GET /api/health` - Health check endpoint
- `POST /api/chat` - Main chat endpoint for AI conversations

See [api/README.md](api/README.md) for complete API documentation.

### Frontend (Next.js)

The frontend provides:
- Beautiful, responsive user interface
- Real-time chat interface with message history
- Animated gradient backgrounds
- Background music controls
- Seamless integration with the backend API

See [frontend/README.md](frontend/README.md) for complete frontend documentation.

---

## 🛠️ Development

### Manual Backend Start

If you prefer to run components separately:

```bash
# From project root
uv sync                    # Install Python dependencies
uv run uvicorn api.index:app --reload --host 0.0.0.0 --port 8000
```

### Manual Frontend Start

```bash
# From project root
cd frontend
npm install               # Install Node.js dependencies
npm run dev              # Start development server
```

### Environment Variables

The application uses a `.env` file in the project root:

```env
OPENAI_API_KEY=sk-your-key-here
```

The `.env` file is gitignored for security. Use `./setup-env.sh` to create it interactively.

---

## 🚀 Deployment

### Deploying to Vercel

The frontend is configured for easy deployment to Vercel:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

3. **Follow the prompts** to configure your deployment

4. **Set environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL (or use the default localhost for testing)

See [frontend/README.md](frontend/README.md) for detailed deployment instructions.

---

## 🧪 Testing

For comprehensive testing instructions, see [TESTING_GUIDE.md](TESTING_GUIDE.md).

The guide covers:
- Testing the unified start script
- Verifying backend and frontend integration
- Testing with existing backend instances
- Troubleshooting common issues

---

## 🎨 Customization

### Frontend Design

The frontend uses a contemporary mid-century modern design with:
- Animated blue/silver gradients
- Soothing ambient music
- Responsive layout

To customize the design, see:
- [Frontend README](frontend/README.md) for component structure
- `.cursor/rules/frontend-rule.mdc` for design guidelines

### Backend Behavior

The AI coach's behavior is defined in `api/index.py` via the `SYSTEM_PROMPT`. Modify this to change the coaching style and responses.

---

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Ensure `OPENAI_API_KEY` is set in `.env` file
- Check that port 8000 is not already in use
- Verify Python dependencies are installed: `uv sync`

**Frontend won't start:**
- Ensure Node.js 18+ is installed
- Run `npm install` in the `frontend/` directory
- Check that the backend is running on port 8000

**npm command not found:**
- See [frontend/README.md](frontend/README.md) for npm troubleshooting
- Run `./frontend/fix-npm-permanent.sh` for a permanent fix

**API key issues:**
- Use `./setup-env.sh` to interactively set your API key
- Verify the `.env` file exists in the project root
- Check that your API key starts with `sk-`

For more detailed troubleshooting, see:
- [Backend README](api/README.md)
- [Frontend README](frontend/README.md)
- [Testing Guide](TESTING_GUIDE.md)

---

## 📖 Learning Resources

### For Beginners

If you're new to development, check out:

1. **[Git Setup Guide](docs/GIT_SETUP.md)**: Learn git basics and repository management
2. **[Interactive Dev Environment](https://github.com/AI-Maker-Space/Interactive-Dev-Environment-for-AI-Engineers)**: Set up your development environment
3. **[Accessing GPT-4.1-mini Notebook](https://colab.research.google.com/drive/1sT7rzY_Lb1_wS0ELI1JJfff0NUEcSD72?usp=sharing)**: Learn about LLM APIs

### Vibe Coding Setup

To maximize your AI-assisted development experience:

1. **Configure Cursor Rules**: Check `.cursor/rules/` and customize `frontend-rule.mdc` with your design preferences
2. **Index Documentation**: Use Cursor's custom docs feature to index:
   - Next.js documentation: `https://nextjs.org/docs`
   - Vercel documentation: `https://vercel.com/docs`
3. **Use Chat Console**: Press `Command-L` (Mac) or `CTRL-L` (Windows) to open Cursor's chat

---

## 🤝 Contributing

This is a learning project! Feel free to:
- Fork the repository
- Experiment with different designs
- Modify the AI coach's behavior
- Add new features
- Share your improvements

---

## 📝 License

This project is part of the AI Engineer Challenge by [AI Makerspace](https://github.com/AI-Maker-Space).

---

## 🎉 Congratulations!

You've built your first LLM-powered application! 🚀

**Share your results:**
- Deploy to Vercel and share your live link
- Post on LinkedIn and tag @AIMakerspace
- Celebrate your achievement!

---

## 📞 Support

- **Issues**: Open an issue on GitHub
- **Documentation**: See the technical docs linked above
- **Community**: Join the AI Makerspace community

---

<p align="center">
  <strong>Built with ❤️ using FastAPI, Next.js, and OpenAI</strong>
</p>
