import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SubjectCardProps {
  title: string;
  icon: LucideIcon;
  progress: number;
  totalQuests: number;
  completedQuests: number;
  subject: 'math' | 'science' | 'tech' | 'engineering';
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  title,
  icon: Icon,
  progress,
  totalQuests,
  completedQuests,
  subject,
  onClick,
}) => {
  const subjectClasses = {
    math: 'subject-math',
    science: 'subject-science', 
    tech: 'subject-tech',
    engineering: 'subject-engineering',
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        className={`${subjectClasses[subject]} floating-card p-6 cursor-pointer group hover:border-opacity-60 transition-all duration-300`}
        onClick={onClick}
      >
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className="p-3 rounded-lg bg-background/20 backdrop-blur-sm"
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="h-8 w-8" />
          </motion.div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">
              {completedQuests}/{totalQuests}
            </div>
            <div className="text-xs text-muted-foreground">
              Quests Complete
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="h-2 bg-background/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          className="w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary font-medium transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue Learning
        </motion.button>
      </Card>
    </motion.div>
  );
};

export default SubjectCard;