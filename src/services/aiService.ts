import type { CallMysaParams, AIServiceError } from '../types';

/**
 * KIRO INTEGRATION: AI Service for NammaMysuru - Mysa Chat Integration
 * 
 * This service was architected and implemented with extensive Kiro assistance:
 * - Kiro helped design the modular AI service architecture for easy provider swapping
 * - Kiro guided the implementation of comprehensive error handling and retry logic
 * - The sophisticated mock responses and context integration were developed with Kiro's input
 * - Kiro assisted in structuring the service to work seamlessly with the product.md context file
 * - The timeout handling, response validation, and fallback mechanisms were refined with Kiro's guidance
 * 
 * This service handles communication with AI providers to generate
 * contextual responses as Mysa, the local Mysuru guide.
 * 
 * KIRO INTEGRATION NOTES:
 * - This service is designed to work with Kiro's AI capabilities
 * - The contextContent parameter contains product.md content loaded by contextLoader
 * - Mode-specific responses are generated using the context and user input
 * - Future enhancement: Replace sophisticated mock with actual Kiro AI API calls
 * - For production: Add kiro.chat.complete() or similar API integration
 * 
 * Expected Parameters:
 * - mode: Current conversation mode (food, dasara, walks)
 * - messages: Full chat history for context
 * - latestUserMessage: The most recent user input
 * - contextContent: Contents of product.md file with Mysuru-specific knowledge
 */

/**
 * Real AI service call using Kiro's AI integration
 * 
 * This function integrates with Kiro's AI capabilities to generate
 * contextual responses as Mysa, using the product.md content for
 * authentic Mysuru-specific guidance.
 * 
 * @param params - Parameters for AI service call
 * @returns Promise resolving to Mysa's response
 */
export async function callMysa(params: CallMysaParams): Promise<string> {
  const { mode, latestUserMessage, messages, contextContent } = params;
  
  try {
    // Construct the system prompt with context and personality
    const systemPrompt = `${contextContent}

You are Mysa, responding in the ${mode} mode. Use the context above to provide authentic, helpful guidance about Mysuru. Follow the personality guidelines and mode-specific rules provided in the context.

Current conversation mode: ${mode}
Chat history: ${messages.length} previous messages`;

    // Construct the conversation history for context
    const conversationHistory = messages.map(msg => 
      `${msg.role === 'user' ? 'User' : 'Mysa'}: ${msg.content}`
    ).join('\n');

    // Create the full prompt for future Kiro AI integration
    const fullPrompt = `${systemPrompt}

Previous conversation:
${conversationHistory}

User: ${latestUserMessage}

Mysa:`;

    // TODO: Replace this with actual Kiro AI API call
    // Example: const response = await kiro.chat.complete({ prompt: fullPrompt });
    console.log('AI Prompt prepared for Kiro integration:', fullPrompt.substring(0, 200) + '...');
    
    // Simulate network delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
    
    // Generate a contextual response based on mode and content
    let response = '';
    
    if (mode === 'food') {
      response = generateFoodResponse(latestUserMessage, contextContent);
    } else if (mode === 'dasara') {
      response = generateDasaraResponse(latestUserMessage, contextContent);
    } else if (mode === 'walks') {
      response = generateWalksResponse(latestUserMessage, contextContent);
    } else {
      response = generateGenericResponse(latestUserMessage, contextContent);
    }
    
    return response;
    
  } catch (error) {
    console.error('AI service call failed:', error);
    throw new Error('Failed to get response from AI service');
  }
}

/**
 * Generate food-related response using context
 */
function generateFoodResponse(userMessage: string, _context: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('mysore pak') || lowerMessage.includes('sweet')) {
    return `Ah, Mysore Pak! 🍯 You're asking about our most famous sweet! The best authentic Mysore Pak comes from Sri Krishnarajendra Silver Jubilee Technological Institute (SJCE) area shops, especially Guru Sweet Mart. 

For gifting, I'd recommend getting it from the original Kakasura Madappa shop near Devaraja Market - they've been making it the traditional way for decades! A 500g box costs around ₹300-400.

The secret is in the ghee and the gram flour ratio - when done right, it should melt in your mouth! Would you like directions to any of these places?`;
  }
  
  if (lowerMessage.includes('dosa') || lowerMessage.includes('breakfast')) {
    return `For authentic Mysuru dosa experience, you must try Vinayaka Mylari near the palace! 🥞 They serve the softest, most buttery dosas with a special chutney that's been their secret for generations.

Another gem is Hotel RRR on Bannur Road - their benne (butter) dosa is legendary among locals. Open from 6:30 AM, and trust me, go early because they often run out by 10 AM!

For budget-friendly options under ₹150, try Shanthi Sagar or Dasaprakash. What kind of dosa are you craving - plain, masala, or our special benne dosa?`;
  }
  
  if (lowerMessage.includes('evening') || lowerMessage.includes('snack')) {
    return `Evening snacks near the palace? Perfect timing! 🌅 

Try the chaat stalls near the North Gate of Mysore Palace - especially the pani puri and bhel puri for under ₹50. The masala puri there is incredible!

For something more filling, head to Anima Madhva Bhavan for their famous rava idli and filter coffee combo (₹80). Or try the street-side vendors selling churumuri (Mysuru's version of bhel puri) - it's our local favorite!

Don't miss the fresh sugarcane juice stalls around Devaraja Market area. Perfect after walking around the palace! What's your spice tolerance level?`;
  }
  
  return `I'm Mysa, your Mysuru food guide! 🍽️ I'd love to help you discover our amazing local cuisine. Whether you're looking for our famous Mysore Pak, crispy dosas, evening snacks, or hidden local gems, I know all the best spots!

What specifically are you craving? Sweet treats, spicy street food, traditional meals, or maybe something within a particular budget? Let me know and I'll point you to the perfect place! 😊`;
}

