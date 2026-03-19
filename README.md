# CodeMeet

A real-time collaborative coding platform that pairs developers for live pair programming sessions with integrated video calling, chat, and code execution.

## 🚀 Features

### Core Functionality
- **Real-time Collaborative Coding**: Multiple users can code together in synchronized sessions
- **Video Calling**: Integrated video conferencing using Stream.io
- **Live Chat**: Real-time messaging during coding sessions
- **Code Execution**: Run code directly in the browser with multiple language support
- **Problem Solving**: Practice coding problems together with built-in problem sets

### User Experience
- **Authentication**: Secure user authentication with Clerk
- **Session Management**: Create, join, and manage coding sessions
- **Dashboard**: Track your recent sessions and statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Technical Features
- **Real-time Updates**: Live synchronization of code changes
- **Multiple Language Support**: Support for various programming languages
- **Problem Database**: Curated set of coding problems with different difficulty levels
- **Session History**: View and revisit past coding sessions

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Monaco Editor** - Code editor (VS Code editor)
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Clerk** - Authentication and user management
- **Stream.io** - Video calling and chat
- **React Hot Toast** - Notification system
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Clerk Express** - Backend authentication
- **Stream.io Node SDK** - Video calling backend
- **Inngest** - Background job processing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
CodeMeet/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── api/            # API service functions
│   │   ├── utils/          # Utility functions
│   │   └── data/           # Static data (problems, etc.)
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Express backend application
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middlewares
│   ├── utils/             # Backend utilities
│   ├── config/            # Configuration files
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database
- Clerk account for authentication
- Stream.io account for video calling

### Environment Variables

Create a `.env` file in both `frontend` and `backend` directories:

#### Backend (.env)
```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://your-connection-string
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
STREAM_API_KEY=your-stream-api-key
STREAM_API_SECRET=your-stream-api-secret
INNGEST_EVENT_KEY=your-inngest-event-key
INNGEST_SIGNING_KEY=your-inngest-signing-key
CLIENT_URL=http://localhost:5173
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
VITE_STREAM_API_KEY=your-stream-api-key
VITE_STREAM_API_SECRET=your-stream-api-secret
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CodeMeet
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**
   - Create `.env` files in both `frontend` and `backend` directories
   - Add the required environment variables as shown above

4. **Start the development servers**
   ```bash
   # Start backend server (from backend directory)
   npm run dev

   # Start frontend server (from frontend directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📖 Usage

### Creating a Session
1. Sign up or log in using Clerk authentication
2. Navigate to the dashboard
3. Click "Create New Session"
4. Select a problem and difficulty level
5. Share the session link with a partner

### Joining a Session
1. Click on a session link or navigate to active sessions
2. Click "Join Session"
3. Start collaborating with video call and chat

### Coding Together
- **Code Editor**: Write and edit code in real-time
- **Run Code**: Execute code and see output instantly
- **Video Call**: Face-to-face communication
- **Chat**: Text messaging for quick discussions
- **Problem Description**: View problem details and examples

## 🔧 Development

### Available Scripts

#### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

#### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

### Key Components

- **SessionPage**: Main collaborative coding interface
- **VideoCallUI**: Video calling component
- **CodeEditorPanel**: Code editor with syntax highlighting
- **Dashboard**: User dashboard with session management
- **ProblemPage**: Individual problem solving interface

### API Endpoints

#### Sessions
- `GET /sessions/my-recent-sessions` - Get user's recent sessions
- `GET /sessions/active-sessions` - Get active sessions
- `POST /sessions/create` - Create new session
- `POST /sessions/join/:id` - Join a session
- `POST /sessions/end/:id` - End a session
- `GET /sessions/:id` - Get session by ID

#### Authentication
- All routes are protected with Clerk middleware
- User authentication handled through Clerk

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
- Update `CLIENT_URL` in backend to your Vercel URL
- Update `VITE_API_URL` in frontend to your Render URL
- Ensure all third-party API keys are properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `CLIENT_URL` in backend matches your frontend URL
2. **Authentication Issues**: Check Clerk keys are properly configured
3. **Video Call Issues**: Verify Stream.io API keys and permissions
4. **Database Connection**: Ensure MongoDB URI is correct and accessible

### Debug Mode
- Frontend: Open browser developer tools
- Backend: Check console logs for detailed error messages

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check existing issues for solutions
- Review the documentation for common problems

---

Built with ❤️ for the developer community
