// Learning Content Management System
export interface LearningContent {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'lab' | 'quiz' | 'project' | 'blog';
  subject: 'math' | 'science' | 'technology' | 'engineering';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  xpReward: number;
  prerequisites?: string[];
  tags: string[];
  content: {
    sections: ContentSection[];
    resources: Resource[];
    objectives: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface ContentSection {
  id: string;
  title: string;
  type: 'text' | 'video' | 'interactive' | 'code' | 'diagram';
  content: string;
  order: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'code' | 'image';
  url: string;
  description: string;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: string;
  duration: number;
  xpReward: number;
  mode?: 'animatic' | 'real';
  equipment: string[];
  steps: LabStep[];
  expectedResults: string[];
  safetyNotes: string[];
}

export interface LabStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  expectedTime: number;
  materials: string[];
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  readTime: number;
  xpReward: number;
  publishedAt: string;
  featured: boolean;
  thumbnailUrl?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  subject: 'math' | 'science' | 'technology' | 'engineering';
  class: 6 | 7 | 8 | 9 | 10 | 11 | 12;
  duration: number; // in minutes
  xpReward: number;
  learningObjectives: string[];
  problemStatement: string;
  stepByStepExplanation: {
    step: number;
    concept: string;
    example: string;
  }[];
  handsOnTask: {
    task: string;
    input: string;
    expectedOutput: string;
  };
  realWorldApplication: string;
  quizQuestion: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  summary: string[];
  createdAt: string;
}

export interface LessonModule {
  id: string;
  title: string;
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  subject: 'math' | 'science' | 'technology' | 'engineering';
  class: 6 | 7 | 8 | 9 | 10 | 11 | 12;
  duration: number; // in minutes
  xpReward: number;
  learningObjectives: string[];
  problemStatement: string;
  stepByStepExplanation: {
    step: number;
    concept: string;
    example: string;
  }[];
  handsOnTask: {
    task: string;
    input: string;
    expectedOutput: string;
  };
  realWorldApplication: string;
  quizQuestion: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  summary: string[];
  createdAt: string;
}

// XP Rewards Configuration
export const XP_REWARDS = {
  LESSON_COMPLETE: 50,
  LAB_COMPLETE: 100,
  QUIZ_PASS: 75,
  PROJECT_COMPLETE: 200,
  BLOG_READ: 25,
  DAILY_LOGIN: 10,
  PROFILE_COMPLETE: 100,
  STREAK_BONUS: 25,
  ACHIEVEMENT: 150,
  FIRST_LESSON: 100,
  FIRST_LAB: 150,
  PERFECT_QUIZ: 50,
  WEEKLY_GOAL: 300,
  MODULE_COMPLETE: 150,
} as const;

// Learning Content Database
export const LEARNING_CONTENT: LearningContent[] = [
  // Mathematics Content
  {
    id: 'math-algebra-basics',
    title: 'Algebra Fundamentals',
    description: 'Master the basics of algebraic expressions, equations, and problem-solving techniques.',
    type: 'lesson',
    subject: 'math',
    difficulty: 'beginner',
    duration: 45,
    xpReward: XP_REWARDS.LESSON_COMPLETE,
    tags: ['algebra', 'equations', 'variables', 'expressions'],
    content: {
      sections: [
        {
          id: 'intro',
          title: 'Introduction to Algebra',
          type: 'text',
          content: 'Algebra is the branch of mathematics that uses symbols and letters to represent numbers and quantities in formulas and equations.',
          order: 1
        },
        {
          id: 'variables',
          title: 'Understanding Variables',
          type: 'interactive',
          content: 'Variables are symbols (usually letters) that represent unknown or changing values. In the equation x + 5 = 10, x is the variable.',
          order: 2
        },
        {
          id: 'equations',
          title: 'Solving Linear Equations',
          type: 'text',
          content: 'Linear equations are equations where the highest power of the variable is 1. We solve them using inverse operations.',
          order: 3
        }
      ],
      resources: [
        {
          id: 'algebra-pdf',
          title: 'Algebra Cheat Sheet',
          type: 'pdf',
          url: '/resources/algebra-cheat-sheet.pdf',
          description: 'Quick reference for algebraic formulas and techniques'
        }
      ],
      objectives: [
        'Understand what variables are and how to use them',
        'Solve simple linear equations',
        'Apply algebraic thinking to real-world problems'
      ]
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 'math-geometry-shapes',
    title: 'Geometric Shapes and Properties',
    description: 'Explore the world of 2D and 3D shapes, their properties, and calculations.',
    type: 'lesson',
    subject: 'math',
    difficulty: 'beginner',
    duration: 60,
    xpReward: XP_REWARDS.LESSON_COMPLETE,
    tags: ['geometry', 'shapes', 'area', 'perimeter', 'volume'],
    content: {
      sections: [
        {
          id: '2d-shapes',
          title: '2D Shapes',
          type: 'diagram',
          content: 'Learn about triangles, quadrilaterals, circles, and polygons. Understand their properties and how to calculate area and perimeter.',
          order: 1
        },
        {
          id: '3d-shapes',
          title: '3D Shapes',
          type: 'interactive',
          content: 'Explore cubes, spheres, cylinders, and pyramids. Learn to calculate surface area and volume.',
          order: 2
        }
      ],
      resources: [
        {
          id: 'geometry-calculator',
          title: 'Shape Calculator Tool',
          type: 'code',
          url: '/tools/geometry-calculator',
          description: 'Interactive calculator for area, perimeter, and volume'
        }
      ],
      objectives: [
        'Identify and classify 2D and 3D shapes',
        'Calculate area, perimeter, and volume',
        'Apply geometric concepts to real-world problems'
      ]
    },
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16'
  },
  // Science Content
  {
    id: 'science-physics-motion',
    title: 'Laws of Motion',
    description: 'Discover Newton\'s three laws of motion and their applications in everyday life.',
    type: 'lesson',
    subject: 'science',
    difficulty: 'intermediate',
    duration: 50,
    xpReward: XP_REWARDS.LESSON_COMPLETE,
    tags: ['physics', 'motion', 'newton', 'forces', 'acceleration'],
    content: {
      sections: [
        {
          id: 'first-law',
          title: 'Newton\'s First Law',
          type: 'text',
          content: 'An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.',
          order: 1
        },
        {
          id: 'second-law',
          title: 'Newton\'s Second Law',
          type: 'interactive',
          content: 'Force equals mass times acceleration (F = ma). This explains how force affects the motion of objects.',
          order: 2
        },
        {
          id: 'third-law',
          title: 'Newton\'s Third Law',
          type: 'text',
          content: 'For every action, there is an equal and opposite reaction.',
          order: 3
        }
      ],
      resources: [
        {
          id: 'motion-simulator',
          title: 'Motion Simulator',
          type: 'code',
          url: '/tools/motion-simulator',
          description: 'Interactive simulation of Newton\'s laws'
        }
      ],
      objectives: [
        'Understand Newton\'s three laws of motion',
        'Apply the laws to real-world scenarios',
        'Calculate forces and accelerations'
      ]
    },
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17'
  },
  {
    id: 'science-chemistry-elements',
    title: 'Periodic Table and Elements',
    description: 'Explore the periodic table, atomic structure, and chemical properties of elements.',
    type: 'lesson',
    subject: 'science',
    difficulty: 'beginner',
    duration: 40,
    xpReward: XP_REWARDS.LESSON_COMPLETE,
    tags: ['chemistry', 'periodic-table', 'elements', 'atoms', 'compounds'],
    content: {
      sections: [
        {
          id: 'atomic-structure',
          title: 'Atomic Structure',
          type: 'diagram',
          content: 'Learn about protons, neutrons, and electrons. Understand how they determine an element\'s properties.',
          order: 1
        },
        {
          id: 'periodic-trends',
          title: 'Periodic Trends',
          type: 'interactive',
          content: 'Discover patterns in the periodic table including atomic radius, electronegativity, and ionization energy.',
          order: 2
        }
      ],
      resources: [
        {
          id: 'periodic-table',
          title: 'Interactive Periodic Table',
          type: 'code',
          url: '/tools/periodic-table',
          description: 'Explore elements and their properties'
        }
      ],
      objectives: [
        'Understand atomic structure and composition',
        'Navigate the periodic table effectively',
        'Identify trends and patterns in element properties'
      ]
    },
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  // Technology Content
  {
    id: 'tech-programming-python',
    title: 'Python Programming Basics',
    description: 'Learn the fundamentals of Python programming with hands-on exercises.',
    type: 'lesson',
    subject: 'technology',
    difficulty: 'beginner',
    duration: 90,
    xpReward: XP_REWARDS.LESSON_COMPLETE,
    tags: ['programming', 'python', 'coding', 'variables', 'functions'],
    content: {
      sections: [
        {
          id: 'syntax',
          title: 'Python Syntax',
          type: 'code',
          content: 'Python uses indentation to define code blocks. Learn about variables, data types, and basic operations.',
          order: 1
        },
        {
          id: 'control-flow',
          title: 'Control Flow',
          type: 'interactive',
          content: 'Master if statements, loops, and functions to control program execution.',
          order: 2
        }
      ],
      resources: [
        {
          id: 'python-playground',
          title: 'Python Code Playground',
          type: 'code',
          url: '/tools/python-playground',
          description: 'Write and run Python code in your browser'
        }
      ],
      objectives: [
        'Write basic Python programs',
        'Use variables, loops, and functions',
        'Debug and test code effectively'
      ]
    },
    createdAt: '2024-01-19',
    updatedAt: '2024-01-19'
  },
  // Engineering Content
  {
    id: 'eng-civil-structures',
    title: 'Civil Engineering Structures',
    description: 'Understand how buildings, bridges, and infrastructure are designed and built.',
    type: 'lesson',
    subject: 'engineering',
    difficulty: 'intermediate',
    duration: 70,
    xpReward: XP_REWARDS.LESSON_COMPLETE,
    tags: ['civil-engineering', 'structures', 'materials', 'design', 'construction'],
    content: {
      sections: [
        {
          id: 'loads',
          title: 'Types of Loads',
          type: 'text',
          content: 'Learn about dead loads, live loads, wind loads, and seismic loads that structures must withstand.',
          order: 1
        },
        {
          id: 'materials',
          title: 'Construction Materials',
          type: 'interactive',
          content: 'Explore concrete, steel, wood, and composite materials and their properties.',
          order: 2
        }
      ],
      resources: [
        {
          id: 'structure-simulator',
          title: 'Structure Simulator',
          type: 'code',
          url: '/tools/structure-simulator',
          description: 'Simulate loads and stresses on structures'
        }
      ],
      objectives: [
        'Understand different types of structural loads',
        'Identify appropriate materials for construction',
        'Apply engineering principles to design problems'
      ]
    },
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
];

// Labs Database
export const LABS: Lab[] = [
  {
    id: 'lab-math-number-line-animatic',
    title: 'Animatic: Number Line Operations',
    description: 'Walk along a number line to visualize integer addition and subtraction with animations.',
    subject: 'math',
    difficulty: 'beginner',
    duration: 20,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    mode: 'animatic',
    equipment: ['Floor number line or on-screen line', 'Integer cards'],
    steps: [
      {
        id: 'setup',
        title: 'Setup Number Line',
        description: 'Create a number line from −10 to +10.',
        instructions: [
          'Mark integers from −10 to +10',
          'Place the avatar at the start number',
          'Prepare move cards (+n or −n)'
        ],
        expectedTime: 5,
        materials: ['Tape/marker', 'Cards']
      },
      {
        id: 'move',
        title: 'Animate Movement',
        description: 'Animate right for addition and left for subtraction.',
        instructions: [
          'For −3 + 5: start at −3, move 5 right to land at +2',
          'For 4 − 7: start at 4, move 7 left to land at −3'
        ],
        expectedTime: 10,
        materials: ['On-screen controls']
      },
      {
        id: 'analyze',
        title: 'Discuss Pattern',
        description: 'Summarize what right/left means and when you cross zero.',
        instructions: [
          'Right = addition, Left = subtraction',
          'Negative sums lie left of zero'
        ],
        expectedTime: 5,
        materials: []
      }
    ],
    expectedResults: [
      '−3 + 5 = +2',
      '4 − 7 = −3',
      'Directional movement encodes operation sign'
    ],
    safetyNotes: []
  },
  {
    id: 'lab-science-ohms-law-real',
    title: 'Ohm’s Law with Resistors and Multimeter',
    description: 'Build a simple circuit to measure current for different voltages and verify V = I·R.',
    subject: 'science',
    difficulty: 'beginner',
    duration: 45,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['Breadboard', '9V battery with snap', 'Resistors (100Ω, 220Ω, 470Ω)', 'Multimeter', 'LED (optional with series resistor)', 'Jumper wires'],
    steps: [
      {
        id: 'circuit',
        title: 'Assemble Circuit',
        description: 'Create a simple series circuit battery → resistor → back to battery.',
        instructions: [
          'Place the 100Ω resistor on the breadboard',
          'Connect battery + to one end of the resistor',
          'Connect the other end of the resistor back to battery −',
          'If using LED: put it in series with correct polarity and a 220Ω resistor'
        ],
        expectedTime: 10,
        materials: ['Breadboard', 'Jumper wires', 'Resistors']
      },
      {
        id: 'measure',
        title: 'Measure Current and Voltage',
        description: 'Use a multimeter to record V and I for each resistor.',
        instructions: [
          'Set multimeter to DC voltage; measure across the resistor (V)',
          'Set multimeter to DC current; place meter in series to measure I',
          'Repeat for 100Ω, 220Ω, and 470Ω resistors',
          'Record values in a data table'
        ],
        expectedTime: 20,
        materials: ['Multimeter']
      },
      {
        id: 'analyze',
        title: 'Analyze and Verify Ohm’s Law',
        description: 'Compute R = V/I and compare to nominal values.',
        instructions: [
          'For each measurement, compute I_theory = V/R_nominal',
          'Compare measured current to theoretical current',
          'Plot V–I; slope should be ≈ R',
          'Discuss possible sources of error (internal battery resistance, meter accuracy)'
        ],
        expectedTime: 15,
        materials: ['Graph paper']
      }
    ],
    expectedResults: [
      'Measured current is proportional to applied voltage',
      'Computed resistance matches nominal within tolerance',
      'V–I graph approximates a straight line with slope R'
    ],
    safetyNotes: [
      'Do not short the 9V battery',
      'Use appropriate resistor with LED to limit current',
      'Disconnect power when reconfiguring circuit'
    ]
  },
  {
    id: 'lab-science-density-liquids',
    title: 'Density of Liquids using Mass and Volume',
    description: 'Measure densities of water, oil, and salt solution with a kitchen scale and measuring cylinder.',
    subject: 'science',
    difficulty: 'beginner',
    duration: 40,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['Kitchen scale (0.1 g resolution)', 'Measuring cylinder (100 mL)', 'Water', 'Vegetable oil', 'Salt', 'Beaker'],
    steps: [
      { id: 'tare', title: 'Tare and Measure Mass', description: 'Weigh empty cylinder and filled cylinder.', instructions: ['Record mass of empty cylinder', 'Add 50 mL of liquid; record new mass', 'Mass of liquid = difference'], expectedTime: 10, materials: ['Scale', 'Cylinder'] },
      { id: 'calc', title: 'Compute Density', description: 'Use ρ = m/V for each liquid.', instructions: ['V = 50 mL = 0.05 L = 50 cm³', 'Compute ρ for water, oil, salt solution', 'Compare to reference values'], expectedTime: 15, materials: ['Calculator'] },
      { id: 'salt', title: 'Salt Solution Variation', description: 'Dissolve salt and repeat.', instructions: ['Add salt to water and stir', 'Repeat mass measurement and density calculation'], expectedTime: 15, materials: ['Salt', 'Stirrer'] }
    ],
    expectedResults: [
      'Water density near 1.0 g/cm³',
      'Oil density lower than water (floats)',
      'Salt solution density increases with concentration'
    ],
    safetyNotes: ['Clean spills promptly', 'Do not ingest lab materials']
  },
  {
    id: 'lab-math-clinometer-real',
    title: 'Measure Height using a Paper Clinometer',
    description: 'Build a paper clinometer and use trigonometry to estimate tree or building height.',
    subject: 'math',
    difficulty: 'intermediate',
    duration: 50,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['Protractor printout', 'Straw', 'Thread', 'Small weight (paperclip)', 'Measuring tape'],
    steps: [
      { id: 'build', title: 'Build the Clinometer', description: 'Assemble a functional clinometer.', instructions: ['Tape straw along protractor 0–180° edge', 'Tie thread at protractor center', 'Attach paperclip as plumb weight'], expectedTime: 10, materials: ['Protractor', 'Straw', 'Thread'] },
      { id: 'measure-angle', title: 'Measure Angle of Elevation', description: 'Sight the top and read angle.', instructions: ['Stand distance d from object', 'Look through straw at the top', 'Read angle θ where thread crosses scale', 'Add eye height h_eye to result'], expectedTime: 15, materials: ['Clinometer'] },
      { id: 'compute', title: 'Compute Height', description: 'Apply h = d·tan(θ) + h_eye.', instructions: ['Measure ground distance d', 'Use calculator to compute tan(θ)', 'Compute total height', 'Repeat twice and average'], expectedTime: 15, materials: ['Measuring tape', 'Calculator'] }
    ],
    expectedResults: ['Estimated height close to tape-measure reference if available'],
    safetyNotes: ['Choose a safe open area', 'Avoid standing in traffic paths']
  },
  {
    id: 'lab-physics-projectile-ramp',
    title: 'Projectile Range using Ramp and Marble',
    description: 'Roll a marble down a ramp to launch horizontally and measure range to estimate initial speed.',
    subject: 'science',
    difficulty: 'intermediate',
    duration: 60,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['Marble', 'Ramp (book + board)', 'Table', 'Meter stick', 'Carbon paper/landing paper', 'Tape'],
    steps: [
      { id: 'setup-ramp', title: 'Setup Ramp', description: 'Create a repeatable launch.', instructions: ['Tape ramp to table edge', 'Mark release point on ramp', 'Place landing paper on floor'], expectedTime: 10, materials: ['Ramp', 'Tape'] },
      { id: 'height', title: 'Measure Height', description: 'Measure drop height H.', instructions: ['Measure vertical distance from table edge to floor'], expectedTime: 5, materials: ['Meter stick'] },
      { id: 'trials', title: 'Run Trials', description: 'Launch and mark impact points.', instructions: ['Release marble from marked point 5 times', 'Mark each landing with carbon paper'], expectedTime: 25, materials: ['Marble', 'Paper'] },
      { id: 'analysis-proj', title: 'Analyze Range and Speed', description: 'Use projectile equations.', instructions: ['Compute time t = sqrt(2H/g)', 'Average horizontal range R_avg', 'Compute v0 = R_avg / t'], expectedTime: 15, materials: ['Calculator'] }
    ],
    expectedResults: ['v0 estimate consistent across trials within experimental error'],
    safetyNotes: ['Keep area clear of feet during launches']
  },
  {
    id: 'lab-chemistry-reaction-rate',
    title: 'Reaction Rate: Effervescence of Antacid Tablets',
    description: 'Investigate how temperature or surface area affects rate using antacid tablets in water.',
    subject: 'science',
    difficulty: 'beginner',
    duration: 45,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['Antacid tablets', 'Beakers', 'Thermometer', 'Crushing tool', 'Stopwatch', 'Water (cold, room, warm)'],
    steps: [
      { id: 'plan', title: 'Plan Variables', description: 'Choose variable to test.', instructions: ['Temperature: cold/room/warm water', 'or Surface area: whole vs crushed tablet'], expectedTime: 5, materials: [] },
      { id: 'run', title: 'Run Trials', description: 'Start timing on drop.', instructions: ['Drop tablet into beaker', 'Start stopwatch immediately', 'Stop when bubbling ends', 'Repeat 3 trials per condition'], expectedTime: 25, materials: ['Stopwatch'] },
      { id: 'graph', title: 'Graph and Conclude', description: 'Compare rates.', instructions: ['Compute average time', 'Plot temperature/surface vs time', 'Explain kinetic theory reasoning'], expectedTime: 15, materials: ['Graph paper'] }
    ],
    expectedResults: ['Higher temperature or greater surface area → faster reaction'],
    safetyNotes: ['Use safe, edible tablets only', 'Do not ingest experiment water', 'Clean spills']
  },
  {
    id: 'lab-biology-enzyme-activity',
    title: 'Enzyme Activity: Catalase and Hydrogen Peroxide',
    description: 'Use potato or liver (catalase source) to see how temperature affects enzyme rate.',
    subject: 'science',
    difficulty: 'intermediate',
    duration: 45,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['Fresh potato or liver', '3% hydrogen peroxide', 'Test tubes', 'Water baths (cold/room/warm)', 'Knife', 'Stopwatch'],
    steps: [
      { id: 'prep', title: 'Prepare Samples', description: 'Cut equal pieces of potato/liver.', instructions: ['Standardize mass/size', 'Place in labeled tubes'], expectedTime: 10, materials: ['Knife', 'Scale (optional)'] },
      { id: 'treat', title: 'Add H₂O₂', description: 'Start reaction and time bubbling.', instructions: ['Add equal volume of 3% H₂O₂', 'Start timer', 'Record foam height/time as rate proxy'], expectedTime: 20, materials: ['Stopwatch'] },
      { id: 'compare', title: 'Compare Temperatures', description: 'Cold vs room vs warm.', instructions: ['Use cold and warm water baths', 'Repeat and average results'], expectedTime: 10, materials: ['Water baths'] }
    ],
    expectedResults: ['Fastest activity near warm (not hot) conditions; reduced at cold/high heat'],
    safetyNotes: ['Wear eye protection when handling H₂O₂', 'Dispose biologics properly']
  },
  {
    id: 'lab-electronics-led-series-parallel',
    title: 'LEDs in Series and Parallel',
    description: 'Build small LED circuits to observe current sharing and brightness differences.',
    subject: 'engineering',
    difficulty: 'beginner',
    duration: 40,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['Breadboard', '5V supply or 3×AA', 'LEDs', '220Ω resistors', 'Multimeter'],
    steps: [
      { id: 'series', title: 'Series LEDs', description: 'Two LEDs + one resistor.', instructions: ['Connect two LEDs in series with 220Ω', 'Measure total Vf and current', 'Note brightness'], expectedTime: 15, materials: ['Breadboard'] },
      { id: 'parallel', title: 'Parallel LEDs', description: 'Each LED gets its own resistor.', instructions: ['Wire two branches each with LED+220Ω', 'Measure branch currents', 'Compare brightness stability'], expectedTime: 15, materials: ['Multimeter'] },
      { id: 'discuss', title: 'Discuss Results', description: 'Why separate resistors in parallel?', instructions: ['Explain current hogging', 'Relate to datasheets'], expectedTime: 10, materials: [] }
    ],
    expectedResults: ['Series shares current; parallel requires individual resistors for equal brightness'],
    safetyNotes: ['Observe polarity; avoid short circuits']
  },
  {
    id: 'lab-cs-sorting-experiment',
    title: 'Sorting Algorithm Experiment',
    description: 'Measure time for bubble, insertion, and built-in sorts on different input patterns.',
    subject: 'technology',
    difficulty: 'intermediate',
    duration: 50,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['Computer', 'Code editor', 'Timer function'],
    steps: [
      { id: 'implement', title: 'Implement Algorithms', description: 'Code three sorts.', instructions: ['Bubble sort', 'Insertion sort', 'Use language built-in sort'], expectedTime: 20, materials: ['IDE'] },
      { id: 'datasets', title: 'Generate Datasets', description: 'Best/average/worst cases.', instructions: ['Random list', 'Already sorted', 'Reverse sorted'], expectedTime: 10, materials: [] },
      { id: 'measure', title: 'Measure and Plot', description: 'Use timing functions.', instructions: ['Measure time vs n', 'Plot and compare curves', 'Explain O(n²) vs O(n log n)'], expectedTime: 20, materials: ['Spreadsheet/plotter'] }
    ],
    expectedResults: ['Built-in/Timsort fastest; O(n²) algorithms degrade rapidly'],
    safetyNotes: ['None (software experiment)']
  },
  {
    id: 'lab-tech-tic-tac-toe',
    title: 'Build Tic Tac Toe (Step-by-Step)',
    description: 'Create a classic 3×3 Tic Tac Toe with turn logic, win detection, and reset.',
    subject: 'technology',
    difficulty: 'beginner',
    duration: 60,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['Computer', 'Code editor', 'Browser'],
    steps: [
      { id: 'scaffold', title: 'Scaffold UI', description: 'Build a 3×3 grid and status text.', instructions: ['Create 9 buttons', 'Display current player (X/O)'], expectedTime: 15, materials: [] },
      { id: 'turns', title: 'Turns & State', description: 'Alternate players and prevent overwriting.', instructions: ['State: board[9], currentPlayer', 'On click: place mark if empty, swap player'], expectedTime: 15, materials: [] },
      { id: 'win', title: 'Win Detection', description: 'Check rows, cols, diagonals.', instructions: ['Winning lines: [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]', 'If win → lock board'], expectedTime: 20, materials: [] },
      { id: 'reset', title: 'Reset & Draw', description: 'Add reset and draw handling.', instructions: ['If no cells left & no winner → draw', 'Reset button'], expectedTime: 10, materials: [] }
    ],
    expectedResults: ['Playable game with winner/draw logic'],
    safetyNotes: []
  },
  {
    id: 'lab-tech-snake-game',
    title: 'Build Snake Game (Step-by-Step)',
    description: 'Implement grid-based snake movement, food spawning, growth, and collision detection.',
    subject: 'technology',
    difficulty: 'intermediate',
    duration: 120,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['Computer', 'Code editor', 'Browser/Canvas'],
    steps: [
      { id: 'grid', title: 'Draw Grid', description: 'Canvas or div grid for playfield.', instructions: ['20×20 grid', 'Cell size 20px'], expectedTime: 15, materials: [] },
      { id: 'snake', title: 'Snake State & Movement', description: 'Represent snake as coordinate array.', instructions: ['Initial length 3', 'Move by adding head and removing tail each tick'], expectedTime: 25, materials: [] },
      { id: 'controls', title: 'Keyboard Controls', description: 'Arrow keys/WASD to change direction.', instructions: ['Prevent 180° reverse'], expectedTime: 15, materials: [] },
      { id: 'food', title: 'Food & Growth', description: 'Random spawn not on snake.', instructions: ['On eat: grow by keeping tail', 'Increase score'], expectedTime: 25, materials: [] },
      { id: 'collision', title: 'Collision & Game Over', description: 'Detect wall/self collisions.', instructions: ['Stop loop; show game over; reset'], expectedTime: 20, materials: [] },
      { id: 'speed', title: 'Speed & Levels', description: 'Increase speed as score rises.', instructions: ['Adjust tick interval'], expectedTime: 20, materials: [] }
    ],
    expectedResults: ['Playable snake with scoring and increasing difficulty'],
    safetyNotes: []
  },
  {
    id: 'lab-math-temperature-trend-animatic',
    title: 'Animatic: Temperature Trend Analysis',
    description: 'Visualize daily temperature changes with animated line graphs and signed differences.',
    subject: 'math',
    difficulty: 'beginner',
    duration: 15,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    mode: 'animatic',
    equipment: ['On-screen graph', 'Temperature data cards'],
    steps: [
      { id: 'data', title: 'Enter Data', description: 'Input 7 days of temperature data.', instructions: ['15, 13, 17, 12, 14, 10, 11'], expectedTime: 3, materials: [] },
      { id: 'delta', title: 'Compute ΔT', description: 'Show signed daily changes.', instructions: ['−2, +4, −5, +2, −4, +1'], expectedTime: 5, materials: [] },
      { id: 'avg', title: 'Average Change', description: 'Animate averaging the changes.', instructions: ['Average ≈ −0.67°C'], expectedTime: 7, materials: [] }
    ],
    expectedResults: ['Line graph of temps', 'ΔT sequence: −2, +4, −5, +2, −4, +1', 'Average change ≈ −0.67°C'],
    safetyNotes: []
  },
  {
    id: 'lab-math-balance-algebra-animatic',
    title: 'Animatic: Balance Scale Algebra',
    description: 'Solve linear equations using a balance scale animation that mirrors both sides.',
    subject: 'math',
    difficulty: 'beginner',
    duration: 15,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    mode: 'animatic',
    equipment: ['On-screen balance', 'Units and x-blocks'],
    steps: [
      { id: 'eq1', title: '3x + 2 = 11', description: 'Remove 2 from both sides, then divide.', instructions: ['3x = 9 → x = 3'], expectedTime: 7, materials: [] },
      { id: 'eq2', title: 'x − 4 = −2', description: 'Add 4 to both sides.', instructions: ['x = 2'], expectedTime: 5, materials: [] }
    ],
    expectedResults: ['x = 3', 'x = 2'],
    safetyNotes: []
  },
  {
    id: 'lab-math-volume-comparison-animatic',
    title: 'Animatic: Volume – Cuboid vs Cylinder',
    description: 'Compare filling animations to contrast volumes of a cuboid and a cylinder.',
    subject: 'math',
    difficulty: 'beginner',
    duration: 12,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    mode: 'animatic',
    equipment: ['On-screen solids'],
    steps: [
      { id: 'cuboid', title: 'Cuboid Volume', description: 'Compute 4×3×2 = 24 cm³', instructions: ['Fill to 24 units'], expectedTime: 4, materials: [] },
      { id: 'cylinder', title: 'Cylinder Volume', description: 'Compute π·1.5²·10 ≈ 70.65 cm³', instructions: ['Fill to 70.65 units'], expectedTime: 6, materials: [] }
    ],
    expectedResults: ['Cylinder > Cuboid'],
    safetyNotes: []
  },
  {
    id: 'lab-math-polynomial-graphing-animatic',
    title: 'Animatic: Polynomial Graphing',
    description: 'Animate plotting y = x² − 4x + 3 and y = 2x³ − x with features highlighted.',
    subject: 'math',
    difficulty: 'intermediate',
    duration: 18,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    mode: 'animatic',
    equipment: ['On-screen axes'],
    steps: [
      { id: 'quad', title: 'Quadratic', description: 'Zeros at 1 and 3; vertex at (2, −1).', instructions: ['Plot and mark features'], expectedTime: 8, materials: [] },
      { id: 'cubic', title: 'Cubic', description: 'S-shape; intercepts at 0 and ±1/√2.', instructions: ['Plot and mark turning points'], expectedTime: 8, materials: [] }
    ],
    expectedResults: ['Correct feature identification'],
    safetyNotes: []
  },
  {
    id: 'lab-science-projectile-trajectory-animatic',
    title: 'Animatic: Projectile Trajectory',
    description: 'Launch a point-mass and compare measured vs theoretical range at 45°.',
    subject: 'science',
    difficulty: 'intermediate',
    duration: 15,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    mode: 'animatic',
    equipment: ['On-screen launcher'],
    steps: [
      { id: 'launch', title: 'Launch', description: 'Set θ = 45°, R = 20 m, T = 2 s.', instructions: ['Animate arc'], expectedTime: 6, materials: [] },
      { id: 'solve', title: 'Solve v₀', description: 'R = v₀²/g → v₀ ≈ 14 m/s', instructions: ['Compare T theory ≈ 2.02 s'], expectedTime: 6, materials: [] }
    ],
    expectedResults: ['v₀ ≈ 14 m/s', 'Agreement with theory'],
    safetyNotes: []
  },
  {
    id: 'lab-math-limits-exploration-animatic',
    title: 'Animatic: Limits Exploration',
    description: 'Table-driven approach to lim (x→1) (x²−1)/(x−1) with hole at x = 1.',
    subject: 'math',
    difficulty: 'intermediate',
    duration: 10,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    mode: 'animatic',
    equipment: ['On-screen table and graph'],
    steps: [
      { id: 'table', title: 'Approach Table', description: 'x: 0.9, 0.99, 1.01, 1.1 → f(x)→2', instructions: ['Show values approaching 2'], expectedTime: 6, materials: [] }
    ],
    expectedResults: ['Limit = 2'],
    safetyNotes: []
  },
  {
    id: 'lab-math-integration-area-animatic',
    title: 'Animatic: Integration – Area Under Curve',
    description: 'Animate Riemann rectangles and exact area for ∫₀² x² dx = 8/3.',
    subject: 'math',
    difficulty: 'intermediate',
    duration: 12,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    mode: 'animatic',
    equipment: ['On-screen graph'],
    steps: [
      { id: 'riemann', title: 'Riemann Sums', description: 'Increase n to show convergence.', instructions: ['Area → 8/3'], expectedTime: 8, materials: [] }
    ],
    expectedResults: ['Exact area 8/3'],
    safetyNotes: []
  },
  {
    id: 'lab-science-motion-graphs-animatic',
    title: 'Animatic: Motion Graphs',
    description: 'Connect distance–time slope to velocity and v–t area to displacement.',
    subject: 'science',
    difficulty: 'beginner',
    duration: 12,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    mode: 'animatic',
    equipment: ['On-screen graphs'],
    steps: [
      { id: 'dt', title: 'Distance–Time', description: 'Animate constant vs accelerated motion.', instructions: ['Slope = velocity'], expectedTime: 6, materials: [] },
      { id: 'vt', title: 'Velocity–Time', description: 'Shade area segments.', instructions: ['Area = displacement'], expectedTime: 6, materials: [] }
    ],
    expectedResults: ['Correct interpretations'],
    safetyNotes: []
  },
  {
    id: 'lab-math-trig-clinometer-animatic',
    title: 'Animatic: Trigonometry – Clinometer Height',
    description: 'Right-triangle animation showing h ≈ d tan θ + eye height.',
    subject: 'math',
    difficulty: 'beginner',
    duration: 10,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    mode: 'animatic',
    equipment: ['On-screen triangle'],
    steps: [
      { id: 'triangle', title: 'Right Triangle', description: 'd = 12 m, θ = 35°, eye = 1.5 m.', instructions: ['Compute h ≈ 9.9 m'], expectedTime: 6, materials: [] }
    ],
    expectedResults: ['Height ≈ 9.9 m'],
    safetyNotes: []
  },
  {
    id: 'lab-science-ohms-law-animatic',
    title: 'Animatic: Ohm’s Law V–I Graph',
    description: 'Plot V–I points and animate best-fit line; slope ≈ R.',
    subject: 'science',
    difficulty: 'beginner',
    duration: 10,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    mode: 'animatic',
    equipment: ['On-screen axes'],
    steps: [
      { id: 'points', title: 'Points', description: 'Plot (2,0.02), (4,0.041), (6,0.060).', instructions: ['Draw line'], expectedTime: 6, materials: [] }
    ],
    expectedResults: ['R ≈ 100 Ω'],
    safetyNotes: []
  },
  {
    id: 'lab-math-fractions-animatic',
    title: 'Animatic: Fraction Pizza (Add & Multiply)',
    description: 'Combine slices to add fractions and overlay halves to multiply, with animated pizza visuals.',
    subject: 'math',
    difficulty: 'beginner',
    duration: 20,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    mode: 'animatic',
    equipment: ['Paper/virtual pizza cut into 8 slices', 'Transparent overlay'],
    steps: [
      {
        id: 'add',
        title: 'Add Fractions',
        description: 'Combine same-denominator slices.',
        instructions: [
          'Build 3/8 and 2/8',
          'Merge to 5/8'
        ],
        expectedTime: 8,
        materials: ['Pizza slices']
      },
      {
        id: 'multiply',
        title: 'Multiply Fractions',
        description: 'Use overlay to model “of”.',
        instructions: [
          'Take 1/2 of a 3/8 portion',
          'Count overlapping subparts = 3/16'
        ],
        expectedTime: 8,
        materials: ['Transparent overlay']
      },
      {
        id: 'record',
        title: 'Record Results',
        description: 'Fill data table for results.',
        instructions: [
          'Addition: 3/8 + 2/8 = 5/8',
          'Multiplication: 1/2 × 3/8 = 3/16'
        ],
        expectedTime: 4,
        materials: ['Data sheet']
      }
    ],
    expectedResults: ['5/8', '3/16'],
    safetyNotes: []
  },
  {
    id: 'lab-physics-pendulum',
    title: 'Pendulum Motion Lab',
    description: 'Investigate the relationship between pendulum length and period of oscillation.',
    subject: 'science',
    difficulty: 'intermediate',
    duration: 60,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['String', 'Mass', 'Stopwatch', 'Ruler', 'Protractor'],
    steps: [
      {
        id: 'setup',
        title: 'Setup',
        description: 'Set up the pendulum apparatus',
        instructions: [
          'Tie a mass to one end of a string',
          'Secure the other end to a fixed point',
          'Measure the length from the fixed point to the center of mass'
        ],
        expectedTime: 10,
        materials: ['String', 'Mass', 'Ruler']
      },
      {
        id: 'measurement',
        title: 'Data Collection',
        description: 'Measure the period for different lengths',
        instructions: [
          'Start with a 20cm length',
          'Pull the pendulum to 10 degrees and release',
          'Time 10 complete oscillations',
          'Calculate the period (time ÷ 10)',
          'Repeat for 30cm, 40cm, and 50cm lengths'
        ],
        expectedTime: 30,
        materials: ['Stopwatch', 'Protractor']
      },
      {
        id: 'analysis',
        title: 'Data Analysis',
        description: 'Analyze the relationship between length and period',
        instructions: [
          'Create a table of length vs period',
          'Plot length vs period squared',
          'Calculate the slope of the line',
          'Compare with theoretical value'
        ],
        expectedTime: 20,
        materials: ['Graph paper', 'Calculator']
      }
    ],
    expectedResults: [
      'Period increases with pendulum length',
      'Period squared is proportional to length',
      'Slope should be approximately 4π²/g'
    ],
    safetyNotes: [
      'Ensure the pendulum has enough space to swing',
      'Keep fingers away from the swinging mass',
      'Use appropriate safety equipment if needed'
    ]
  },
  {
    id: 'lab-chemistry-ph-indicators',
    title: 'pH Indicators Lab',
    description: 'Test various household substances to determine their pH levels using natural indicators.',
    subject: 'science',
    difficulty: 'beginner',
    duration: 45,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['Red cabbage', 'Test tubes', 'Droppers', 'Various household substances'],
    steps: [
      {
        id: 'prepare-indicator',
        title: 'Prepare pH Indicator',
        description: 'Make red cabbage pH indicator',
        instructions: [
          'Boil red cabbage leaves in water for 10 minutes',
          'Strain the liquid to get purple indicator solution',
          'Let it cool to room temperature'
        ],
        expectedTime: 15,
        materials: ['Red cabbage', 'Water', 'Strainer']
      },
      {
        id: 'test-substances',
        title: 'Test Substances',
        description: 'Test various household substances',
        instructions: [
          'Add a few drops of indicator to each test tube',
          'Add small amounts of different substances',
          'Observe and record color changes',
          'Compare with pH color chart'
        ],
        expectedTime: 20,
        materials: ['Test tubes', 'Droppers', 'Household substances']
      },
      {
        id: 'record-results',
        title: 'Record Results',
        description: 'Document findings and conclusions',
        instructions: [
          'Create a table of substances and their pH levels',
          'Identify which substances are acidic, basic, or neutral',
          'Draw conclusions about household chemistry'
        ],
        expectedTime: 10,
        materials: ['Data sheet', 'pH color chart']
      }
    ],
    expectedResults: [
      'Red cabbage indicator changes color based on pH',
      'Acidic substances turn red/pink',
      'Basic substances turn blue/green',
      'Neutral substances remain purple'
    ],
    safetyNotes: [
      'Wear safety goggles',
      'Do not taste any of the substances',
      'Wash hands after handling chemicals'
    ]
  },
  {
    id: 'lab-programming-robot',
    title: 'Robot Programming Lab',
    description: 'Program a virtual robot to navigate through a maze using basic programming concepts.',
    subject: 'technology',
    difficulty: 'intermediate',
    duration: 90,
    xpReward: XP_REWARDS.LAB_COMPLETE,
    equipment: ['Computer', 'Robot simulator', 'Programming environment'],
    steps: [
      {
        id: 'setup-environment',
        title: 'Setup Programming Environment',
        description: 'Prepare the robot programming environment',
        instructions: [
          'Open the robot simulator',
          'Load the maze environment',
          'Initialize the robot at the starting position',
          'Familiarize yourself with the robot\'s sensors'
        ],
        expectedTime: 15,
        materials: ['Computer', 'Robot simulator']
      },
      {
        id: 'basic-movement',
        title: 'Basic Movement',
        description: 'Program basic robot movement commands',
        instructions: [
          'Write code to move the robot forward',
          'Add turning commands (left and right)',
          'Test movement in an open area',
          'Debug any issues with the code'
        ],
        expectedTime: 30,
        materials: ['Programming environment']
      },
      {
        id: 'maze-navigation',
        title: 'Maze Navigation',
        description: 'Program the robot to navigate through the maze',
        instructions: [
          'Use sensors to detect walls',
          'Implement wall-following algorithm',
          'Add decision-making logic for turns',
          'Test and refine the navigation code'
        ],
        expectedTime: 45,
        materials: ['Robot simulator', 'Maze environment']
      }
    ],
    expectedResults: [
      'Robot successfully navigates through the maze',
      'Code uses sensor data for decision making',
      'Robot reaches the target destination',
      'Program demonstrates understanding of basic algorithms'
    ],
    safetyNotes: [
      'This is a virtual lab - no physical safety concerns',
      'Save your work frequently',
      'Test code in small increments'
    ]
  }
];

// Blogs Database
export const BLOGS: Blog[] = [
  {
    id: 'blog-math-fibonacci',
    title: 'The Magic of Fibonacci Numbers in Nature',
    excerpt: 'Discover how the Fibonacci sequence appears everywhere in nature, from flower petals to spiral galaxies.',
    content: `# The Magic of Fibonacci Numbers in Nature

The Fibonacci sequence is one of the most fascinating mathematical patterns found in nature. Named after the Italian mathematician Leonardo of Pisa (also known as Fibonacci), this sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...

## Where We Find Fibonacci in Nature

### Flower Petals
Many flowers have petals that follow Fibonacci numbers. For example:
- Lilies have 3 petals
- Buttercups have 5 petals
- Daisies often have 13, 21, or 34 petals
- Sunflowers typically have 55 or 89 petals

### Pine Cones and Pineapples
The spirals on pine cones and pineapples follow Fibonacci patterns. If you count the spirals going in one direction and then in the opposite direction, you'll often find consecutive Fibonacci numbers.

### Tree Branches
The way tree branches grow often follows Fibonacci patterns. New branches tend to grow in patterns that create the most efficient use of space and sunlight.

## The Golden Ratio Connection

The ratio of consecutive Fibonacci numbers approaches the golden ratio (approximately 1.618) as the numbers get larger. This golden ratio is considered aesthetically pleasing and appears in art, architecture, and nature.

## Why This Matters

Understanding Fibonacci numbers helps us appreciate the mathematical beauty in nature and can inspire us to look for patterns in the world around us. It's a perfect example of how mathematics isn't just abstract theory—it's deeply connected to the natural world.

## Try This at Home

Look around your environment and see if you can spot Fibonacci numbers. Count the petals on flowers, the spirals on pine cones, or the branches on trees. You might be surprised at how often this mathematical pattern appears!`,
    author: 'Dr. Sarah Chen',
    category: 'Mathematics',
    tags: ['fibonacci', 'nature', 'patterns', 'golden-ratio', 'mathematics'],
    readTime: 5,
    xpReward: XP_REWARDS.BLOG_READ,
    publishedAt: '2024-01-15',
    featured: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'blog-science-climate',
    title: 'Understanding Climate Change: A Student\'s Guide',
    excerpt: 'Learn about the science behind climate change, its causes, effects, and what we can do about it.',
    content: `# Understanding Climate Change: A Student's Guide

Climate change is one of the most important issues of our time, and understanding it is crucial for everyone, especially students who will inherit this planet.

## What is Climate Change?

Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations are natural, scientific evidence shows that human activities have been the main driver of climate change since the mid-20th century.

## The Greenhouse Effect

The Earth's atmosphere acts like a greenhouse, trapping heat from the sun. This is natural and necessary for life on Earth. However, human activities have increased the concentration of greenhouse gases, causing more heat to be trapped.

### Main Greenhouse Gases:
- Carbon dioxide (CO₂) - from burning fossil fuels
- Methane (CH₄) - from agriculture and waste
- Nitrous oxide (N₂O) - from fertilizers and industrial processes

## Evidence of Climate Change

### Rising Temperatures
Global average temperatures have increased by about 1.1°C since the late 19th century, with most warming occurring in the past 40 years.

### Melting Ice
- Arctic sea ice is shrinking
- Glaciers are retreating worldwide
- Ice sheets in Greenland and Antarctica are losing mass

### Rising Sea Levels
Sea levels have risen about 20 cm in the last century, with the rate accelerating in recent decades.

### Extreme Weather
More frequent and intense heatwaves, droughts, floods, and hurricanes.

## What Can We Do?

### Individual Actions:
- Reduce energy consumption
- Use renewable energy sources
- Reduce, reuse, and recycle
- Choose sustainable transportation
- Eat more plant-based foods

### Collective Actions:
- Support climate-friendly policies
- Educate others about climate change
- Participate in climate action groups
- Advocate for environmental protection

## The Role of Science

Science provides the evidence and solutions for addressing climate change. As students, you can:
- Study environmental science
- Pursue careers in renewable energy
- Develop new technologies for carbon capture
- Contribute to climate research

## Hope for the Future

While climate change is a serious challenge, there's reason for hope. Renewable energy is becoming more affordable, new technologies are being developed, and young people worldwide are taking action.

Remember: Every action counts, and together we can make a difference!`,
    author: 'Prof. Michael Rodriguez',
    category: 'Environmental Science',
    tags: ['climate-change', 'environment', 'sustainability', 'science', 'future'],
    readTime: 8,
    xpReward: XP_REWARDS.BLOG_READ,
    publishedAt: '2024-01-12',
    featured: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1502303756781-9bbdb0f4f1aa?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'blog-tech-ai-ethics',
    title: 'The Ethics of Artificial Intelligence',
    excerpt: 'Explore the ethical considerations surrounding AI development and its impact on society.',
    content: `# The Ethics of Artificial Intelligence

As artificial intelligence becomes more prevalent in our daily lives, it's crucial to consider the ethical implications of this powerful technology.

## What is AI Ethics?

AI ethics is a field of study that examines the moral implications of artificial intelligence systems. It addresses questions about fairness, transparency, privacy, and the impact of AI on society.

## Key Ethical Concerns

### Bias and Fairness
AI systems can perpetuate or amplify human biases present in training data. This can lead to unfair treatment of certain groups of people.

**Example**: If a hiring algorithm is trained on historical data that shows bias against certain demographics, it may continue to discriminate.

### Privacy
AI systems often require large amounts of personal data to function effectively. This raises concerns about how this data is collected, stored, and used.

### Transparency and Explainability
Many AI systems operate as "black boxes," making decisions without clear explanations. This can be problematic when AI is used in critical areas like healthcare or criminal justice.

### Job Displacement
AI automation may replace human workers in various industries, raising questions about economic impact and the need for retraining programs.

## Principles of Ethical AI

### 1. Fairness
AI systems should treat all individuals and groups fairly, without discrimination.

### 2. Transparency
The decision-making process of AI systems should be understandable and explainable.

### 3. Privacy
Personal data should be protected and used responsibly.

### 4. Accountability
There should be clear responsibility for AI system outcomes.

### 5. Human-Centered Design
AI should augment human capabilities rather than replace human judgment entirely.

## Real-World Examples

### Healthcare
AI is being used to diagnose diseases, but ethical considerations include ensuring the technology doesn't discriminate against certain populations.

### Criminal Justice
Predictive policing algorithms must be carefully designed to avoid reinforcing existing biases in law enforcement.

### Social Media
AI algorithms that determine what content users see can influence public opinion and political discourse.

## What Students Can Do

### Learn About AI Ethics
- Take courses on AI ethics and responsible technology
- Stay informed about current debates in AI ethics
- Read about case studies of AI gone wrong

### Develop Ethical AI
- Consider ethical implications when designing AI systems
- Include diverse perspectives in AI development
- Test AI systems for bias and fairness

### Advocate for Responsible AI
- Support policies that promote ethical AI
- Engage in discussions about AI's impact on society
- Encourage companies to prioritize ethical considerations

## The Future of AI Ethics

As AI continues to evolve, the field of AI ethics will become increasingly important. Students today will be the ones shaping the future of AI, making it crucial to understand and address these ethical considerations.

Remember: Technology is a tool, and like any tool, it can be used for good or harm. The choice is ours to make.`,
    author: 'Dr. Emily Watson',
    category: 'Technology',
    tags: ['artificial-intelligence', 'ethics', 'technology', 'society', 'future'],
    readTime: 10,
    xpReward: XP_REWARDS.BLOG_READ,
    publishedAt: '2024-01-10',
    featured: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'blog-tech-beginners-guide-python',
    title: 'Python for Absolute Beginners: A Friendly Guide',
    excerpt: 'New to coding? This article walks you through Python’s core ideas with simple examples and tips to avoid common mistakes.',
    content: `# Python for Absolute Beginners: A Friendly Guide

If you can read this sentence, you can start programming. Python is one of the most beginner‑friendly languages because its syntax is clean and readable.

## What You Need
- Python 3.x installed (or use an online REPL such as Replit)
- A text editor (VS Code, Cursor) and curiosity

## Variables and Types
Python uses dynamic typing.

\`\`\`python
name = "Aarav"
age = 13
height_m = 1.54
is_student = True
\`\`\`

## Input and Output
\`\`\`python
name = input("What is your name? ")
print("Hello,", name)
\`\`\`

## Decisions
\`\`\`python
score = 76
if score >= 90:
    print("A")
elif score >= 75:
    print("B")
else:
    print("Keep going!")
\`\`\`

## Loops
\`\`\`python
for i in range(5):
    print(i)
\`\`\`

## Next Steps
- Solve small problems daily
- Read error messages; they are clues
- Build mini projects: a calculator, quiz, or tic‑tac‑toe

Happy coding!`,
    author: 'Riya Kapoor',
    category: 'Technology',
    tags: ['python', 'beginner', 'programming'],
    readTime: 6,
    xpReward: XP_REWARDS.BLOG_READ,
    publishedAt: '2024-02-02',
    featured: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'blog-science-ohms-law-deep-dive',
    title: 'Ohm’s Law: From Atoms to Circuits',
    excerpt: 'Understand why V = I·R holds, how resistors behave, and what real‑world factors bend the rule.',
    content: `# Ohm’s Law: From Atoms to Circuits

Ohm’s law states that the current through a conductor is directly proportional to the voltage across it (at constant temperature):

\\[ I = \\frac{V}{R} \\]

## Microscopic Picture
Electrons drift through a lattice of atoms. Collisions with vibrating atoms create resistance. Higher temperature → more vibration → higher resistance (for metals).

## Non‑Ohmic Devices
LEDs and diodes do not follow a straight V–I line. Their current rises sharply after a threshold.

## Measuring in the Lab
- Put the meter in series for current, in parallel for voltage
- Use appropriate ranges to protect the meter

## Applications
From phone chargers to electric cars, designers pick resistor values to set safe currents.`,
    author: 'Ananya Iyer',
    category: 'Science',
    tags: ['ohms-law', 'electricity', 'physics'],
    readTime: 7,
    xpReward: XP_REWARDS.BLOG_READ,
    publishedAt: '2024-02-10',
    featured: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'blog-engineering-bridge-design',
    title: 'How Engineers Design Safe Bridges',
    excerpt: 'From loads and forces to materials and safety factors—an inside look at bridge design basics.',
    content: `# How Engineers Design Safe Bridges

## Loads and Forces
- Dead load: the bridge itself
- Live load: cars, people, wind
- Environmental: earthquakes, temperature

## Choosing a Type
Beam, arch, truss, suspension—each balances forces differently and fits different spans.

## Materials
Steel for tension, concrete for compression, composites for corrosion resistance.

## Safety Factors
Design loads are multiplied by safety factors to account for uncertainty.

## A Simple Thought Experiment
Why does a truss look like a series of triangles? Because triangles hold shape—great for distributing loads!`,
    author: 'Kunal Sharma',
    category: 'Engineering',
    tags: ['bridges', 'structures', 'design'],
    readTime: 6,
    xpReward: XP_REWARDS.BLOG_READ,
    publishedAt: '2024-02-15',
    featured: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'blog-study-learn-how-to-learn',
    title: 'How to Learn STEM Faster: A Student Playbook',
    excerpt: 'Spaced repetition, retrieval practice, and interleaving—evidence-based methods to master math, science, and code.',
    content: `# How to Learn STEM Faster: A Student Playbook

## 1) Retrieval Practice (Test Yourself)
Close the book. Write what you remember on paper. Checking the answer afterwards strengthens memory more than rereading.

## 2) Spaced Repetition
Review after 1 day, 3 days, 7 days, and 21 days. Short, frequent reviews beat long cramming sessions.

## 3) Interleaving
Mix topics (fractions + geometry) instead of massing one topic. Your brain learns to choose the right method.

## 4) Concrete → Abstract → Transfer
Start with examples, extract the rule, then apply it in a new problem or project.

## 5) Make it Active
Explain aloud (the Feynman Technique). Teach a friend. Build a tiny project.

## Starter Routine
- 20 min practice problems (retrieval)
- 5 min check + corrections
- 5 min “teach it back” summary
Repeat with spaced reviews.`,
    author: 'Nidhi Rao',
    category: 'Study Skills',
    tags: ['learning', 'study', 'spaced-repetition', 'retrieval'],
    readTime: 5,
    xpReward: XP_REWARDS.BLOG_READ,
    publishedAt: '2024-02-20',
    featured: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'blog-tech-data-structures-roadmap',
    title: 'Data Structures Roadmap for Beginners',
    excerpt: 'Arrays, lists, stacks, queues, trees, graphs—what they are, why they matter, and where to use them.',
    content: `# Data Structures Roadmap for Beginners

## Arrays vs Lists
Array: fixed-size contiguous memory; List: dynamic nodes linked by pointers. Arrays are cache-friendly and fast to index; lists shine in frequent insertions/deletions.

## Stack (LIFO)
Function calls, undo history.

## Queue (FIFO)
Print jobs, task scheduling.

## Hash Table
Key→value map with average O(1) get/set. Collisions resolved by chaining or open addressing.

## Trees
Binary Search Tree (BST) for ordered data; heaps for priority queues; tries for prefix lookups.

## Graphs
Networks of nodes and edges. BFS for shortest unweighted paths; DFS for exploration; Dijkstra for weighted paths.

## Practice Path
Implement each with 3 operations and a small project: to-do list (queue), browser history (stack), contact search (trie).`,
    author: 'Arjun Mehta',
    category: 'Technology',
    tags: ['data-structures', 'algorithms', 'roadmap'],
    readTime: 7,
    xpReward: XP_REWARDS.BLOG_READ,
    publishedAt: '2024-02-22',
    featured: false
  },
  {
    id: 'blog-science-climate-tech',
    title: 'Climate Tech: Real Innovations Solving Real Problems',
    excerpt: 'Heat pumps, solar + storage, carbon removal, and precision agriculture—how technology is bending the curve.',
    content: `# Climate Tech: Real Innovations Solving Real Problems

## Electrify Everything
Heat pumps replace fossil furnaces with efficient electric heating/cooling.

## Solar + Storage
Falling solar costs + lithium/iron batteries enable reliable clean power.

## Carbon Removal
Direct air capture and enhanced weathering complement deep emissions cuts.

## Precision Agriculture
Sensors + AI reduce fertilizer and water use while increasing yield.

## What Students Can Do
Join local energy clubs, build DIY monitoring projects, and learn life-cycle thinking.`,
    author: 'Sara Malik',
    category: 'Environmental Science',
    tags: ['climate', 'technology', 'energy'],
    readTime: 6,
    xpReward: XP_REWARDS.BLOG_READ,
    publishedAt: '2024-02-25',
    featured: false
  },
  {
    id: 'blog-eng-sustainable-design',
    title: 'Sustainable Engineering: Building a Better Future',
    excerpt: 'Learn how engineers are designing solutions that protect our environment while meeting human needs.',
    content: `# Sustainable Engineering: Building a Better Future

Sustainable engineering is the practice of designing systems and processes that meet present needs without compromising the ability of future generations to meet their own needs.

## What is Sustainable Engineering?

Sustainable engineering integrates environmental, social, and economic considerations into engineering design and decision-making. It's about creating solutions that are not only technically sound but also environmentally responsible and socially beneficial.

## Key Principles

### 1. Life Cycle Thinking
Consider the entire life cycle of a product or system, from raw material extraction to disposal or recycling.

### 2. Resource Efficiency
Minimize the use of materials, energy, and water throughout the design and operation phases.

### 3. Renewable Energy
Prioritize renewable energy sources over fossil fuels.

### 4. Waste Reduction
Design systems that minimize waste generation and maximize recycling opportunities.

### 5. Social Responsibility
Consider the impact of engineering decisions on communities and society.

## Examples of Sustainable Engineering

### Green Buildings
- Energy-efficient design
- Renewable energy integration
- Water conservation systems
- Sustainable materials
- Natural lighting and ventilation

### Sustainable Transportation
- Electric vehicles
- Public transportation systems
- Bicycle infrastructure
- Fuel-efficient aircraft
- Smart traffic management

### Water Management
- Rainwater harvesting systems
- Greywater recycling
- Efficient irrigation systems
- Water treatment technologies
- Flood management systems

### Waste Management
- Recycling facilities
- Composting systems
- Waste-to-energy plants
- Circular economy models
- Zero-waste initiatives

## Tools and Technologies

### Life Cycle Assessment (LCA)
A method for evaluating the environmental impact of a product or system throughout its entire life cycle.

### Building Information Modeling (BIM)
Digital tools that help engineers design more efficient and sustainable buildings.

### Renewable Energy Technologies
- Solar panels
- Wind turbines
- Hydroelectric systems
- Geothermal energy
- Biomass systems

### Smart Grid Technology
Intelligent electrical grids that optimize energy distribution and consumption.

## Challenges and Opportunities

### Challenges
- Higher upfront costs
- Limited availability of sustainable materials
- Resistance to change
- Complex regulations
- Need for new skills and knowledge

### Opportunities
- Growing market demand for sustainable solutions
- Government incentives and policies
- Technological advancements
- Career opportunities in green technology
- Positive environmental impact

## How Students Can Get Involved

### Education
- Study environmental engineering
- Take courses in sustainability
- Learn about green technologies
- Understand environmental regulations

### Projects
- Design sustainable solutions for local problems
- Participate in engineering competitions
- Work on renewable energy projects
- Develop waste reduction strategies

### Career Paths
- Environmental engineer
- Sustainability consultant
- Renewable energy engineer
- Green building designer
- Water resources engineer

## The Future of Sustainable Engineering

As the world faces increasing environmental challenges, sustainable engineering will become even more important. Students today will be the engineers who design the solutions for a more sustainable future.

### Emerging Trends
- Circular economy models
- Carbon capture and storage
- Smart cities
- Sustainable agriculture
- Ocean cleanup technologies

## Making a Difference

Every engineering decision has environmental and social implications. By choosing sustainable approaches, engineers can help create a better world for future generations.

Remember: The best engineering solutions are those that solve problems while protecting our planet and improving people's lives.`,
    author: 'Prof. David Kim',
    category: 'Engineering',
    tags: ['sustainable-engineering', 'environment', 'green-technology', 'future', 'innovation'],
    readTime: 12,
    xpReward: XP_REWARDS.BLOG_READ,
    publishedAt: '2024-01-08',
    featured: true
  }
];

// Course Modules Database
export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'module-python-basics-variables',
    title: 'Python Basics: Variables, Types, and I/O',
    topic: 'Python Programming',
    level: 'beginner',
    subject: 'technology',
    class: 9,
    duration: 45,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand variables and dynamic typing in Python',
      'Use basic data types: int, float, str, bool',
      'Read input and print output'
    ],
    problemStatement: "You're writing a small script that greets users and calculates their age next year. To do this, you need variables, data types, and basic input/output.",
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Variables and Assignment: Python assigns with = and infers type dynamically.',
        example: 'name = "Ava", age = 12'
      },
      {
        step: 2,
        concept: 'Basic Data Types: int (whole numbers), float (decimals), str (text), bool (True/False)',
        example: 'years = 5, price = 9.99, msg = "Hello", is_student = True'
      },
      {
        step: 3,
        concept: 'Input and Output: Read with input(), print with print()',
        example: 'name = input("Enter your name: "), print("Hello,", name)'
      },
      {
        step: 4,
        concept: 'Type Conversion: Convert between types with int(), float(), str()',
        example: 'age = int(input("Enter your age: ")), print("Next year you will be", age + 1)'
      }
    ],
    handsOnTask: {
      task: 'Write a script that asks for a user\'s name and the number of books they read this month, then prints a message: "Nice job, [name]! You read [n] books."',
      input: 'name = "Ava", books = 4',
      expectedOutput: 'Nice job, Ava! You read 4 books.'
    },
    realWorldApplication: 'Intake forms, survey bots, or CLI tools often collect simple text/number inputs and summarize results to the user.',
    quizQuestion: {
      question: 'What is the output type of input() in Python?',
      options: ['int', 'float', 'str', 'bool'],
      correctAnswer: 2,
      explanation: 'input() always returns a string; convert to int/float as needed'
    },
    summary: [
      'Variables store values and Python infers types',
      'Core types: int, float, str, bool',
      'Use input() and print() for basic I/O',
      'Convert types explicitly with int(), float(), str()'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'module-math-algebra-equations',
    title: 'Solving Linear Equations: Balance Method',
    topic: 'Algebra',
    level: 'beginner',
    subject: 'math',
    class: 7,
    duration: 40,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand what linear equations are',
      'Solve equations using the balance method',
      'Apply inverse operations correctly'
    ],
    problemStatement: 'You need to find the value of x in equations like 3x + 2 = 11. Think of the equation as a balanced scale - whatever you do to one side, you must do to the other.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Linear equations have variables with power 1 and can be solved using inverse operations.',
        example: '3x + 2 = 11 (linear), x² + 1 = 5 (not linear)'
      },
      {
        step: 2,
        concept: 'Balance Method: Keep both sides equal by doing the same operation to both sides.',
        example: '3x + 2 = 11 → subtract 2 from both sides → 3x = 9'
      },
      {
        step: 3,
        concept: 'Use inverse operations: addition ↔ subtraction, multiplication ↔ division.',
        example: '3x = 9 → divide both sides by 3 → x = 3'
      },
      {
        step: 4,
        concept: 'Check your answer by substituting back into the original equation.',
        example: '3(3) + 2 = 9 + 2 = 11 ✓'
      }
    ],
    handsOnTask: {
      task: 'Solve the equation 2x - 5 = 7 using the balance method. Show each step.',
      input: '2x - 5 = 7',
      expectedOutput: 'x = 6 (steps: 2x = 12, x = 6)'
    },
    realWorldApplication: 'Used in budgeting (finding unknown costs), physics (solving for variables), and engineering (calculating dimensions).',
    quizQuestion: {
      question: 'What is the first step to solve 4x + 3 = 15?',
      options: ['Divide by 4', 'Subtract 3 from both sides', 'Add 3 to both sides', 'Multiply by 4'],
      correctAnswer: 1,
      explanation: 'Subtract 3 from both sides to isolate the term with x'
    },
    summary: [
      'Linear equations have variables with power 1',
      'Balance method: same operation on both sides',
      'Use inverse operations to isolate the variable',
      'Always check your answer by substitution'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'module-python-syntax-comments',
    title: 'Python Syntax and Comments',
    topic: 'Python Programming',
    level: 'beginner',
    subject: 'technology',
    class: 9,
    duration: 30,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand Python syntax rules and indentation',
      'Write proper comments in Python code',
      'Use print() function for output',
      'Handle syntax errors and debugging'
    ],
    problemStatement: 'You need to write clean, readable Python code that others can understand. This requires proper syntax, meaningful comments, and clear output formatting.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Python Syntax: Python uses indentation (spaces/tabs) to define code blocks instead of curly braces.',
        example: 'if True:\n    print("This is indented")\nprint("This is not")'
      },
      {
        step: 2,
        concept: 'Comments: Use # for single-line comments and """ for multi-line comments to explain your code.',
        example: '# This is a single-line comment\n"""This is a\nmulti-line comment"""'
      },
      {
        step: 3,
        concept: 'Print Function: Use print() to display output. You can print strings, variables, and multiple items.',
        example: 'print("Hello World")\nprint("Name:", name)\nprint("Age:", age)'
      },
      {
        step: 4,
        concept: 'Common Syntax Rules: No semicolons needed, case-sensitive, use meaningful variable names.',
        example: 'name = "Alice"  # Good\nName = "Bob"    # Different variable\nage = 25        # Numbers without quotes'
      }
    ],
    handsOnTask: {
      task: 'Write a Python script that prints your name, age, and favorite color with proper comments explaining each line.',
      input: 'name = "Your Name", age = 20, color = "blue"',
      expectedOutput: 'Name: Your Name\nAge: 20\nFavorite Color: blue'
    },
    realWorldApplication: 'Clean syntax and comments are essential in professional software development, code reviews, and collaborative projects.',
    quizQuestion: {
      question: 'What is used to define code blocks in Python?',
      options: ['Curly braces {}', 'Indentation (spaces/tabs)', 'Square brackets []', 'Parentheses ()'],
      correctAnswer: 1,
      explanation: 'Python uses indentation to define code blocks, making code more readable'
    },
    summary: [
      'Python uses indentation instead of braces for code blocks',
      'Comments help explain code using # or """',
      'print() function displays output to the console',
      'Follow syntax rules for clean, readable code'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'module-python-data-types',
    title: 'Python Data Types: Numbers and Strings',
    topic: 'Python Programming',
    level: 'beginner',
    subject: 'technology',
    class: 9,
    duration: 40,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand different Python data types',
      'Work with integers, floats, and strings',
      'Perform type conversion between data types',
      'Use string methods and formatting'
    ],
    problemStatement: 'You need to handle different types of data in your Python programs - numbers for calculations, strings for text, and convert between them when needed.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Numbers: Python has int (whole numbers) and float (decimal numbers) types.',
        example: 'age = 25        # int\nprice = 19.99   # float\nresult = age + price  # 44.99'
      },
      {
        step: 2,
        concept: 'Strings: Text data enclosed in quotes. Can use single, double, or triple quotes.',
        example: 'name = "Alice"\nmessage = \'Hello World\'\ndoc = """Multi-line\ndocumentation"""'
      },
      {
        step: 3,
        concept: 'Type Conversion: Convert between types using int(), float(), str() functions.',
        example: 'num_str = "123"\nnumber = int(num_str)  # Convert to int\nstr_num = str(456)     # Convert to string'
      },
      {
        step: 4,
        concept: 'String Methods: Use .upper(), .lower(), .strip(), .split() for string manipulation.',
        example: 'text = "  Hello World  "\nprint(text.strip().upper())  # "HELLO WORLD"'
      }
    ],
    handsOnTask: {
      task: 'Create a program that takes a user\'s name and age, then prints a formatted message showing their age in 10 years.',
      input: 'name = "Alice", age = "25"',
      expectedOutput: 'Hello Alice! In 10 years, you will be 35 years old.'
    },
    realWorldApplication: 'Data types are fundamental in web development, data analysis, and any application that processes user input.',
    quizQuestion: {
      question: 'What will int("3.14") return?',
      options: ['3.14', '3', 'Error', 'None'],
      correctAnswer: 2,
      explanation: 'int() cannot convert a string with decimal point directly - it will raise a ValueError'
    },
    summary: [
      'Python has int, float, and str data types',
      'Use type conversion functions to change data types',
      'Strings have many useful methods for manipulation',
      'Choose appropriate data types for your data'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'module-python-lists-tuples',
    title: 'Python Lists and Tuples',
    topic: 'Python Programming',
    level: 'intermediate',
    subject: 'technology',
    class: 10,
    duration: 50,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Create and manipulate Python lists',
      'Understand the difference between lists and tuples',
      'Use list methods like append, remove, sort',
      'Access and modify list elements by index'
    ],
    problemStatement: 'You need to store and manage collections of data in your Python programs. Lists and tuples are essential for handling multiple items efficiently.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Lists: Mutable collections of items in square brackets. Can contain different data types.',
        example: 'fruits = ["apple", "banana", "orange"]\nmixed = [1, "hello", 3.14, True]'
      },
      {
        step: 2,
        concept: 'List Access: Use index numbers to access elements. Index starts at 0.',
        example: 'fruits = ["apple", "banana", "orange"]\nprint(fruits[0])  # "apple"\nprint(fruits[-1]) # "orange"'
      },
      {
        step: 3,
        concept: 'List Methods: append(), remove(), insert(), sort() for modifying lists.',
        example: 'fruits.append("grape")\nfruits.remove("banana")\nfruits.sort()'
      },
      {
        step: 4,
        concept: 'Tuples: Immutable collections in parentheses. Cannot be changed after creation.',
        example: 'coordinates = (10, 20)\ncolors = ("red", "green", "blue")\n# coordinates[0] = 5  # Error!'
      }
    ],
    handsOnTask: {
      task: 'Create a shopping list program that allows adding items, removing items, and displaying the sorted list.',
      input: 'Add: "milk", "bread", "eggs" then remove "bread"',
      expectedOutput: 'Final list: ["eggs", "milk"]'
    },
    realWorldApplication: 'Lists and tuples are used in data processing, game development, and web applications for managing collections of data.',
    quizQuestion: {
      question: 'What is the main difference between lists and tuples?',
      options: ['Lists use [], tuples use ()', 'Lists are mutable, tuples are immutable', 'Lists are faster', 'No difference'],
      correctAnswer: 1,
      explanation: 'Lists can be modified after creation, but tuples cannot be changed'
    },
    summary: [
      'Lists are mutable collections in square brackets',
      'Tuples are immutable collections in parentheses',
      'Use index numbers to access elements (starting from 0)',
      'Lists have methods for adding, removing, and sorting items'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'module-python-loops',
    title: 'Python Loops: For and While',
    topic: 'Python Programming',
    level: 'intermediate',
    subject: 'technology',
    class: 10,
    duration: 45,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Use for loops to iterate over sequences',
      'Use while loops for conditional repetition',
      'Control loop execution with break and continue',
      'Use range() function for number sequences'
    ],
    problemStatement: 'You need to repeat code multiple times or process each item in a collection. Loops allow you to automate repetitive tasks efficiently.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'For Loops: Iterate over sequences like lists, strings, or ranges.',
        example: 'for fruit in ["apple", "banana", "orange"]:\n    print(fruit)'
      },
      {
        step: 2,
        concept: 'Range Function: Generate sequences of numbers for counting.',
        example: 'for i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\nfor i in range(1, 6):\n    print(i)  # 1, 2, 3, 4, 5'
      },
      {
        step: 3,
        concept: 'While Loops: Repeat code while a condition is true.',
        example: 'count = 0\nwhile count < 5:\n    print(count)\n    count += 1'
      },
      {
        step: 4,
        concept: 'Loop Control: Use break to exit loop, continue to skip iteration.',
        example: 'for i in range(10):\n    if i == 3:\n        continue  # Skip 3\n    if i == 7:\n        break     # Exit at 7\n    print(i)'
      }
    ],
    handsOnTask: {
      task: 'Write a program that prints numbers 1-10, skips multiples of 3, and stops at 8.',
      input: 'Loop through range(1, 11)',
      expectedOutput: '1, 2, 4, 5, 7, 8'
    },
    realWorldApplication: 'Loops are essential in data processing, game development, web scraping, and any task requiring repetition.',
    quizQuestion: {
      question: 'What does range(3, 8) generate?',
      options: ['[3, 4, 5, 6, 7, 8]', '[3, 4, 5, 6, 7]', '[0, 1, 2, 3, 4, 5, 6, 7]', 'Error'],
      correctAnswer: 1,
      explanation: 'range(3, 8) generates numbers from 3 up to (but not including) 8'
    },
    summary: [
      'For loops iterate over sequences like lists and ranges',
      'While loops repeat while a condition is true',
      'range() generates number sequences for counting',
      'Use break to exit loops and continue to skip iterations'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'module-math-fractions-operations',
    title: 'Fraction Operations: Addition and Subtraction',
    topic: 'Fractions',
    level: 'beginner',
    subject: 'math',
    class: 6,
    duration: 35,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Add fractions with like denominators',
      'Add fractions with unlike denominators using LCD',
      'Subtract fractions with like and unlike denominators',
      'Simplify fractions to lowest terms'
    ],
    problemStatement: 'You need to combine parts of a whole (like pizza slices or measurements) that are represented as fractions. This requires adding and subtracting fractions correctly.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Like Denominators: When denominators are the same, add/subtract numerators only.',
        example: '3/8 + 2/8 = (3+2)/8 = 5/8\n7/12 - 3/12 = (7-3)/12 = 4/12 = 1/3'
      },
      {
        step: 2,
        concept: 'Unlike Denominators: Find LCD (Least Common Denominator) first.',
        example: '1/3 + 1/4: LCD of 3 and 4 is 12\n1/3 = 4/12, 1/4 = 3/12\n4/12 + 3/12 = 7/12'
      },
      {
        step: 3,
        concept: 'LCD Method: Find LCM of denominators, then convert each fraction.',
        example: '2/5 + 1/6: LCD = 30\n2/5 = 12/30, 1/6 = 5/30\n12/30 + 5/30 = 17/30'
      },
      {
        step: 4,
        concept: 'Simplification: Reduce fractions by dividing numerator and denominator by GCF.',
        example: '8/12 = 8÷4/12÷4 = 2/3\n15/20 = 15÷5/20÷5 = 3/4'
      }
    ],
    handsOnTask: {
      task: 'Add 2/3 + 1/4 and subtract 5/6 - 1/3. Show all steps including finding LCD and simplifying.',
      input: '2/3 + 1/4 and 5/6 - 1/3',
      expectedOutput: '2/3 + 1/4 = 11/12, 5/6 - 1/3 = 1/2'
    },
    realWorldApplication: 'Used in cooking (recipe adjustments), construction (measurements), and financial calculations (interest rates).',
    quizQuestion: {
      question: 'What is 1/2 + 1/3?',
      options: ['2/5', '5/6', '1/5', '3/5'],
      correctAnswer: 1,
      explanation: 'LCD is 6: 1/2 = 3/6, 1/3 = 2/6, so 3/6 + 2/6 = 5/6'
    },
    summary: [
      'Add/subtract like denominators by combining numerators',
      'Find LCD for unlike denominators before adding/subtracting',
      'Convert fractions to equivalent fractions with LCD',
      'Always simplify final answers to lowest terms'
    ],
    createdAt: '2024-01-21'
  },
  // Class 6 Mathematics Modules
  {
    id: 'class6-math-integers',
    title: 'Class 6: Understanding Integers',
    topic: 'Integers',
    level: 'beginner',
    subject: 'math',
    class: 6,
    duration: 40,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand positive and negative integers',
      'Represent integers on number line',
      'Compare and order integers',
      'Perform basic operations with integers'
    ],
    problemStatement: 'You need to understand how negative numbers work in real life situations like temperature below zero, depths below sea level, or debts. Integers help us represent these situations mathematically.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'What are Integers: Integers include positive numbers (1, 2, 3...), negative numbers (-1, -2, -3...), and zero.',
        example: 'Temperature: +25°C (hot), 0°C (freezing), -10°C (cold)'
      },
      {
        step: 2,
        concept: 'Number Line: Draw a line with zero in the middle. Positive numbers go right, negative numbers go left.',
        example: '-3 -2 -1 0 1 2 3'
      },
      {
        step: 3,
        concept: 'Comparing Integers: Numbers to the right are greater. -2 > -5 because -2 is to the right of -5.',
        example: '-5 < -2 < 0 < 3 < 7'
      },
      {
        step: 4,
        concept: 'Adding Integers: Same signs add and keep sign. Different signs subtract and keep larger sign.',
        example: '3 + 5 = 8, -3 + (-5) = -8, 3 + (-5) = -2'
      }
    ],
    handsOnTask: {
      task: 'Solve these problems: a) -7 + 4, b) 5 + (-3), c) -2 + (-6), d) Which is greater: -8 or -3?',
      input: 'Integer operations and comparisons',
      expectedOutput: 'a) -3, b) 2, c) -8, d) -3 is greater than -8'
    },
    realWorldApplication: 'Used in weather reports (temperature), banking (debits/credits), elevation (above/below sea level), and sports scores.',
    quizQuestion: {
      question: 'What is -5 + 3?',
      options: ['8', '-8', '2', '-2'],
      correctAnswer: 3,
      explanation: 'Different signs: subtract 5-3=2, keep sign of larger number (5), so answer is -2'
    },
    summary: [
      'Integers include positive, negative numbers and zero',
      'Number line helps visualize and compare integers',
      'Right side numbers are greater than left side',
      'Add same signs, subtract different signs'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'class6-math-fractions',
    title: 'Class 6: Introduction to Fractions',
    topic: 'Fractions',
    level: 'beginner',
    subject: 'math',
    class: 6,
    duration: 45,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand what fractions represent',
      'Identify numerator and denominator',
      'Compare fractions with same denominator',
      'Add and subtract like fractions'
    ],
    problemStatement: 'You have a pizza cut into 8 equal slices. You eat 3 slices. How much of the pizza did you eat? Fractions help us represent parts of a whole.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'What are Fractions: A fraction represents parts of a whole. It has two numbers: numerator (top) and denominator (bottom).',
        example: '3/8 means 3 parts out of 8 equal parts'
      },
      {
        step: 2,
        concept: 'Numerator and Denominator: Numerator tells how many parts we have, denominator tells how many equal parts the whole is divided into.',
        example: 'In 3/8: 3 is numerator, 8 is denominator'
      },
      {
        step: 3,
        concept: 'Comparing Like Fractions: When denominators are same, compare numerators. Larger numerator = larger fraction.',
        example: '3/8 > 2/8 because 3 > 2'
      },
      {
        step: 4,
        concept: 'Adding Like Fractions: Add numerators, keep denominator same.',
        example: '3/8 + 2/8 = (3+2)/8 = 5/8'
      }
    ],
    handsOnTask: {
      task: 'Solve: a) 5/12 + 3/12, b) 7/9 - 2/9, c) Which is larger: 4/7 or 3/7?',
      input: 'Fraction operations with same denominators',
      expectedOutput: 'a) 8/12, b) 5/9, c) 4/7 is larger'
    },
    realWorldApplication: 'Used in cooking (recipe measurements), time (quarter past, half past), money (half dollar), and sports (half-time).',
    quizQuestion: {
      question: 'What does the denominator in a fraction tell us?',
      options: ['How many parts we have', 'How many equal parts the whole is divided into', 'The total value', 'The fraction value'],
      correctAnswer: 1,
      explanation: 'Denominator tells us into how many equal parts the whole is divided'
    },
    summary: [
      'Fractions represent parts of a whole',
      'Numerator = parts we have, Denominator = total equal parts',
      'Compare like fractions by comparing numerators',
      'Add/subtract like fractions by adding/subtracting numerators'
    ],
    createdAt: '2024-01-21'
  },
  // Class 6 Science Modules
  {
    id: 'class6-science-matter',
    title: 'Class 6: States of Matter',
    topic: 'Matter',
    level: 'beginner',
    subject: 'science',
    class: 6,
    duration: 35,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Identify three states of matter',
      'Understand properties of solids, liquids, and gases',
      'Recognize changes of state',
      'Give examples of each state'
    ],
    problemStatement: 'Look around you - everything you see is made of matter. Water can be ice (solid), liquid water, or steam (gas). Understanding states of matter helps explain how things behave.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Three States: Matter exists in three main states - solid, liquid, and gas.',
        example: 'Ice (solid), water (liquid), steam (gas)'
      },
      {
        step: 2,
        concept: 'Solids: Have fixed shape and volume. Particles are tightly packed and vibrate in place.',
        example: 'Rock, wood, metal, ice'
      },
      {
        step: 3,
        concept: 'Liquids: Have fixed volume but take shape of container. Particles can move around but stay close.',
        example: 'Water, milk, oil, juice'
      },
      {
        step: 4,
        concept: 'Gases: No fixed shape or volume. Particles move freely and spread out to fill space.',
        example: 'Air, steam, oxygen, carbon dioxide'
      }
    ],
    handsOnTask: {
      task: 'Classify these as solid, liquid, or gas: a) pencil, b) milk, c) oxygen, d) butter, e) helium',
      input: 'Various materials to classify',
      expectedOutput: 'a) solid, b) liquid, c) gas, d) solid, e) gas'
    },
    realWorldApplication: 'Understanding states helps in cooking (melting butter), weather (water cycle), and technology (refrigerators, air conditioning).',
    quizQuestion: {
      question: 'Which state of matter has particles that move freely and spread out?',
      options: ['Solid', 'Liquid', 'Gas', 'All of them'],
      correctAnswer: 2,
      explanation: 'Gases have particles that move freely and spread out to fill available space'
    },
    summary: [
      'Matter has three states: solid, liquid, gas',
      'Solids: fixed shape and volume',
      'Liquids: fixed volume, takes container shape',
      'Gases: no fixed shape or volume'
    ],
    createdAt: '2024-01-21'
  },
  // Class 7 Mathematics Modules
  {
    id: 'class7-math-algebra',
    title: 'Class 7: Introduction to Algebra',
    topic: 'Algebra',
    level: 'beginner',
    subject: 'math',
    class: 7,
    duration: 50,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand variables and constants',
      'Write algebraic expressions',
      'Evaluate expressions for given values',
      'Solve simple linear equations'
    ],
    problemStatement: 'You have 5 apples and buy some more. If you have 12 apples total, how many did you buy? Algebra uses letters to represent unknown numbers.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Variables and Constants: Variables are letters representing unknown numbers. Constants are fixed numbers.',
        example: 'In 5 + x = 12: 5 and 12 are constants, x is variable'
      },
      {
        step: 2,
        concept: 'Algebraic Expressions: Combine variables, constants, and operations without equals sign.',
        example: '3x + 7, 2y - 5, x² + 3x + 2'
      },
      {
        step: 3,
        concept: 'Evaluating Expressions: Substitute numbers for variables and calculate.',
        example: 'If x = 3, then 2x + 5 = 2(3) + 5 = 6 + 5 = 11'
      },
      {
        step: 4,
        concept: 'Solving Equations: Find the value of variable that makes equation true.',
        example: 'x + 3 = 7, so x = 7 - 3 = 4'
      }
    ],
    handsOnTask: {
      task: 'Solve: a) x + 5 = 12, b) 2y - 3 = 7, c) Evaluate 3x + 2 when x = 4',
      input: 'Simple algebraic equations and expressions',
      expectedOutput: 'a) x = 7, b) y = 5, c) 14'
    },
    realWorldApplication: 'Used in science formulas, business calculations, computer programming, and engineering design.',
    quizQuestion: {
      question: 'What is the value of x in the equation 2x + 3 = 9?',
      options: ['3', '6', '12', '15'],
      correctAnswer: 0,
      explanation: '2x + 3 = 9, so 2x = 6, therefore x = 3'
    },
    summary: [
      'Variables represent unknown numbers',
      'Algebraic expressions combine variables and constants',
      'Evaluate by substituting numbers for variables',
      'Solve equations by finding variable values'
    ],
    createdAt: '2024-01-21'
  },
  // Class 8 Mathematics Modules
  {
    id: 'class8-math-geometry',
    title: 'Class 8: Quadrilaterals and Polygons',
    topic: 'Geometry',
    level: 'intermediate',
    subject: 'math',
    class: 8,
    duration: 55,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Identify different types of quadrilaterals',
      'Understand properties of parallelograms, rectangles, squares',
      'Calculate area and perimeter of quadrilaterals',
      'Recognize regular and irregular polygons'
    ],
    problemStatement: 'You need to design a rectangular garden with length 8m and width 6m. How much fencing do you need? How much area will it cover? Geometry helps solve real-world measurement problems.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Quadrilaterals: Four-sided polygons. Types include parallelogram, rectangle, square, rhombus, trapezoid.',
        example: 'Rectangle: opposite sides equal and parallel, all angles 90°'
      },
      {
        step: 2,
        concept: 'Properties: Each quadrilateral has specific properties about sides, angles, and diagonals.',
        example: 'Square: all sides equal, all angles 90°, diagonals equal and perpendicular'
      },
      {
        step: 3,
        concept: 'Area Formulas: Rectangle = length × width, Square = side², Parallelogram = base × height.',
        example: 'Rectangle 8m × 6m = 48 m²'
      },
      {
        step: 4,
        concept: 'Perimeter: Sum of all sides. Rectangle = 2(length + width).',
        example: 'Rectangle 8m × 6m: P = 2(8+6) = 28m'
      }
    ],
    handsOnTask: {
      task: 'Find area and perimeter of: a) Rectangle 12m × 8m, b) Square with side 5m',
      input: 'Rectangular and square dimensions',
      expectedOutput: 'a) Area = 96 m², Perimeter = 40m, b) Area = 25 m², Perimeter = 20m'
    },
    realWorldApplication: 'Used in architecture (room dimensions), landscaping (garden planning), construction (flooring area), and art (canvas sizes).',
    quizQuestion: {
      question: 'What is the area of a rectangle with length 10m and width 7m?',
      options: ['17 m²', '34 m²', '70 m²', '140 m²'],
      correctAnswer: 2,
      explanation: 'Area = length × width = 10 × 7 = 70 m²'
    },
    summary: [
      'Quadrilaterals are four-sided polygons',
      'Each type has specific properties',
      'Area = length × width for rectangles',
      'Perimeter = sum of all sides'
    ],
    createdAt: '2024-01-21'
  },
  // Class 9 Mathematics Modules
  {
    id: 'class9-math-coordinate-geometry',
    title: 'Class 9: Coordinate Geometry',
    topic: 'Coordinate Geometry',
    level: 'intermediate',
    subject: 'math',
    class: 9,
    duration: 60,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand Cartesian coordinate system',
      'Plot points on coordinate plane',
      'Find distance between two points',
      'Identify quadrants and axes'
    ],
    problemStatement: 'You need to find the distance between two cities on a map. Coordinate geometry helps us locate points and calculate distances using a grid system.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Coordinate System: Two perpendicular lines (axes) intersect at origin (0,0). X-axis horizontal, Y-axis vertical.',
        example: 'Point (3,4) means 3 units right, 4 units up from origin'
      },
      {
        step: 2,
        concept: 'Quadrants: Four regions divided by axes. I: (+,+), II: (-,+), III: (-,-), IV: (+,-).',
        example: '(2,3) in Quadrant I, (-2,3) in Quadrant II'
      },
      {
        step: 3,
        concept: 'Distance Formula: Distance between (x₁,y₁) and (x₂,y₂) is √[(x₂-x₁)² + (y₂-y₁)²].',
        example: 'Distance between (0,0) and (3,4) = √(3² + 4²) = √25 = 5'
      },
      {
        step: 4,
        concept: 'Midpoint: Midpoint of line segment is average of coordinates.',
        example: 'Midpoint of (2,4) and (6,8) is ((2+6)/2, (4+8)/2) = (4,6)'
      }
    ],
    handsOnTask: {
      task: 'Find: a) Distance between (1,2) and (4,6), b) Midpoint of (0,0) and (8,6)',
      input: 'Two coordinate points',
      expectedOutput: 'a) 5 units, b) (4,3)'
    },
    realWorldApplication: 'Used in GPS navigation, computer graphics, game development, and scientific data analysis.',
    quizQuestion: {
      question: 'In which quadrant is the point (-3, 5) located?',
      options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
      correctAnswer: 1,
      explanation: 'Point (-3,5) has negative x and positive y, so it\'s in Quadrant II'
    },
    summary: [
      'Coordinate system uses two perpendicular axes',
      'Four quadrants based on sign of coordinates',
      'Distance formula calculates length between points',
      'Midpoint is average of coordinates'
    ],
    createdAt: '2024-01-21'
  },
  // Class 10 Mathematics Modules
  {
    id: 'class10-math-trigonometry',
    title: 'Class 10: Introduction to Trigonometry',
    topic: 'Trigonometry',
    level: 'intermediate',
    subject: 'math',
    class: 10,
    duration: 65,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand trigonometric ratios',
      'Use sine, cosine, and tangent',
      'Apply trigonometry to right triangles',
      'Solve real-world problems using trigonometry'
    ],
    problemStatement: 'You need to find the height of a tree without climbing it. Trigonometry uses angles and distances to calculate heights and distances we can\'t measure directly.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Trigonometric Ratios: In a right triangle, sine = opposite/hypotenuse, cosine = adjacent/hypotenuse, tangent = opposite/adjacent.',
        example: 'For angle θ: sin θ = opp/hyp, cos θ = adj/hyp, tan θ = opp/adj'
      },
      {
        step: 2,
        concept: 'SOH-CAH-TOA: Memory trick - Sine Opposite Hypotenuse, Cosine Adjacent Hypotenuse, Tangent Opposite Adjacent.',
        example: 'If opposite = 3, adjacent = 4, hypotenuse = 5, then tan θ = 3/4'
      },
      {
        step: 3,
        concept: 'Special Angles: 30°, 45°, 60° have exact values. 45° triangle: sides 1,1,√2. 30°-60° triangle: sides 1,√3,2.',
        example: 'sin 30° = 1/2, cos 45° = 1/√2, tan 60° = √3'
      },
      {
        step: 4,
        concept: 'Applications: Use trigonometry to find heights, distances, and angles in real problems.',
        example: 'Height = distance × tan(angle of elevation)'
      }
    ],
    handsOnTask: {
      task: 'In a right triangle with angle 30° and opposite side 5, find: a) hypotenuse, b) adjacent side',
      input: 'Right triangle with 30° angle and opposite = 5',
      expectedOutput: 'a) hypotenuse = 10, b) adjacent = 5√3'
    },
    realWorldApplication: 'Used in surveying, navigation, architecture, engineering, astronomy, and physics.',
    quizQuestion: {
      question: 'What is sin 45°?',
      options: ['1/2', '1/√2', '√3/2', '1'],
      correctAnswer: 1,
      explanation: 'In a 45°-45°-90° triangle, sin 45° = opposite/hypotenuse = 1/√2'
    },
    summary: [
      'Trigonometry relates angles to side ratios in right triangles',
      'SOH-CAH-TOA helps remember the three main ratios',
      'Special angles have exact trigonometric values',
      'Use trigonometry to solve real-world measurement problems'
    ],
    createdAt: '2024-01-21'
  },
  // Class 11 Mathematics Modules
  {
    id: 'class11-math-calculus-limits',
    title: 'Class 11: Introduction to Limits',
    topic: 'Calculus',
    level: 'advanced',
    subject: 'math',
    class: 11,
    duration: 70,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand concept of limits',
      'Evaluate limits algebraically',
      'Understand continuity and discontinuity',
      'Apply limits to solve problems'
    ],
    problemStatement: 'What happens to the function f(x) = (x²-1)/(x-1) as x approaches 1? The function is undefined at x=1, but we can find what value it approaches.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'What is a Limit: A limit describes the behavior of a function as the input approaches a particular value.',
        example: 'lim(x→2) x² = 4 means as x gets closer to 2, x² gets closer to 4'
      },
      {
        step: 2,
        concept: 'Direct Substitution: If function is defined at the point, substitute directly.',
        example: 'lim(x→3) 2x + 1 = 2(3) + 1 = 7'
      },
      {
        step: 3,
        concept: 'Factoring: When direct substitution gives 0/0, factor and cancel common terms.',
        example: 'lim(x→1) (x²-1)/(x-1) = lim(x→1) (x+1)(x-1)/(x-1) = lim(x→1) (x+1) = 2'
      },
      {
        step: 4,
        concept: 'Continuity: A function is continuous at a point if its limit equals its value at that point.',
        example: 'f(x) = x² is continuous at x=2 because lim(x→2) x² = f(2) = 4'
      }
    ],
    handsOnTask: {
      task: 'Find: a) lim(x→3) (x²-9)/(x-3), b) lim(x→0) (sin x)/x',
      input: 'Limit problems requiring factoring or special limits',
      expectedOutput: 'a) 6, b) 1'
    },
    realWorldApplication: 'Used in physics (instantaneous velocity), economics (marginal cost), engineering (stress analysis), and computer science (algorithms).',
    quizQuestion: {
      question: 'What is lim(x→2) (x²-4)/(x-2)?',
      options: ['0', '2', '4', 'Undefined'],
      correctAnswer: 2,
      explanation: 'Factor: (x-2)(x+2)/(x-2) = x+2, so lim(x→2) (x+2) = 4'
    },
    summary: [
      'Limits describe function behavior near a point',
      'Use direct substitution when possible',
      'Factor to resolve 0/0 indeterminate forms',
      'Continuity means limit equals function value'
    ],
    createdAt: '2024-01-21'
  },
  // Class 12 Mathematics Modules
  {
    id: 'class12-math-differentiation',
    title: 'Class 12: Differentiation and Derivatives',
    topic: 'Calculus',
    level: 'advanced',
    subject: 'math',
    class: 12,
    duration: 75,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand concept of derivatives',
      'Find derivatives using rules',
      'Apply derivatives to optimization',
      'Solve real-world problems using derivatives'
    ],
    problemStatement: 'A ball is thrown upward. When does it reach maximum height? What is its velocity at any time? Derivatives help us find rates of change and optimize functions.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'What is a Derivative: The derivative measures the rate of change of a function at any point.',
        example: 'If s(t) = position, then v(t) = s\'(t) = velocity, a(t) = v\'(t) = acceleration'
      },
      {
        step: 2,
        concept: 'Power Rule: If f(x) = xⁿ, then f\'(x) = nxⁿ⁻¹.',
        example: 'If f(x) = x³, then f\'(x) = 3x²'
      },
      {
        step: 3,
        concept: 'Product Rule: (fg)\' = f\'g + fg\'. Quotient Rule: (f/g)\' = (f\'g - fg\')/g².',
        example: 'If f(x) = x²·sin x, then f\'(x) = 2x·sin x + x²·cos x'
      },
      {
        step: 4,
        concept: 'Applications: Find maximum/minimum values, solve optimization problems.',
        example: 'To maximize area A = xy with constraint x + y = 10, find dA/dx = 0'
      }
    ],
    handsOnTask: {
      task: 'Find derivatives: a) f(x) = x⁴ + 3x² - 2x + 1, b) f(x) = x²·eˣ',
      input: 'Polynomial and product functions',
      expectedOutput: 'a) f\'(x) = 4x³ + 6x - 2, b) f\'(x) = 2x·eˣ + x²·eˣ'
    },
    realWorldApplication: 'Used in physics (motion), economics (marginal analysis), engineering (optimization), medicine (drug concentration), and machine learning (gradient descent).',
    quizQuestion: {
      question: 'What is the derivative of f(x) = x³ - 2x² + 5x - 1?',
      options: ['3x² - 4x + 5', '3x² - 2x + 5', 'x² - 4x + 5', '3x² - 4x'],
      correctAnswer: 0,
      explanation: 'Using power rule: f\'(x) = 3x² - 4x + 5'
    },
    summary: [
      'Derivatives measure rates of change',
      'Power rule: (xⁿ)\' = nxⁿ⁻¹',
      'Product and quotient rules for complex functions',
      'Use derivatives for optimization problems'
    ],
    createdAt: '2024-01-21'
  },
  // Class 6 Science Modules (continued)
  {
    id: 'class6-science-light',
    title: 'Class 6: Light and Shadows',
    topic: 'Light',
    level: 'beginner',
    subject: 'science',
    class: 6,
    duration: 40,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand how light travels',
      'Explain formation of shadows',
      'Identify transparent, translucent, and opaque objects',
      'Understand reflection of light'
    ],
    problemStatement: 'Why do you see your shadow on a sunny day? Why can you see through glass but not through wood? Understanding light helps explain how we see the world around us.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Light Travel: Light travels in straight lines from a source to our eyes.',
        example: 'Sunlight travels straight from sun to Earth, creating shadows'
      },
      {
        step: 2,
        concept: 'Shadows: Formed when light is blocked by opaque objects. Shadow shape matches object shape.',
        example: 'Your shadow on ground has your shape because your body blocks sunlight'
      },
      {
        step: 3,
        concept: 'Object Types: Transparent (glass) lets light pass, translucent (wax paper) scatters light, opaque (wood) blocks light.',
        example: 'Window glass is transparent, frosted glass is translucent, door is opaque'
      },
      {
        step: 4,
        concept: 'Reflection: Light bounces off smooth surfaces. Angle of incidence equals angle of reflection.',
        example: 'Mirror reflects light perfectly, rough surface scatters light'
      }
    ],
    handsOnTask: {
      task: 'Classify objects: a) water, b) cardboard, c) tissue paper, d) mirror as transparent, translucent, or opaque',
      input: 'Various materials to test light transmission',
      expectedOutput: 'a) transparent, b) opaque, c) translucent, d) opaque (but reflective)'
    },
    realWorldApplication: 'Used in photography (shadows and lighting), architecture (window design), safety (reflective clothing), and art (shadow puppets).',
    quizQuestion: {
      question: 'What type of object allows light to pass through but scatters it?',
      options: ['Transparent', 'Translucent', 'Opaque', 'Reflective'],
      correctAnswer: 1,
      explanation: 'Translucent objects allow light to pass through but scatter it, making objects behind them appear blurred'
    },
    summary: [
      'Light travels in straight lines',
      'Shadows form when light is blocked',
      'Objects can be transparent, translucent, or opaque',
      'Smooth surfaces reflect light better than rough ones'
    ],
    createdAt: '2024-01-21'
  },
  // Class 7 Science Modules
  {
    id: 'class7-science-respiration',
    title: 'Class 7: Respiration in Living Organisms',
    topic: 'Biology',
    level: 'beginner',
    subject: 'science',
    class: 7,
    duration: 45,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand the process of respiration',
      'Identify respiratory organs in different organisms',
      'Explain the importance of oxygen',
      'Compare aerobic and anaerobic respiration'
    ],
    problemStatement: 'Why do you breathe faster when you run? How do fish breathe underwater? All living things need energy, and respiration is how they get it from food.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'What is Respiration: The process by which living organisms obtain energy from food using oxygen.',
        example: 'Glucose + Oxygen → Carbon Dioxide + Water + Energy'
      },
      {
        step: 2,
        concept: 'Human Respiration: Lungs take in oxygen, blood carries it to cells, cells use it to break down food.',
        example: 'You inhale oxygen, exhale carbon dioxide'
      },
      {
        step: 3,
        concept: 'Different Organisms: Fish use gills, insects use spiracles, plants use stomata for gas exchange.',
        example: 'Fish gills extract oxygen from water, plant leaves exchange gases through tiny pores'
      },
      {
        step: 4,
        concept: 'Aerobic vs Anaerobic: Aerobic uses oxygen (most efficient), anaerobic doesn\'t need oxygen (less efficient).',
        example: 'Running uses aerobic respiration, sprinting may use anaerobic'
      }
    ],
    handsOnTask: {
      task: 'Observe breathing: a) Count breaths per minute at rest, b) Count after 30 jumping jacks, c) Explain the difference',
      input: 'Breathing rate measurement',
      expectedOutput: 'a) ~12-20 breaths/min at rest, b) ~20-30 breaths/min after exercise, c) More oxygen needed for energy'
    },
    realWorldApplication: 'Used in medicine (respiratory therapy), sports (training), environmental science (air quality), and fitness (breathing exercises).',
    quizQuestion: {
      question: 'What gas do we inhale during respiration?',
      options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Water vapor'],
      correctAnswer: 1,
      explanation: 'We inhale oxygen which is needed for cellular respiration to produce energy'
    },
    summary: [
      'Respiration produces energy from food using oxygen',
      'Different organisms have different respiratory organs',
      'Aerobic respiration is more efficient than anaerobic',
      'Breathing rate increases with physical activity'
    ],
    createdAt: '2024-01-21'
  },
  // Class 8 Science Modules
  {
    id: 'class8-science-force-pressure',
    title: 'Class 8: Force and Pressure',
    topic: 'Physics',
    level: 'intermediate',
    subject: 'science',
    class: 8,
    duration: 50,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand what force is and its effects',
      'Learn about different types of forces',
      'Understand pressure and its applications',
      'Apply force and pressure concepts to real situations'
    ],
    problemStatement: 'Why does a sharp knife cut better than a blunt one? Why do you sink in sand but not on solid ground? Understanding force and pressure helps explain many everyday phenomena.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'What is Force: A push or pull that can change the shape, speed, or direction of an object.',
        example: 'Pushing a door, pulling a rope, gravity pulling objects down'
      },
      {
        step: 2,
        concept: 'Types of Forces: Contact forces (friction, normal) and non-contact forces (gravity, magnetic, electric).',
        example: 'Friction when walking, gravity pulling a ball down, magnet attracting metal'
      },
      {
        step: 3,
        concept: 'Pressure: Force per unit area. Pressure = Force ÷ Area. Smaller area = higher pressure.',
        example: 'Sharp knife has small area, so high pressure cuts easily'
      },
      {
        step: 4,
        concept: 'Applications: Hydraulic systems, atmospheric pressure, blood pressure, tire pressure.',
        example: 'Car brakes use hydraulic pressure, weather changes with atmospheric pressure'
      }
    ],
    handsOnTask: {
      task: 'Calculate pressure: a) 100N force on 2m² area, b) Same force on 0.5m² area. Which has higher pressure?',
      input: 'Force and area values for pressure calculation',
      expectedOutput: 'a) 50 Pa, b) 200 Pa, b) has higher pressure due to smaller area'
    },
    realWorldApplication: 'Used in engineering (hydraulic systems), medicine (blood pressure), meteorology (weather), and construction (foundation design).',
    quizQuestion: {
      question: 'What happens to pressure when the area decreases?',
      options: ['Pressure increases', 'Pressure decreases', 'Pressure stays same', 'Pressure becomes zero'],
      correctAnswer: 0,
      explanation: 'Pressure = Force ÷ Area, so when area decreases, pressure increases for the same force'
    },
    summary: [
      'Force is a push or pull that changes objects',
      'Pressure = Force ÷ Area',
      'Smaller area creates higher pressure',
      'Many technologies use pressure principles'
    ],
    createdAt: '2024-01-21'
  },
  // Class 9 Science Modules
  {
    id: 'class9-science-atoms-molecules',
    title: 'Class 9: Atoms and Molecules',
    topic: 'Chemistry',
    level: 'intermediate',
    subject: 'science',
    class: 9,
    duration: 55,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand atomic structure',
      'Learn about molecules and compounds',
      'Understand chemical formulas',
      'Calculate molecular masses'
    ],
    problemStatement: 'Everything around us is made of tiny particles called atoms. How do atoms combine to form different substances? Understanding atoms helps explain the properties of matter.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Atomic Structure: Atoms have nucleus (protons + neutrons) and electrons orbiting around it.',
        example: 'Hydrogen has 1 proton, 0 neutrons, 1 electron'
      },
      {
        step: 2,
        concept: 'Molecules: Two or more atoms bonded together. Compounds are molecules with different types of atoms.',
        example: 'H₂O (water) is a molecule with 2 hydrogen and 1 oxygen atom'
      },
      {
        step: 3,
        concept: 'Chemical Formulas: Show types and numbers of atoms in a compound.',
        example: 'CO₂ means 1 carbon atom and 2 oxygen atoms'
      },
      {
        step: 4,
        concept: 'Molecular Mass: Sum of atomic masses of all atoms in a molecule.',
        example: 'H₂O: 2(1) + 16 = 18 atomic mass units'
      }
    ],
    handsOnTask: {
      task: 'Calculate molecular mass: a) CH₄ (methane), b) NaCl (salt). Atomic masses: C=12, H=1, Na=23, Cl=35.5',
      input: 'Chemical formulas and atomic masses',
      expectedOutput: 'a) 16 amu, b) 58.5 amu'
    },
    realWorldApplication: 'Used in medicine (drug design), materials science (new materials), environmental science (pollution), and food science (nutrition).',
    quizQuestion: {
      question: 'How many atoms are in one molecule of H₂SO₄?',
      options: ['6', '7', '8', '9'],
      correctAnswer: 1,
      explanation: 'H₂SO₄ has 2 H + 1 S + 4 O = 7 atoms total'
    },
    summary: [
      'Atoms are the building blocks of matter',
      'Molecules are groups of bonded atoms',
      'Chemical formulas show atom composition',
      'Molecular mass is sum of atomic masses'
    ],
    createdAt: '2024-01-21'
  },
  // Class 10 Science Modules
  {
    id: 'class10-science-electricity',
    title: 'Class 10: Electricity and Circuits',
    topic: 'Physics',
    level: 'intermediate',
    subject: 'science',
    class: 10,
    duration: 60,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand electric current and voltage',
      'Learn Ohm\'s law and its applications',
      'Understand series and parallel circuits',
      'Calculate electrical power and energy'
    ],
    problemStatement: 'How does electricity flow through wires? Why do some bulbs glow brighter than others? Understanding electricity is essential for modern technology.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Electric Current: Flow of electric charge through a conductor. Measured in Amperes (A).',
        example: 'Current flows from positive to negative terminal of battery'
      },
      {
        step: 2,
        concept: 'Voltage: Electrical potential difference that drives current. Measured in Volts (V).',
        example: 'Battery provides voltage to push current through circuit'
      },
      {
        step: 3,
        concept: 'Ohm\'s Law: V = I × R, where V=voltage, I=current, R=resistance.',
        example: 'If V=12V and R=4Ω, then I=3A'
      },
      {
        step: 4,
        concept: 'Circuit Types: Series (same current, different voltage), Parallel (same voltage, different current).',
        example: 'Christmas lights in series, house lights in parallel'
      }
    ],
    handsOnTask: {
      task: 'Calculate: a) Current if V=9V and R=3Ω, b) Resistance if V=6V and I=2A',
      input: 'Voltage, current, and resistance values',
      expectedOutput: 'a) I=3A, b) R=3Ω'
    },
    realWorldApplication: 'Used in electronics, power generation, telecommunications, medical devices, and renewable energy systems.',
    quizQuestion: {
      question: 'What is the current in a circuit with 12V voltage and 4Ω resistance?',
      options: ['3A', '48A', '0.33A', '16A'],
      correctAnswer: 0,
      explanation: 'Using Ohm\'s law: I = V/R = 12/4 = 3A'
    },
    summary: [
      'Current is flow of electric charge',
      'Voltage drives current through resistance',
      'Ohm\'s law: V = I × R',
      'Series and parallel circuits have different properties'
    ],
    createdAt: '2024-01-21'
  },
  // Class 11 Science Modules
  {
    id: 'class11-science-thermodynamics',
    title: 'Class 11: Thermodynamics',
    topic: 'Physics',
    level: 'advanced',
    subject: 'science',
    class: 11,
    duration: 65,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand laws of thermodynamics',
      'Learn about heat engines and efficiency',
      'Understand entropy and disorder',
      'Apply thermodynamics to real systems'
    ],
    problemStatement: 'Why can\'t we build a perfect engine? Why does ice melt at room temperature? Thermodynamics explains energy flow and the direction of natural processes.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'First Law: Energy cannot be created or destroyed, only converted from one form to another.',
        example: 'Heat energy can be converted to mechanical work in engines'
      },
      {
        step: 2,
        concept: 'Second Law: Heat flows from hot to cold objects. Natural processes increase disorder (entropy).',
        example: 'Hot coffee cools down, ice melts in warm water'
      },
      {
        step: 3,
        concept: 'Heat Engines: Convert heat to work. Efficiency = Work output / Heat input. Maximum efficiency depends on temperature difference.',
        example: 'Car engine efficiency ~25%, power plant efficiency ~40%'
      },
      {
        step: 4,
        concept: 'Entropy: Measure of disorder. Natural processes increase total entropy of universe.',
        example: 'Mixing hot and cold water increases entropy'
      }
    ],
    handsOnTask: {
      task: 'Calculate efficiency: A heat engine takes 1000J heat, does 300J work. What is efficiency?',
      input: 'Heat input and work output values',
      expectedOutput: 'Efficiency = 300/1000 = 0.3 or 30%'
    },
    realWorldApplication: 'Used in power plants, refrigerators, air conditioners, internal combustion engines, and renewable energy systems.',
    quizQuestion: {
      question: 'What does the second law of thermodynamics state about heat flow?',
      options: ['Heat flows from cold to hot', 'Heat flows from hot to cold', 'Heat doesn\'t flow', 'Heat flow is random'],
      correctAnswer: 1,
      explanation: 'The second law states that heat naturally flows from hot objects to cold objects'
    },
    summary: [
      'First law: Energy is conserved',
      'Second law: Heat flows hot to cold',
      'Heat engines convert heat to work',
      'Natural processes increase entropy'
    ],
    createdAt: '2024-01-21'
  },
  // Class 12 Science Modules
  {
    id: 'class12-science-quantum-physics',
    title: 'Class 12: Introduction to Quantum Physics',
    topic: 'Physics',
    level: 'advanced',
    subject: 'science',
    class: 12,
    duration: 70,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand wave-particle duality',
      'Learn about quantum energy levels',
      'Understand uncertainty principle',
      'Explore quantum applications'
    ],
    problemStatement: 'How can light be both a wave and a particle? Why do atoms have specific energy levels? Quantum physics explains the strange behavior of matter at atomic scales.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Wave-Particle Duality: Light and matter exhibit both wave and particle properties depending on experiment.',
        example: 'Light shows wave properties in diffraction, particle properties in photoelectric effect'
      },
      {
        step: 2,
        concept: 'Quantum Energy Levels: Electrons in atoms can only have specific energy values, not any value.',
        example: 'Hydrogen atom has discrete energy levels: -13.6 eV, -3.4 eV, -1.5 eV, etc.'
      },
      {
        step: 3,
        concept: 'Uncertainty Principle: Cannot simultaneously know exact position and momentum of a particle.',
        example: 'More precisely we know position, less precisely we know momentum'
      },
      {
        step: 4,
        concept: 'Applications: Lasers, transistors, MRI, quantum computers, solar cells.',
        example: 'LEDs work because electrons jump between quantum energy levels'
      }
    ],
    handsOnTask: {
      task: 'Explain why: a) Atoms emit specific colors of light, b) Electrons don\'t fall into nucleus',
      input: 'Quantum physics concepts',
      expectedOutput: 'a) Due to discrete energy levels, b) Due to quantum uncertainty and energy quantization'
    },
    realWorldApplication: 'Used in modern electronics, medical imaging, laser technology, quantum computing, and renewable energy.',
    quizQuestion: {
      question: 'What is wave-particle duality?',
      options: ['Light is only a wave', 'Light is only a particle', 'Light can be both wave and particle', 'Light is neither wave nor particle'],
      correctAnswer: 2,
      explanation: 'Wave-particle duality means light and matter can exhibit both wave and particle properties depending on the experiment'
    },
    summary: [
      'Matter and light have wave-particle duality',
      'Energy levels in atoms are quantized',
      'Uncertainty principle limits simultaneous measurements',
      'Quantum physics enables modern technology'
    ],
    createdAt: '2024-01-21'
  },
  // Technology Modules for all classes
  {
    id: 'class6-tech-computer-basics',
    title: 'Class 6: Computer Basics and Hardware',
    topic: 'Computer Science',
    level: 'beginner',
    subject: 'technology',
    class: 6,
    duration: 40,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Identify basic computer components',
      'Understand input and output devices',
      'Learn about computer memory and storage',
      'Understand how computers process information'
    ],
    problemStatement: 'You use a computer every day, but do you know how it works? Understanding computer basics helps you use technology more effectively and solve problems when things go wrong.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Computer Components: CPU (brain), RAM (temporary memory), Storage (permanent memory), Motherboard (connects everything).',
        example: 'CPU processes instructions, RAM stores active programs, hard drive stores files'
      },
      {
        step: 2,
        concept: 'Input Devices: Keyboard, mouse, microphone, camera - send information TO the computer.',
        example: 'Typing on keyboard sends letters to computer, clicking mouse sends position data'
      },
      {
        step: 3,
        concept: 'Output Devices: Monitor, speakers, printer - show information FROM the computer.',
        example: 'Monitor displays text and images, speakers play sounds, printer creates paper copies'
      },
      {
        step: 4,
        concept: 'Processing: CPU follows instructions in programs to process input and create output.',
        example: 'When you type "Hello", CPU processes each letter and displays it on screen'
      }
    ],
    handsOnTask: {
      task: 'Identify these components: a) CPU, b) RAM, c) Hard drive, d) Monitor. Which are input, output, or processing?',
      input: 'Computer hardware components',
      expectedOutput: 'a) CPU = processing, b) RAM = processing, c) Hard drive = storage, d) Monitor = output'
    },
    realWorldApplication: 'Used in troubleshooting computer problems, choosing new computers, understanding software requirements, and computer maintenance.',
    quizQuestion: {
      question: 'What does CPU stand for?',
      options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Computer Program Unit'],
      correctAnswer: 0,
      explanation: 'CPU stands for Central Processing Unit - it\'s the "brain" of the computer that processes all instructions'
    },
    summary: [
      'CPU is the computer\'s brain that processes instructions',
      'RAM stores active programs temporarily',
      'Input devices send data to computer',
      'Output devices display results from computer'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'class7-tech-programming-basics',
    title: 'Class 7: Introduction to Programming',
    topic: 'Programming',
    level: 'beginner',
    subject: 'technology',
    class: 7,
    duration: 45,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand what programming is',
      'Learn basic programming concepts',
      'Write simple programs',
      'Understand algorithms and logic'
    ],
    problemStatement: 'How do apps and websites work? Programming is like giving instructions to a computer. Learning to program helps you solve problems and create useful tools.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'What is Programming: Writing instructions for computers to follow. Programs solve problems step by step.',
        example: 'Recipe is like a program - step-by-step instructions to make food'
      },
      {
        step: 2,
        concept: 'Programming Languages: Different ways to write instructions. Python, JavaScript, Scratch are popular for beginners.',
        example: 'English vs Spanish - same meaning, different words. Python vs JavaScript - same logic, different syntax'
      },
      {
        step: 3,
        concept: 'Basic Concepts: Variables store data, loops repeat actions, conditions make decisions.',
        example: 'Variable: name = "Alice", Loop: repeat 5 times, Condition: if age >= 18'
      },
      {
        step: 4,
        concept: 'Algorithms: Step-by-step solutions to problems. Like recipes for solving problems.',
        example: 'Algorithm to find largest number: 1) Start with first number, 2) Compare with next, 3) Keep larger one, 4) Repeat'
      }
    ],
    handsOnTask: {
      task: 'Write pseudocode for: a) Adding two numbers, b) Finding if a number is even or odd',
      input: 'Simple programming problems',
      expectedOutput: 'a) Input a, b; sum = a + b; output sum, b) Input n; if n % 2 == 0 then output "even" else output "odd"'
    },
    realWorldApplication: 'Used in creating websites, mobile apps, games, automation tools, data analysis, and solving everyday problems.',
    quizQuestion: {
      question: 'What is a variable in programming?',
      options: ['A type of computer', 'A storage location for data', 'A programming language', 'A type of algorithm'],
      correctAnswer: 1,
      explanation: 'A variable is a storage location that holds data that can change during program execution'
    },
    summary: [
      'Programming is writing instructions for computers',
      'Different languages use different syntax',
      'Variables, loops, and conditions are basic concepts',
      'Algorithms are step-by-step problem solutions'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'class8-tech-web-development',
    title: 'Class 8: Web Development Basics',
    topic: 'Web Development',
    level: 'intermediate',
    subject: 'technology',
    class: 8,
    duration: 50,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand how websites work',
      'Learn HTML for structure',
      'Learn CSS for styling',
      'Create a simple webpage'
    ],
    problemStatement: 'How are websites created? Every website you visit is built using web technologies. Learning web development lets you create your own websites and understand how the internet works.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'How Websites Work: Browser requests webpage from server, server sends HTML/CSS/JavaScript files, browser displays the page.',
        example: 'Type URL → Browser asks server → Server sends files → Browser shows webpage'
      },
      {
        step: 2,
        concept: 'HTML (Structure): HyperText Markup Language creates the content and structure of web pages.',
        example: '<h1>My Title</h1> creates a heading, <p>Hello World</p> creates a paragraph'
      },
      {
        step: 3,
        concept: 'CSS (Styling): Cascading Style Sheets control how web pages look - colors, fonts, layout.',
        example: 'h1 { color: blue; font-size: 24px; } makes all h1 headings blue and large'
      },
      {
        step: 4,
        concept: 'JavaScript (Behavior): Makes web pages interactive and dynamic.',
        example: 'Button click changes text color, form validation, animations'
      }
    ],
    handsOnTask: {
      task: 'Create HTML page with: a) A heading, b) A paragraph, c) A button, d) Style the heading blue',
      input: 'HTML and CSS code',
      expectedOutput: 'A simple webpage with styled content and interactive button'
    },
    realWorldApplication: 'Used in creating personal websites, business websites, online portfolios, e-commerce sites, and web applications.',
    quizQuestion: {
      question: 'What does HTML stand for?',
      options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Management Language'],
      correctAnswer: 0,
      explanation: 'HTML stands for HyperText Markup Language - it\'s used to structure content on web pages'
    },
    summary: [
      'Websites use HTML, CSS, and JavaScript',
      'HTML creates page structure and content',
      'CSS controls appearance and styling',
      'JavaScript adds interactivity and behavior'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'class9-tech-databases',
    title: 'Class 9: Introduction to Databases',
    topic: 'Database Systems',
    level: 'intermediate',
    subject: 'technology',
    class: 9,
    duration: 55,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand what databases are',
      'Learn about tables, rows, and columns',
      'Understand primary keys and relationships',
      'Write basic SQL queries'
    ],
    problemStatement: 'How do apps store and retrieve information? Every app you use stores data in databases. Understanding databases helps you work with data and build better applications.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'What is a Database: Organized collection of data stored electronically. Like a digital filing cabinet.',
        example: 'School database stores student names, grades, addresses in organized tables'
      },
      {
        step: 2,
        concept: 'Tables and Records: Tables have columns (fields) and rows (records). Each row is one complete record.',
        example: 'Student table: columns = ID, Name, Grade; rows = individual students'
      },
      {
        step: 3,
        concept: 'Primary Keys: Unique identifier for each record. No two records can have the same primary key.',
        example: 'Student ID is primary key - each student has unique ID number'
      },
      {
        step: 4,
        concept: 'SQL Queries: Structured Query Language to retrieve and manipulate data from databases.',
        example: 'SELECT name FROM students WHERE grade = "A" finds all A-grade students'
      }
    ],
    handsOnTask: {
      task: 'Write SQL query to: a) Get all students, b) Find students with grade "B", c) Add a new student',
      input: 'Database table with student data',
      expectedOutput: 'a) SELECT * FROM students, b) SELECT * FROM students WHERE grade = "B", c) INSERT INTO students VALUES (...)'
    },
    realWorldApplication: 'Used in e-commerce (product catalogs), social media (user data), banking (transactions), healthcare (patient records), and mobile apps (user preferences).',
    quizQuestion: {
      question: 'What is a primary key in a database?',
      options: ['The first column', 'A unique identifier for each record', 'The largest value', 'A type of query'],
      correctAnswer: 1,
      explanation: 'A primary key is a unique identifier that distinguishes each record in a table from all others'
    },
    summary: [
      'Databases store organized data electronically',
      'Tables have columns (fields) and rows (records)',
      'Primary keys uniquely identify each record',
      'SQL queries retrieve and manipulate data'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'class10-tech-cybersecurity',
    title: 'Class 10: Cybersecurity Fundamentals',
    topic: 'Cybersecurity',
    level: 'intermediate',
    subject: 'technology',
    class: 10,
    duration: 60,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand common cyber threats',
      'Learn about password security',
      'Understand encryption and privacy',
      'Practice safe online behavior'
    ],
    problemStatement: 'How do you protect yourself online? With more of our lives moving to the internet, understanding cybersecurity is essential for staying safe and protecting your information.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Common Threats: Malware (viruses), phishing (fake emails), hacking (unauthorized access), identity theft.',
        example: 'Phishing email looks like from bank but steals your password when you click link'
      },
      {
        step: 2,
        concept: 'Password Security: Use strong, unique passwords. Enable two-factor authentication when possible.',
        example: 'Good: MyP@ssw0rd123!, Bad: password123. Use password manager for different sites'
      },
      {
        step: 3,
        concept: 'Encryption: Scrambles data so only authorized people can read it. HTTPS websites use encryption.',
        example: 'Your credit card number is encrypted when shopping online'
      },
      {
        step: 4,
        concept: 'Safe Practices: Don\'t click suspicious links, keep software updated, be careful with personal information.',
        example: 'Update phone apps regularly, don\'t share passwords, verify website URLs'
      }
    ],
    handsOnTask: {
      task: 'Evaluate these passwords: a) "password", b) "P@ssw0rd123!", c) "123456". Which is strongest and why?',
      input: 'Password examples to evaluate',
      expectedOutput: 'a) Very weak, b) Strong, c) Very weak. Strong passwords have length, complexity, and uniqueness'
    },
    realWorldApplication: 'Used in protecting personal accounts, business security, online banking, social media safety, and preventing identity theft.',
    quizQuestion: {
      question: 'What is phishing?',
      options: ['A type of fish', 'Fake emails trying to steal information', 'A programming language', 'A type of virus'],
      correctAnswer: 1,
      explanation: 'Phishing is when attackers send fake emails or messages to trick people into revealing personal information'
    },
    summary: [
      'Cyber threats include malware, phishing, and hacking',
      'Strong passwords and 2FA protect accounts',
      'Encryption keeps data secure',
      'Safe online practices prevent attacks'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'class11-tech-artificial-intelligence',
    title: 'Class 11: Introduction to Artificial Intelligence',
    topic: 'Artificial Intelligence',
    level: 'advanced',
    subject: 'technology',
    class: 11,
    duration: 65,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand what AI is and how it works',
      'Learn about machine learning',
      'Understand different types of AI',
      'Explore AI applications and ethics'
    ],
    problemStatement: 'How do computers learn and make decisions? Artificial Intelligence is everywhere - from recommendation systems to self-driving cars. Understanding AI helps you use it responsibly and prepare for the future.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'What is AI: Computer systems that can perform tasks usually requiring human intelligence - learning, reasoning, problem-solving.',
        example: 'Voice assistants understand speech, recommendation systems suggest products, image recognition identifies objects'
      },
      {
        step: 2,
        concept: 'Machine Learning: AI learns from data without being explicitly programmed. Finds patterns and makes predictions.',
        example: 'Email spam filter learns from examples of spam vs normal emails'
      },
      {
        step: 3,
        concept: 'Types of AI: Narrow AI (specific tasks like chess), General AI (human-level intelligence), Super AI (beyond human intelligence).',
        example: 'Siri is narrow AI, human brain is general AI, super AI doesn\'t exist yet'
      },
      {
        step: 4,
        concept: 'AI Ethics: Important considerations about bias, privacy, job displacement, and responsible AI development.',
        example: 'AI should be fair, transparent, and beneficial to society'
      }
    ],
    handsOnTask: {
      task: 'Identify AI applications: a) Netflix recommendations, b) Google Translate, c) Calculator, d) Self-driving car. Which are AI and why?',
      input: 'Various technologies to classify',
      expectedOutput: 'a) AI (learns preferences), b) AI (learns language patterns), c) Not AI (simple calculation), d) AI (learns driving)'
    },
    realWorldApplication: 'Used in healthcare (medical diagnosis), transportation (autonomous vehicles), entertainment (recommendation systems), finance (fraud detection), and education (personalized learning).',
    quizQuestion: {
      question: 'What is machine learning?',
      options: ['A type of computer', 'AI that learns from data', 'A programming language', 'A type of database'],
      correctAnswer: 1,
      explanation: 'Machine learning is a subset of AI where computers learn and improve from data without being explicitly programmed'
    },
    summary: [
      'AI performs tasks requiring human intelligence',
      'Machine learning learns from data patterns',
      'AI can be narrow, general, or super',
      'AI ethics are important for responsible development'
    ],
    createdAt: '2024-01-21'
  },
  {
    id: 'class12-tech-blockchain',
    title: 'Class 12: Blockchain and Cryptocurrency',
    topic: 'Blockchain Technology',
    level: 'advanced',
    subject: 'technology',
    class: 12,
    duration: 70,
    xpReward: XP_REWARDS.MODULE_COMPLETE,
    learningObjectives: [
      'Understand blockchain technology',
      'Learn about cryptocurrency basics',
      'Understand smart contracts',
      'Explore blockchain applications'
    ],
    problemStatement: 'What is Bitcoin and how does it work? Blockchain technology is revolutionizing finance, supply chains, and digital identity. Understanding it prepares you for the future of technology.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'What is Blockchain: Distributed ledger technology that records transactions across multiple computers. Immutable and transparent.',
        example: 'Like a digital notebook that everyone can see and verify, but no one can change past entries'
      },
      {
        step: 2,
        concept: 'Cryptocurrency: Digital currency secured by cryptography. Bitcoin was the first successful cryptocurrency.',
        example: 'Bitcoin transactions are recorded on blockchain, verified by network participants'
      },
      {
        step: 3,
        concept: 'Smart Contracts: Self-executing contracts with terms written in code. Automatically execute when conditions are met.',
        example: 'Insurance payout automatically triggered when flight delay exceeds 2 hours'
      },
      {
        step: 4,
        concept: 'Applications: Beyond currency - supply chain tracking, digital identity, voting systems, intellectual property.',
        example: 'Track food from farm to store, verify academic credentials, secure voting'
      }
    ],
    handsOnTask: {
      task: 'Explain how blockchain ensures security: a) What makes it hard to hack? b) How is data verified?',
      input: 'Blockchain security concepts',
      expectedOutput: 'a) Distributed network, cryptographic hashing, consensus mechanisms, b) Multiple nodes verify transactions'
    },
    realWorldApplication: 'Used in finance (cryptocurrency, DeFi), supply chain (product tracking), healthcare (medical records), voting (secure elections), and digital identity (passports, credentials).',
    quizQuestion: {
      question: 'What makes blockchain secure?',
      options: ['It\'s stored in one place', 'It uses cryptography and distributed verification', 'It\'s controlled by one company', 'It\'s faster than other systems'],
      correctAnswer: 1,
      explanation: 'Blockchain security comes from cryptographic hashing and distributed verification across multiple nodes'
    },
    summary: [
      'Blockchain is a distributed, immutable ledger',
      'Cryptocurrency is digital money on blockchain',
      'Smart contracts execute automatically',
      'Blockchain has applications beyond currency'
    ],
    createdAt: '2024-01-21'
  }
];

