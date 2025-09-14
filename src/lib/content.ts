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
  }
];

// Labs Database
export const LABS: Lab[] = [
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
    featured: true
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
    featured: true
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

export const calculateTotalXP = (activities: string[]): number => {
  let totalXP = 0;
  activities.forEach(activity => {
    const content = LEARNING_CONTENT.find(c => c.id === activity);
    if (content) totalXP += content.xpReward;
  });
  return totalXP;
};

