import { polishWish } from '../agents/polishWish';
import { categorizeWish } from '../agents/categorizeWish';
import { santaReply } from '../agents/santaReply';

export interface WishAnalysisResult {
  polishedWish: string;
  category: string;
  santaResponse: string;
}

export const analyzeWish = async (originalWish: string): Promise<WishAnalysisResult> => {
  try {
    // Process the wish through our agents
    const [polishedWish, category, santaResponse] = await Promise.all([
      polishWish(originalWish),
      categorizeWish(originalWish),
      santaReply(originalWish)
    ]);

    return {
      polishedWish,
      category,
      santaResponse
    };
  } catch (error) {
    console.error('Error analyzing wish:', error);
    // Fallback responses
    return {
      polishedWish: originalWish,
      category: 'Fun 🎉',
      santaResponse: `Ho ho ho! I heard your wish. It's a special one!`
    };
  }
};