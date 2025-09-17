import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FlaskConical, 
  FileText, 
  Zap, 
  Trophy, 
  Clock,
  CheckCircle,
  PlayCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: string;
  type: 'lesson' | 'lab' | 'blog' | 'achievement' | 'xp';
  title: string;
  description: string;
  timestamp: string;
  xpEarned?: number;
  completed?: boolean;
  icon: React.ReactNode;
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, className = '' }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'lab':
        return <FlaskConical className="h-4 w-4 text-purple-600" />;
      case 'blog':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'achievement':
        return <Trophy className="h-4 w-4 text-yellow-600" />;
      case 'xp':
        return <Zap className="h-4 w-4 text-orange-600" />;
      default:
        return <PlayCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'lesson':
        return 'border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20';
      case 'lab':
        return 'border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/20';
      case 'blog':
        return 'border-l-green-500 bg-green-50/50 dark:bg-green-950/20';
      case 'achievement':
        return 'border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20';
      case 'xp':
        return 'border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20';
      default:
        return 'border-l-gray-500 bg-gray-50/50 dark:bg-gray-950/20';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  if (activities.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your learning activities will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <PlayCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
            <p className="text-sm">Start learning to see your progress!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest learning activities</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border-l-4 p-4 ${getActivityColor(activity.type)} ${
                index < activities.length - 1 ? 'border-b border-border/50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {activity.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    getActivityIcon(activity.type)
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      {activity.xpEarned && (
                        <Badge variant="secondary" className="text-xs">
                          +{activity.xpEarned} XP
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.description}
                  </p>
                  
                  {activity.completed && (
                    <div className="flex items-center gap-1 mt-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        Completed
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;







