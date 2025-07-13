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
    title: 'Medical-Surgical Nursing I',
    description: 'Test your understanding of common medical-surgical conditions and nursing interventions.',
    duration: 20,
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
