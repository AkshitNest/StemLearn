// Content schemas for modular learning content (multilingual-ready)

export type SupportedSubject = 'math' | 'science' | 'technology' | 'engineering';
export type SupportedLang = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'gu' | 'ur' | 'kn' | 'od' | 'ml' | 'pa' | 'as';

export interface ContentMeta {
  id: string;                    // unique stable id (e.g., "physics-motion")
  title: string;                 // localized
  subject: SupportedSubject;
  gradeBand: '6-8' | '9-10' | '11-12';
  language: SupportedLang;
  source: 'khan' | 'ck12' | 'phet' | 'nasa' | 'kolibri' | 'custom';
  tags?: string[];
  estimatedMinutes?: number;
  locked?: boolean;              // for gamified unlocks
}

export interface LessonSection {
  kind: 'text' | 'image' | 'video' | 'simulation' | 'link';
  title?: string;
  body?: string;                 // markdown/plain
  url?: string;                  // video/link/sim url
  imageAlt?: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: string;                // exact match in options
  explanation?: string;
}

export interface QuizSpec {
  chapter: string;               // e.g., "Physics - Motion"
  language: string;              // e.g., "English"
  questions: QuizQuestion[];
}

export interface FlashcardItem {
  front: string;                 // question/term
  back: string;                  // answer/definition
}

export interface ContentModule {
  meta: ContentMeta;
  chapters: {
    id: string;
    title: string;
    sections: LessonSection[];
  }[];
  quiz?: QuizSpec;               // optional quiz
  flashcards?: FlashcardItem[];  // optional flashcards
  simulations?: {                // optional PhET/NASA sims
    title: string;
    url: string;                 // embeddable url
  }[];
}




