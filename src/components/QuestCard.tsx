import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Clock, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuestCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  xpReward: number;
  completed: boolean;
  locked: boolean;
  image?: string;
  subject: 'math' | 'science' | 'tech' | 'engineering';
  onClick: () => void;
}

const QuestCard: React.FC<QuestCardProps> = ({
  title,
  description,
  difficulty,
  duration,
  xpReward,
  completed,
  locked,
  image,
  subject,
  onClick,
}) => {
  const { t } = useLanguage();

  const difficultyColors = {
    Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const subjectGradients = {
    math: 'from-blue-500/10 to-blue-600/20',
    science: 'from-green-500/10 to-green-600/20',
    tech: 'from-purple-500/10 to-purple-600/20',
    engineering: 'from-orange-500/10 to-orange-600/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: locked ? 1 : 1.02,
        y: locked ? 0 : -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: locked ? 1 : 0.98 }}
    >
      <Card 
        className={`quest-card-hover floating-card overflow-hidden cursor-pointer group relative ${
          locked ? 'opacity-60 cursor-not-allowed' : ''
        } ${completed ? 'ring-2 ring-accent/50' : ''}`}
        onClick={locked ? undefined : onClick}
      >
        {/* Quest Image/Background */}
        <div className={`h-40 bg-gradient-to-br ${subjectGradients[subject]} relative overflow-hidden`}>
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                className="text-6xl opacity-20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🎮
              </motion.div>
            </div>
          )}
          
          {/* Completion Status */}
          {completed && (
            <motion.div 
              className="absolute top-2 right-2 bg-accent text-accent-foreground rounded-full p-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Trophy className="h-4 w-4" />
            </motion.div>
          )}

          {/* Lock Overlay */}
          {locked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-3xl mb-2">🔒</div>
                <div className="text-sm">Complete previous quests</div>
              </div>
            </div>
          )}
        </div>

        {/* Quest Content */}
        <div className="p-4">
          {/* Title and Difficulty */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            <Badge className={`ml-2 ${difficultyColors[difficulty]} flex-shrink-0`}>
              {difficulty}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Quest Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            
            <div className="flex items-center gap-1 text-accent">
              <Star className="h-4 w-4" />
              <span>+{xpReward} {t('xp')}</span>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              completed
                ? 'bg-accent/10 text-accent border border-accent/20'
                : locked
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground'
            }`}
            whileHover={locked ? {} : { scale: 1.02 }}
            whileTap={locked ? {} : { scale: 0.98 }}
            disabled={locked}
          >
            {completed ? (
              <>
                <Trophy className="h-4 w-4" />
                Completed
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                {t('startQuest')}
              </>
            )}
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
};

export default QuestCard;