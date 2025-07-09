# DataCollect Pro

A professional online data collection platform for researchers, built with Svelte 5.

## About

DataCollect Pro is a modern web application that enables researchers to create, distribute, and analyze surveys. The platform provides tools for both survey creators and participants, with features for data collection, analytics, and user management.

## Features

- **Survey Creation**: Design and publish research surveys
- **Survey Participation**: Take surveys and earn rewards
- **Dashboard Analytics**: Monitor survey performance and responses
- **User Management**: Profile settings and preferences
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: Svelte 5 with TypeScript
- **Styling**: CSS with modern design patterns
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd datacollect-pro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check the project
- `npm run lint` - Lint the code
- `npm run format` - Format the code

### Project Structure

```
datacollect-pro/
├── src/
│   ├── lib/           # Shared utilities and stores
│   ├── routes/        # SvelteKit pages and layouts
│   └── app.html       # HTML template
├── static/            # Static assets
└── package.json       # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
