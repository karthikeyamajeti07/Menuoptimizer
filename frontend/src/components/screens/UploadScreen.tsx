import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ScreenId } from '../../types';
import { MotionButton } from '../common/MotionButton';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';

interface UploadScreenProps {
  onStartProcessing: (fileName: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({
  onStartProcessing,
  onNavigate,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  const handleUseSample = () => {
    setSelectedFile('Bella_Italia_Dinner_Menu_Fall.pdf');
  };

  const handleConfirmUpload = () => {
    const name = selectedFile || 'Bella_Italia_Dinner_Menu_Fall.pdf';
    onStartProcessing(name);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header Info */}
      <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 mb-1 text-[10px] font-mono uppercase tracking-wider text-[#8A7862] font-semibold">
          <span>Stage 01 • Menu Intake & Digestion</span>
        </div>
        <h1 className="font-serif-display text-2xl sm:text-3xl text-[#1E1F22] font-bold tracking-tight">
          Upload Restaurant Menu
        </h1>
        <p className="text-xs sm:text-sm text-[#615B50] mt-1.5 max-w-2xl leading-relaxed">
          Upload your restaurant's physical print menu, PDF layout, or high-resolution capture.
          The neural extractor will catalog categories, dishes, cost baselines, and current pricing.
        </p>
      </div>

      {/* Main Drag & Drop Zone */}
      <motion.div
        whileHover={{ y: -2 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-[#FAF8F5] border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-[#874A2B] bg-[#F7F2EB]'
            : selectedFile
            ? 'border-[#205A37] bg-[#F2F7F3]'
            : 'border-[#D9D2C4] hover:border-[#B5ACA0] hover:bg-[#F6F3EC]'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-full bg-[#EFEAE0] border border-[#DDD5C5] mx-auto flex items-center justify-center text-[#734226]">
            {selectedFile ? (
              <FileCheck className="w-7 h-7 text-[#205A37]" />
            ) : (
              <UploadCloud className="w-7 h-7 text-[#874A2B]" />
            )}
          </div>

          <div>
            {selectedFile ? (
              <>
                <h3 className="text-sm font-bold text-[#1E2022] flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#205A37]" />
                  {selectedFile}
                </h3>
                <p className="text-xs text-[#524E45] mt-1">
                  Ready for structured parsing and menu engineering.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-sm font-semibold text-[#1E2022]">
                  Drag and drop your menu file here, or browse
                </h3>
                <p className="text-xs text-[#6E685C] mt-1">
                  Supports multi-page PDF documents, JPG, and PNG images (max 25MB)
                </p>
              </>
            )}
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-[#2E2C29] bg-[#EFEAE0] hover:bg-[#E4DDD0] border border-[#D5CDBC] rounded-md cursor-pointer transition-colors"
            >
              Select File from Computer
            </button>
          </div>
        </div>
      </motion.div>

      {/* Preset 1-Click Sample Card */}
      <div className="p-5 rounded-xl bg-[#F4F0E6] border border-[#E0D8C8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-md bg-[#EAE2D2] text-[#874A2B] shrink-0 mt-0.5">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1E2022]">
                Demo Preset: "Bella Italia" Trattoria Dinner Menu
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#E4DDCF] text-[#696254] font-semibold">
                Pre-configured
              </span>
            </div>
            <p className="text-xs text-[#635E54] mt-0.5">
              Includes 7 dishes (Margherita Pizza, Carbonara, Salmon, Alfredo, Tiramisu, etc.) with real food costs & margins.
            </p>
          </div>
        </div>

        <MotionButton
          size="sm"
          variant="secondary"
          onClick={handleUseSample}
        >
          Load Preset Menu
        </MotionButton>
      </div>

      {/* Proceed Button */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="text-xs text-[#6E685C] hover:text-[#1E2022] cursor-pointer"
        >
          ← Return to Dashboard
        </button>

        <MotionButton
          size="lg"
          variant="primary"
          onClick={handleConfirmUpload}
          disabled={!selectedFile}
        >
          <span>Run Neural Extraction & Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </MotionButton>
      </div>

      {/* Extraction Specifications */}
      <div className="p-5 bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl text-xs text-[#6E685C] space-y-2 shadow-xs">
        <span className="font-semibold text-[#2C2924] flex items-center gap-1.5 text-xs">
          <Info className="w-3.5 h-3.5 text-[#874A2B]" /> What happens after intake?
        </span>
        <ul className="list-disc pl-5 space-y-1 text-[#5E594F]">
          <li>Layout parser detects dishes, prices in ₹ (INR), and menu sections.</li>
          <li>Generates 3 culinary copy variants for each dish (Concise, Storytelling, Ingredient-focused).</li>
          <li>Evaluates price distribution, price anchors, and high-margin bundling opportunities.</li>
          <li>Categorizes all offerings into the BCG Menu Engineering Matrix (Stars, Puzzles, Plowhorses, Dogs).</li>
        </ul>
      </div>
    </div>
  );
};
