// Achievements System
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'profile' | 'social' | 'special';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  requirements: AchievementRequirement[];
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface AchievementRequirement {
  type: 'lessons_completed' | 'labs_completed' | 'blogs_read' | 'xp_earned' | 'streak_days' | 'profile_completion' | 'level_reached' | 'days_active';
  value: number;
  description: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Learning Achievements
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎓',
    category: 'learning',
    rarity: 'common',
    xpReward: 50,
    requirements: [
      { type: 'lessons_completed', value: 1, description: 'Complete 1 lesson' }
    ]
  },
  {
    id: 'lesson_master',
    title: 'Lesson Master',
    description: 'Complete 10 lessons',
    icon: '📚',
    category: 'learning',
    rarity: 'uncommon',
    xpReward: 200,
    requirements: [
      { type: 'lessons_completed', value: 10, description: 'Complete 10 lessons' }
    ]
  },
  {
    id: 'knowledge_seeker',
    title: 'Knowledge Seeker',
    description: 'Complete 25 lessons',
    icon: '🔍',
    category: 'learning',
    rarity: 'rare',
    xpReward: 500,
    requirements: [
      { type: 'lessons_completed', value: 25, description: 'Complete 25 lessons' }
    ]
  },
  {
    id: 'scholar',
    title: 'Scholar',
    description: 'Complete 50 lessons',
    icon: '🎓',
    category: 'learning',
    rarity: 'epic',
    xpReward: 1000,
    requirements: [
      { type: 'lessons_completed', value: 50, description: 'Complete 50 lessons' }
    ]
  },
  {
    id: 'first_lab',
    title: 'Scientist in Training',
    description: 'Complete your first lab',
    icon: '🧪',
    category: 'learning',
    rarity: 'common',
    xpReward: 75,
    requirements: [
      { type: 'labs_completed', value: 1, description: 'Complete 1 lab' }
    ]
  },
  {
    id: 'lab_expert',
    title: 'Lab Expert',
    description: 'Complete 5 labs',
    icon: '🔬',
    category: 'learning',
    rarity: 'uncommon',
    xpReward: 300,
    requirements: [
      { type: 'labs_completed', value: 5, description: 'Complete 5 labs' }
    ]
  },
  {
    id: 'research_scientist',
    title: 'Research Scientist',
    description: 'Complete 15 labs',
    icon: '⚗️',
    category: 'learning',
    rarity: 'rare',
    xpReward: 750,
    requirements: [
      { type: 'labs_completed', value: 15, description: 'Complete 15 labs' }
    ]
  },
  {
    id: 'first_blog',
    title: 'Curious Reader',
    description: 'Read your first blog post',
    icon: '📖',
    category: 'learning',
    rarity: 'common',
    xpReward: 25,
    requirements: [
      { type: 'blogs_read', value: 1, description: 'Read 1 blog post' }
    ]
  },
  {
    id: 'blog_enthusiast',
    title: 'Blog Enthusiast',
    description: 'Read 10 blog posts',
    icon: '📰',
    category: 'learning',
    rarity: 'uncommon',
    xpReward: 150,
    requirements: [
      { type: 'blogs_read', value: 10, description: 'Read 10 blog posts' }
    ]
  },
  {
    id: 'knowledge_hunter',
    title: 'Knowledge Hunter',
    description: 'Read 25 blog posts',
    icon: '🔍',
    category: 'learning',
    rarity: 'rare',
    xpReward: 400,
    requirements: [
      { type: 'blogs_read', value: 25, description: 'Read 25 blog posts' }
    ]
  },

  // XP Achievements
  {
    id: 'xp_collector',
    title: 'XP Collector',
    description: 'Earn 500 XP',
    icon: '⚡',
    category: 'learning',
    rarity: 'common',
    xpReward: 100,
    requirements: [
      { type: 'xp_earned', value: 500, description: 'Earn 500 XP' }
    ]
  },
  {
    id: 'xp_master',
    title: 'XP Master',
    description: 'Earn 2000 XP',
    icon: '💎',
    category: 'learning',
    rarity: 'uncommon',
    xpReward: 300,
    requirements: [
      { type: 'xp_earned', value: 2000, description: 'Earn 2000 XP' }
    ]
  },
  {
    id: 'xp_legend',
    title: 'XP Legend',
    description: 'Earn 10000 XP',
    icon: '👑',
    category: 'learning',
    rarity: 'epic',
    xpReward: 1000,
    requirements: [
      { type: 'xp_earned', value: 10000, description: 'Earn 10000 XP' }
    ]
  },

  // Streak Achievements
  {
    id: 'daily_learner',
    title: 'Daily Learner',
    description: 'Maintain a 3-day learning streak',
    icon: '🔥',
    category: 'streak',
    rarity: 'common',
    xpReward: 100,
    requirements: [
      { type: 'streak_days', value: 3, description: 'Maintain a 3-day streak' }
    ]
  },
  {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '⚔️',
    category: 'streak',
    rarity: 'uncommon',
    xpReward: 250,
    requirements: [
      { type: 'streak_days', value: 7, description: 'Maintain a 7-day streak' }
    ]
  },
  {
    id: 'month_master',
    title: 'Month Master',
    description: 'Maintain a 30-day learning streak',
    icon: '🏆',
    category: 'streak',
    rarity: 'rare',
    xpReward: 750,
    requirements: [
      { type: 'streak_days', value: 30, description: 'Maintain a 30-day streak' }
    ]
  },
  {
    id: 'streak_legend',
    title: 'Streak Legend',
    description: 'Maintain a 100-day learning streak',
    icon: '👑',
    category: 'streak',
    rarity: 'legendary',
    xpReward: 2000,
    requirements: [
      { type: 'streak_days', value: 100, description: 'Maintain a 100-day streak' }
    ]
  },

  // Profile Achievements
  {
    id: 'profile_starter',
    title: 'Profile Starter',
    description: 'Complete 25% of your profile',
    icon: '👤',
    category: 'profile',
    rarity: 'common',
    xpReward: 50,
    requirements: [
      { type: 'profile_completion', value: 25, description: 'Complete 25% of profile' }
    ]
  },
  {
    id: 'profile_builder',
    title: 'Profile Builder',
    description: 'Complete 50% of your profile',
    icon: '🏗️',
    category: 'profile',
    rarity: 'uncommon',
    xpReward: 150,
    requirements: [
      { type: 'profile_completion', value: 50, description: 'Complete 50% of profile' }
    ]
  },
  {
    id: 'profile_perfect',
    title: 'Profile Perfect',
    description: 'Complete 100% of your profile',
    icon: '✨',
    category: 'profile',
    rarity: 'rare',
    xpReward: 500,
    requirements: [
      { type: 'profile_completion', value: 100, description: 'Complete 100% of profile' }
    ]
  },

  // Level Achievements
  {
    id: 'level_5',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    category: 'learning',
    rarity: 'common',
    xpReward: 200,
    requirements: [
      { type: 'level_reached', value: 5, description: 'Reach level 5' }
    ]
  },
  {
    id: 'level_10',
    title: 'Expert Learner',
    description: 'Reach level 10',
    icon: '🌟',
    category: 'learning',
    rarity: 'uncommon',
    xpReward: 500,
    requirements: [
      { type: 'level_reached', value: 10, description: 'Reach level 10' }
    ]
  },
  {
    id: 'level_20',
    title: 'Learning Champion',
    description: 'Reach level 20',
    icon: '🏆',
    category: 'learning',
    rarity: 'rare',
    xpReward: 1000,
    requirements: [
      { type: 'level_reached', value: 20, description: 'Reach level 20' }
    ]
  },
  {
    id: 'level_50',
    title: 'Learning Legend',
    description: 'Reach level 50',
    icon: '👑',
    category: 'learning',
    rarity: 'legendary',
    xpReward: 2500,
    requirements: [
      { type: 'level_reached', value: 50, description: 'Reach level 50' }
    ]
  },

  // Special Achievements
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Complete a lesson before 8 AM',
    icon: '🐦',
    category: 'special',
    rarity: 'uncommon',
    xpReward: 100,
    requirements: [
      { type: 'lessons_completed', value: 1, description: 'Complete a lesson before 8 AM' }
    ]
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Complete a lesson after 10 PM',
    icon: '🦉',
    category: 'special',
    rarity: 'uncommon',
    xpReward: 100,
    requirements: [
      { type: 'lessons_completed', value: 1, description: 'Complete a lesson after 10 PM' }
    ]
  },
  {
    id: 'weekend_warrior',
    title: 'Weekend Warrior',
    description: 'Complete 5 activities on a weekend',
    icon: '⚔️',
    category: 'special',
    rarity: 'rare',
    xpReward: 300,
    requirements: [
      { type: 'lessons_completed', value: 5, description: 'Complete 5 activities on weekend' }
    ]
  },
  {
    id: 'speed_learner',
    title: 'Speed Learner',
    description: 'Complete 3 lessons in one day',
    icon: '⚡',
    category: 'special',
    rarity: 'rare',
    xpReward: 400,
    requirements: [
      { type: 'lessons_completed', value: 3, description: 'Complete 3 lessons in one day' }
    ]
  },
  {
    id: 'dedicated_learner',
    title: 'Dedicated Learner',
    description: 'Be active for 7 consecutive days',
    icon: '💪',
    category: 'special',
    rarity: 'epic',
    xpReward: 750,
    requirements: [
      { type: 'days_active', value: 7, description: 'Be active for 7 consecutive days' }
    ]
  }
];