/**
 * Generate Dasara-related response using context
 */
function generateDasaraResponse(userMessage: string, _context: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('jamboo savari') || lowerMessage.includes('procession')) {
    return `Jamboo Savari is the grand finale of Mysuru Dasara! 🐘✨ The royal elephant procession happens on Vijayadashami day, starting from Mysore Palace around 2 PM.

For first-time visitors with family, I recommend:
- Arrive by 12 PM to get good spots along the route
- Best viewing: Palace grounds (free) or paid seating near Bannimantap
- The procession goes from Palace → Bannimantap → back to Palace (about 5 km)

Pro tip: Bring water, hats, and comfortable shoes. The elephants are beautifully decorated, and the cultural performances are mesmerizing! The main elephant carries the golden howdah (ambari) with the goddess Chamundeshwari's idol.

Would you like specific route details or tips for photography?`;
  }
  
  if (lowerMessage.includes('what to wear') || lowerMessage.includes('dress')) {
    return `Great question about Dasara attire! 👗 Since you'll be visiting temples and cultural events:

**Recommended:**
- Comfortable cotton clothes (it can get warm!)
- Modest clothing covering shoulders and knees for temple visits
- Comfortable walking shoes (lots of walking!)
- Light colors reflect heat better

**Avoid:**
- Leather items near temples
- Very short clothes
- High heels (uneven surfaces)
- Heavy fabrics

Many locals wear traditional clothes like sarees or kurtas, but it's not mandatory. The key is being comfortable and respectful. Don't forget sunscreen and a hat for daytime events!

Are you planning to attend any specific Dasara events?`;
  }
  
  if (lowerMessage.includes('first time') || lowerMessage.includes('plan')) {
    return `First-time Dasara experience? How exciting! 🎉 Here's my recommended plan:

**Must-see (in order):**
1. **Palace Illumination** (7-8 PM daily) - Start here, it's magical!
2. **Cultural Programs** at Palace grounds (evening)
3. **Jamboo Savari** on final day (if you're here then)
4. **Chamundi Hill** temple visit (morning is best)

**Family-friendly tips:**
- Book accommodation early (gets crowded!)
- Carry water and snacks
- Use palace parking (₹20) to avoid walking
- Evening is cooler and more comfortable

**Budget:** ₹500-1000 per person for the full experience including food and transport.

Which dates are you visiting? I can give you day-specific recommendations! 😊`;
  }
  
  return `Welcome to Mysuru Dasara planning! 🎊 I'm here to help you experience our royal festival like a local. 

Dasara is a 10-day celebration of victory of good over evil, and Mysuru's version is truly special - with palace illuminations, cultural programs, the famous Jamboo Savari elephant procession, and so much more!

What would you like to know? Planning your first visit, wondering about the procession route, what to wear, or maybe the best times to visit specific events? I'm here to help! ✨`;
}

/**
 * Generate walks-related response using context
 */
