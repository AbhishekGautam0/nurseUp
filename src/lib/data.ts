export type Option = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
  correctAnswers: string[]; // array of option ids
  type: 'single' | 'multiple';
};

export type Test = {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
  category: 'active' | 'practice';
};

export const tests: Test[] = [
  {
    id: '1',
    title: 'Pharmacology Fundamentals',
    description: 'Assess your knowledge of basic pharmacology principles and drug classifications.',
    duration: 15,
    category: 'active',
    questions: [
      {
        id: '1-1',
        text: 'A nurse is preparing to administer a medication. Which of the following is the most critical to check first?',
        options: [
          { id: 'a', text: 'The patient\'s name' },
          { id: 'b', text: 'The medication name' },
          { id: 'c', text: 'The expiration date' },
          { id: 'd', text: 'The dosage' },
        ],
        correctAnswers: ['a'],
        type: 'single',
      },
      {
        id: '1-2',
        text: 'What are the "Five Rights" of medication administration? (Select all that apply)',
        options: [
          { id: 'a', text: 'Right Patient' },
          { id: 'b', text: 'Right Time' },
          { id: 'c', text: 'Right Room' },
          { id: 'd', text: 'Right Drug' },
          { id: 'e', text: 'Right Dose' },
          { id: 'f', text: 'Right Route' },
        ],
        correctAnswers: ['a', 'b', 'd', 'e', 'f'],
        type: 'multiple',
      },
      {
        id: '1-3',
        text: 'The term "pharmacokinetics" refers to:',
        options: [
          { id: 'a', text: 'How a medication affects the body' },
          { id: 'b', text: 'How the body absorbs, distributes, metabolizes, and excretes a drug' },
          { id: 'c', text: 'The study of drug dosages' },
          { id: 'd', text: 'The chemical structure of a medication' },
        ],
        correctAnswers: ['b'],
        type: 'single',
      },
      {
        id: '1-4',
        text: 'A patient is prescribed an enteric-coated tablet. The nurse should instruct the patient to:',
        options: [
            { id: 'a', text: 'Crush the tablet for easier swallowing' },
            { id: 'b', text: 'Swallow the tablet whole' },
            { id: 'c', text: 'Take it with a large glass of milk' },
            { id: 'd', text: 'Dissolve it in water' }
        ],
        correctAnswers: ['b'],
        type: 'single',
      }
    ],
  },
  {
    id: '2',
    title: 'NORCET Practice Exam I',
    description: 'A model exam based on the NORCET pattern, covering nursing subjects and general aptitude.',
    duration: 180,
    category: 'practice',
    questions: [
      {
        id: '2-1',
        text: 'A client with diabetes mellitus is experiencing sweating, tremors, and tachycardia. The nurse should first:',
        options: [
          { id: 'a', text: 'Administer insulin' },
          { id: 'b', text: 'Check the client\'s blood glucose level' },
          { id: 'c', text: 'Provide a complex carbohydrate snack' },
          { id: 'd', text: 'Notify the physician' },
        ],
        correctAnswers: ['b'],
        type: 'single',
      },
      {
        id: '2-2',
        text: 'Which of the following are risk factors for developing deep vein thrombosis (DVT)? (Select all that apply)',
        options: [
          { id: 'a', text: 'Immobility' },
          { id: 'b', text: 'Recent surgery' },
          { id: 'c', text: 'High-fiber diet' },
          { id: 'd', text: 'History of smoking' },
          { id: 'e', 'text': 'Regular exercise' },
        ],
        correctAnswers: ['a', 'b', 'd'],
        type: 'multiple',
      },
      {
        id: '2-3',
        text: 'What is the priority nursing assessment for a client with a suspected head injury?',
        options: [
            { id: 'a', text: 'Pupillary response' },
            { id: 'b', text: 'Blood pressure' },
            { id: 'c', text: 'Level of consciousness' },
            { id: 'd', text: 'Respiratory rate' }
        ],
        correctAnswers: ['c'],
        type: 'single',
      },
      {
        id: '2-4',
        text: 'The "rule of nines" is used for which purpose in emergency care?',
        options: [
            { id: 'a', text: 'Estimating the percentage of body surface area burned' },
            { id: 'b', text: 'Calculating drug dosages for children' },
            { id: 'c', text: 'Assessing the level of consciousness' },
            { id: 'd', text: 'Determining the type of fracture' }
        ],
        correctAnswers: ['a'],
        type: 'single',
      },
      {
        id: '2-5',
        text: 'Which vitamin is essential for the synthesis of clotting factors?',
        options: [
            { id: 'a', text: 'Vitamin A' },
            { id: 'b', text: 'Vitamin C' },
            { id: 'c', text: 'Vitamin D' },
            { id: 'd', text: 'Vitamin K' }
        ],
        correctAnswers: ['d'],
        type: 'single',
      },
      {
        id: '2-6',
        text: 'What is the primary purpose of the "Bag-Valve-Mask" (BVM) device?',
        options: [
            { id: 'a', text: 'To administer medications' },
            { id: 'b', text: 'To provide positive pressure ventilation' },
            { id: 'c', text: 'To monitor heart rhythm' },
            { id: 'd', text: 'To suction airway secretions' }
        ],
        correctAnswers: ['b'],
        type: 'single',
      },
      {
        id: '2-7',
        text: 'A nurse is providing teaching about the "MMR" vaccine. The nurse should explain that this vaccine provides immunity against which diseases? (Select all that apply)',
        options: [
            { id: 'a', text: 'Meningitis' },
            { id: 'b', text: 'Measles' },
            { id: 'c', text: 'Mumps' },
            { id: 'd', text: 'Rotavirus' },
            { id: 'e', text: 'Rubella' }
        ],
        correctAnswers: ['b', 'c', 'e'],
        type: 'multiple',
      },
      {
        id: '2-8',
        text: 'The concept of "Asepsis" in nursing practice refers to:',
        options: [
            { id: 'a', text: 'The process of wound healing' },
            { id: 'b', text: 'The absence of disease-causing microorganisms' },
            { id: 'c', text: 'The administration of antibiotics' },
            { id: 'd', text: 'The ethical principles of nursing' }
        ],
        correctAnswers: ['b'],
        type: 'single',
      },
      {
        id: '2-9',
        text: 'Which is the largest gland in the human body?',
        options: [
            { id: 'a', text: 'Adrenal' },
            { id: 'b', text: 'Liver' },
            { id: 'c', text: 'Pancreas' },
            { id: 'd', text: 'Thyroid' }
        ],
        correctAnswers: ['b'],
        type: 'single',
      },
      {
        id: '2-10',
        text: 'What is the capital city of Australia?',
        options: [
            { id: 'a', text: 'Sydney' },
            { id: 'b', text: 'Melbourne' },
            { id: 'c', text: 'Canberra' },
            { id: 'd', text: 'Perth' }
        ],
        correctAnswers: ['c'],
        type: 'single',
      },
       {
        id: '2-11',
        text: 'In which stage of labor is the placenta delivered?',
        options: [
            { id: 'a', text: 'First stage' },
            { id: 'b', text: 'Second stage' },
            { id: 'c', text: 'Third stage' },
            { id: 'd', text: 'Fourth stage' }
        ],
        correctAnswers: ['c'],
        type: 'single',
      },
      {
        id: '2-12',
        text: 'Which of the following is an example of an isotonic IV solution?',
        options: [
            { id: 'a', text: '0.45% Sodium Chloride' },
            { id: 'b', text: '0.9% Sodium Chloride' },
            { id: 'c', text: '3% Sodium Chloride' },
            { id: 'd', text: 'Dextrose 5% in 0.45% Saline' }
        ],
        correctAnswers: ['b'],
        type: 'single',
      },
    ],
  },
   {
    id: '3',
    title: 'Pediatric Nursing Essentials',
    description: 'Evaluate your knowledge of key concepts in pediatric nursing care.',
    duration: 10,
    category: 'practice',
    questions: [
      {
        id: '3-1',
        text: 'When assessing a toddler, which approach is most effective?',
        options: [
          { id: 'a', text: 'Perform the assessment from head to toe' },
          { id: 'b', text: 'Use medical terminology to be precise' },
          { id: 'c', text: 'Incorporate play into the assessment' },
          { id: 'd', text: 'Separate the child from the parent' },
        ],
        correctAnswers: ['c'],
        type: 'single',
      }
    ],
  }
];
