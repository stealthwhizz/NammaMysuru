# Property-Based Testing Suite for NammaMysuru AI System

*Generated with guidance from Kiro AI*

## Overview

This comprehensive property-based testing suite validates the core properties of the NammaMysuru AI system using **fast-check** framework. Unlike traditional unit tests that check specific examples, property-based tests generate hundreds of random inputs to verify universal system behaviors.

## Why Property-Based Testing?

Property-based testing is particularly valuable for AI systems because:

1. **Comprehensive Coverage**: Tests hundreds of input combinations automatically
2. **Edge Case Discovery**: Finds unexpected failure modes through randomization  
3. **Specification Validation**: Ensures the system behaves correctly across all valid inputs
4. **Regression Prevention**: Catches subtle bugs that unit tests might miss

## Test Properties

### 1. Context Integrity Property
**Property**: "All AI responses must reference information from product.md, never generic knowledge"

- **Tests**: 20+ random food/Dasara/heritage questions per mode
- **Validates**: Responses contain specific Mysuru terms from product.md
- **Prevents**: Generic AI responses that don't use local context

```typescript
// Example: Verifies restaurant names exist in product.md
expect(response).toContain('Guru Sweet Mart'); // ✅ Specific
expect(response).not.toContain('I don\'t have specific information'); // ❌ Generic
```

### 2. Mode Consistency Property  
**Property**: "Food mode prioritizes food content, Dasara mode prioritizes festival content, Walks mode prioritizes heritage trails"

- **Tests**: Same ambiguous question ("What should I do today?") across all 3 modes
- **Validates**: Food mode mentions restaurants/dishes, Dasara mentions festivals, Walks mentions heritage
- **Prevents**: Mode confusion where wrong content type is prioritized

```typescript
// Example: Food mode should prioritize food keywords
const foodKeywords = ['restaurant', 'dish', 'eat', 'taste'];
expect(foodKeywordCount).toBeGreaterThan(dasaraKeywordCount);
```

### 3. Local Personality Property
**Property**: "Mysa responses always include at least one Kannada term or local reference per conversation"

- **Tests**: 15+ different question types across all modes
- **Validates**: Every response contains Kannada words with explanations
- **Prevents**: Generic AI personality without local character

```typescript
// Example: Verifies local personality markers
expect(response).toMatch(/namma|maga|sakkat/i); // Kannada terms
expect(response).not.toContain('As an AI'); // Generic AI language
```

### 4. Response Time Property
**Property**: "All API calls complete within 5 seconds regardless of query complexity"

- **Tests**: Simple, medium, and complex queries with timing measurement
- **Validates**: Response time < 5000ms for all cases
- **Prevents**: Performance degradation affecting user experience

```typescript
// Example: Measures actual response time
const startTime = Date.now();
const response = await callMysa(params);
const responseTime = Date.now() - startTime;
expect(responseTime).toBeLessThan(5000);
```

## Test Structure

```
src/test/
├── setup.ts                    # Global test configuration
├── properties/
│   ├── index.test.ts          # Main test suite entry point
│   ├── contextIntegrity.test.ts    # Property 1: Context validation
│   ├── modeConsistency.test.ts     # Property 2: Mode behavior
│   ├── localPersonality.test.ts   # Property 3: Mysa personality
│   └── responseTime.test.ts        # Property 4: Performance
└── README.md                   # This documentation
```

## Running Tests

### All Property Tests
```bash
npm run test:properties
```

### Individual Property Tests
```bash
npm run test:context      # Context Integrity tests
npm run test:modes        # Mode Consistency tests  
npm run test:personality  # Local Personality tests
npm run test:performance  # Response Time tests
```

### Development Testing
```bash
npm run test:watch        # Watch mode for development
npm run test:coverage     # Generate coverage report
```

## Expected Output

