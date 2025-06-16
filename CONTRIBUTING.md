# Contributing to RaktConnect 🩸

Thank you for your interest in contributing to RaktConnect! We appreciate your help in making blood donation more accessible and efficient through technology.

## Getting Started

RaktConnect is a MERN + AI-powered blood donation platform that connects hospitals, donors, and patients. Before contributing:

1. Fork the repository
2. Check open issues and discussions
3. Set up your development environment

## Development Setup

**Prerequisites:** Node.js (v16+), MongoDB, Python, Git

1. **Clone and install:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/RaktConnect.git
   cd RaktConnect
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

2. **Environment Setup:**
   - Create `.env` files in `client` and `server` directories
   - Configure MongoDB connection and API keys

3. **Start development:**
   ```bash
   npm run dev  # Runs both client and server
   ```

## How to Contribute

**Priority Areas:**
- Hospital Dashboard & Analytics
- AI Prediction Accuracy
- Mobile Responsiveness
- Real-time Features & Notifications

## Pull Request Process

1. **Create feature branch:** `git checkout -b feature/your-feature-name`
2. **Make changes** following coding standards
3. **Test your changes:** `npm run dev`
4. **Commit:** `git commit -m "feat: your feature description"`
   - Use: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`
5. **Push and create PR** with clear description and screenshots

## Issue Guidelines

**Before creating issues:** Search existing issues first

**Include in bug reports:** Description, steps to reproduce, expected vs actual behavior, environment details

**Include in feature requests:** Clear description, use case, benefits, mockups (if applicable)

## Coding Standards

- **React:** Use functional components, hooks, and ES6+ features
- **Styling:** Use Tailwind CSS consistently, mobile-first design
- **Backend:** Follow RESTful conventions, implement proper error handling
- **Database:** Use meaningful names, proper indexing, handle errors gracefully

## Documentation

When contributing:
- Update README.md for new features
- Add inline comments for complex logic
- Document API changes
- Add JSDoc comments for functions

## Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Pull Request Reviews** - For code-related discussions

## Project Structure

```
RaktConnect/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utility functions
├── server/                # Express backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── utils/            # Backend utilities
└── ai/                   # Python AI components
    ├── models/           # ML models
    └── scripts/          # Data processing
```

## Beginner-Friendly Issues

Look for issues labeled with:
- `good first issue` - Perfect for newcomers
- `help wanted` - Community help needed
- `documentation` - Documentation improvements
- `ui/ux` - User interface improvements

## Questions?

Don't hesitate to ask! Open a GitHub Discussion for general questions or comment on existing issues for clarification.

Thank you for contributing to RaktConnect and helping save lives through technology! 🩸❤️