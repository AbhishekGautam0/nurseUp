
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

export const initialTests: Test[] = [
  {
    id: 'norcet-practice-1',
    title: 'NORCET Practice Exam I',
    description: 'A model exam based on the NORCET pattern, covering nursing subjects and general aptitude.',
    duration: 90,
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
          { id: 'e', text: 'Regular exercise' },
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
        text: 'What does the abbreviation "GCS" stand for in a neurological assessment?',
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
      {
        id: 'q26',
        text: 'A nurse is preparing to administer digoxin. Which of the following findings would cause the nurse to hold the medication?',
        options: [
          { id: 'a', text: 'Heart rate of 80/min' },
          { id: 'b', text: 'Blood pressure of 120/80 mmHg' },
          { id: 'c', text: 'Heart rate of 52/min' },
          { id: 'd', text: 'Respiratory rate of 18/min' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q27',
        text: 'Which position is best for a client who is experiencing a severe asthma attack?',
        options: [
          { id: 'a', text: 'Supine' },
          { id: 'b', text: 'High-Fowler\'s' },
          { id: 'c', text: 'Trendelenburg' },
          { id: 'd', text: 'Left lateral' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q28',
        text: 'What is the antidote for a warfarin (Coumadin) overdose?',
        options: [
          { id: 'a', text: 'Protamine sulfate' },
          { id: 'b', text: 'Vitamin K' },
          { id: 'c', text: 'Naloxone' },
          { id: 'd', text: 'Flumazenil' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q29',
        text: 'A client has a positive Mantoux test. The nurse interprets this as:',
        options: [
          { id: 'a', text: 'The client has an active case of tuberculosis.' },
          { id: 'b', text: 'The client has been exposed to the tuberculosis bacillus.' },
          { id: 'c', text: 'The client is immune to tuberculosis.' },
          { id: 'd', text: 'The test is inaccurate and needs to be repeated.' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q30',
        text: 'Which of the following are considered airborne precautions? (Select all that apply)',
        options: [
          { id: 'a', text: 'Wearing a surgical mask' },
          { id: 'b', text: 'Placing the client in a private, negative-pressure room' },
          { id: 'c', text: 'Wearing a gown and gloves for all contact' },
          { id: 'd', text: 'Using a N95 respirator mask' }
        ],
        correctAnswers: ['b', 'd'],
        type: 'multiple'
      },
      {
        id: 'q31',
        text: 'Who is known as the "Father of the Indian Constitution"?',
        options: [
          { id: 'a', text: 'Mahatma Gandhi' },
          { id: 'b', text: 'Jawaharlal Nehru' },
          { id: 'c', text: 'Sardar Vallabhbhai Patel' },
          { id: 'd', text: 'Dr. B. R. Ambedkar' }
        ],
        correctAnswers: ['d'],
        type: 'single'
      },
      {
        id: 'q32',
        text: 'A nurse is assessing a client for dehydration. Which of the following is a key sign?',
        options: [
          { id: 'a', text: 'Bradycardia' },
          { id: 'b', text: 'Increased skin turgor' },
          { id: 'c', text: 'Oliguria' },
          { id: 'd', text: 'Hypertension' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q33',
        text: 'Maslow\'s hierarchy of needs places which need at the most fundamental level?',
        options: [
          { id: 'a', text: 'Safety and Security' },
          { id: 'b', text: 'Love and Belonging' },
          { id: 'c', text: 'Physiological Needs' },
          { id: 'd', text: 'Self-Actualization' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q34',
        text: 'A nurse is providing care to a client with a chest tube. The nurse should:',
        options: [
          { id: 'a', text: 'Empty the drainage system every hour.' },
          { id: 'b', text: 'Ensure the tubing is kept coiled on the bed.' },
          { id: 'c', text: 'Observe for constant bubbling in the water-seal chamber.' },
          { id: 'd', text: 'Keep the drainage system below the level of the client\'s chest.' }
        ],
        correctAnswers: ['d'],
        type: 'single'
      },
      {
        id: 'q35',
        text: 'What is the normal range for serum potassium?',
        options: [
          { id: 'a', text: '1.5-2.5 mEq/L' },
          { id: 'b', text: '3.5-5.0 mEq/L' },
          { id: 'c', text: '5.5-6.5 mEq/L' },
          { id: 'd', text: '135-145 mEq/L' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q36',
        text: 'Which of the following actions is a key component of standard precautions?',
        options: [
          { id: 'a', text: 'Hand hygiene' },
          { id: 'b', text: 'Placing all clients on isolation' },
          { id: 'c', text: 'Using a N95 respirator for all client care' },
          { id: 'd', text: 'Administering prophylactic antibiotics' }
        ],
        correctAnswers: ['a'],
        type: 'single'
      },
      {
        id: 'q37',
        text: 'A nurse is teaching a new mother how to breastfeed. Which action indicates the infant has a proper latch?',
        options: [
          { id: 'a', text: 'The infant\'s lips are turned inward.' },
          { id: 'b', text: 'The mother experiences sharp, shooting pain.' },
          { id: 'c', text: 'The infant\'s cheeks are dimpled.' },
          { id: 'd', text: 'The infant\'s mouth is wide open with lips flanged outward.' }
        ],
        correctAnswers: ['d'],
        type: 'single'
      },
      {
        id: 'q38',
        text: 'What is the term for a heart rate below 60 beats per minute?',
        options: [
          { id: 'a', text: 'Tachycardia' },
          { id: 'b', text: 'Bradycardia' },
          { id: 'c', text: 'Arrhythmia' },
          { id: 'd', text: 'Fibrillation' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q39',
        text: 'A client with chronic kidney disease (CKD) should be advised to limit their intake of which nutrients? (Select all that apply)',
        options: [
          { id: 'a', text: 'Protein' },
          { id: 'b', text: 'Carbohydrates' },
          { id: 'c', text: 'Phosphorus' },
          { id: 'd', text: 'Potassium' },
          { id: 'e', text: 'Sodium' }
        ],
        correctAnswers: ['a', 'c', 'd', 'e'],
        type: 'multiple'
      },
      {
        id: 'q40',
        text: 'What is the primary function of the cerebellum?',
        options: [
          { id: 'a', text: 'Controlling body temperature' },
          { id: 'b', text: 'Coordinating voluntary movements, posture, and balance' },
          { id: 'c', text: 'Regulating sleep cycles' },
          { id: 'd', text: 'Processing sensory information' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q41',
        text: 'The "Chandrayaan-3" mission by ISRO was aimed at exploring which celestial body?',
        options: [
          { id: 'a', text: 'Mars' },
          { id: 'b', text: 'Venus' },
          { id: 'c', text: 'The Moon' },
          { id: 'd', text: 'Jupiter' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q42',
        text: 'A man buys an article for ₹27.50 and sells it for ₹28.60. Find his gain percent.',
        options: [
          { id: 'a', text: '3%' },
          { id: 'b', text: '4%' },
          { id: 'c', text: '5%' },
          { id: 'd', text: '6%' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q43',
        text: 'What is the correct sequence for donning Personal Protective Equipment (PPE)?',
        options: [
          { id: 'a', text: 'Gloves, Gown, Mask, Goggles' },
          { id: 'b', text: 'Mask, Gown, Gloves, Goggles' },
          { id: 'c', text: 'Gown, Mask, Goggles, Gloves' },
          { id: 'd', text: 'Goggles, Gloves, Gown, Mask' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q44',
        text: 'Which type of insulin is considered long-acting?',
        options: [
          { id: 'a', text: 'Insulin lispro (Humalog)' },
          { id: 'b', text: 'Regular insulin (Humulin R)' },
          { id: 'c', text: 'NPH insulin (Humulin N)' },
          { id: 'd', text: 'Insulin glargine (Lantus)' }
        ],
        correctAnswers: ['d'],
        type: 'single'
      },
      {
        id: 'q45',
        text: 'A nurse is assessing a client\'s apical pulse. Where should the stethoscope be placed?',
        options: [
          { id: 'a', text: 'Second intercostal space, right sternal border' },
          { id: 'b', text: 'Fifth intercostal space, midclavicular line' },
          { id: 'c', text: 'Third intercostal space, left sternal border' },
          { id: 'd', text: 'Fourth intercostal space, right sternal border' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q46',
        text: 'The "five rights" of medication administration are:',
        options: [
          { id: 'a', text: 'Right Patient, Right Drug, Right Dose, Right Route, Right Time' },
          { id: 'b', text: 'Right Doctor, Right Nurse, Right Pharmacy, Right Room, Right Time' },
          { id: 'c', text: 'Right Chart, Right Drug, Right Dose, Right Route, Right Reason' },
          { id: 'd', text: 'Right Patient, Right Medication, Right Amount, Right Way, Right Frequency' }
        ],
        correctAnswers: ['a'],
        type: 'single'
      },
      {
        id: 'q47',
        text: 'Which of the following is a classic sign of Cushing\'s syndrome?',
        options: [
          { id: 'a', text: 'Hypotension' },
          { id: 'b', text: 'Weight loss' },
          { id: 'c', text: 'Moon face' },
          { id: 'd', text: 'Hypoglycemia' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q48',
        text: 'What is the primary goal of palliative care?',
        options: [
          { id: 'a', text: 'To cure the underlying disease.' },
          { id: 'b', text: 'To prolong the client\'s life at all costs.' },
          { id: 'c', text: 'To improve the quality of life for clients with serious illnesses.' },
          { id: 'd', text: 'To provide care only in the last few days of life.' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q49',
        text: 'Which of the following is an example of a vector-borne disease?',
        options: [
          { id: 'a', text: 'Tuberculosis' },
          { id: 'b', text: 'Influenza' },
          { id: 'c', text: 'Malaria' },
          { id: 'd', text: 'Cholera' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q50',
        text: 'A nurse is assessing a newborn\'s Apgar score. Which of the following components are assessed? (Select all that apply)',
        options: [
          { id: 'a', text: 'Heart Rate' },
          { id: 'b', text: 'Respiratory Effort' },
          { id: 'c', text: 'Blood Pressure' },
          { id: 'd', text: 'Muscle Tone' },
          { id: 'e', text: 'Reflex Irritability' }
        ],
        correctAnswers: ['a', 'b', 'd', 'e'],
        type: 'multiple'
      },
      {
        id: 'q51',
        text: 'Who was the first woman to become a Prime Minister of a country?',
        options: [
          { id: 'a', text: 'Indira Gandhi' },
          { id: 'b', text: 'Golda Meir' },
          { id: 'c', text: 'Margaret Thatcher' },
          { id: 'd', text: 'Sirimavo Bandaranaike' }
        ],
        correctAnswers: ['d'],
        type: 'single'
      },
      {
        id: 'q52',
        text: 'A client with a history of heart failure is prescribed a diuretic. The nurse should monitor for which electrolyte imbalance?',
        options: [
          { id: 'a', text: 'Hyperkalemia' },
          { id: 'b', text: 'Hypokalemia' },
          { id: 'c', text: 'Hypernatremia' },
          { id: 'd', text: 'Hypocalcemia' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q53',
        text: 'What is the correct way to write a nursing diagnosis?',
        options: [
          { id: 'a', text: 'Problem + Etiology + Signs/Symptoms' },
          { id: 'b', text: 'Medical Diagnosis + Treatment' },
          { id: 'c', text: 'Need + Goal + Intervention' },
          { id: 'd', text: 'Observation + Action + Response' }
        ],
        correctAnswers: ['a'],
        type: 'single'
      },
      {
        id: 'q54',
        text: 'Which cranial nerve is responsible for the sense of smell?',
        options: [
          { id: 'a', text: 'Optic Nerve (II)' },
          { id: 'b', text: 'Olfactory Nerve (I)' },
          { id: 'c', text: 'Trigeminal Nerve (V)' },
          { id: 'd', text: 'Facial Nerve (VII)' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q55',
        text: 'A nurse is providing wound care and needs to clean the area. The nurse should clean the wound:',
        options: [
          { id: 'a', text: 'From the outer edge toward the center.' },
          { id: 'b', text: 'From the top to the bottom.' },
          { id: 'c', text: 'In a circular motion, starting from the center and moving outward.' },
          { id: 'd', text: 'In a back-and-forth motion across the wound.' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q56',
        text: 'What is the primary cause of Chronic Obstructive Pulmonary Disease (COPD)?',
        options: [
          { id: 'a', text: 'Viral infections' },
          { id: 'b', text: 'Genetic factors' },
          { id: 'c', text: 'Long-term exposure to irritants like cigarette smoke' },
          { id: 'd', text: 'Bacterial pneumonia' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q57',
        text: 'The legal doctrine "respondeat superior" in nursing means:',
        options: [
          { id: 'a', text: 'The nurse is responsible for their own actions.' },
          { id: 'b', text: 'The employer is held liable for the nurse\'s negligent acts.' },
          { id: 'c', text: 'The patient must provide informed consent.' },
          { id: 'd', text: 'Do no harm.' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q58',
        text: 'Which of the following is the most accurate method for confirming the placement of an endotracheal tube?',
        options: [
          { id: 'a', text: 'Auscultation of bilateral breath sounds' },
          { id: 'b', text: 'Observation of chest rise and fall' },
          { id: 'c', text: 'End-tidal CO2 detection (capnography)' },
          { id: 'd', text: 'Condensation in the tube' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q59',
        text: 'A client is admitted with a diagnosis of myocardial infarction (MI). The nurse would expect to see an elevation in which cardiac marker?',
        options: [
          { id: 'a', text: 'Alkaline Phosphatase' },
          { id: 'b', text: 'Creatinine Kinase-MB (CK-MB)' },
          { id: 'c', text: 'Alanine Aminotransferase (ALT)' },
          { id: 'd', text: 'Amylase' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q60',
        text: 'The national immunization schedule for a 9-month-old infant in India includes which vaccines? (Select all that apply)',
        options: [
          { id: 'a', text: 'BCG' },
          { id: 'b', text: 'Measles and Rubella (MR) - 1st Dose' },
          { id: 'c', text: 'DPT - 1st Booster' },
          { id: 'd', text: 'Vitamin A - 1st Dose' },
          { id: 'e', text: 'Pentavalent - 3rd Dose' }
        ],
        correctAnswers: ['b', 'd'],
        type: 'multiple'
      },
      {
        id: 'q61',
        text: 'Which state in India is known as the "Spice Garden of India"?',
        options: [
          { id: 'a', text: 'Karnataka' },
          { id: 'b', text: 'Kerala' },
          { id: 'c', text: 'Tamil Nadu' },
          { id: 'd', text: 'Andhra Pradesh' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q62',
        text: 'A nurse is teaching a client about a low-sodium diet. Which food should the client be advised to avoid?',
        options: [
          { id: 'a', text: 'Fresh fruits' },
          { id: 'b', text: 'Canned soups' },
          { id: 'c', text: 'Grilled chicken breast' },
          { id: 'd', text: 'Steamed vegetables' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q63',
        text: 'What is the purpose of the Z-track method of intramuscular injection?',
        options: [
          { id: 'a', text: 'To reduce the pain of the injection.' },
          { id: 'b', text: 'To allow for a larger volume of medication to be given.' },
          { id: 'c', text: 'To prevent the medication from leaking into subcutaneous tissue.' },
          { id: 'd', text: 'To increase the absorption rate of the medication.' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q64',
        text: 'The "Triad of Death" in trauma consists of which three conditions?',
        options: [
          { id: 'a', text: 'Hypothermia, Acidosis, Coagulopathy' },
          { id: 'b', text: 'Hypertension, Bradycardia, Hyperglycemia' },
          { id: 'c', text: 'Fever, Tachycardia, Dehydration' },
          { id: 'd', text: 'Hypoxia, Hypotension, Hypovolemia' }
        ],
        correctAnswers: ['a'],
        type: 'single'
      },
      {
        id: 'q65',
        text: 'What is the role of the placenta during pregnancy?',
        options: [
          { id: 'a', text: 'To protect the fetus from physical injury.' },
          { id: 'b', text: 'To provide nutrient uptake, waste elimination, and gas exchange.' },
          { id: 'c', text: 'To stimulate uterine contractions during labor.' },
          { id: 'd', text: 'To determine the sex of the fetus.' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q66',
        text: 'A client has a platelet count of 40,000/mm³. The nurse should implement precautions for:',
        options: [
          { id: 'a', text: 'Infection' },
          { id: 'b', text: 'Bleeding' },
          { id: 'c', text: 'Seizures' },
          { id: 'd', 'text': 'Aspiration' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q67',
        text: 'Which of the following is a symptom of retinal detachment?',
        options: [
          { id: 'a', text: 'Gradual blurring of central vision.' },
          { id: 'b', text: 'A sudden appearance of floaters and flashes of light.' },
          { id: 'c', text: 'Pain and redness in the eye.' },
          { id: 'd', text: 'Yellowish discharge from the eye.' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q68',
        text: 'A nurse is performing a "FAST" assessment on a client with a suspected stroke. What does "T" stand for?',
        options: [
          { id: 'a', text: 'Temperature' },
          { id: 'b', text: 'Tingling' },
          { id: 'c', text: 'Time' },
          { id: 'd', text: 'Tone' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q69',
        text: 'Which of the following are part of the "six Ps" of acute compartment syndrome? (Select all that apply)',
        options: [
          { id: 'a', text: 'Pain' },
          { id: 'b', text: 'Pallor' },
          { id: 'c', text: 'Polydipsia' },
          { id: 'd', text: 'Paresthesia' },
          { id: 'e', text: 'Paralysis' }
        ],
        correctAnswers: ['a', 'b', 'd', 'e'],
        type: 'multiple'
      },
      {
        id: 'q70',
        text: 'The primary function of the hormone "Aldosterone" is to:',
        options: [
          { id: 'a', text: 'Regulate blood glucose levels.' },
          { id: 'b', text: 'Promote the reabsorption of sodium and water in the kidneys.' },
          { id: 'c', text: 'Stimulate the growth of long bones.' },
          { id: 'd', text: 'Control the body\'s metabolic rate.' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q71',
        text: 'Find the average of the first 20 odd numbers.',
        options: [
          { id: 'a', text: '19' },
          { id: 'b', text: '20' },
          { id: 'c', text: '21' },
          { id: 'd', text: '40' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q72',
        text: 'What is the recommended compression-to-ventilation ratio for single-rescuer adult CPR?',
        options: [
          { id: 'a', text: '15:1' },
          { id: 'b', text: '15:2' },
          { id: 'c', text: '30:1' },
          { id: 'd', text: '30:2' }
        ],
        correctAnswers: ['d'],
        type: 'single'
      },
      {
        id: 'q73',
        text: 'A client is diagnosed with "Graves\' disease". The nurse would expect to see which of the following signs?',
        options: [
          { id: 'a', text: 'Bradycardia' },
          { id: 'b', text: 'Weight gain' },
          { id: 'c', text: 'Cold intolerance' },
          { id: 'd', text: 'Exophthalmos (bulging eyes)' }
        ],
        correctAnswers: ['d'],
        type: 'single'
      },
      {
        id: 'q74',
        text: 'Which part of the brain is primarily responsible for basic life-sustaining functions like breathing, heart rate, and blood pressure?',
        options: [
          { id: 'a', text: 'Cerebrum' },
          { id: 'b', text: 'Cerebellum' },
          { id: 'c', text: 'Brainstem' },
          { id: 'd', text: 'Hypothalamus' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q75',
        text: 'A nurse is preparing an injection from a glass ampule. What is the most important action to take?',
        options: [
          { id: 'a', text: 'Use a filter needle to withdraw the medication.' },
          { id: 'b', text: 'Inject air into the ampule before withdrawing the medication.' },
          { id: 'c', text: 'Warm the ampule in the hands before opening.' },
          { id: 'd', text: 'Wipe the top of the ampule with an alcohol swab.' }
        ],
        correctAnswers: ['a'],
        type: 'single'
      },
      {
        id: 'q76',
        text: 'What is "hemoptysis"?',
        options: [
          { id: 'a', text: 'Vomiting blood' },
          { id: 'b', text: 'Blood in the urine' },
          { id: 'c', text: 'Coughing up blood' },
          { id: 'd', text: 'Blood in the stool' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q77',
        text: 'A client with schizophrenia is experiencing auditory hallucinations. The most appropriate initial nursing response is:',
        options: [
          { id: 'a', text: 'Tell the client that the voices are not real.' },
          { id: 'b', text: 'Explore the content of the hallucinations.' },
          { id: 'c', text: 'Ask the client "What are the voices saying?"' },
          { id: 'd', text: 'Distract the client with a group activity.' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q78',
        text: 'Which of the following is a contraindication for administering the oral polio vaccine (OPV)?',
        options: [
          { id: 'a', text: 'A mild cold' },
          { id: 'b', text: 'Diarrhea' },
          { id: 'c', text: 'Immunodeficiency in the child or a household contact' },
          { id: 'd', text: 'A family history of allergies' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q79',
        text: 'The "Pink City" of India is:',
        options: [
          { id: 'a', text: 'Jaipur' },
          { id: 'b', text: 'Jodhpur' },
          { id: 'c', text: 'Udaipur' },
          { id: 'd', text: 'Agra' }
        ],
        correctAnswers: ['a'],
        type: 'single'
      },
      {
        id: 'q80',
        text: 'A nurse is caring for a postoperative client. Which finding would be the earliest sign of hypovolemic shock?',
        options: [
          { id: 'a', text: 'Hypotension' },
          { id: 'b', text: 'Tachycardia' },
          { id: 'c', text: 'Cyanosis' },
          { id: 'd', text: 'Decreased urine output' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q81',
        text: 'A nurse is providing discharge instructions to a client with a new colostomy. Which statement by the client indicates an understanding of the teaching?',
        options: [
          { id: 'a', text: '"I will need to change the pouch every day."' },
          { id: 'b', text: '"I should expect the stoma to be a pale, dusky color."' },
          { id: 'c', text: '"I will empty the pouch when it is one-third to one-half full."' },
          { id: 'd', text: '"I can eat a high-fiber diet immediately to promote regular bowel movements."' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q82',
        text: 'Which of the following is the priority nursing intervention for a client experiencing an anaphylactic reaction?',
        options: [
          { id: 'a', text: 'Administering epinephrine' },
          { id: 'b', text: 'Administering a corticosteroid' },
          { id: 'c', text: 'Administering an antihistamine' },
          { id: 'd', text: 'Applying oxygen' }
        ],
        correctAnswers: ['a'],
        type: 'single'
      },
      {
        id: 'q83',
        text: 'What is the landmark for administering an intramuscular injection into the ventrogluteal muscle?',
        options: [
          { id: 'a', text: 'The acromion process and the axillary fold.' },
          { id: 'b', text: 'The head of the greater trochanter and the anterior superior iliac spine.' },
          { id: 'c', text: 'The popliteal space.' },
          { id: 'd', text: 'The lower edge of the deltoid muscle.' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q84',
        text: 'A client has a "living will". The nurse understands that this document:',
        options: [
          { id: 'a', text: 'Appoints a person to make healthcare decisions for the client.' },
          { id: 'b', text: 'Specifies the client\'s wishes regarding medical treatment if they become incapacitated.' },
          { id: 'c', text: 'Details the distribution of the client\'s assets after death.' },
          { id: 'd', text: 'Is the same as a "Do Not Resuscitate" (DNR) order.' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q85',
        text: 'Which of the following are functions of the liver? (Select all that apply)',
        options: [
          { id: 'a', text: 'Metabolism of carbohydrates, proteins, and fats' },
          { id: 'b', text: 'Production of insulin' },
          { id: 'c', text: 'Synthesis of bile' },
          { id: 'd', text: 'Detoxification of drugs and other harmful substances' },
          { id: 'e', text: 'Storage of vitamins and minerals' }
        ],
        correctAnswers: ['a', 'c', 'd', 'e'],
        type: 'multiple'
      },
      {
        id: 'q86',
        text: 'A client with a new diagnosis of type 1 diabetes asks why they need insulin instead of pills. The best response by the nurse is:',
        options: [
          { id: 'a', text: '"The pills are not as strong as insulin."' },
          { id: 'b', text: '"Your pancreas does not produce any insulin, so you need to replace it."' },
          { id: 'c', text: '"It is easier to manage your blood sugar with insulin."' },
          { id: 'd', text: '"Your body has become resistant to oral medications."' }
        ],
        correctAnswers: ['b'],
        type: 'single'
      },
      {
        id: 'q87',
        text: 'The "Babinski reflex" is considered a normal finding in:',
        options: [
          { id: 'a', text: 'Adults' },
          { id: 'b', text: 'Adolescents' },
          { id: 'c', text: 'Infants up to 2 years of age' },
          { id: 'd', text: 'Elderly clients' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q88',
        text: 'What is the name of the membrane that covers the lungs?',
        options: [
          { id: 'a', text: 'Pericardium' },
          { id: 'b', text: 'Peritoneum' },
          { id: 'c', text: 'Pleura' },
          { id: 'd', text: 'Meninges' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q89',
        text: 'A nurse is calculating a client\'s fluid intake. The client drank 8 oz of juice, 6 oz of coffee, and 120 mL of water. What is the total intake in mL? (1 oz ≈ 30 mL)',
        options: [
          { id: 'a', text: '360 mL' },
          { id: 'b', text: '420 mL' },
          { id: 'c', text: '540 mL' },
          { id: 'd', text: '600 mL' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      },
      {
        id: 'q90',
        text: 'Which of the following is a primary prevention strategy for cardiovascular disease?',
        options: [
          { id: 'a', text: 'Administering aspirin to a client who has had a heart attack.' },
          { id: 'b', text: 'Screening for high blood pressure.' },
          { id: 'c', text: 'Teaching a community group about the benefits of regular exercise.' },
          { id: 'd', text: 'Enrolling a client in a cardiac rehabilitation program.' }
        ],
        correctAnswers: ['c'],
        type: 'single'
      }
    ],
  },
];