// Lesson Modules Array (same structure as Course Modules but for lessons)
export const LESSON_MODULES: LessonModule[] = [
  // Class 6 Mathematics Lessons
  {
    id: 'lesson-class6-math-decimals',
    title: 'Class 6: Understanding Decimals',
    topic: 'Decimals',
    level: 'beginner',
    subject: 'math',
    class: 6,
    duration: 35,
    xpReward: XP_REWARDS.LESSON_COMPLETE,
    learningObjectives: [
      'Understand decimal place value',
      'Compare and order decimals',
      'Add and subtract decimals',
      'Convert between fractions and decimals'
    ],
    problemStatement: 'You need to measure something that\'s 3.5 meters long. How do you work with numbers that have decimal points? Decimals help us be more precise with measurements and calculations.',
    stepByStepExplanation: [
      {
        step: 1,
        concept: 'Decimal Place Value: Each position after decimal point represents a fraction of 10.',
        example: '3.45 = 3 ones + 4 tenths + 5 hundredths'
      },
      {
        step: 2,
        concept: 'Comparing Decimals: Compare digit by digit from left to right.',
        example: '3.25 > 3.20 because 5 > 0 in hundredths place'
      },
      {
        step: 3,
        concept: 'Adding/Subtracting: Line up decimal points, add zeros if needed, then add/subtract normally.',
        example: '3.25 + 1.7 = 3.25 + 1.70 = 4.95'
      },
      {
        step: 4,
        concept: 'Fraction Conversion: Decimal to fraction: write as fraction with power of 10 denominator.',
        example: '0.3 = 3/10, 0.25 = 25/100 = 1/4'
      }
    ],
    handsOnTask: {
      task: 'Solve: a) 2.5 + 1.75, b) 4.8 - 2.3, c) Which is larger: 3.2 or 3.19?',
      input: 'Decimal arithmetic problems',
      expectedOutput: 'a) 4.25, b) 2.5, c) 3.2 is larger'
    },
    realWorldApplication: 'Used in money calculations, measurements, scientific data, and everyday calculations.',
    quizQuestion: {
      question: 'What is 0.5 as a fraction?',
      options: ['1/2', '1/5', '5/10', 'Both A and C'],
      correctAnswer: 3,
      explanation: '0.5 = 5/10 = 1/2, so both A and C are correct'
    },
    summary: [
      'Decimals extend our number system for precision',
      'Compare decimals digit by digit',
      'Line up decimal points for arithmetic',
      'Decimals and fractions are different ways to write same values'
    ],
    createdAt: '2024-01-21'
  },
  // Class 7 Mathematics Lesson
  {
    id: 'lesson-class7-math-algebra-fundamentals',
    title: 'Class 7: Algebra Fundamentals',
    topic: 'Algebra',
    level: 'beginner',
    subject: 'math',
    class: 7,
    duration: 45,
    xpReward: XP_REWARDS.LESSON_COMPLETE,
    learningObjectives: [
      'Understand variables, constants, and coefficients',
      'Form and simplify algebraic expressions',
      'Solve one-step and two-step linear equations'
    ],
    problemStatement: 'You need to find an unknown number that makes an equation true. Algebra gives you tools to represent and solve such problems using symbols.',
    stepByStepExplanation: [
      { step: 1, concept: 'Variables and constants', example: 'In 3x + 5, x is variable, 3 and 5 are constants/coefficients' },
      { step: 2, concept: 'Form expressions from statements', example: '"Twice a number increased by 7" → 2x + 7' },
      { step: 3, concept: 'Solve linear equations using inverse operations', example: '3x + 5 = 20 → 3x = 15 → x = 5' }
    ],
    handsOnTask: {
      task: 'Solve: a) x + 7 = 15, b) 4y − 6 = 10, c) 3z/2 = 9',
      input: 'Linear equations',
      expectedOutput: 'a) x=8, b) y=4, c) z=6'
    },
    realWorldApplication: 'Budgeting unknown costs, distance-speed-time problems, and recipe scaling.',
    quizQuestion: {
      question: 'Which is an algebraic expression?',
      options: ['7', 'x + 5', 'x = 5', '15%'],
      correctAnswer: 1,
      explanation: 'An expression has no equality sign; x + 5 is an expression.'
    },
    summary: [
      'Use variables to generalize arithmetic',
      'Translate words into algebra',
      'Solve linear equations by balancing both sides'
    ],
    createdAt: '2024-01-21'
  },
  // Class 6 Mathematics Lesson
  {
    id: 'lesson-class6-math-geometry-shapes',
    title: 'Class 6: Geometric Shapes and Properties',
    topic: 'Geometry',
    level: 'beginner',
    subject: 'math',
    class: 6,
    duration: 60,
    xpReward: XP_REWARDS.LESSON_COMPLETE,
    learningObjectives: [
      'Classify 2D and 3D shapes',
      'Identify properties: sides, angles, faces, edges, vertices',
      'Compute perimeter and area of basic shapes'
    ],
    problemStatement: 'Design a small park with triangular flower beds and rectangular paths. You must compute boundaries and areas correctly.',
    stepByStepExplanation: [
      { step: 1, concept: 'Classify shapes', example: 'Triangle, rectangle, square, circle; cube, cuboid, sphere, cylinder' },
      { step: 2, concept: 'Key properties', example: 'Rectangle: opposite sides equal; Cube: 6 faces, 12 edges, 8 vertices' },
      { step: 3, concept: 'Perimeter and area', example: 'Rectangle P=2(l+w), A=lw; Triangle A=1/2·b·h' }
    ],
    handsOnTask: {
      task: 'Find: a) Perimeter of 8×6 rectangle, b) Area of base b=10, h=7 triangle',
      input: 'Dimensions of shapes',
      expectedOutput: 'a) 28 units, b) 35 square units'
    },
    realWorldApplication: 'Architecture, landscaping, packaging design, and crafts.',
    quizQuestion: {
      question: 'How many faces does a cube have?',
      options: ['4', '6', '8', '12'],
      correctAnswer: 1,
      explanation: 'A cube has 6 congruent square faces.'
    },
    summary: [
      '2D vs 3D shapes and their properties',
      'Use correct formulas for perimeter and area',
      'Relate geometry to real designs'
    ],
    createdAt: '2024-01-21'
  },
  // Class 9 Science Lesson
  {
    id: 'lesson-class9-science-laws-of-motion',
    title: 'Class 9: Newton’s Laws of Motion',
    topic: 'Physics',
    level: 'intermediate',
    subject: 'science',
    class: 9,
    duration: 50,
    xpReward: XP_REWARDS.LESSON_COMPLETE,
    learningObjectives: [
      'State and apply Newton’s three laws of motion',
      'Differentiate mass, weight, and inertia',
      'Solve force, acceleration, and friction problems'
    ],
    problemStatement: 'Why does a seatbelt stop you during sudden braking? Use Newton’s laws to analyze motion and safety systems.',
    stepByStepExplanation: [
      { step: 1, concept: 'First law (Inertia)', example: 'A moving bus stops; passengers lurch forward due to inertia' },
      { step: 2, concept: 'Second law (F=ma)', example: 'Net force 10 N on 2 kg → a = 5 m/s²' },
      { step: 3, concept: 'Third law (Action–reaction)', example: 'Rocket propulsion: gases pushed backward, rocket moves forward' }
    ],
    handsOnTask: {
      task: 'Compute acceleration for: m=3 kg, net force=9 N. Then find friction if applied 15 N and a=3 m/s².',
      input: 'Mass and forces',
      expectedOutput: 'a = 3 m/s²; friction = 6 N (since net = 15 − friction)'
    },
    realWorldApplication: 'Car safety (seatbelts, airbags), sports physics, and space flight.',
    quizQuestion: {
      question: 'According to the second law, acceleration is proportional to…',
      options: ['Mass', 'Force', 'Velocity', 'Time'],
      correctAnswer: 1,
      explanation: 'a = F/m; acceleration increases with greater net force.'
    },
    summary: [
      'Inertia resists changes in motion',
      'F=ma links force, mass, and acceleration',
      'Forces come in equal and opposite pairs'
    ],
    createdAt: '2024-01-21'
  }
];

