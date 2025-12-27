# Implementation Plan for NammaMysuru

## Legend

- **Unmarked tasks** = Required for Week 5 submission (MVP core features). **Focus on these first.**
- **Tasks marked with \*** = Optional stretch goals if time permits. Skip these initially and return only if ahead of schedule.

---

## Phase 1: Foundation 

Complete these tasks to establish a working skeleton with mock AI responses.

- [x] 1. Initialize project structure and dependencies
  - Create Vite + React + TypeScript project
  - Install and configure Tailwind CSS with custom color palette
  - Set up project directory structure (components, services, types, assets)
  - Create base TypeScript type definitions (Mode, ChatMessage, CallMysaParams, SuggestionPrompt)
  - _Requirements: 5.1, 5.2, 6.1_

- [x] 2. Create product.md context file with Mysuru-specific content
  - Write Mysa personality and global rules section
  - Write Food mode section with signature dishes, recommendation rules, and example answers
  - Write Dasara mode section with event details, etiquette, safety guidelines, and example answers
  - Write Walks mode section with route philosophy, important areas, and example itineraries
  - Write fallback behavior guidelines
  - _Requirements: 4.1, 4.4, 7.1, 7.2, 7.3, 7.4_

- [x] 3. Implement core UI components

- [x] 3.1 Create Header component
  - Implement Header component with NammaMysuru title and tagline
  - Add subtitle: "Meet **Mysa**, your local guide for Mysuru's food, Dasara, and walks"
  - Apply heritage-inspired typography and styling
  - _Requirements: 5.1, 5.2_

- [ ]* 3.2 Write property test for mode selection
  - **Property 1: Mode selection updates interface state**
  - **Validates: Requirements 1.2, 1.3, 3.1**

- [x] 3.3 Create ModeTabs component
  - Implement three mode tabs (Food, Dasara, Walks) with icons (🍽️, 🎉, 🏛️)
  - Add active state styling and click handlers
  - Ensure responsive pill-style button layout
  - _Requirements: 1.1, 1.2_

- [x] 3.4 Create MessageBubble component
  - Implement message rendering with role-based styling
  - Add timestamp display
  - Differentiate user vs assistant message appearance (different colors, alignment)
  - _Requirements: 2.6_

- [ ]* 3.5 Write property test for message styling
  - **Property 7: Message role determines styling**
  - **Validates: Requirements 2.6**

- [x] 3.6 Create ChatPane component
  - Implement scrollable message area with MessageBubble rendering
  - Create chat input field with submit button ("Ask Mysa")
  - Add loading indicator for AI processing state
  - Display initial greeting message from Mysa on load (e.g., "Hi! I'm Mysa, your Mysuru local guide. Ask me about food, Dasara traditions, or city walks!")
  - _Requirements: 2.1, 2.2, 2.5, 2.6_

- [ ]* 3.7 Write property test for loading state
  - **Property 6: Loading state during AI processing**
  - **Validates: Requirements 2.5**

- [x] 3.8 Create SuggestionCards component
  - Implement mode-specific suggestion card display
  - Create click handlers to submit suggestions as messages
  - Ensure responsive grid layout for desktop and mobile
  - Define 2–4 suggestion prompts per mode:
    - **Food:** "Evening snacks near Mysore Palace under ₹150 (veg)", "Where can I try authentic Mysore Pak for gifting?"
    - **Dasara:** "First-time Jamboo Savari plan for my family", "What should I wear and avoid during Dasara?"
    - **Walks:** "Half-day heritage + market walk starting near Palace", "Sunset walk that's not too crowded"
  - _Requirements: 1.3, 3.1, 3.2, 3.3, 3.4_

- [ ]* 3.9 Write property test for suggestion cards
  - **Property 8: Suggestion card interaction submits message**
  - **Validates: Requirements 3.2**

- [ ]* 3.10 Write property test for suggestion count
  - **Property 9: Mode-appropriate suggestion count**
  - **Validates: Requirements 3.3**

- [x] 4. Implement AI service layer

- [x] 4.1 Create AI service module with mock implementation
- Create `callMysa` function with proper TypeScript interface
- Implement mock response that echoes mode and message (e.g., "You asked about [mode]: [message]")
- Add clear TODO comments for real AI integration (where product.md will be loaded and passed)
- Document expected parameters (mode, messages, context content)
- _Requirements: 6.1, 6.2_

- [x]* 4.2 Write property test for AI service parameters
- **Property 4: AI service receives complete context**
- **Validates: Requirements 2.3, 4.1, 6.2, 7.3**

- [x] 4.3 Add error handling to AI service
- Implement try-catch for network failures
- Add timeout handling with appropriate error messages (e.g., "Connection issue - please try again")
- Create retry mechanism for failed requests (allow user to re-submit)
- _Requirements: 6.4, 9.1, 9.2_

- [ ]* 4.4 Write property test for error handling
- **Property 13: AI service error handling**
- **Validates: Requirements 6.4, 9.1, 9.2**

---

## Phase 2: State & Integration 

Wire up all components and implement real AI integration with product.md.



