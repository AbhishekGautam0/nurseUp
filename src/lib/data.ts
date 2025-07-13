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
    id: 'norcet-practice-1',
    title: 'NORCET Practice Exam I',
    description: 'A model exam based on the NORCET pattern, covering nursing subjects and general aptitude.',
    duration: 180,
    category: 'practice',
    questions: [
      {
        id: 'q1',
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
        id: 'q2',
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
        id: 'q3',
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
        id: 'q4',
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
        id: 'q5',
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
        id: 'q6',
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
        id: 'q7',
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
        id: 'q8',
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
        id: 'q9',
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
        id: 'q10',
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
        id: 'q11',
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
        id: 'q12',
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
      {
        id: 'q13',
        text: "A patient's blood pressure is 150/95 mmHg. This is considered to be:",
        options: [
          { id: 'a', text: 'Normal' },
          { id: 'b', text: 'Hypotension' },
          { id: 'c', text: 'Stage 1 Hypertension' },
          { id: 'd', text: 'Stage 2 Hypertension' },
        ],
        correctAnswers: ['c'],
        type: 'single',
      },
      {
        id: 'q14',
        text: 'What is the most common causative agent for urinary tract infections (UTIs)?',
        options: [
          { id: 'a', text: 'Staphylococcus aureus' },
          { id: 'b', text: 'Escherichia coli' },
          { id: 'c', text: 'Klebsiella pneumoniae' },
          { id: 'd', text: 'Proteus mirabilis' },
        ],
        correctAnswers: ['b'],
        type: 'single',
      },
      {
        id: 'q15',
        text: "Erickson's stage of psychosocial development for an adolescent (12-18 years) is:",
        options: [
          { id: 'a', text: 'Trust vs. Mistrust' },
          { id: 'b', text: 'Initiative vs. Guilt' },
          { id: 'c', text: 'Industry vs. Inferiority' },
          { id: 'd', text: 'Identity vs. Role Confusion' },
        ],
        correctAnswers: ['d'],
        type: 'single',
      },
      {
        id: 'q16',
        text: 'A nurse is caring for a patient with a nasogastric tube. To check for correct placement, the nurse should initially:',
        options: [
          { id: 'a', text: 'Instill air into the tube and listen for a gurgling sound' },
          { id: 'b', text: 'Aspirate gastric contents and check the pH' },
          { id: 'c', text: 'Ask the patient to speak' },
          { id: 'd', text: 'Order a chest X-ray' },
        ],
        correctAnswers: ['b'],
        type: 'single',
      },
      {
        id: 'q17',
        text: 'Which of the following are signs of inflammation? (Select all that apply)',
        options: [
          { id: 'a', text: 'Pain (Dolor)' },
          { id: 'b', text: 'Heat (Calor)' },
          { id: 'c', text: 'Pallor (Paleness)' },
          { id: 'd', text: 'Swelling (Tumor)' },
          { id: 'e', text: 'Redness (Rubor)' },
        ],
        correctAnswers: ['a', 'b', 'd', 'e'],
        type: 'multiple',
      },
      {
        id: 'q18',
        text: 'The "GCS" score is used to assess:',
        options: [
          { id: 'a', text: 'Glasgow Coma Scale' },
          { id: 'b', text: 'Gastric Content Scale' },
          { id: 'c', text: 'General Condition Score' },
          { id: 'd', text: 'Glomerular Count Score' },
        ],
        correctAnswers: ['a'],
        type: 'single',
      },
      {
        id: 'q19',
        text: 'Which Indian river is known as the "Sorrow of Bengal"?',
        options: [
          { id: 'a', text: 'Ganges' },
          { id: 'b', text: 'Brahmaputra' },
          { id: 'c', text: 'Damodar' },
          { id: 'd', text: 'Yamuna' },
        ],
        correctAnswers: ['c'],
        type: 'single',
      },
      {
        id: 'q20',
        text: 'If a train travels at 60 km/h, how far will it travel in 45 minutes?',
        options: [
          { id: 'a', text: '30 km' },
          { id: 'b', text: '45 km' },
          { id: 'c', text: '50 km' },
          { id: 'd', text: '60 km' },
        ],
        correctAnswers: ['b'],
        type: 'single',
      },
      {
        id: 'q21',
        text: 'A client is receiving a blood transfusion and suddenly develops chills, fever, and low back pain. The nurse\'s first action should be to:',
        options: [
          { id: 'a', text: 'Administer an antihistamine' },
          { id: 'b', text: 'Stop the transfusion immediately' },
          { id: 'c', text: 'Slow down the rate of the transfusion' },
          { id: 'd', text: 'Check the client\'s temperature' },
        ],
        correctAnswers: ['b'],
        type: 'single',
      },
      {
        id: 'q22',
        text: 'Which of the following foods are high in potassium? (Select all that apply)',
        options: [
          { id: 'a', text: 'Bananas' },
          { id: 'b', text: 'White rice' },
          { id: 'c', text: 'Spinach' },
          { id: 'd', text: 'Potatoes' },
          { id: 'e', text: 'Apples' },
        ],
        correctAnswers: ['a', 'c', 'd'],
        type: 'multiple',
      },
      {
        id: 'q23',
        text: 'The primary purpose of an incentive spirometer is to:',
        options: [
          { id: 'a', text: 'Strengthen the diaphragm' },
          { id: 'b', text: 'Prevent atelectasis' },
          { id: 'c', text: 'Measure tidal volume' },
          { id: 'd', text: 'Administer aerosolized medication' },
        ],
        correctAnswers: ['b'],
        type: 'single',
      },
      {
        id: 'q24',
        text: 'What is the normal range for blood pH in humans?',
        options: [
          { id: 'a', text: '7.25-7.35' },
          { id: 'b', text: '7.35-7.45' },
          { id: 'c', text: '7.45-7.55' },
          { id: 'd', text: '7.00-7.20' },
        ],
        correctAnswers: ['b'],
        type: 'single',
      },
      {
        id: 'q25',
        text: 'The "WHO" is a specialized agency of the United Nations. What does WHO stand for?',
        options: [
          { id: 'a', text: 'World Health Organization' },
          { id: 'b', text: 'World Help Organization' },
          { id: 'c', text: 'Welfare and Health Organization' },
          { id: 'd', text: 'World Humanitarian Office' },
        ],
        correctAnswers: ['a'],
        type: 'single',
      },
    ],
  },
];
