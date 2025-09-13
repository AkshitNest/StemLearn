import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface XPBarProps {
  currentXP: number;
  requiredXP: number;
  level: number;
  className?: string;
}

const XPBar: React.FC<XPBarProps> = ({ currentXP, requiredXP, level, className = '' }) => {
  const { t } = useLanguage();
  const progressPercentage = (currentXP / requiredXP) * 100;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Level Badge */}
      <motion.div 
        className="level-badge px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Star className="h-4 w-4" />
        {t('level')} {level}
      </motion.div>

      {/* XP Progress Bar */}
      <div className="flex-1 max-w-xs">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>{currentXP} {t('xp')}</span>
          <span>{requiredXP} {t('xp')}</span>
        </div>
        
        <div className="h-2 bg-muted rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-xp to-accent xp-glow rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* XP Icon */}
      <motion.div 
        className="text-xp"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap className="h-5 w-5" />
      </motion.div>
    </div>
  );
};

export default XPBar;