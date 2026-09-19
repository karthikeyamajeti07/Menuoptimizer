import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Menu, ScreenId } from '../../types';
import { HeroSection } from '../dashboard/HeroSection';
import { ScrollStorySection } from '../dashboard/ScrollStorySection';
import { BeforeAfterDescription } from '../dashboard/BeforeAfterDescription';
import { PriceSpectrum } from '../dashboard/PriceSpectrum';
import { MenuOrderingBoard } from '../dashboard/MenuOrderingBoard';
import { MenuHealthScore } from '../dashboard/MenuHealthScore';
import { InsightRows } from '../dashboard/InsightRows';
import { HorizontalStorySection } from '../dashboard/HorizontalStorySection';
import { NumberCounter } from '../common/NumberCounter';
import { MotionButton } from '../common/MotionButton';
import {
  UploadCloud,
  FileText,
  Sparkles,
  TrendingUp,
  Target,
  BookOpen,
  ArrowRight,
  Clock,
  DollarSign,
  PieChart,
  Award,
  AlertCircle,
  Layers,
} from 'lucide-react';

interface DashboardScreenProps {
  menu: Menu;
  onNavigate: (screen: ScreenId) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ menu, onNavigate }) => {
  const storyRef = useRef<HTMLDivElement>(null);

  const scrollToStory = () => {
    const el = document.getElementById('scroll-story-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. CINEMATIC HERO SECTION */}
      <HeroSection
        menu={menu}
        onNavigate={onNavigate}
        onScrollToStory={scrollToStory}
      />

      {/* 2. MENU HEALTH SCORE & EXECUTIVE AUDIT METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6">
          <MenuHealthScore />
        </div>

        {/* High-level KPI Grid */}
        <div className="lg:col-span-6 rounded-xl border border-[#E3DC CE] bg-[#FAF8F5] p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D8]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A7862] font-semibold block">
                Portfolio Baseline
              </span>
              <h3 className="font-serif-display text-lg font-bold text-[#1C1D1F]">
                Extraction & Revenue Indicators
              </h3>
            </div>
            <span className="text-xs font-mono text-[#736E64] flex items-center gap-1">
              <Clock className="w-3 h-3" /> {menu.lastUpdated}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#FFFDF9] rounded-lg border border-[#E3DCCF]">
              <span className="text-[10px] text-[#787265] uppercase font-mono block">
                Dishes Extracted
              </span>
              <div className="text-xl font-bold text-[#1E2022] mt-0.5 font-serif-display">
                <NumberCounter value={menu.metadata.totalItems} />
              </div>
              <span className="text-[10px] text-[#555045]">6 sections verified</span>
            </div>

            <div className="p-3 bg-[#FFFDF9] rounded-lg border border-[#E3DCCF]">
              <span className="text-[10px] text-[#787265] uppercase font-mono block">
                Average Price
              </span>
              <div className="text-xl font-bold text-[#1E2022] mt-0.5 font-serif-display">
                <NumberCounter value={menu.metadata.averagePrice} prefix="₹" />
              </div>
              <span className="text-[10px] text-[#555045]">₹180 – ₹750 range</span>
            </div>

            <div className="p-3 bg-[#FFFDF9] rounded-lg border border-[#E3DCCF]">
              <span className="text-[10px] text-[#787265] uppercase font-mono block">
                Gross Margin
              </span>
              <div className="text-xl font-bold text-[#235839] mt-0.5 font-serif-display">
                <NumberCounter value={menu.metadata.averageMargin} suffix="%" decimals={1} />
              </div>
              <span className="text-[10px] text-[#2C6342]">Target: &gt;42%</span>
            </div>

            <div className="p-3 bg-[#FFFDF9] rounded-lg border border-[#E3DCCF]">
              <span className="text-[10px] text-[#787265] uppercase font-mono block">
                Identified Stars
              </span>
              <div className="text-xl font-bold text-[#1E2022] mt-0.5 font-serif-display">
                <NumberCounter value={menu.metadata.bestsellerCount} />
              </div>
              <span className="text-[10px] text-[#555045]">High-volume plates</span>
            </div>

            <div className="p-3 bg-[#EAF3ED] rounded-lg border border-[#CFE1D2] col-span-2 sm:col-span-2">
              <span className="text-[10px] text-[#235839] uppercase font-mono block font-semibold">
                Est. Net Revenue Expansion
              </span>
              <div className="text-xl font-bold text-[#1E5C38] mt-0.5 font-serif-display">
                +<NumberCounter value={menu.metadata.potentialRevenueLift} suffix="%" decimals={1} />
              </div>
              <span className="text-[10px] text-[#235839]">
                Via anchor decoy repricing & beverage combo pairing
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-[#6B655C]">
            <span>Operator: Trattoria Bella Italia</span>
            <button
              onClick={() => onNavigate('overview')}
              className="font-semibold text-[#874A2B] hover:underline inline-flex items-center gap-1"
            >
              <span>Inspect Raw Extractions</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. SCROLL-DRIVEN STORYTELLING TRANSFORMING PREVIEW */}
      <ScrollStorySection onGoToStudio={() => onNavigate('studio')} />

      {/* 4. BEFORE / AFTER SENSORY DESCRIPTION TRANSFORMATION */}
      <BeforeAfterDescription />

      {/* 5. PRICING SPECTRUM & ANCHORING VISUALIZATION */}
      <PriceSpectrum />

      {/* 6. MENU ORDERING BOARD (GOLDEN TRIANGLE EYE PATHS) */}
      <MenuOrderingBoard />

      {/* 7. PRIORITY INSIGHT ROWS */}
      <InsightRows onNavigate={onNavigate} />

      {/* 8. HORIZONTAL PIPELINE STORY SECTION */}
      <HorizontalStorySection onNavigate={onNavigate} />
    </div>
  );
};
