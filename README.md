# NammaMysuru - Your Local Mysuru Guide

NammaMysuru is an AI-powered local guide web application for Mysuru (Mysore), Karnataka. Meet Mysa, your friendly local guide who helps you discover the city's food, Dasara traditions, and walking routes through an interactive chat interface.

## Features

- **Three Conversation Modes**: Food, Dasara, and Walks
- **Interactive Chat Interface**: Chat with Mysa, your local AI guide
- **Suggestion Cards**: Quick-start prompts for common questions
- **Responsive Design**: Works on desktop and mobile devices
- **Cultural Authenticity**: Powered by local knowledge in product.md
- **Heritage-Inspired Design**: Mysuru Palace and Dasara themed colors

## How to Run

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration
4. Deploy with one click

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

## How Kiro Was Used

This project was built using Kiro AI assistant throughout the development process:

### Project Scaffolding & Setup
- **Initial Setup**: Kiro generated the React + TypeScript + Vite project structure
- **Dependencies**: Kiro helped select and configure Tailwind CSS with custom color palette
- **Directory Structure**: Kiro organized the modular folder structure (components, services, types)

### UI Component Development
- **Component Architecture**: Kiro designed the component hierarchy and prop interfaces
- **Header Component**: Kiro created the heritage-inspired styling and responsive typography
- **ModeTabs**: Kiro implemented the pill-style buttons with accessibility features
- **ChatPane**: Kiro built the chat interface with auto-scroll and loading states
- **MessageBubble**: Kiro designed distinct styling for user vs assistant messages
- **SuggestionCards**: Kiro created mode-specific suggestions with engaging content

### Product.md Knowledge Organization
- **Content Structure**: Kiro helped organize Mysuru knowledge by mode (Food, Dasara, Walks)
- **Mysa Personality**: Kiro defined the friendly local guide persona and tone guidelines
- **Response Examples**: Kiro created authentic example responses for each mode
- **Fallback Behavior**: Kiro structured graceful error handling when information is missing

### AI Service Integration
- **Service Architecture**: Kiro designed the modular AI service for easy provider swapping
- **Error Handling**: Kiro implemented comprehensive retry logic and timeout handling
- **Context Integration**: Kiro structured how product.md content flows to AI responses
- **Mock Responses**: Kiro created sophisticated mode-specific response generation

### Debugging & Iteration
- **Component Refinement**: Kiro helped debug responsive layout issues
- **State Management**: Kiro optimized the message flow and loading state handling
- **Accessibility**: Kiro added ARIA labels and keyboard navigation support
- **Performance**: Kiro implemented context caching and efficient re-renders

### Key Kiro Contributions
- **Rapid Development**: What would take days was completed in hours with Kiro's assistance
- **Best Practices**: Kiro ensured TypeScript interfaces, error boundaries, and clean architecture
- **Cultural Authenticity**: Kiro helped structure local knowledge for accurate AI responses
- **User Experience**: Kiro guided the creation of intuitive, accessible interface design

The `.kiro` folder in this repository contains the complete spec-driven development process, including requirements, design document, and implementation tasks that guided this project.

## Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom color palette
- **State Management**: React hooks (useState, useEffect)
- **AI Integration**: Modular service layer ready for various AI providers
- **Context**: Static markdown file (product.md) with local knowledge

## Project Structure

```
src/
├── components/          # UI components
│   ├── Header.tsx
│   ├── ModeTabs.tsx
│   ├── ChatPane.tsx
│   ├── MessageBubble.tsx
│   └── SuggestionCards.tsx
├── services/           # Business logic
│   ├── aiService.ts
│   └── contextLoader.ts
├── types/              # TypeScript definitions
│   └── index.ts
└── App.tsx            # Main application
```

## Testing Error States

To test error handling, type "error test" in the chat - this will simulate a network error and show the error handling UI.

## Contributing

This project was built for the AWS Builder Center weekly challenge. Feel free to fork and enhance!

## License

MIT License - feel free to use this code for your own local guide applications.
