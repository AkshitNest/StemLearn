import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface AnimatedLabModalProps {
  labId: string;
  open: boolean;
  onClose: () => void;
}

const ModalContainer: React.FC<{ onClose: () => void; title: string }> = ({ onClose, title, children }) => {
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
          className="relative bg-card text-card-foreground w-full max-w-3xl mx-4 rounded-xl shadow-xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <h3 className="font-semibold text-lg">{title}</h3>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-muted" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const NumberLineScene: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = useMemo(
    () => [
      { label: 'Start at −3', start: -3, move: 0 },
      { label: 'Move +5 (right)', start: -3, move: 5 },
      { label: 'Land at +2', start: 2, move: 0 }
    ],
    []
  );

  const current = steps[step];
  const position = current.start + (current.move || 0);

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">Problem: −3 + 5</div>
      <div className="relative w-full h-40 border border-border rounded-md bg-background overflow-hidden">
        <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-muted" />
        {Array.from({ length: 21 }).map((_, i) => {
          const value = i - 10; // -10..10
          const left = `calc(${(i / 20) * 100}% - 1px)`;
          const isZero = value === 0;
          return (
            <div key={i} className="absolute top-1/2 -translate-y-1/2" style={{ left }}>
              <div className={`w-0.5 ${isZero ? 'h-5 bg-primary' : 'h-4 bg-muted-foreground/60'}`} />
              <div className={`text-[10px] mt-1 ${isZero ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>{value}</div>
            </div>
          );
        })}
        <AnimatePresence>
          <motion.div
            key={step}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>
        <motion.div
          className="absolute -top-2"
          initial={false}
          animate={{ left: `calc(${((position + 10) / 20) * 100}% - 12px)` }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <motion.div className="w-6 h-6 rounded-full bg-primary shadow-lg border-2 border-white" />
        </motion.div>
        {current.move !== 0 && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-primary/60"
            initial={{ left: `calc(${((current.start + 10) / 20) * 100}% - 1px)`, width: 0 }}
            animate={{
              left: `calc(${((Math.min(current.start, current.start + current.move) + 10) / 20) * 100}% - 1px)`,
              width: `calc(${(Math.abs(current.move) / 20) * 100}% )`
            }}
            transition={{ duration: 0.6 }}
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-50"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        <div className="text-sm font-medium">{current.label}</div>
        <button
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-50"
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const FractionPizzaScene: React.FC = () => {
  const [mode, setMode] = useState<'add' | 'multiply'>('add');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <button
          className={`px-3 py-1.5 rounded-md border ${mode === 'add' ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}
          onClick={() => setMode('add')}
        >
          3/8 + 2/8
        </button>
        <button
          className={`px-3 py-1.5 rounded-md border ${mode === 'multiply' ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}
          onClick={() => setMode('multiply')}
        >
          1/2 × 3/8
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative aspect-square border border-border rounded-md overflow-hidden">
          <motion.svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#fff7ed" stroke="#fed7aa" strokeWidth="2" />
            {Array.from({ length: 8 }).map((_, i) => {
              const startAngle = (i * 2 * Math.PI) / 8;
              const endAngle = ((i + 1) * 2 * Math.PI) / 8;
              const x1 = 50 + 48 * Math.cos(startAngle);
              const y1 = 50 + 48 * Math.sin(startAngle);
              const x2 = 50 + 48 * Math.cos(endAngle);
              const y2 = 50 + 48 * Math.sin(endAngle);
              const largeArc = 0;
              const path = `M 50 50 L ${x1} ${y1} A 48 48 0 ${largeArc} 1 ${x2} ${y2} Z`;
              const filled = mode === 'add' ? i < 5 : i < 3; // 5/8 for add, 3/8 base for multiply
              return (
                <motion.path
                  key={i}
                  d={path}
                  fill={filled ? '#f97316' : '#fde68a'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                />
              );
            })}
          </motion.svg>
          <div className="absolute bottom-2 left-2 text-xs bg-white/80 rounded px-2 py-1">
            {mode === 'add' ? 'Result: 5/8' : 'Base: 3/8'}
          </div>
        </div>
        <div className="relative aspect-square border border-border rounded-md overflow-hidden">
          <motion.svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="transparent" stroke="#94a3b8" strokeWidth="1" />
            {mode === 'multiply' && (
              <>
                <path d="M 2 50 H 98" stroke="#22c55e" strokeWidth="3" />
                <motion.rect
                  x="2"
                  y="2"
                  width="96"
                  height="48"
                  fill="#22c55e22"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                {Array.from({ length: 8 }).map((_, i) => {
                  const startAngle = (i * 2 * Math.PI) / 8;
                  const endAngle = ((i + 1) * 2 * Math.PI) / 8;
                  const x1 = 50 + 48 * Math.cos(startAngle);
                  const y1 = 50 + 48 * Math.sin(startAngle);
                  const x2 = 50 + 48 * Math.cos(endAngle);
                  const y2 = 50 + 48 * Math.sin(endAngle);
                  const path = `M 50 50 L ${x1} ${y1} A 48 48 0 0 1 ${x2} ${y2} Z`;
                  const filled = i < 3; // 3 slices
                  return (
                    <motion.path
                      key={i}
                      d={path}
                      fill={filled ? '#f97316' : 'transparent'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                    />
                  );
                })}
              </>
            )}
          </motion.svg>
          <div className="absolute bottom-2 left-2 text-xs bg-white/80 rounded px-2 py-1">
            {mode === 'multiply' ? 'Overlap: 3 × 1/16 = 3/16' : 'Addition visual'}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimatedLabModal: React.FC<AnimatedLabModalProps> = ({ labId, open, onClose }) => {
  const title = useMemo(() => {
    if (labId === 'lab-math-number-line-animatic') return 'Animatic: Number Line Operations';
    if (labId === 'lab-math-fractions-animatic') return 'Animatic: Fraction Pizza';
    if (labId === 'lab-math-temperature-trend-animatic') return 'Animatic: Temperature Trend Analysis';
    if (labId === 'lab-math-balance-algebra-animatic') return 'Animatic: Balance Scale Algebra';
    if (labId === 'lab-math-volume-comparison-animatic') return 'Animatic: Volume – Cuboid vs Cylinder';
    if (labId === 'lab-math-polynomial-graphing-animatic') return 'Animatic: Polynomial Graphing';
    if (labId === 'lab-science-projectile-trajectory-animatic') return 'Animatic: Projectile Trajectory';
    if (labId === 'lab-math-limits-exploration-animatic') return 'Animatic: Limits Exploration';
    if (labId === 'lab-math-integration-area-animatic') return 'Animatic: Integration – Area';
    if (labId === 'lab-science-motion-graphs-animatic') return 'Animatic: Motion Graphs';
    if (labId === 'lab-math-trig-clinometer-animatic') return 'Animatic: Trigonometry Clinometer';
    if (labId === 'lab-science-ohms-law-animatic') return 'Animatic: Ohm’s Law';
    return 'Animatic Lab';
  }, [labId]);

  if (!open) return null;

  return (
    <ModalContainer onClose={onClose} title={title}>
      {labId === 'lab-math-number-line-animatic' && <NumberLineScene />}
      {labId === 'lab-math-fractions-animatic' && <FractionPizzaScene />}
      {labId === 'lab-math-temperature-trend-animatic' && (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">Daily temperatures and signed changes</div>
          <motion.div className="w-full h-48 border border-border rounded-md p-3">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <polyline fill="none" stroke="#0ea5e9" strokeWidth="2" points="0,25 14,21 28,31 42,18 56,22 70,30 84,28" />
            </svg>
          </motion.div>
          <div className="text-xs">ΔT: −2, +4, −5, +2, −4, +1 • Avg ≈ −0.67°C</div>
        </div>
      )}
      {labId === 'lab-math-balance-algebra-animatic' && (
        <div className="space-y-3">
          <div className="text-sm">3x + 2 = 11</div>
          <motion.div className="relative h-24 border border-border rounded-md flex items-center justify-center">
            <motion.div className="w-40 h-1 bg-muted" />
            <motion.div className="absolute left-6 top-6 text-xs">Left: 3x + 2</motion.div>
            <motion.div className="absolute right-6 top-6 text-xs">Right: 11</motion.div>
          </motion.div>
          <div className="text-xs">Remove 2 both sides → 3x = 9 → x = 3</div>
        </div>
      )}
      {labId === 'lab-math-volume-comparison-animatic' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm">Cuboid 4×3×2 = 24 cm³</div>
            <div className="relative h-40 border border-border rounded-md overflow-hidden">
              <motion.div className="absolute bottom-0 left-0 right-0 bg-blue-400" initial={{ height: 0 }} animate={{ height: '40%' }} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm">Cylinder r=1.5, h=10 ≈ 70.65 cm³</div>
            <div className="relative h-40 border border-border rounded-md overflow-hidden">
              <motion.div className="absolute bottom-0 left-0 right-0 bg-blue-400" initial={{ height: 0 }} animate={{ height: '80%' }} />
            </div>
          </div>
        </div>
      )}
      {labId === 'lab-math-polynomial-graphing-animatic' && (
        <div className="space-y-3">
          <div className="text-sm">y = x² − 4x + 3</div>
          <motion.div className="w-full h-48 border border-border rounded-md p-3">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <path d="M 0 40 Q 50 10 100 40" stroke="#22c55e" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>
          <div className="text-xs">Zeros: 1, 3 • Vertex: (2, −1)</div>
        </div>
      )}
      {labId === 'lab-science-projectile-trajectory-animatic' && (
        <div className="space-y-3">
          <div className="text-sm">θ = 45°, R = 20 m, T = 2 s</div>
          <div className="relative h-48 border border-border rounded-md overflow-hidden">
            <motion.div className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-primary" animate={{ x: ['0%', '80%'], y: ['0%', '-40%', '0%'] }} transition={{ duration: 2, repeat: 0, ease: 'easeOut' }} />
          </div>
          <div className="text-xs">v₀ ≈ 14 m/s • T_theory ≈ 2.02 s</div>
        </div>
      )}
      {labId === 'lab-math-limits-exploration-animatic' && (
        <div className="space-y-3 text-sm">
          <div>f(x) = (x²−1)/(x−1) → hole at x = 1</div>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div>0.9 → 1.9</div>
            <div>0.99 → 1.99</div>
            <div>1.01 → 2.01</div>
            <div>1.1 → 2.1</div>
          </div>
          <div>Limit = 2</div>
        </div>
      )}
      {labId === 'lab-math-integration-area-animatic' && (
        <div className="space-y-3">
          <div className="text-sm">∫₀² x² dx • Riemann rectangles → exact 8/3</div>
          <div className="relative h-48 border border-border rounded-md overflow-hidden p-3">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <path d="M 0 50 C 33 50 66 22 100 0" stroke="#ef4444" strokeWidth="2" fill="none" />
              {Array.from({ length: 8 }).map((_, i) => {
                const x = i * (100 / 8);
                const height = Math.pow((i + 1) / 4, 2) * 50; // x^2 over [0,2] scaled
                return <rect key={i} x={x} y={50 - height} width={12} height={height} fill="#fecaca" />;
              })}
            </svg>
          </div>
          <div className="text-xs">Area → 8/3 ≈ 2.67</div>
        </div>
      )}
      {labId === 'lab-science-motion-graphs-animatic' && (
        <div className="space-y-3">
          <div className="text-sm">Distance–Time vs Velocity–Time</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 border border-border rounded-md p-3">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <polyline fill="none" stroke="#2563eb" strokeWidth="2" points="0,45 30,35 60,15 100,10" />
              </svg>
              <div className="text-[10px] mt-1">Slope = velocity</div>
            </div>
            <div className="h-40 border border-border rounded-md p-3">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <rect x="0" y="30" width="40" height="20" fill="#86efac" />
                <rect x="40" y="20" width="30" height="30" fill="#4ade80" />
                <rect x="70" y="35" width="30" height="15" fill="#22c55e" />
              </svg>
              <div className="text-[10px] mt-1">Area = displacement</div>
            </div>
          </div>
        </div>
      )}
      {labId === 'lab-math-trig-clinometer-animatic' && (
        <div className="space-y-3">
          <div className="text-sm">d = 12 m, θ = 35°, eye = 1.5 m</div>
          <div className="relative h-48 border border-border rounded-md">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <line x1="10" y1="40" x2="90" y2="40" stroke="#94a3b8" />
              <line x1="20" y1="40" x2="20" y2="15" stroke="#f59e0b" />
              <line x1="20" y1="15" x2="80" y2="40" stroke="#f59e0b" />
            </svg>
          </div>
          <div className="text-xs">h ≈ 12 tan 35° + 1.5 ≈ 9.9 m</div>
        </div>
      )}
      {labId === 'lab-science-ohms-law-animatic' && (
        <div className="space-y-3">
          <div className="text-sm">Plot V–I and slope = R</div>
          <div className="h-48 border border-border rounded-md p-3">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <circle cx="20" cy="49" r="2" fill="#0ea5e9" />
              <circle cx="40" cy="47.95" r="2" fill="#0ea5e9" />
              <circle cx="60" cy="44" r="2" fill="#0ea5e9" />
              <line x1="15" y1="50" x2="95" y2="35" stroke="#0ea5e9" />
            </svg>
          </div>
          <div className="text-xs">R ≈ 100 Ω</div>
        </div>
      )}
      {labId !== 'lab-math-number-line-animatic' && labId !== 'lab-math-fractions-animatic' && (
        <div className="text-sm text-muted-foreground">No animatic available for this lab yet.</div>
      )}
    </ModalContainer>
  );
};

export default AnimatedLabModal;