### Successful Test Run
```
🧪 Property-Based Testing Suite Initialized
📊 Testing Context Integrity, Mode Consistency, Local Personality, and Response Time

Context Integrity Property Tests
  ✓ Property 1: Food mode responses reference specific Mysuru restaurants/dishes (20 tests)
  ✓ Property 2: Dasara mode responses reference specific festival events (20 tests)
  ✓ Property 3: Walks mode responses reference specific heritage sites (20 tests)
  ✓ Property 4: All responses contain Mysuru-specific context (20 tests)

Mode Consistency Property Tests  
  ✓ Property 1: Food mode consistently prioritizes food-related content (20 tests)
  ✓ Property 2: Dasara mode consistently prioritizes festival content (20 tests)
  ✓ Property 3: Walks mode consistently prioritizes heritage content (20 tests)
  ✓ Property 4: Mode switching produces different responses (10 tests)
  ✓ Property 5: Mode consistency maintained across conversation history (10 tests)

Local Personality Property Tests
  ✓ Property 1: Every response contains Kannada terms or local expressions (20 tests)
  ✓ Property 2: Responses maintain warm, personal tone (20 tests)
  ✓ Property 3: Cultural references are consistently Mysuru-focused (20 tests)
  ✓ Property 4: Personality consistency across conversation lengths (10 tests)
  ✓ Property 5: Kannada terms are properly explained (20 tests)

Response Time Property Tests
  ✓ Property 1: Simple questions respond within 5 seconds (20 tests)
  ✓ Property 2: Medium complexity questions respond within 5 seconds (20 tests)
  ✓ Property 3: Complex questions respond within 5 seconds (10 tests)
  ✓ Property 4: Response time consistency across different modes (7 tests)
  ✓ Property 5: Conversation history doesn't impact response time (10 tests)
  ✓ Property 6: Concurrent requests maintain response time guarantees (7 tests)

✅ Property-Based Testing Suite Complete

Test Suites: 4 passed, 4 total
Tests:       18 passed, 18 total
Time:        45.2s
```

## Configuration

### Test Parameters
- **Minimum test cases per property**: 20 (configurable in `setup.ts`)
- **API timeout**: 30 seconds per test
- **Max response time**: 5 seconds
- **Concurrent request limit**: 3 simultaneous calls

### Environment Requirements
- `VITE_GOOGLE_API_KEY`: Google Gemini API key for live testing
- Node.js environment with Jest and fast-check installed

## Troubleshooting

### Common Issues

1. **API Key Missing**
   ```
   ⚠️ VITE_GOOGLE_API_KEY not found - some tests may fail
   ```
   Solution: Ensure `.env.local` contains valid Google API key

2. **Timeout Errors**
   ```
   Timeout - Async callback was not invoked within the 30000 ms timeout
   ```
   Solution: Check internet connection and API key validity

3. **Property Failures**
   ```
   Property failed after 1 tests
   ```
   Solution: Review the failing test case and check if it reveals a system bug

### Debug Mode
Run tests with verbose output to see detailed property generation:
```bash
npm run test:properties -- --verbose
```

## Blog Post Screenshots

For demonstration purposes, capture these key screenshots:

1. **Test Suite Overview**: Full test run showing all properties passing
2. **Property Generation**: Verbose output showing random test case generation  
3. **Performance Metrics**: Response time measurements across different query types
4. **Failure Analysis**: Example of property test catching a system bug (if any)

## Technical Implementation

### Fast-Check Generators
The test suite uses sophisticated generators to create realistic test data:

```typescript
// Food question generator
const foodQuestionGenerator = fc.constantFrom(
  'Where can I find authentic Mysore Pak?',
  'Best breakfast places near Mysuru Palace?',
  // ... 15+ more variations
);

// Mode consistency testing
const ambiguousQuestions = fc.constantFrom(
  'What should I do today?',
  'Best places to visit in Mysuru?',
  // ... questions that could apply to any mode
);
```

### Response Analysis
Each property test includes sophisticated response analysis:

```typescript
// Context integrity validation
const containsSpecificTerm = MYSURU_SPECIFIC_TERMS.restaurants.some(term => 
  response.toLowerCase().includes(term.toLowerCase())
);

// Mode consistency validation  
const foodKeywordCount = MODE_KEYWORDS.food.filter(keyword =>
  response.toLowerCase().includes(keyword.toLowerCase())
).length;
```

This property-based testing approach provides comprehensive validation that goes far beyond traditional unit testing, ensuring the NammaMysuru AI system maintains its core properties across all possible user interactions.