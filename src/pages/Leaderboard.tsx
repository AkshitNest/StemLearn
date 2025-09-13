import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Medal, Award, Crown, Flame, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Leaderboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Empty leaderboard - fresh start
  const weeklyLeaders: Array<{rank: number, name: string, xp: number, level: number, streak: number, avatar: string}> = [];

  const monthlyLeaders: Array<{rank: number, name: string, xp: number, level: number, streak: number, avatar: string}> = [];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-400" />;
      default:
        return <span className="text-muted-foreground font-bold">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 glow-accent";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";
      case 3:
        return "bg-gradient-to-r from-orange-400/20 to-red-500/20 border-orange-400/30";
      default:
        return "bg-card border-border hover:bg-muted/50";
    }
  };

  const LeaderboardList = ({ leaders }: { leaders: typeof weeklyLeaders }) => (
    <div className="space-y-3">
      {leaders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-lg font-semibold mb-2">No rankings yet!</h3>
          <p className="text-muted-foreground">
            Start learning and competing to see the leaderboard
          </p>
        </div>
      ) : (
        leaders.map((player, index) => (
          <motion.div
            key={player.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`p-4 transition-all duration-300 ${getRankStyle(player.rank)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <motion.div 
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-background/20"
                    whileHover={{ scale: 1.1 }}
                  >
                    {getRankIcon(player.rank)}
                  </motion.div>

                  {/* Player Info */}
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{player.avatar}</div>
                    <div>
                      <div className="font-bold text-foreground">{player.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Level {player.level}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-right">
                  <div className="flex items-center gap-1 text-fire">
                    <Flame className="h-4 w-4" />
                    <span className="font-bold">{player.streak}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="h-4 w-4" />
                    <span className="font-bold">{player.xp.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => navigate('/student')}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
            
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-gold" />
              <div>
                <h1 className="text-2xl font-bold">{t('leaderboard')}</h1>
                <p className="text-muted-foreground">See how you rank against other learners</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Leaderboard Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-card border border-border">
              <TabsTrigger value="weekly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                This Week
              </TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                This Month
              </TabsTrigger>
            </TabsList>

            <TabsContent value="weekly" className="mt-6">
              <LeaderboardList leaders={weeklyLeaders} />
            </TabsContent>

            <TabsContent value="monthly" className="mt-6">
              <LeaderboardList leaders={monthlyLeaders} />
              
              {/* Coming Soon */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center py-8 border-t border-border"
              >
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-lg font-semibold mb-2">More Rankings Coming Soon!</h3>
                <p className="text-muted-foreground">
                  All-time leaderboards, subject-specific rankings, and more exciting features.
                </p>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Your Rank - Fresh user */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="p-4 bg-muted/30 border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                  <span className="font-bold text-muted-foreground">--</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">👤</div>
                  <div>
                    <div className="font-bold">You (New Learner)</div>
                    <div className="text-sm text-muted-foreground">Level 1</div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-muted-foreground font-bold">0 XP</div>
                <div className="text-xs text-muted-foreground">Start learning!</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;