// Helper functions
export const getContentBySubject = (subject: string): LearningContent[] => {
  return LEARNING_CONTENT.filter(content => content.subject === subject);
};

export const getContentByType = (type: string): LearningContent[] => {
  return LEARNING_CONTENT.filter(content => content.type === type);
};

export const getLabsBySubject = (subject: string): Lab[] => {
  return LABS.filter(lab => lab.subject === subject);
};

export const getFeaturedBlogs = (): Blog[] => {
  return BLOGS.filter(blog => blog.featured);
};

export const getBlogsByCategory = (category: string): Blog[] => {
  return BLOGS.filter(blog => blog.category === category);
};

export const getModulesBySubject = (subject: string): CourseModule[] => {
  return COURSE_MODULES.filter(module => module.subject === subject);
};

export const getModulesByLevel = (level: string): CourseModule[] => {
  return COURSE_MODULES.filter(module => module.level === level);
};

export const getModulesByClass = (classNum: number): CourseModule[] => {
  return COURSE_MODULES.filter(module => module.class === classNum);
};

export const getModulesBySubjectAndClass = (subject: string, classNum: number): CourseModule[] => {
  return COURSE_MODULES.filter(module => module.subject === subject && module.class === classNum);
};

export const getLessonModulesBySubject = (subject: string): LessonModule[] => {
  return LESSON_MODULES.filter(module => module.subject === subject);
};

export const getLessonModulesByClass = (classNum: number): LessonModule[] => {
  return LESSON_MODULES.filter(module => module.class === classNum);
};

export const getLessonModulesBySubjectAndClass = (subject: string, classNum: number): LessonModule[] => {
  return LESSON_MODULES.filter(module => module.subject === subject && module.class === classNum);
};

export const calculateTotalXP = (activities: string[]): number => {
  let totalXP = 0;
  activities.forEach(activity => {
    const content = LEARNING_CONTENT.find(c => c.id === activity);
    if (content) totalXP += content.xpReward;
  });
  return totalXP;
};





