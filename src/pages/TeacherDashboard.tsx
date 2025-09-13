import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, BarChart3, Download, FileText, TrendingUp, Clock, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LanguageSelector from '@/components/LanguageSelector';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Mock teacher data
  const teacherData = {
    name: "Ms. Sarah Johnson",
    totalStudents: 45,
    activeQuests: 12,
    completionRate: 78,
    avgProgressTime: "25 min",
  };

  const classStats = [
    { subject: 'Math', students: 45, avgProgress: 72, color: 'text-math' },
    { subject: 'Science', students: 42, avgProgress: 68, color: 'text-science' },
    { subject: 'Technology', students: 38, avgProgress: 55, color: 'text-tech' },
    { subject: 'Engineering', students: 35, avgProgress: 43, color: 'text-engineering' },
  ];

  const recentActivity = [
    { student: "Rahul Kumar", action: "Completed Algebra Quest", time: "5 min ago", xp: 150 },
    { student: "Priya Sharma", action: "Started Physics Circuit Game", time: "12 min ago", xp: 0 },
    { student: "Arjun Singh", action: "Earned Math Master Badge", time: "1 hour ago", xp: 100 },
    { student: "Neha Gupta", action: "Completed Chemistry Lab", time: "2 hours ago", xp: 300 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="text-2xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏫
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Welcome, {teacherData.name}! 👩‍🏫
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t('teacherDashboard')} - Class 6-12 STEM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSelector />
              
              <nav className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => navigate('/teacher/analytics')}
                  className="px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                >
                  {t('analytics')}
                </button>
                <button 
                  onClick={() => navigate('/teacher/assignments')}
                  className="px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                >
                  {t('assignments')}
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-primary">{teacherData.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-primary/60" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Quests</p>
                <p className="text-3xl font-bold text-accent">{teacherData.activeQuests}</p>
              </div>
              <BookOpen className="h-8 w-8 text-accent/60" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-3xl font-bold text-secondary">{teacherData.completionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-secondary/60" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-gold/10 to-gold/5 border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Time</p>
                <p className="text-3xl font-bold text-orange-500">{teacherData.avgProgressTime}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500/60" />
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="p-6 cursor-pointer hover:bg-muted/50 transition-colors border-border hover:border-primary/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('classProgress')}</h3>
                  <p className="text-sm text-muted-foreground">View detailed analytics</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Analytics
              </Button>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="p-6 cursor-pointer hover:bg-muted/50 transition-colors border-border hover:border-accent/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('assignments')}</h3>
                  <p className="text-sm text-muted-foreground">Create and manage quests</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Manage Assignments
              </Button>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="p-6 cursor-pointer hover:bg-muted/50 transition-colors border-border hover:border-secondary/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Download className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('exportReports')}</h3>
                  <p className="text-sm text-muted-foreground">Download CSV/PDF reports</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">CSV</Button>
                <Button variant="outline" size="sm" className="flex-1">PDF</Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Class Progress Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Subject Progress Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {classStats.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`font-semibold ${subject.color}`}>{subject.subject}</h3>
                    <Badge variant="outline">{subject.students} students</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{subject.avgProgress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          subject.subject === 'Math' ? 'bg-math' :
                          subject.subject === 'Science' ? 'bg-science' :
                          subject.subject === 'Technology' ? 'bg-tech' : 'bg-engineering'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.avgProgress}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Student Activity
            </h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                    <div>
                      <div className="font-medium">{activity.student}</div>
                      <div className="text-sm text-primary">{activity.action}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                    {activity.xp > 0 && (
                      <div className="text-accent font-medium text-sm">+{activity.xp} XP</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;