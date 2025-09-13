import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate, useParams } from 'react-router-dom';
import QuestCard from '@/components/QuestCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const QuestsPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { subject } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  // Mock quests data
  const allQuests = [
    {
      id: '1',
      title: 'Algebra Quest: Linear Equations',
      description: 'Master the fundamentals of linear equations through interactive challenges and real-world applications.',
      difficulty: 'Easy' as const,
      duration: '15 min',
      xpReward: 150,
      completed: true,
      locked: false,
      subject: 'math' as const,
    },
    {
      id: '2',
      title: 'Geometry Adventure: Shapes & Angles',
      description: 'Explore the world of geometry by discovering shapes, angles, and spatial relationships.',
      difficulty: 'Medium' as const,
      duration: '25 min',
      xpReward: 250,
      completed: false,
      locked: false,
      subject: 'math' as const,
    },
    {
      id: '3',
      title: 'Physics Circuit Game',
      description: 'Build and test electrical circuits while learning about current, voltage, and resistance.',
      difficulty: 'Medium' as const,
      duration: '30 min',
      xpReward: 300,
      completed: false,
      locked: false,
      subject: 'science' as const,
    },
    {
      id: '4',
      title: 'Chemistry Lab Simulator',
      description: 'Conduct virtual chemistry experiments and learn about chemical reactions safely.',
      difficulty: 'Hard' as const,
      duration: '45 min',
      xpReward: 450,
      completed: false,
      locked: true,
      subject: 'science' as const,
    },
    {
      id: '5',
      title: 'Programming Logic Puzzles',
      description: 'Solve coding challenges and learn programming fundamentals through gamified exercises.',
      difficulty: 'Easy' as const,
      duration: '20 min',
      xpReward: 200,
      completed: false,
      locked: false,
      subject: 'tech' as const,
    },
    {
      id: '6',
      title: 'Bridge Building Challenge',
      description: 'Design and test virtual bridges while learning engineering principles and physics.',
      difficulty: 'Hard' as const,
      duration: '40 min',
      xpReward: 400,
      completed: false,
      locked: false,
      subject: 'engineering' as const,
    },
  ];

  // Filter quests based on subject, search, and difficulty
  const filteredQuests = allQuests.filter(quest => {
    const matchesSubject = !subject || quest.subject === subject;
    const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || quest.difficulty === difficultyFilter;
    
    return matchesSubject && matchesSearch && matchesDifficulty;
  });

  const handleQuestClick = (questId: string) => {
    // In a real app, this would start the quest
    console.log('Starting quest:', questId);
  };

  const subjectTitles = {
    math: t('math'),
    science: t('science'),
    tech: t('technology'),
    engineering: t('engineering'),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => navigate('/student')}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
            
            <div>
              <h1 className="text-2xl font-bold">
                {subject ? subjectTitles[subject as keyof typeof subjectTitles] : t('questsTitle')}
              </h1>
              <p className="text-muted-foreground">
                {t('questsSubtitle')}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-32 bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{filteredQuests.length} quests available</span>
            <Badge variant="outline" className="text-accent border-accent/30">
              {filteredQuests.filter(q => q.completed).length} completed
            </Badge>
            <Badge variant="outline" className="text-primary border-primary/30">
              {filteredQuests.filter(q => !q.locked && !q.completed).length} available
            </Badge>
          </div>
        </motion.div>

        {/* Quests Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          {filteredQuests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <QuestCard
                {...quest}
                onClick={() => handleQuestClick(quest.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredQuests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No quests found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find more quests.
            </p>
          </motion.div>
        )}

        {/* Offline Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-muted/30 rounded-lg border border-border"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span>{t('offlineMessage')}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestsPage;