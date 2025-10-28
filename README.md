# Online Market 🛒

A full-stack online marketplace built with modern web technologies. This project features a Nuxt.js frontend and Express.js backend, designed for scalability and excellent user experience.

## 🚀 Features

- **Frontend**: Modern, responsive UI built with Nuxt.js 3 and Tailwind CSS
- **Backend**: RESTful API powered by Express.js
- **Real-time**: Ready for real-time features with WebSocket support
- **Database Ready**: Configurable for MongoDB or PostgreSQL
- **Authentication**: JWT-based authentication (coming soon)
- **Payment Integration**: Ready for Stripe/PayPal integration
- **SEO Optimized**: Server-side rendering with Nuxt.js

## 🛠️ Tech Stack

### Frontend
- **Nuxt.js 3** - Vue.js framework for production
- **Vue.js 3** - Progressive JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management for Vue.js

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

### Development Tools
- **ESLint** - Code linting
- **Concurrently** - Run multiple commands simultaneously
- **Nodemon** - Auto-restart development server

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Git** for version control

## 🏗️ Installation

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/vishnue007/online-market.git
cd online-market
\`\`\`

### 2. Install dependencies for all projects
\`\`\`bash
npm run install:all
\`\`\`

This will install dependencies for the root project, frontend, and backend.

### 3. Set up environment variables

#### Backend Environment
Copy the environment example file:
\`\`\`bash
cp backend/env.example backend/.env
\`\`\`

Edit `backend/.env` with your configuration:
\`\`\`env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
\`\`\`

## 🚀 Getting Started

### Development Mode

To run both frontend and backend in development mode:

\`\`\`bash
npm run dev
\`\`\`

This will start:
- Frontend on `http://localhost:3000`
- Backend API on `http://localhost:5000`

### Run Individually

**Frontend only:**
\`\`\`bash
npm run dev:frontend
\`\`\`

**Backend only:**
\`\`\`bash
npm run dev:backend
\`\`\`

### Production Mode

**Build the application:**
\`\`\`bash
npm run build
\`\`\`

**Start production servers:**
\`\`\`bash
npm run start
\`\`\`

## 📁 Project Structure

\`\`\`
online-market/
├── frontend/                 # Nuxt.js frontend application
│   ├── assets/              # Stylesheets, images, fonts
│   ├── components/          # Reusable Vue components
│   ├── layouts/             # Application layouts
│   ├── pages/               # Application pages (auto-routing)
│   ├── app.vue              # Main application component
│   ├── nuxt.config.ts       # Nuxt configuration
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Express.js backend application
│   ├── server.js            # Main server file
│   ├── env.example          # Environment variables template
│   └── package.json         # Backend dependencies
│
├── package.json             # Root package.json with workspace scripts
└── README.md               # This file
\`\`\`

## 🔗 API Endpoints

The backend API provides the following endpoints:

- `GET /` - API information and available endpoints
- `GET /health` - Health check endpoint
- `GET /api` - API routes placeholder

### Example API Response

\`\`\`json
{
  "message": "Welcome to Online Market API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "api": "/api"
  }
}
\`\`\`

## 🔧 Available Scripts

### Root Level Scripts

- `npm run dev` - Run both frontend and backend in development mode
- `npm run start` - Run both frontend and backend in production mode
- `npm run build` - Build the frontend for production
- `npm run install:all` - Install dependencies for all projects
- `npm run clean` - Remove all node_modules directories
- `npm run lint` - Run ESLint on frontend code
- `npm run lint:fix` - Fix ESLint issues automatically

### Frontend Scripts

- `npm run dev` - Development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

### Backend Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🌐 Environment Configuration

### Frontend Configuration

The frontend uses Nuxt.js runtime config for environment variables:

\`\`\`typescript
runtimeConfig: {
  public: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:5000',
    appName: 'Online Market'
  }
}
\`\`\`

### Backend Configuration

Create a `.env` file in the backend directory:

\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Database (when implemented)
# DATABASE_URL=mongodb://localhost:27017/online-market

# JWT Secret (for authentication)
# JWT_SECRET=your-super-secret-jwt-key
\`\`\`

## 🚧 Roadmap

- [x] Project setup and basic structure
- [x] Frontend foundation with Nuxt.js
- [x] Backend API with Express.js
- [ ] User authentication and authorization
- [ ] Product management system
- [ ] Shopping cart functionality
- [ ] Payment processing integration
- [ ] Order management
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Search and filtering
- [ ] Reviews and ratings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

- GitHub: [@vishnue007](https://github.com/vishnue007)

## 🆘 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Happy coding! 🚀**