- [x] 5. Integrate components in App component
- [x] 5.1 Set up App state management
- Initialize state for current mode (default to 'food')
- Initialize state for chat messages array (start with Mysa's greeting)
- Initialize state for loading indicator
- _Requirements: 1.4_

- [x] 5.2 Implement message submission flow
- Create `handleSubmit` function that adds user message to chat
- Call AI service with mode, messages, and product.md context
- Add AI response to chat history
- Handle loading states during AI calls
- _Requirements: 2.1, 2.3, 2.4, 2.6_

- [ ]* 5.3 Write property test for message submission
- **Property 3: Message submission adds to chat history**
- **Validates: Requirements 2.1**

- [ ]* 5.4 Write property test for AI response display
- **Property 5: AI responses display in chat interface**
- **Validates: Requirements 2.4**

- [x] 5.5 Implement mode switching logic
- Create `handleModeChange` function
- Preserve chat history when switching modes (chat should stay visible)
- Update suggestion cards based on new mode
- _Requirements: 1.5_

- [ ]* 5.6 Write property test for mode switching
- **Property 2: Chat history preservation across mode switches**
- **Validates: Requirements 1.5**

- [x] 5.7 Wire up all components in App layout
- Compose Header, ModeTabs, ChatPane, and SuggestionCards
- Implement responsive layout (side-by-side on desktop: left ChatPane, right SuggestionCards; stacked on mobile)
- Pass appropriate props and handlers to child components
- _Requirements: 5.3, 8.1, 8.2_

- [ ]* 5.8 Write property test for responsive layout
- **Property 10: Responsive layout adaptation**
- **Validates: Requirements 5.3, 8.1, 8.2, 8.4**


- [x] 6. Implement context file loading

- [x] 6.1 Create context loading utility
- Load `product.md` content at application startup (from public/ folder or API)
- Cache content in memory for AI service calls
- Handle missing or malformed context file gracefully (fallback to generic responses)
- Pass content to `callMysa` as a parameter
- _Requirements: 7.1_

- [ ]* 6.2 Write property test for context updates
- **Property 12: Context file updates reflect in AI calls**
- **Validates: Requirements 7.1**

- [x] 7. Wire up real AI integration

- [x] 7.1 Connect to AI service (Kiro/Gemini/Claude)
- Replace mock `callMysa` with real API call
- Send mode, chat history, and product.md content to AI
- Parse and display AI response in chat
- Document in code comments how this integrates with Kiro
- _Requirements: 2.3, 4.1, 6.2_

- [x] 7.2 Test AI responses against product.md guidelines
- Verify Mysa responds with appropriate tone and content per mode
- Spot-check a few responses to ensure product.md knowledge is being used
- _Requirements: 4.2, 4.3_

---

## Phase 3: Polish & Submission (26–28 Dec)

Final touches, testing, and blog/submission prep.

- [x] 8. Apply Tailwind styling and theming

- [x] 8.1 Configure Tailwind with custom color palette
- Define primary colors (maroon/royal blue)
- Define secondary colors (muted gold/mustard)
- Define accent colors (soft teal/green)
- Set up warm off-white/beige background
- _Requirements: 5.1_

- [x] 8.2 Style all components with Tailwind classes
- Apply typography styles (decorative serif for titles, sans-serif for body)
- Ensure consistent spacing and padding
- Add hover and active states for interactive elements
- Implement responsive breakpoints for mobile/desktop
- _Requirements: 5.2, 5.4_

- [x] 8.3 Ensure basic accessibility compliance (minimum bar)
- Add ARIA labels to interactive elements (buttons, input)
- Ensure minimum touch target sizes (44px) on buttons
- Verify keyboard navigation (Tab through buttons/input)
- _Requirements: 8.3_

- [ ]* 8.4 Write property test for touch targets
- **Property 11: Touch target accessibility**
- **Validates: Requirements 8.3**

- [x] 9. Create example conversations document

- Write 5–7 example user-Mysa conversations covering all three modes
- Include examples:
  - Food: budget snacks, special items, timings
  - Dasara: first-time planning, etiquette, timing
  - Walks: half-day route, quieter route, photo spots
- Ensure examples follow product.md guidelines and Mysa's tone
- Save as `EXAMPLES.md` in project root
- _Requirements: 4.2, 4.3_

- [x] 10. Final integration and polish

- Test complete user flow: mode select → ask question → see response
- Verify all components render correctly on desktop and mobile
- Ensure error states display properly (try submitting with AI off)
- Add subtle loading animations or transitions (optional)
- Deploy to Vercel/Netlify
- _Requirements: 8.4, 8.5_

- [x] 11. Verify Kiro integration for submission

- Take screenshots of Kiro tasks showing:
  - Project scaffold generation
  - UI component creation
  - product.md structure help
  - Debugging/iteration screenshots
- Ensure `.kiro` folder is pushed to GitHub (not .gitignored)
- Create brief comments in code noting where Kiro was used
- _For blog narrative: "Kiro helped me scaffold the UI and organize the Mysuru knowledge in product.md"_

- [x] 12. Write AWS Builder Center blog

- Blog structure :
  - **Hook:** "Meet Mysa: How I built a Mysuru local guide with help of kiro"
  - **Problem:** Why generic travel apps miss local nuances
  - **Solution:** Custom context file (`product.md`) + Kiro for fast UI iteration
  - **Architecture:** diagram of Kiro → UI components → `product.md` → AI responses
  - **How Kiro helped:** screenshots of tasks, code generation, debugging
  - **Example interactions:** 2–3 screenshot snippets from EXAMPLES.md
  - **Results/metrics:** "Built in X hours, covers 3 modes, X example conversations"
  - **CTA:** Link to GitHub repo
- Use images (optional):
  - Hero: Mysuru Palace silhouette + Mysa intro
  - Architecture diagram
  - UI screenshot
  - Example conversation screenshot


---
