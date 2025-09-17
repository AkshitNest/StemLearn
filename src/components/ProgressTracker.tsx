import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  BookOpen, 
  FlaskConical, 
  FileText, 
  Zap, 
  TrendingUp,
  Award,
  Star,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ProgressData {
  totalXP: number;
  level: number;
  completedLessons: number;
  completedLabs: number;
  completedBlogs: number;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
  weeklyGoal: number;
  weeklyProgress: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  xpReward: number;
}

interface ProgressTrackerProps {
  progressData: ProgressData;
  className?: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progressData, className = '' }) => {
  const {
    totalXP,
    level,
    completedLessons,
    completedLabs,
    completedBlogs,
    currentStreak,
    longestStreak,
    achievements,
    weeklyGoal,
    weeklyProgress
  } = progressData;

  const weeklyProgressPercentage = (weeklyProgress / weeklyGoal) * 100;

  const getLevelColor = (level: number) => {
    if (level >= 20) return 'text-purple-600';
    if (level >= 15) return 'text-blue-600';
    if (level >= 10) return 'text-green-600';
    if (level >= 5) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-red-600';
    if (streak >= 14) return 'text-orange-600';
    if (streak >= 7) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total XP</p>
                <p className="text-2xl font-bold text-primary">{totalXP}</p>
              </div>
              <Zap className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className={`text-2xl font-bold ${getLevelColor(level)}`}>{level}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className={`text-2xl font-bold ${getStreakColor(currentStreak)}`}>{currentStreak} days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold text-purple-600">{achievements.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Learning Progress
          </CardTitle>
          <CardDescription>Track your learning activities and achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lessons</p>
                <p className="text-xl font-bold">{completedLessons}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <FlaskConical className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Labs</p>
                <p className="text-xl font-bold">{completedLabs}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blogs</p>
                <p className="text-xl font-bold">{completedBlogs}</p>
              </div>
            </div>
          </div>

          {/* Weekly Goal Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Weekly Goal</span>
              <span className="text-sm text-muted-foreground">{weeklyProgress} / {weeklyGoal} XP</span>
            </div>
            <Progress value={weeklyProgressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {weeklyGoal - weeklyProgress} XP needed to reach your weekly goal
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
          <CardDescription>Celebrate your learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          {achievements.length > 0 ? (
            <div className="space-y-3">
              {achievements.slice(0, 5).map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                >
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">
                      +{achievement.xpReward} XP
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Complete learning activities to unlock achievements!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Streak Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Learning Streak
          </CardTitle>
          <CardDescription>Keep your learning momentum going</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getStreakColor(currentStreak)} mb-2`}>
                {currentStreak}
              </div>
              <p className="text-sm text-muted-foreground">Current Streak (days)</p>
              {currentStreak > 0 && (
                <p className="text-xs text-green-600 mt-1">Keep it up! 🔥</p>
              )}
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {longestStreak}
              </div>
              <p className="text-sm text-muted-foreground">Longest Streak (days)</p>
              {longestStreak >= 30 && (
                <p className="text-xs text-purple-600 mt-1">Amazing dedication! 🏆</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;







