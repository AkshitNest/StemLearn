import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Microscope, Cpu, Cog, User, Trophy, Target, Flame, Coins, X, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStudent } from '@/contexts/StudentContext';
import SubjectCard from '@/components/SubjectCard';
import XPBar from '@/components/XPBar';
import LanguageSelector from '@/components/LanguageSelector';
import StudentProfile from '@/components/StudentProfile';
import ActivityFeed from '@/components/ActivityFeed';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FlaskConical, FileText, Brain, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const StudentDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { studentData, addCredits } = useStudent();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);


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
                  Hi {studentData.profile.firstName || studentData.name}! 👋
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
                  onClick={() => navigate('/student/learning')}
                  className="px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                >
                  Learning
                </button>
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

              <div className="flex items-center gap-2">
                {studentData.credits > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Coins className="h-3 w-3" />
                    {studentData.credits} {t('credits')}
                  </Badge>
                )}
                <button 
                  onClick={() => setShowProfile(true)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  title={t('profile')}
                >
                  <User className="h-5 w-5" />
                </button>
              </div>
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

        {/* Profile Completion Card */}
        {studentData.profile.profileCompletion < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                    Complete Your Profile
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {studentData.profile.profileCompletion}% complete - Earn {studentData.profile.credits} credits!
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setShowProfile(true)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Complete Profile
              </Button>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <motion.button
            onClick={() => navigate('/student/learning')}
            className="p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BookOpen className="h-8 w-8 text-primary mb-2 mx-auto group-hover:text-accent transition-colors" />
            <div className="text-sm font-medium">Learning</div>
            <div className="text-xs text-muted-foreground mt-1">Lessons & Labs</div>
          </motion.button>

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

          <motion.button
            onClick={() => setShowProfile(true)}
            className="p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <User className="h-8 w-8 text-primary mb-2 mx-auto group-hover:text-accent transition-colors" />
            <div className="text-sm font-medium">Profile</div>
            <div className="text-xs text-muted-foreground mt-1">Complete Profile</div>
          </motion.button>
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/student/learning')}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Learning Progress Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Learning Progress</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Lessons Completed</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Labs Completed</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Blogs Read</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Start learning to see progress!</p>
                </div>
              </CardContent>
            </Card>

            {/* XP and Level Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <CardTitle className="text-lg">XP & Level</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">{studentData.level}</div>
                    <p className="text-sm text-muted-foreground">Current Level</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current XP</span>
                      <span className="font-medium">{studentData.currentXP}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Required XP</span>
                      <span className="font-medium">{studentData.requiredXP}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(studentData.currentXP / studentData.requiredXP) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">Achievements</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">0</div>
                    <p className="text-sm text-muted-foreground">Achievements Unlocked</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-muted-foreground">First Steps</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-muted-foreground">Daily Learner</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-muted-foreground">Profile Starter</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Complete activities to unlock achievements!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ActivityFeed 
            activities={[
              {
                id: 'welcome',
                type: 'lesson',
                title: 'Welcome to StemLearn!',
                description: 'Start your learning journey by exploring our lessons and labs',
                timestamp: new Date().toISOString(),
                completed: false,
                icon: <BookOpen className="h-4 w-4" />
              }
            ]}
            className="mb-6"
          />
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

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">{t('profile')}</h2>
              <Button
                onClick={() => setShowProfile(false)}
                variant="ghost"
                size="sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6">
              <StudentProfile 
                onCreditsUpdate={(credits) => {
                  // Credits are already updated by the context
                }}
                onProfileUpdate={(profile) => {
                  // Profile is already updated by the context
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;