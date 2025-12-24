import Bytez from "bytez.js";

// Initialize the Bytez SDK with the API key
const key = "868b08a85d9af6e5144ba2c7c8994c99";
const sdk = new Bytez(key);

// Mock implementation of the Category Agent with accurate categorization
export const categorizeWish = async (originalWish: string): Promise<string> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Create more accurate categorization based on the wish content
  const wishLower = originalWish.toLowerCase();
  
  if (wishLower.includes('love') || wishLower.includes('girlfriend') || wishLower.includes('boyfriend') || wishLower.includes('relationship') || wishLower.includes('wife') || wishLower.includes('husband') || wishLower.includes('partner') || wishLower.includes('family') || wishLower.includes('parent') || wishLower.includes('mom') || wishLower.includes('dad') || wishLower.includes('child') || wishLower.includes('son') || wishLower.includes('daughter')) {
    return 'Family 👨‍👩‍👧';
  } else if (wishLower.includes('money') || wishLower.includes('cash') || wishLower.includes('wealth') || wishLower.includes('rich') || wishLower.includes('job') || wishLower.includes('work') || wishLower.includes('career') || wishLower.includes('business') || wishLower.includes('success') || wishLower.includes('promotion') || wishLower.includes('income')) {
    return 'Career 💼';
  } else if (wishLower.includes('health') || wishLower.includes('wellness') || wishLower.includes('exercise') || wishLower.includes('fitness') || wishLower.includes('healthy') || wishLower.includes('strong') || wishLower.includes('sick') || wishLower.includes('ill') || wishLower.includes('medicine') || wishLower.includes('doctor')) {
    return 'Health ❤️';
  } else if (wishLower.includes('learn') || wishLower.includes('study') || wishLower.includes('education') || wishLower.includes('school') || wishLower.includes('university') || wishLower.includes('skill') || wishLower.includes('knowledge') || wishLower.includes('degree') || wishLower.includes('certificate')) {
    return 'Learning 🎓';
  } else {
    // Default to Fun for other types of wishes
    return 'Fun 🎉';
  }
};
