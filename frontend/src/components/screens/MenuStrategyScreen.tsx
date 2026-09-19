import React, { useState } from 'react';
import { Menu, MenuStrategyInsight, ScreenId } from '../../types';
import { Badge } from '../common/Badge';
import { menuService } from '../../services/mockMenuService';
import {
  Target,
  Award,
  AlertCircle,
  Sparkles,
  Package,
  Eye,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface MenuStrategyScreenProps {
  menu: Menu;
  insights: MenuStrategyInsight[];
  onApplyInsight: (insightId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const MenuStrategyScreen: React.FC<MenuStrategyScreenProps> = ({
  menu,
  insights,
  onApplyInsight,
  onNavigate,
}) => {
  const [appliedInsightIds, setAppliedInsightIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleApply = async (id: string) => {
    await menuService.applyStrategyInsight(id);
    onApplyInsight(id);
    setAppliedInsightIds((prev) => [...prev, id]);
  };

  const filteredInsights = insights.filter((i) => {
    if (activeCategory === 'all') return true;
    return i.category === activeCategory;
  });

  const categoryIcons: Record<string, React.ElementType> = {
    stars: Award,
    'slow-movers': AlertCircle,
    promotions: Sparkles,
    bundles: Package,
    visibility: Eye,
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Info */}
      <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A7862] font-semibold">
                Stage 05 • Strategic Engineering
              </span>
              <span className="w-1 h-1 rounded-full bg-[#B0A795]" />
              <span className="text-xs text-[#736E64]">
                Kasavana & Smith Menu Matrix
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#1E1F22] font-bold tracking-tight">
              Menu Engineering & Growth Strategy
            </h1>
            <p className="text-sm text-[#615B50] mt-1 max-w-2xl">
              Systematic classification of dishes into performance quadrants to guide placement, promotional banners, and recipe re-engineering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('studio')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1F2023] hover:bg-[#35363B] rounded transition-colors shadow-xs"
            >
              <span>Next: Menu Studio Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive BCG / Menu Engineering 2x2 Matrix */}
      <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-md p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1C1D1F]">
              The Bella Italia Engineering Quadrant
            </h2>
            <p className="text-xs text-[#6B655C]">
              Vertical axis: Gross Margin % (threshold: 40%). Horizontal axis: Popularity / Order Volume (threshold: 250 orders/mo).
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-1 rounded bg-[#ECE6DA] text-[#555046]">
            7 Items Mapped
          </span>
        </div>

        {/* 2x2 Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Left: Puzzles (High Margin, Low Volume) */}
          <div className="p-4 rounded bg-[#FAF7F1] border border-[#E4DBCB] flex flex-col justify-between min-h-[170px]">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#8C6D3F]" />
                  <span className="text-xs font-bold text-[#1E2022]">
                    PUZZLES (Opportunity Items)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#265E3C] bg-[#EAF3EC] px-1.5 py-0.5 rounded font-medium">
                  High Margin (&gt;45%) • Low Volume
                </span>
              </div>
              <p className="text-[11px] text-[#696357] mb-2.5">
                Strategy: Promote aggressively, position in prime visual zones, upgrade descriptions.
              </p>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs px-2 py-1 rounded bg-[#F1EBE0] border border-[#E2D8C6]">
                  <span className="font-medium text-[#1E2022]">Grilled Salmon</span>
                  <span className="font-mono text-[#265E3C]">50% margin • 110/mo</span>
                </div>
                <div className="flex items-center justify-between text-xs px-2 py-1 rounded bg-[#F1EBE0] border border-[#E2D8C6]">
                  <span className="font-medium text-[#1E2022]">Tiramisu</span>
                  <span className="font-mono text-[#265E3C]">55% margin • 185/mo</span>
                </div>
                <div className="flex items-center justify-between text-xs px-2 py-1 rounded bg-[#F1EBE0] border border-[#E2D8C6]">
                  <span className="font-medium text-[#1E2022]">Burrata Pugliese</span>
                  <span className="font-mono text-[#265E3C]">48% margin • 130/mo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right: Stars (High Margin, High Volume) */}
          <div className="p-4 rounded bg-[#FAF6EC] border border-[#DECFA4] flex flex-col justify-between min-h-[170px]">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#875C1D]" />
                  <span className="text-xs font-bold text-[#1E2022]">
                    STARS (Flagship Heroes)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#78521A] bg-[#FAF1DF] px-1.5 py-0.5 rounded font-semibold">
                  High Margin (&gt;40%) • High Volume
                </span>
              </div>
              <p className="text-[11px] text-[#696357] mb-2.5">
                Strategy: Defend recipe consistency, place in menu "Golden Triangle", use as anchor for beverage bundles.
              </p>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded bg-[#F4ECDC] border border-[#E4D5B9]">
                  <div>
                    <span className="font-bold text-[#1E2022] block">Margherita Pizza</span>
                    <span className="text-[10px] text-[#7A6A4E]">Wood-Fired Category Driver</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-xs font-bold text-[#205A37]">40% margin</span>
                    <span className="text-[10px] text-[#6B6353] block">420 orders/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Left: Dogs (Low Margin, Low Volume) */}
          <div className="p-4 rounded bg-[#FAF7F1] border border-[#E4DBCB] flex flex-col justify-between min-h-[170px]">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#8C3A24]" />
                  <span className="text-xs font-bold text-[#1E2022]">
                    DOGS (Underperformers)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#8C3A24] bg-[#F9ECE9] px-1.5 py-0.5 rounded font-medium">
                  Low Margin (&lt;38%) • Low Volume
                </span>
              </div>
              <p className="text-[11px] text-[#696357] mb-2.5">
                Strategy: Re-engineer food portion cost, rewrite copy to lift demand, or consider rotating off seasonal cycle.
              </p>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs px-2 py-1 rounded bg-[#F1EBE0] border border-[#E2D8C6]">
                  <span className="font-medium text-[#1E2022]">Spaghetti Carbonara</span>
                  <span className="font-mono text-[#8C3A24]">35% margin • 140/mo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right: Plowhorses (Low Margin, High Volume) */}
          <div className="p-4 rounded bg-[#FAF7F1] border border-[#E4DBCB] flex flex-col justify-between min-h-[170px]">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#3E4D5E]" />
                  <span className="text-xs font-bold text-[#1E2022]">
                    PLOWHORSES (Volume Workhorses)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#3E4D5E] bg-[#EBF0F5] px-1.5 py-0.5 rounded font-medium">
                  Low Margin (&lt;40%) • High Volume
                </span>
              </div>
              <p className="text-[11px] text-[#696357] mb-2.5">
                Strategy: High diner loyalty makes this resilient to modest price tests (+₹15) or subtle ingredient portion rebalancing.
              </p>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs px-2 py-1 rounded bg-[#F1EBE0] border border-[#E2D8C6]">
                  <span className="font-medium text-[#1E2022]">Chicken Alfredo</span>
                  <span className="font-mono text-[#3E4D5E]">38% margin • 390/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Strategy Recommendations List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1C1D1F]">
              Menu-Engineering Strategy Directives
            </h2>
            <p className="text-xs text-[#6B655C]">
              Specific operational changes for layout placement, bundling, and diner visibility.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            {['all', 'stars', 'slow-movers', 'promotions', 'bundles', 'visibility'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 text-xs font-medium rounded capitalize whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#1F2022] text-[#FAF8F5]'
                    : 'bg-[#EFEAE0] text-[#555047] hover:bg-[#E5DFD3]'
                }`}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Insight Cards */}
        <div className="space-y-3">
          {filteredInsights.map((insight) => {
            const Icon = categoryIcons[insight.category] || Target;
            const isApplied = appliedInsightIds.includes(insight.id);

            return (
              <div
                key={insight.id}
                className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-[#D5CDBD] transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded bg-[#F2EDE2] border border-[#E0D8C8] text-[#874A2B] shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#874A2B]">
                        {insight.category.toUpperCase().replace('-', ' ')}
                      </span>
                      <span className="text-xs text-[#8A8477]">•</span>
                      <span className="text-xs text-[#696357] font-medium">
                        {insight.subtitle}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#1E2022]">
                      {insight.title}
                    </h3>

                    <p className="text-xs text-[#544F45] leading-relaxed max-w-2xl">
                      {insight.recommendation}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[11px]">
                      <span className="font-mono text-[#265E3C] font-semibold">
                        Impact: {insight.impact}
                      </span>
                      <span className="text-[#8C8477]">
                        Items: {insight.affectedDishes.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  <button
                    onClick={() => handleApply(insight.id)}
                    disabled={isApplied}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded transition-colors ${
                      isApplied
                        ? 'bg-[#E3DCCF] text-[#6B6456] cursor-default'
                        : 'bg-[#1E1F22] hover:bg-[#34353A] text-white shadow-xs'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#245D3B]" />
                        <span>Directive Applied</span>
                      </>
                    ) : (
                      <>
                        <span>{insight.actionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
