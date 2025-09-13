import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Trophy, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LanguageSelector from '@/components/LanguageSelector';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Quests",
      description: "Gamified STEM learning with engaging mini-games and challenges"
    },
    {
      icon: Trophy,
      title: "XP & Badges",
      description: "Earn experience points, unlock achievements, and climb leaderboards"
    },
    {
      icon: Users,
      title: "Multi-language",
      description: "Learn in English, Hindi and All Regional languages for better accessibility"
    },
    {
      icon: Zap,
      title: "Offline Ready",
      description: "Continue learning even without internet connection"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/5 rounded-full"
            style={{
              width: Math.random() * 150 + 30,
              height: Math.random() * 150 + 30,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-3xl">🎮</div>
            <div>
              <h1 className="text-xl font-bold">STEM Quest</h1>
              <p className="text-xs text-muted-foreground">Gamified Learning Platform</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <LanguageSelector />
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Learn STEM
              </span>
              <br />
              <span className="text-foreground">Through Play</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A gamified digital learning platform designed for rural school students (grades 6–12) 
              to master Mathematics, Science, Technology, and Engineering through interactive quests.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg"
              onClick={() => navigate('/student/login')}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold px-8 py-4 text-lg glow-primary group"
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate('/teacher/login')}
              className="border-border hover:bg-muted/50 px-8 py-4 text-lg"
            >
              Teacher Portal
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="floating-card p-6 text-center group hover:border-primary/20 transition-all duration-300">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotate: 5 }}
                >
                  <feature.icon className="h-8 w-8 text-primary" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <motion.div 
              className="text-4xl font-bold text-primary mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
            >
              50+
            </motion.div>
            <p className="text-muted-foreground">Interactive Quests</p>
          </div>
          
          <div>
            <motion.div 
              className="text-4xl font-bold text-accent mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
            >
              4
            </motion.div>
            <p className="text-muted-foreground">STEM Subjects</p>
          </div>
          
          <div>
            <motion.div 
              className="text-4xl font-bold text-secondary mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
            >
              ALL REGIONAL LANGUAGES
            </motion.div>
            <p className="text-muted-foreground">Languages Supported</p>
          </div>
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <Card className="floating-card p-8 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience STEM Quest?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of students already learning through our gamified platform. 
              Start your journey today and unlock the power of interactive STEM education.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/student/login')}
                className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground font-semibold glow-accent"
              >
                Try Demo as Student
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/teacher/login')}
                className="border-border hover:bg-muted/50"
              >
                Demo Teacher Dashboard
              </Button>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
