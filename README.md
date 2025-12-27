# NammaMysuru - AI-Powered Mysuru Guide

Made with ❤️ for Mysore with KIRO

Built with guidance from Kiro AI for exploring the royal city of Mysuru.

## About

NammaMysuru is your intelligent local guide to Mysuru (Mysore), Karnataka. Experience the royal city like a local with AI-powered recommendations for food, Dasara festivities, and heritage walks.

## Features

- **AI Chat Guide (Mysa)** - Get personalized recommendations from your local AI guide
- **Food Trails** - Discover authentic local eateries and iconic dishes like Mysore Pak
- **Dasara Festival Guide** - Navigate the 10-day royal festival with insider tips
- **Heritage Walks** - Explore centuries of history with curated walking routes
- **Responsive Design** - Works perfectly on desktop and mobile devices

## Tech Stack

This project is built with:

- **React** + **TypeScript** - Modern frontend framework with type safety
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Kiro AI Integration** - Intelligent chat responses with local knowledge

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd namma-mysuru
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and add your Google Gemini API key
# Get your API key from: https://makersuite.google.com/app/apikey
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

This project requires a Google Gemini API key. Create a `.env.local` file in the root directory:

```env
VITE_GOOGLE_API_KEY=your_actual_api_key_here
```

**⚠️ Security Note:** Never commit your `.env.local` file or any files containing API keys to version control. The `.gitignore` file is configured to prevent this.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── ChatPanel.tsx   # Main chat interface
│   ├── Hero.tsx        # Hero section
│   └── ...
├── services/           # API and service functions
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
└── assets/             # Images and static assets
```

## Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Contributing

This project was built with Kiro AI assistance. Feel free to contribute improvements and bug fixes.

## License

MIT License - feel free to use this project as inspiration for your own local guide applications.
