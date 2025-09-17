import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Zap, Users, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Lab } from '@/lib/content';

interface LabDetailModalProps {
  lab: Lab;
  open: boolean;
  onClose: () => void;
  onComplete: (labId: string, xp: number) => void;
  isCompleted: boolean;
}

const LabDetailModal: React.FC<LabDetailModalProps> = ({ lab, open, onClose, onComplete, isCompleted }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const totalSteps = lab.steps.length;
  const step = lab.steps[stepIndex];

  const next = () => setStepIndex((i) => Math.min(totalSteps - 1, i + 1));
  const prev = () => setStepIndex((i) => Math.max(0, i - 1));

  const progress = useMemo(() => Math.round(((stepIndex + 1) / totalSteps) * 100), [stepIndex, totalSteps]);

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
          className="relative bg-card text-card-foreground w-full max-w-4xl mx-4 rounded-xl shadow-xl overflow-hidden"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div>
              <h3 className="font-semibold text-lg">{lab.title}</h3>
              <p className="text-xs text-muted-foreground">{lab.description}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-muted" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-5 pt-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {lab.duration} min</div>
              <div className="flex items-center gap-1"><Zap className="h-4 w-4" /> {lab.xpReward} XP</div>
              <div className="flex items-center gap-1"><Users className="h-4 w-4" /> {lab.subject}</div>
            </div>
            <div className="mt-3 h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Step {stepIndex + 1} of {totalSteps} • {progress}%</div>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-3">
              <div>
                <div className="text-xs font-medium text-muted-foreground">Current Step</div>
                <h4 className="text-base font-semibold">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              <div className="border border-border rounded-md p-3">
                <div className="text-xs font-medium mb-2">Instructions</div>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {step.instructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ol>
                {step.materials && step.materials.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs font-medium mb-1">Materials for this step</div>
                    <div className="flex flex-wrap gap-1">
                      {step.materials.map((m, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded border border-border">{m}</span>
                      ))}
                    </div>
                  </div>
                )}
                {typeof step.expectedTime === 'number' && (
                  <div className="mt-3 text-xs text-muted-foreground">Expected time: {step.expectedTime} min</div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button onClick={prev} disabled={stepIndex === 0} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-50">
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                <button onClick={next} disabled={stepIndex === totalSteps - 1} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-50">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border border-border rounded-md p-3">
                <div className="text-xs font-medium mb-2">Equipment</div>
                <div className="flex flex-wrap gap-1">
                  {lab.equipment.map((e, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded border border-border">{e}</span>
                  ))}
                </div>
              </div>
              <div className="border border-border rounded-md p-3">
                <div className="text-xs font-medium mb-2">Expected Results</div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {lab.expectedResults.map((r, i) => (<li key={i}>{r}</li>))}
                </ul>
              </div>
              {lab.safetyNotes && lab.safetyNotes.length > 0 && (
                <div className="border border-border rounded-md p-3">
                  <div className="text-xs font-medium mb-2">Safety Notes</div>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {lab.safetyNotes.map((s, i) => (<li key={i}>{s}</li>))}
                  </ul>
                </div>
              )}
              <button
                disabled={isCompleted}
                onClick={() => onComplete(lab.id, lab.xpReward)}
                className={`w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-primary text-primary-foreground'}`}
              >
                <CheckCircle2 className="h-4 w-4" /> {isCompleted ? 'Completed' : 'Mark as Completed'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LabDetailModal;




