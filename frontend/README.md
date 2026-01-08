# Frontend - AI Mental Coach

A beautiful, contemporary mid-century modern-inspired frontend for the AI Mental Coach application, featuring a soothing Minecraft-like ambient soundscape.

## 🎨 Design Features

- **Contemporary Mid-Century Modern Aesthetic**: Clean lines, geometric shapes, and a minimalist layout
- **Animated Blue/Silver Gradient Background**: Rich, glowing, shifting animated gradient that creates a calming atmosphere
- **Soothing Background Music**: Minecraft-inspired ambient soundscape that enhances focus and relaxation
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Smooth Animations**: Elegant fade-in effects and transitions throughout

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Backend API running (see main README.md for backend setup)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. (Optional) Add background music:
   - Download a royalty-free ambient track (see `public/music/README.md` for recommendations)
   - Place `ambient-background.mp3` and `ambient-background.ogg` in `public/music/`
   - If no local files are present, the app will use a fallback external source

### Configuration

The frontend connects to the backend API. By default, it expects the backend to be running at:
- `http://localhost:8000` (development)

To change this, create a `.env.local` file in the frontend directory:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, set this to your deployed backend URL.

### Running the Application

1. **Start the backend** (from project root):
   ```bash
   # Make sure you have your OPENAI_API_KEY set
   export OPENAI_API_KEY=sk-...
   
   # Start the FastAPI server
   uv run uvicorn api.index:app --reload
   ```
   The backend will run on `http://localhost:8000`

2. **Start the frontend** (from frontend directory):
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## 🎵 Background Music

The application includes a background music player with:
- **Play/Pause controls**: Toggle music on/off
- **Volume control**: Mute/unmute functionality
- **Auto-loop**: Seamless looping for continuous ambient sound
- **Subtle volume**: Set to 30% by default for non-intrusive background ambiance

The music player is located in the bottom-right corner of the screen.

### Adding Your Own Music

1. Download a royalty-free ambient track (Minecraft-like soundscape recommended)
2. Convert to both MP3 and OGG formats
3. Place files in `public/music/`:
   - `ambient-background.mp3`
   - `ambient-background.ogg`
4. The component will automatically use your local files

See `public/music/README.md` for detailed recommendations and sources.

## 🏗️ Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and animations
├── components/
│   ├── ChatInterface.tsx   # Main chat UI component
│   └── BackgroundMusic.tsx # Music player component
├── public/
│   └── music/              # Background music files (optional)
├── package.json            # Dependencies and scripts
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🎯 Features

### Chat Interface
- Real-time conversation with the AI mental coach
- Auto-scrolling message history
- Loading indicators during API calls
- Error handling with user-friendly messages
- Responsive text input with auto-resize
- Enter to send, Shift+Enter for new line

### Design Elements
- **Mid-Century Modern**: Geometric shapes, clean typography, organic layouts
- **Animated Gradient**: Shifting blue/silver gradient background
- **Glass Morphism**: Frosted glass effect on chat container
- **Smooth Animations**: Fade-in effects for messages
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🚢 Deployment

### Deploying to Vercel

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. From the frontend directory, run:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Link to your Vercel account
   - Confirm project settings
   - Set environment variables if needed:
     - `NEXT_PUBLIC_API_URL`: Your deployed backend URL

4. After deployment, update your backend CORS settings if needed to allow your Vercel domain.

### Environment Variables for Production

Create a `.env.production` file or set in Vercel dashboard:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **CSS Modules**: Scoped styling with global CSS
- **React Hooks**: Modern React patterns

## 🔗 Backend Integration

The frontend communicates with the FastAPI backend through:

- **Health Check**: `GET /api/health`
- **Chat Endpoint**: `POST /api/chat`
  - Request body: `{ "message": "user message" }`
  - Response: `{ "reply": "assistant response" }`

CORS is already configured on the backend to allow frontend requests.

## 🐛 Troubleshooting

### Music not playing
- Some browsers require user interaction before playing audio
- Click the play button to start music
- Check browser console for audio errors
- Ensure music files are in `public/music/` if using local files

### API connection errors
- Verify backend is running on `http://localhost:8000`
- Check `NEXT_PUBLIC_API_URL` environment variable
- Ensure CORS is properly configured on backend
- Check browser console for detailed error messages

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

## 📝 Notes

- The design balances mid-century modern aesthetics with the required blue/silver gradient background
- Background music is optional and can be toggled on/off
- All animations are CSS-based for optimal performance
- The application is fully responsive and works on all screen sizes

## 🎉 Enjoy!

Start chatting with your AI mental coach and enjoy the calming ambiance!