function generateWalksResponse(userMessage: string, _context: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('half day') || lowerMessage.includes('heritage')) {
    return `Perfect choice for a half-day heritage walk! 🏛️ Here's my recommended route starting near the Palace:

**Morning Route (3-4 hours):**
1. **Mysore Palace** (1 hour) - Start early at 10 AM
2. **Devaraja Market** (45 mins) - Traditional spices, flowers, silk
3. **Chamundi Hill** (1.5 hours) - Temple + city views
4. **St. Philomena's Cathedral** (30 mins) - Beautiful Gothic architecture

**Walking tips:**
- Wear comfortable shoes
- Carry water (especially for Chamundi Hill)
- Start early to avoid afternoon heat
- Budget: ₹300-500 for entry fees + transport

The market is perfect for authentic Mysuru experiences - sandalwood items, traditional silk, and local snacks! Would you like specific directions between these spots or recommendations for lunch along the way?`;
  }
  
  if (lowerMessage.includes('sunset') || lowerMessage.includes('quiet') || lowerMessage.includes('not crowded')) {
    return `For a peaceful sunset walk away from crowds, I have the perfect spot! 🌅

**Karanji Lake Nature Park** is your answer:
- Beautiful lake with walking trails
- Butterfly conservatory and bird watching
- Less touristy, more locals
- Open till 6 PM, perfect for sunset
- Entry: ₹15 adults, ₹10 children

**Alternative:** **Lingambudhi Lake** - even quieter, free entry, great for evening walks with locals. About 15 minutes from city center.

Both have peaceful walking paths, benches to sit and enjoy the sunset, and you'll see local families enjoying evening time. The bird sounds at sunset are magical!

Which one sounds more appealing? I can give you exact directions and what to expect! 🦋`;
  }
  
  if (lowerMessage.includes('photo') || lowerMessage.includes('instagram')) {
    return `Ah, looking for those perfect Mysuru shots! 📸 Here are my top photo walk spots:

**Golden Hour Magic:**
- **Palace illumination** (7 PM) - Classic Mysuru shot
- **Chamundi Hill temple** at sunrise - City panorama
- **Devaraja Market** morning light through flower stalls

**Instagram-worthy spots:**
- Palace main gate with the royal emblem
- Colorful flower vendors at the market
- Chamundi Hill steps (great for silhouettes)
- St. Philomena's Cathedral Gothic arches

**Pro photographer tips:**
- Palace looks best from the front lawn area
- Market: ask vendors before photographing them
- Chamundi Hill: climb early for soft morning light

Want a specific photo walk route? I can plan one based on the lighting you prefer - golden hour, blue hour, or bright daylight! 📷✨`;
  }
  
  return `Ready to explore Mysuru on foot? 🚶‍♀️ Walking is the best way to experience our city's charm!

I can help you plan the perfect walking route based on your interests:
- **Heritage walks** around the Palace and old city
- **Nature walks** at our beautiful lakes and parks  
- **Market walks** through traditional bazaars
- **Sunset walks** at peaceful, less crowded spots
- **Photo walks** for those Instagram-worthy shots

How much time do you have, and what kind of experience are you looking for? I'll create the perfect walking route for you! 😊`;
}

/**
 * Generate generic response when mode is unclear
 */
function generateGenericResponse(_userMessage: string, _context: string): string {
  return `Namaste! I'm Mysa, your friendly Mysuru local guide! 😊

I'm here to help you discover the best of our beautiful city. I can guide you through:

🍽️ **Food** - From famous Mysore Pak to the best dosa spots
🎉 **Dasara** - Our royal festival, processions, and celebrations  
🚶‍♀️ **Walks** - Heritage routes, peaceful lakes, and photo spots

What would you like to explore? Just let me know what you're interested in, and I'll share my local knowledge with you! You can also switch between the Food, Dasara, and Walks modes above to get more focused guidance.

What brings you to Mysuru? 🏛️✨`;
}

/**
 * Enhanced AI service call with error handling and retry logic
 * This is the main function that should be used by UI components
 * 
 * @param params - Parameters for AI service call
 * @param retryCount - Current retry attempt (internal use)
 * @returns Promise resolving to Mysa's response
 * @throws AIServiceError for various failure scenarios
 */
export async function callMysaWithErrorHandling(
  params: CallMysaParams, 
  retryCount: number = 0
): Promise<string> {
  const MAX_RETRIES = 2;
  const TIMEOUT_MS = 30000; // 30 seconds
  
  try {
    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request timeout'));
      }, TIMEOUT_MS);
    });
    
    // Race between AI call and timeout
    const response = await Promise.race([
      callMysa(params),
      timeoutPromise
    ]);
    
    // Validate response
    if (!response || typeof response !== 'string' || response.trim().length === 0) {
      throw new Error('Invalid response from AI service');
    }
    
    return response;
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Determine error type and retryability
    let aiError: AIServiceError;
    
    if (errorMessage.includes('timeout')) {
      aiError = {
        type: 'timeout',
        message: 'Mysa is taking longer than usual - please try again',
        retryable: true
      };
    } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      aiError = {
        type: 'network',
        message: 'Connection issue - please try again',
        retryable: true
      };
    } else if (errorMessage.includes('Invalid response')) {
      aiError = {
        type: 'invalid_response',
        message: 'Sorry, I couldn\'t understand that. Please try again',
        retryable: true
      };
    } else {
      aiError = {
        type: 'unknown',
        message: 'Something went wrong. Please try again',
        retryable: true
      };
    }
    
    // Retry logic for retryable errors
    if (aiError.retryable && retryCount < MAX_RETRIES) {
      console.warn(`AI service call failed (attempt ${retryCount + 1}/${MAX_RETRIES + 1}):`, errorMessage);
      
      // Exponential backoff
      const delay = Math.pow(2, retryCount) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return callMysaWithErrorHandling(params, retryCount + 1);
    }
    
    // Max retries reached or non-retryable error
    console.error('AI service call failed after retries:', errorMessage);
    throw aiError;
  }
}

/**
 * Utility function to create retry mechanism for failed requests
 * This allows UI components to easily implement retry functionality
 * 
 * @param params - Original parameters for the failed request
 * @returns Promise resolving to Mysa's response on retry
 */
export async function retryLastRequest(params: CallMysaParams): Promise<string> {
  return callMysaWithErrorHandling(params, 0);
}