// Helper functions
export const getAchievementsByCategory = (category: string): Achievement[] => {
  return ACHIEVEMENTS.filter(achievement => achievement.category === category);
};

export const getAchievementsByRarity = (rarity: string): Achievement[] => {
  return ACHIEVEMENTS.filter(achievement => achievement.rarity === rarity);
};

export const getUnlockedAchievements = (userStats: any): Achievement[] => {
  return ACHIEVEMENTS.filter(achievement => {
    return achievement.requirements.every(requirement => {
      switch (requirement.type) {
        case 'lessons_completed':
          return userStats.lessonsCompleted >= requirement.value;
        case 'labs_completed':
          return userStats.labsCompleted >= requirement.value;
        case 'blogs_read':
          return userStats.blogsRead >= requirement.value;
        case 'xp_earned':
          return userStats.totalXP >= requirement.value;
        case 'streak_days':
          return userStats.currentStreak >= requirement.value;
        case 'profile_completion':
          return userStats.profileCompletion >= requirement.value;
        case 'level_reached':
          return userStats.level >= requirement.value;
        case 'days_active':
          return userStats.daysActive >= requirement.value;
        default:
          return false;
      }
    });
  });
};

export const getAchievementProgress = (achievement: Achievement, userStats: any): number => {
  if (achievement.requirements.length === 0) return 0;
  
  const requirement = achievement.requirements[0];
  let currentValue = 0;
  
  switch (requirement.type) {
    case 'lessons_completed':
      currentValue = userStats.lessonsCompleted || 0;
      break;
    case 'labs_completed':
      currentValue = userStats.labsCompleted || 0;
      break;
    case 'blogs_read':
      currentValue = userStats.blogsRead || 0;
      break;
    case 'xp_earned':
      currentValue = userStats.totalXP || 0;
      break;
    case 'streak_days':
      currentValue = userStats.currentStreak || 0;
      break;
    case 'profile_completion':
      currentValue = userStats.profileCompletion || 0;
      break;
    case 'level_reached':
      currentValue = userStats.level || 0;
      break;
    case 'days_active':
      currentValue = userStats.daysActive || 0;
      break;
    default:
      currentValue = 0;
  }
  
  return Math.min((currentValue / requirement.value) * 100, 100);
};

export const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'common': return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
    case 'uncommon': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
    case 'rare': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
    case 'epic': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400';
    case 'legendary': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
    default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
  }
};







