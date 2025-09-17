import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COURSE_MODULES, CourseModule } from '@/lib/content';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, Target, Lightbulb, Code, Globe, HelpCircle, Clock, Zap, Users, Home } from 'lucide-react';

const sectionIds = ['objectives', 'problem', 'explanation', 'practice', 'application', 'quiz', 'summary'] as const;

const ModuleReaderPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const moduleId = params.moduleId as string;
  const moduleData = useMemo<CourseModule | undefined>(() => COURSE_MODULES.find(m => m.id === moduleId), [moduleId]);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  const modulesBySubject = useMemo(() => {
    if (!moduleData) return COURSE_MODULES;
    return COURSE_MODULES.filter(m => m.subject === moduleData.subject);
  }, [moduleData]);

  if (!moduleData) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-sm text-muted-foreground mb-4 cursor-pointer inline-flex items-center gap-2" onClick={() => navigate('/student/learning')}> 
          <Home className="h-4 w-4" /> Back to Learning
        </div>
        <div className="text-xl font-semibold">Module not found</div>
      </div>
    );
  }

  const goPrev = () => setCurrentSection((s) => Math.max(0, s - 1));
  const goNext = () => setCurrentSection((s) => Math.min(sectionIds.length - 1, s + 1));

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/student/learning')} className="px-2 py-1 rounded border border-border hover:bg-muted text-sm">Learning Hub</button>
            <div className="text-lg font-semibold">{moduleData.title}</div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(moduleData.level)}`}>{moduleData.level}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {moduleData.duration} min</div>
            <div className="flex items-center gap-1"><Zap className="h-4 w-4" /> {moduleData.xpReward} XP</div>
            <div className="flex items-center gap-1"><Users className="h-4 w-4" /> {moduleData.subject}</div>
          </div>
        </div>
        <div className="h-1 bg-muted">
          <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${((currentSection + 1) / sectionIds.length) * 100}%` }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar like W3Schools */}
        <aside className="md:col-span-3 lg:col-span-3 border border-border rounded-md overflow-hidden sticky top-16 self-start max-h-[80vh]">
          <div className="px-3 py-2 text-sm font-semibold border-b border-border">{moduleData.topic} Modules</div>
          <div className="overflow-y-auto max-h-[72vh]">
            {modulesBySubject.map((m) => (
              <div
                key={m.id}
                onClick={() => navigate(`/student/learning/modules/${m.id}`)}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-muted ${m.id === moduleData.id ? 'bg-muted font-medium' : ''}`}
              >
                {m.title}
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="md:col-span-9 lg:col-span-9">
          <div className="border border-border rounded-md overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="text-sm text-muted-foreground">Section {currentSection + 1} of {sectionIds.length}</div>
              <div className="text-xl font-semibold mt-1">{['Learning Objectives', 'Problem Statement', 'Step-by-Step', 'Hands-on Task', 'Real-world Application', 'Quiz', 'Summary'][currentSection]}</div>
            </div>

            <div className="p-4">
              <AnimatePresence mode="wait">
                <motion.div key={currentSection} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>
                  {currentSection === 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {moduleData.learningObjectives.map((o, i) => (<li key={i}>{o}</li>))}
                    </ul>
                  )}
                  {currentSection === 1 && (
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded text-sm">{moduleData.problemStatement}</div>
                  )}
                  {currentSection === 2 && (
                    <div className="space-y-3">
                      {moduleData.stepByStepExplanation.map((s) => (
                        <div key={s.step} className="border border-border rounded p-3">
                          <div className="text-sm font-medium mb-1">{s.step}. {s.concept}</div>
                          <pre className="bg-muted p-2 rounded text-xs overflow-auto"><code>{s.example}</code></pre>
                        </div>
                      ))}
                    </div>
                  )}
                  {currentSection === 3 && (
                    <div className="space-y-3 text-sm">
                      <div className="font-medium">Task</div>
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">{moduleData.handsOnTask.task}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs font-medium mb-1">Input</div>
                          <pre className="bg-muted p-2 rounded text-xs overflow-auto"><code>{moduleData.handsOnTask.input}</code></pre>
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-1">Expected Output</div>
                          <pre className="bg-muted p-2 rounded text-xs overflow-auto"><code>{moduleData.handsOnTask.expectedOutput}</code></pre>
                        </div>
                      </div>
                    </div>
                  )}
                  {currentSection === 4 && (
                    <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded text-sm">{moduleData.realWorldApplication}</div>
                  )}
                  {currentSection === 5 && (
                    <div className="space-y-3">
                      <div className="text-sm font-medium">{moduleData.quizQuestion.question}</div>
                      <ul className="space-y-2">
                        {moduleData.quizQuestion.options.map((opt, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <span className="w-6 h-6 rounded-full border border-border inline-flex items-center justify-center text-xs">{String.fromCharCode(65 + idx)}</span>
                            <span>{opt}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="text-xs text-muted-foreground">Answer: {String.fromCharCode(65 + moduleData.quizQuestion.correctAnswer)} — {moduleData.quizQuestion.explanation}</div>
                    </div>
                  )}
                  {currentSection === 6 && (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {moduleData.summary.map((s, i) => (<li key={i}>{s}</li>))}
                    </ul>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-border">
              <button onClick={goPrev} disabled={currentSection === 0} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-50">
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <div className="flex gap-1">
                {sectionIds.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentSection(idx)} className={`w-2 h-2 rounded-full ${idx === currentSection ? 'bg-primary' : 'bg-muted'}`} />
                ))}
              </div>
              <button onClick={goNext} disabled={currentSection === sectionIds.length - 1} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-50">
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModuleReaderPage;


