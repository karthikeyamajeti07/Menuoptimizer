import { Menu, Dish, PricingOpportunity, MenuStrategyInsight } from '../types';
import { INITIAL_MENU, PRICING_RECOMMENDATIONS, MENU_STRATEGY_INSIGHTS } from '../data/mockMenuData';

// In-memory state for local user interaction in the demo
let currentMenu: Menu = JSON.parse(JSON.stringify(INITIAL_MENU));
let pricingRecommendations: PricingOpportunity[] = JSON.parse(JSON.stringify(PRICING_RECOMMENDATIONS));
let strategyInsights: MenuStrategyInsight[] = JSON.parse(JSON.stringify(MENU_STRATEGY_INSIGHTS));

export const menuService = {
  // Fetch current menu
  async getMenu(): Promise<Menu> {
    // Simulate lightweight network roundtrip
    await new Promise((r) => setTimeout(r, 80));
    return JSON.parse(JSON.stringify(currentMenu));
  },

  // Update a dish (e.g. during Menu Studio editing or AI description selection)
  async updateDish(updatedDish: Dish): Promise<Dish> {
    await new Promise((r) => setTimeout(r, 60));
    const index = currentMenu.dishes.findIndex((d) => d.id === updatedDish.id);
    if (index !== -1) {
      currentMenu.dishes[index] = { ...updatedDish };
      // Recalculate basic metadata
      const prices = currentMenu.dishes.map((d) => d.price);
      currentMenu.metadata.averagePrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
      currentMenu.metadata.lowestPrice = Math.min(...prices);
      currentMenu.metadata.highestPrice = Math.max(...prices);
    }
    return JSON.parse(JSON.stringify(updatedDish));
  },

  // Apply a specific AI description variant to a dish
  async applyDescriptionVariant(
    dishId: string,
    variantType: 'concise' | 'storytelling' | 'ingredient-focused'
  ): Promise<Dish> {
    const dish = currentMenu.dishes.find((d) => d.id === dishId);
    if (!dish) throw new Error('Dish not found');

    let newDesc = dish.originalDescription;
    if (variantType === 'concise') newDesc = dish.descriptions.concise.description;
    if (variantType === 'storytelling') newDesc = dish.descriptions.storytelling.description;
    if (variantType === 'ingredient-focused') newDesc = dish.descriptions.ingredientFocused.description;

    dish.optimizedDescription = newDesc;
    dish.selectedDescriptionType = variantType;
    return JSON.parse(JSON.stringify(dish));
  },

  // Regenerate an AI description variant (simulates LLM streaming/regeneration)
  async regenerateDescription(
    dishId: string,
    variantType: 'concise' | 'storytelling' | 'ingredient-focused'
  ): Promise<string> {
    await new Promise((r) => setTimeout(r, 450));
    const dish = currentMenu.dishes.find((d) => d.id === dishId);
    if (!dish) throw new Error('Dish not found');

    const additions = [
      'Gently finished with fresh microgreens and cold-pressed extra virgin olive oil.',
      'Sustainably sourced and prepared using traditional slow-cooking methods.',
      'A harmonious pairing of authentic Mediterranean herbs and artisanal seasoning.',
    ];
    const pickedAddition = additions[Math.floor(Math.random() * additions.length)];
    const existing = dish.descriptions[variantType === 'ingredient-focused' ? 'ingredientFocused' : variantType].description;
    
    return `${existing.split('.')[0]}. ${pickedAddition}`;
  },

  // Fetch pricing opportunities
  async getPricingOpportunities(): Promise<PricingOpportunity[]> {
    await new Promise((r) => setTimeout(r, 60));
    return JSON.parse(JSON.stringify(pricingRecommendations));
  },

  // Apply pricing recommendation
  async applyPricingRecommendation(dishId: string, suggestedPrice: number): Promise<void> {
    await new Promise((r) => setTimeout(r, 60));
    const dish = currentMenu.dishes.find((d) => d.id === dishId);
    if (dish) {
      dish.price = suggestedPrice;
      dish.margin = Math.round(((suggestedPrice - dish.cost) / suggestedPrice) * 100);
    }
  },

  // Fetch menu strategy recommendations
  async getStrategyInsights(): Promise<MenuStrategyInsight[]> {
    await new Promise((r) => setTimeout(r, 60));
    return JSON.parse(JSON.stringify(strategyInsights));
  },

  // Apply a strategy action
  async applyStrategyInsight(insightId: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 60));
    const insight = strategyInsights.find((s) => s.id === insightId);
    if (insight) {
      insight.status = 'applied';
    }
  },

  // Reset demo back to baseline
  async resetMenu(): Promise<Menu> {
    currentMenu = JSON.parse(JSON.stringify(INITIAL_MENU));
    pricingRecommendations = JSON.parse(JSON.stringify(PRICING_RECOMMENDATIONS));
    strategyInsights = JSON.parse(JSON.stringify(MENU_STRATEGY_INSIGHTS));
    return JSON.parse(JSON.stringify(currentMenu));
  },
};
