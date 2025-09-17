import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  FlaskConical, 
  FileText, 
  Play, 
  Clock, 
  Star, 
  Users, 
  Award,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStudent } from '@/contexts/StudentContext';
import { 
  LEARNING_CONTENT, 
  LABS, 
  BLOGS, 
  COURSE_MODULES,
  LESSON_MODULES,
  getContentBySubject, 
  getLabsBySubject, 
  getFeaturedBlogs,
  getModulesBySubject,
  getModulesByClass,
  getLessonModulesByClass,
  XP_REWARDS,
  LearningContent,
  Lab,
  Blog,
  CourseModule,
  LessonModule
} from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import AnimatedLabModal from '@/components/AnimatedLabModal';
import LabDetailModal from '@/components/LabDetailModal';
import CourseModuleModal from '@/components/CourseModuleModal';

const LearningPage: React.FC = () => {
  const { t } = useLanguage();
  const { studentData, addXP, updateStudentData } = useStudent();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState<number | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'lessons' | 'lesson-modules' | 'labs' | 'blogs' | 'modules'>('lessons');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [completedContent, setCompletedContent] = useState<string[]>([]);
  const [expandedContent, setExpandedContent] = useState<string | null>(null);
  const [animLabOpen, setAnimLabOpen] = useState(false);
  const [activeAnimLabId, setActiveAnimLabId] = useState<string | null>(null);
  const [detailLabOpen, setDetailLabOpen] = useState(false);
  const [activeDetailLab, setActiveDetailLab] = useState<Lab | null>(null);
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [activeModule, setActiveModule] = useState<CourseModule | null>(null);

  const openAnimLab = (labId: string) => {
    setActiveAnimLabId(labId);
    setAnimLabOpen(true);
  };
  const closeAnimLab = () => {
    setAnimLabOpen(false);
    setActiveAnimLabId(null);
  };
  const openDetailLab = (lab: Lab) => {
    setActiveDetailLab(lab);
    setDetailLabOpen(true);
  };
  const closeDetailLab = () => {
    setDetailLabOpen(false);
    setActiveDetailLab(null);
  };
  const openModule = (module: CourseModule) => {
    setActiveModule(module);
    setModuleModalOpen(true);
  };
  const closeModule = () => {
    setModuleModalOpen(false);
    setActiveModule(null);
  };

  // Load completed content from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedContent');
    if (saved) {
      setCompletedContent(JSON.parse(saved));
    }
  }, []);

  // Save completed content to localStorage
  const saveCompletedContent = (content: string[]) => {
    setCompletedContent(content);
    localStorage.setItem('completedContent', JSON.stringify(content));
  };

  // Mark content as completed and award XP
  const completeContent = (contentId: string, xpReward: number) => {
    if (!completedContent.includes(contentId)) {
      const newCompleted = [...completedContent, contentId];
      saveCompletedContent(newCompleted);
      addXP(xpReward);
      
      toast({
        title: "Content Completed!",
        description: `You earned ${xpReward} XP!`,
      });
    }
  };

  // Filter content based on search and filters
  const filteredContent = LEARNING_CONTENT.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = selectedSubject === 'all' || content.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || content.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || content.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesDifficulty && matchesType;
  });

  const filteredLabs = LABS.filter(lab => {
    const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lab.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || lab.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || lab.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const filteredBlogs = BLOGS.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  const filteredModules = COURSE_MODULES.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.problemStatement.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === 'all' || module.subject === selectedSubject;
    const matchesClass = selectedClass === 'all' || module.class === selectedClass;
    const matchesDifficulty = selectedDifficulty === 'all' || module.level === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesClass && matchesDifficulty;
  });

  const filteredLessonModules = LESSON_MODULES.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.problemStatement.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === 'all' || module.subject === selectedSubject;
    const matchesClass = selectedClass === 'all' || module.class === selectedClass;
    const matchesDifficulty = selectedDifficulty === 'all' || module.level === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesClass && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="h-4 w-4" />;
      case 'lab': return <FlaskConical className="h-4 w-4" />;
      case 'quiz': return <Target className="h-4 w-4" />;
      case 'project': return <Award className="h-4 w-4" />;
      case 'blog': return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const ContentCard: React.FC<{ content: LearningContent }> = ({ content }) => {
    const isExpanded = expandedContent === content.id;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="group"
      >
        <Card className={`transition-all duration-200 hover:shadow-lg`}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {getTypeIcon(content.type)}
                <CardTitle className="text-lg">{content.title}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(content.difficulty)}>
                  {content.difficulty}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedContent(isExpanded ? null : content.id)}
                >
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <CardDescription className="text-sm">{content.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {content.duration} min
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  {content.xpReward} XP
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {content.subject}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {content.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="font-semibold mb-2">Learning Objectives:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {content.content.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Content Sections:</h4>
                    <div className="space-y-2">
                      {content.content.sections.map((section, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          <span>{section.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {content.content.resources.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Resources:</h4>
                      <div className="space-y-1">
                        {content.content.resources.map((resource, index) => (
                          <div key={index} className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                            📎 {resource.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => setExpandedContent(isExpanded ? null : content.id)}
                className="flex-1"
              >
                {isExpanded ? 'Hide Details' : 'Start Lesson'}
              </Button>
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const LabCard: React.FC<{ lab: Lab }> = ({ lab }) => {
    const isAnimatic = lab.mode === 'animatic' || lab.id.endsWith('-animatic');

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className={`transition-all duration-200 hover:shadow-lg`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">{lab.title}</CardTitle>
              </div>
              <Badge className={getDifficultyColor(lab.difficulty)}>
                {lab.difficulty}
              </Badge>
            </div>
            <CardDescription>{lab.description}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {lab.duration} min
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  {lab.xpReward} XP
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {lab.subject}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-2">Equipment Needed:</h4>
                <div className="flex flex-wrap gap-1">
                  {lab.equipment.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Lab Steps:</h4>
                <div className="space-y-1">
                  {lab.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="w-5 h-5 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <span>{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => openDetailLab(lab)}
                className="flex-1"
              >
                View Details
              </Button>
              {isAnimatic ? (
                <Button variant="outline" size="sm" onClick={() => openAnimLab(lab.id)}>
                  <Play className="h-4 w-4 mr-1" />
                  Play Animatic
              </Button>
              ) : (
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4 mr-1" />
                Instructions
              </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
    const blogXP = Math.max(15, Math.min(60, blog.readTime * 5));

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className={`transition-all duration-200 hover:shadow-lg`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">{blog.title}</CardTitle>
                {blog.featured && <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Featured</Badge>}
              </div>
              <div className="text-sm text-muted-foreground">
                {blog.readTime} min read
              </div>
            </div>
            <CardDescription>{blog.excerpt}</CardDescription>
          </CardHeader>
          {blog.thumbnailUrl && (
            <img src={blog.thumbnailUrl} alt={blog.title} className="w-full h-40 object-cover" />
          )}
          
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {blog.author}
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                {blogXP} XP
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {blog.category}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={() => window.location.assign(`/student/learning/blogs/${blog.id}`)} className="flex-1">
                Read Article
              </Button>
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const ModuleCard: React.FC<{ module: CourseModule }> = ({ module }) => {

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className={`transition-all duration-200 hover:shadow-lg`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">{module.title}</CardTitle>
              </div>
              <Badge className={getDifficultyColor(module.level)}>
                {module.level}
              </Badge>
            </div>
            <CardDescription>{module.problemStatement}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {module.duration} min
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  {module.xpReward} XP
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {module.subject}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Learning Objectives:</h4>
                <ul className="text-sm space-y-1">
                  {module.learningObjectives.slice(0, 2).map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                  {module.learningObjectives.length > 2 && (
                    <li className="text-xs text-muted-foreground">
                      +{module.learningObjectives.length - 2} more objectives
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => window.location.assign(`/student/learning/modules/${module.id}`)} className="flex-1">
                Start Module
              </Button>
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const LessonModuleCard: React.FC<{ module: LessonModule }> = ({ module }) => {

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className={`transition-all duration-200 hover:shadow-lg`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">{module.title}</CardTitle>
              </div>
              <div className="flex flex-col gap-1">
                <Badge className={getDifficultyColor(module.level)}>
                  {module.level}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Class {module.class}
                </Badge>
              </div>
            </div>
            <CardDescription>{module.problemStatement}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {module.duration} min
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  {module.xpReward} XP
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {module.subject}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Learning Objectives:</h4>
                <ul className="text-sm space-y-1">
                  {module.learningObjectives.slice(0, 2).map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                  {module.learningObjectives.length > 2 && (
                    <li className="text-xs text-muted-foreground">
                      +{module.learningObjectives.length - 2} more objectives
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => window.location.assign(`/student/learning/modules/${module.id}`)} className="flex-1">
                Start Lesson
              </Button>
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Learning Hub</h1>
              <p className="text-muted-foreground">Explore lessons, labs, and blogs to enhance your STEM knowledge</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Total XP</div>
                <div className="text-2xl font-bold text-primary">{studentData.currentXP}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Completed</div>
                <div className="text-2xl font-bold text-green-600">{completedContent.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search lessons, labs, and blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedClass === 'all' ? 'all' : String(selectedClass)} onValueChange={(value) => setSelectedClass(value === 'all' ? 'all' : parseInt(value))}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="6">Class 6</SelectItem>
                    <SelectItem value="7">Class 7</SelectItem>
                    <SelectItem value="8">Class 8</SelectItem>
                    <SelectItem value="9">Class 9</SelectItem>
                    <SelectItem value="10">Class 10</SelectItem>
                    <SelectItem value="11">Class 11</SelectItem>
                    <SelectItem value="12">Class 12</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="lesson">Lessons</SelectItem>
                    <SelectItem value="lab">Labs</SelectItem>
                    <SelectItem value="quiz">Quizzes</SelectItem>
                    <SelectItem value="project">Projects</SelectItem>
                    <SelectItem value="blog">Blogs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                className={`px-3 py-1.5 rounded-md border ${selectedSubject === 'math' && activeTab === 'modules' ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}
                onClick={() => { setSelectedSubject('math'); setActiveTab('modules'); }}
              >Math Modules</button>
              <button
                className={`px-3 py-1.5 rounded-md border ${selectedSubject === 'science' && activeTab === 'modules' ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}
                onClick={() => { setSelectedSubject('science'); setActiveTab('modules'); }}
              >Science Modules</button>
              <button
                className={`px-3 py-1.5 rounded-md border ${selectedSubject === 'technology' && activeTab === 'modules' ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}
                onClick={() => { setSelectedSubject('technology'); setActiveTab('modules'); }}
              >Tech Modules</button>
              <button
                className={`px-3 py-1.5 rounded-md border ${selectedSubject === 'engineering' && activeTab === 'modules' ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}
                onClick={() => { setSelectedSubject('engineering'); setActiveTab('modules'); }}
              >Engineering Modules</button>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={(v: 'lessons' | 'lesson-modules' | 'labs' | 'blogs' | 'modules') => setActiveTab(v)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="lessons">Lessons ({filteredContent.length})</TabsTrigger>
            <TabsTrigger value="lesson-modules">Lesson Modules ({filteredLessonModules.length})</TabsTrigger>
            <TabsTrigger value="labs">Labs ({filteredLabs.length})</TabsTrigger>
            <TabsTrigger value="modules">Course Modules ({filteredModules.length})</TabsTrigger>
            <TabsTrigger value="blogs">Blogs ({filteredBlogs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredContent.map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="lesson-modules" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredLessonModules.map((module) => (
                  <LessonModuleCard key={module.id} module={module} />
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="labs" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredLabs.map((lab) => (
                  <LabCard key={lab.id} lab={lab} />
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredModules.map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="blogs" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <AnimatePresence>
        {animLabOpen && activeAnimLabId && (
          <AnimatedLabModal labId={activeAnimLabId} open={animLabOpen} onClose={closeAnimLab} />)
        }
      </AnimatePresence>
      <AnimatePresence>
        {detailLabOpen && activeDetailLab && (
          <LabDetailModal
            open={detailLabOpen}
            lab={activeDetailLab}
            onClose={closeDetailLab}
            onComplete={(id, xp) => { completeContent(id, xp); closeDetailLab(); }}
            isCompleted={completedContent.includes(activeDetailLab.id)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {moduleModalOpen && activeModule && (
          <CourseModuleModal
            open={moduleModalOpen}
            module={activeModule}
            onClose={closeModule}
            onComplete={(id, xp) => { completeContent(id, xp); closeModule(); }}
            isCompleted={completedContent.includes(activeModule.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningPage;





