import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Zap, Users, CheckCircle2, ChevronLeft, ChevronRight, Target, Lightbulb, Code, Globe, HelpCircle } from 'lucide-react';
import { CourseModule } from '@/lib/content';

interface CourseModuleModalProps {
  module: CourseModule;
  open: boolean;
  onClose: () => void;
  onComplete: (moduleId: string, xp: number) => void;
  isCompleted: boolean;
}

const CourseModuleModal: React.FC<CourseModuleModalProps> = ({ module, open, onClose, onComplete, isCompleted }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const sections = [
    { id: 'objectives', title: 'Learning Objectives', icon: Target },
    { id: 'problem', title: 'Problem Statement', icon: Lightbulb },
    { id: 'explanation', title: 'Step-by-Step', icon: Code },
    { id: 'practice', title: 'Hands-on Task', icon: Code },
    { id: 'application', title: 'Real-world Use', icon: Globe },
    { id: 'quiz', title: 'Quiz', icon: HelpCircle },
    { id: 'summary', title: 'Summary', icon: CheckCircle2 }
  ];

  const next = () => setCurrentSection((s) => Math.min(sections.length - 1, s + 1));
  const prev = () => setCurrentSection((s) => Math.max(0, s - 1));

  const handleQuizSubmit = () => {
    setShowQuizResult(true);
    if (quizAnswer === module.quizQuestion.correctAnswer) {
      // Award bonus XP for correct answer
      setTimeout(() => {
        onComplete(module.id, module.xpReward + 25);
      }, 1000);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <motion.div
          className="relative bg-card text-card-foreground w-full max-w-5xl mx-4 rounded-xl shadow-xl overflow-hidden max-h-[90vh]"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div>
              <h3 className="font-semibold text-lg">{module.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(module.level)}`}>
                  {module.level}
                </span>
                <span className="text-xs text-muted-foreground">{module.topic}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-muted" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress and Info */}
          <div className="px-5 pt-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {module.duration} min</div>
              <div className="flex items-center gap-1"><Zap className="h-4 w-4" /> {module.xpReward} XP</div>
              <div className="flex items-center gap-1"><Users className="h-4 w-4" /> {module.subject}</div>
            </div>
            <div className="mt-3 h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary" 
                initial={{ width: 0 }} 
                animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }} 
              />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Section {currentSection + 1} of {sections.length} • {sections[currentSection].title}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentSection === 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Learning Objectives
                    </h4>
                    <ul className="space-y-2">
                      {module.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentSection === 1 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Problem Statement
                    </h4>
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                      <p className="text-sm">{module.problemStatement}</p>
                    </div>
                  </div>
                )}

                {currentSection === 2 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Step-by-Step Explanation
                    </h4>
                    <div className="space-y-4">
                      {module.stepByStepExplanation.map((step, index) => (
                        <div key={index} className="border border-border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium mb-2">{step.concept}</p>
                              <div className="bg-muted p-3 rounded text-xs font-mono">
                                {step.example}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentSection === 3 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Hands-on Task
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                        <h5 className="font-medium text-sm mb-2">Task:</h5>
                        <p className="text-sm">{module.handsOnTask.task}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-muted p-3 rounded">
                          <h5 className="font-medium text-xs mb-1">Input:</h5>
                          <p className="text-xs font-mono">{module.handsOnTask.input}</p>
                        </div>
                        <div className="bg-muted p-3 rounded">
                          <h5 className="font-medium text-xs mb-1">Expected Output:</h5>
                          <p className="text-xs font-mono">{module.handsOnTask.expectedOutput}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSection === 4 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Real-world Application
                    </h4>
                    <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                      <p className="text-sm">{module.realWorldApplication}</p>
                    </div>
                  </div>
                )}

                {currentSection === 5 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      Quiz Question
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                        <p className="text-sm font-medium mb-3">{module.quizQuestion.question}</p>
                        <div className="space-y-2">
                          {module.quizQuestion.options.map((option, index) => (
                            <label key={index} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="quiz"
                                value={index}
                                checked={quizAnswer === index}
                                onChange={() => setQuizAnswer(index)}
                                className="text-primary"
                              />
                              <span className="text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                        <button
                          onClick={handleQuizSubmit}
                          disabled={quizAnswer === null || showQuizResult}
                          className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm disabled:opacity-50"
                        >
                          Submit Answer
                        </button>
                      </div>
                      {showQuizResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-lg ${
                            quizAnswer === module.quizQuestion.correctAnswer
                              ? 'bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-400'
                              : 'bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-400'
                          }`}
                        >
                          <p className="text-sm font-medium">
                            {quizAnswer === module.quizQuestion.correctAnswer ? 'Correct!' : 'Incorrect!'}
                          </p>
                          <p className="text-xs mt-1">{module.quizQuestion.explanation}</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {currentSection === 6 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Summary
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-950/20 p-4 rounded-lg">
                      <ul className="space-y-2">
                        {module.summary.map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      disabled={isCompleted}
                      onClick={() => onComplete(module.id, module.xpReward)}
                      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium ${
                        isCompleted 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isCompleted ? 'Module Completed' : 'Complete Module (+150 XP)'}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <button 
              onClick={prev} 
              disabled={currentSection === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <div className="flex gap-1">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSection ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={next} 
              disabled={currentSection === sections.length - 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-50"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseModuleModal;

