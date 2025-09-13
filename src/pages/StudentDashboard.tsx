import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Microscope, Cpu, Cog, User, Trophy, Target, Flame } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SubjectCard from '@/components/SubjectCard';
import XPBar from '@/components/XPBar';
import LanguageSelector from '@/components/LanguageSelector';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Fresh student data - no previous progress
  const studentData = {
    name: "New Learner",
    level: 1,
    currentXP: 0,
    requiredXP: 100,
    streak: 0,
    totalBadges: 0,
  };

  const subjects = [
    {
      title: t('math'),
      icon: Calculator,
      progress: 0,
      totalQuests: 12,
      completedQuests: 0,
      subject: 'math' as const,
    },
    {
      title: t('science'),
      icon: Microscope,
      progress: 0,
      totalQuests: 10,
      completedQuests: 0,
      subject: 'science' as const,
    },
    {
      title: t('technology'),
      icon: Cpu,
      progress: 0,
      totalQuests: 8,
      completedQuests: 0,
      subject: 'tech' as const,
    },
    {
      title: t('engineering'),
      icon: Cog,
      progress: 0,
      totalQuests: 15,
      completedQuests: 0,
      subject: 'engineering' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Welcome */}
            <div className="flex items-center gap-4">
              <motion.div
                className="text-2xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎮
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Welcome, {studentData.name}! 👋
                </h1>
                <p className="text-sm text-muted-foreground">
                  Ready to start your STEM journey?
                </p>
              </div>
            </div>

            {/* Navigation and Controls */}
            <div className="flex items-center gap-4">
              <LanguageSelector />
              
              <nav className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => navigate('/student/quests')}
                  className="px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                >
                  {t('quests')}
                </button>
                <button 
                  onClick={() => navigate('/student/leaderboard')}
                  className="px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                >
                  {t('leaderboard')}
                </button>
              </nav>

              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* XP Progress */}
          <div className="md:col-span-2">
            <XPBar 
              currentXP={studentData.currentXP}
              requiredXP={studentData.requiredXP}
              level={studentData.level}
            />
          </div>

          {/* Streak and Badges */}
          <div className="flex items-center justify-center md:justify-end gap-6">
            <motion.div 
              className="flex items-center gap-2 text-fire"
              whileHover={{ scale: 1.05 }}
            >
              <Flame className="h-5 w-5" />
              <div className="text-center">
                <div className="text-lg font-bold">{studentData.streak}</div>
                <div className="text-xs text-muted-foreground">{t('streak')}</div>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-2 text-gold"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="h-5 w-5" />
              <div className="text-center">
                <div className="text-lg font-bold">{studentData.totalBadges}</div>
                <div className="text-xs text-muted-foreground">{t('badges')}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <motion.button
            onClick={() => navigate('/student/quests')}
            className="p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Target className="h-8 w-8 text-primary mb-2 mx-auto group-hover:text-accent transition-colors" />
            <div className="text-sm font-medium">{t('quests')}</div>
          </motion.button>

          <motion.button
            onClick={() => navigate('/student/leaderboard')}
            className="p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trophy className="h-8 w-8 text-gold mb-2 mx-auto group-hover:text-accent transition-colors" />
            <div className="text-sm font-medium">{t('leaderboard')}</div>
          </motion.button>

          <motion.div
            className="p-4 bg-card border border-border rounded-lg opacity-60"
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-8 w-8 text-muted-foreground mb-2 mx-auto">🏆</div>
            <div className="text-sm font-medium text-muted-foreground">Achievements</div>
            <div className="text-xs text-muted-foreground mt-1">Coming Soon</div>
          </motion.div>

          <motion.div
            className="p-4 bg-card border border-border rounded-lg opacity-60"
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-8 w-8 text-muted-foreground mb-2 mx-auto">📊</div>
            <div className="text-sm font-medium text-muted-foreground">Progress</div>
            <div className="text-xs text-muted-foreground mt-1">Coming Soon</div>
          </motion.div>
        </motion.div>

        {/* Subjects Grid */}
        <div>
          <motion.h2 
            className="text-2xl font-bold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Choose Your Subject
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <SubjectCard
                  {...subject}
                  onClick={() => navigate(`/student/subjects/${subject.subject}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-2">🎯</div>
            <p>Start your learning journey!</p>
            <p className="text-sm mt-2">Complete quests to see your activity here</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;