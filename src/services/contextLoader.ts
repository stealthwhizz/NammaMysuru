/**
 * KIRO INTEGRATION: Context Loading Utility for NammaMysuru
 * 
 * This utility was designed and implemented with Kiro's assistance:
 * - Kiro helped architect the caching strategy and error handling approach
 * - Kiro guided the implementation of graceful fallback content when product.md is unavailable
 * - The loading promise management and validation logic were developed with Kiro's input
 * - Kiro assisted in structuring this utility to work seamlessly with the AI service
 * 
 * This utility handles loading and caching of the product.md context file
 * that contains Mysuru-specific knowledge and Mysa's personality guidelines.
 */

// Cache for the context content to avoid repeated fetches
let contextCache: string | null = null;
let contextLoadPromise: Promise<string> | null = null;

/**
 * Load product.md content from the public folder
 * 
 * This function:
 * - Loads product.md content at application startup
 * - Caches content in memory for AI service calls
 * - Handles missing or malformed context file gracefully
 * - Returns content to be passed to callMysa as a parameter
 * 
 * @returns Promise resolving to the context content string
 */
export async function loadContextContent(): Promise<string> {
  // Return cached content if available
  if (contextCache !== null) {
    return contextCache;
  }
  
  // Return existing promise if already loading
  if (contextLoadPromise) {
    return contextLoadPromise;
  }
  
  // Create new loading promise
  contextLoadPromise = loadContextFromFile();
  
  try {
    const content = await contextLoadPromise;
    contextCache = content;
    return content;
  } catch (error) {
    // Reset promise on error so we can retry
    contextLoadPromise = null;
    throw error;
  }
}

/**
 * Internal function to actually load the context file
 */
async function loadContextFromFile(): Promise<string> {
  try {
    console.log('Loading product.md context file...');
    
    const response = await fetch('/product.md');
    
    if (!response.ok) {
      throw new Error(`Failed to load product.md: ${response.status} ${response.statusText}`);
    }
    
    const content = await response.text();
    
    // Validate that we got some content
    if (!content || content.trim().length === 0) {
      throw new Error('product.md file is empty or contains only whitespace');
    }
    
    // Basic validation - check for expected sections
    const hasPersonality = content.includes('Mysa') || content.includes('personality');
    const hasModeContent = content.includes('food') || content.includes('dasara') || content.includes('walks');
    
    if (!hasPersonality && !hasModeContent) {
      console.warn('product.md may be malformed - missing expected content sections');
    }
    
    console.log(`Successfully loaded product.md (${content.length} characters)`);
    return content;
    
  } catch (error) {
    console.warn('Error loading product.md:', error);
    
    // Return fallback content for graceful degradation
    const fallbackContent = `# Fallback Context for NammaMysuru

## Mysa Personality
You are Mysa, a friendly local guide for Mysuru (Mysore), Karnataka. You speak in simple English with occasional explained Kannada terms. You are knowledgeable about local food, Dasara traditions, and walking routes.

## Fallback Behavior
Since the main context file couldn't be loaded, provide general guidance about Mysuru while acknowledging limitations in your knowledge. Suggest users verify information locally.

## Food Mode
Help with local Mysuru food recommendations, focusing on popular dishes like Mysore Pak, dosa varieties, and local restaurants.

## Dasara Mode  
Provide general information about Mysuru's famous Dasara festival, including the Jamboo Savari procession and palace illumination.

## Walks Mode
Suggest popular walking areas like around Mysore Palace, Chamundi Hills, and local markets.
`;
    
    console.log('Using fallback context content');
    return fallbackContent;
  }
}

/**
 * Clear the context cache (useful for testing or if content needs to be reloaded)
 */
export function clearContextCache(): void {
  contextCache = null;
  contextLoadPromise = null;
}

/**
 * Get the current cached context content without triggering a load
 * @returns The cached content or null if not loaded yet
 */
export function getCachedContext(): string | null {
  return contextCache;
}

/**
 * Check if context is currently being loaded
 * @returns True if a load operation is in progress
 */
export function isContextLoading(): boolean {
  return contextLoadPromise !== null && contextCache === null;
}