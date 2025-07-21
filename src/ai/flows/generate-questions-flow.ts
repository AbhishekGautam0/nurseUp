
/**
 * @fileOverview A flow for generating nursing exam questions.
 *
 * - generateQuestions - A function that generates questions based on a topic.
 * - GenerateQuestionsInput - The input type for the generateQuestions function.
 * - GenerateQuestionsOutput - The return type for the generateQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptionSchema = z.object({
  id: z.string().describe("A unique identifier for the option, e.g., 'a', 'b', 'c', 'd'."),
  text: z.string().describe('The text of the option.'),
});

const QuestionSchema = z.object({
  id: z.string().describe('A unique identifier for the question, formatted as "testId-questionNumber".'),
  text: z.string().describe('The text of the question.'),
  options: z.array(OptionSchema).describe('An array of possible answers.'),
  correctAnswers: z.array(z.string()).describe('An array of correct option IDs.'),
  type: z.enum(['single', 'multiple']).describe('The type of question.'),
});

const GenerateQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic for the questions, e.g., "Cardiology".'),
  count: z.number().describe('The number of questions to generate.'),
});
export type GenerateQuestionsInput = z.infer<typeof GenerateQuestionsInputSchema>;

const GenerateQuestionsOutputSchema = z.object({
  questions: z.array(QuestionSchema),
});
export type GenerateQuestionsOutput = z.infer<typeof GenerateQuestionsOutputSchema>;


export async function generateQuestions(input: GenerateQuestionsInput): Promise<GenerateQuestionsOutput> {
  return generateQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionsPrompt',
  input: {schema: GenerateQuestionsInputSchema},
  output: {schema: GenerateQuestionsOutputSchema},
  prompt: `You are an expert in creating exam questions for the Nursing Officer Recruitment Common Eligibility Test (NORCET) in India. Your task is to generate {{count}} high-quality multiple-choice questions on the topic of "{{topic}}".

Follow these instructions precisely:
- **Source Material:** Base your questions on the standard B.Sc. Nursing curriculum as it applies to the official NORCET syllabus. This includes subjects like Anatomy, Physiology, Medical-Surgical Nursing, Community Health Nursing, etc.
- **Accuracy is paramount.** Double-check every question and answer for medical and factual accuracy against reliable nursing textbooks and official guidelines. The provided 'correctAnswers' MUST be correct.
- **Question Mix:** When generating, create a mix of questions: 80% from core nursing subjects related to the topic, and 20% from General Knowledge or basic Aptitude relevant to a nursing professional.
- **Exam Relevance:** The style and difficulty should mirror questions from previous year's NORCET exams. Focus on creating scenario-based and high-yield questions that test clinical application and critical thinking.
- **Question Types:** For each question, provide 4-5 options. The 'type' must be 'single' for one correct answer, and **'multiple' for questions with multiple correct answers.** Ensure you generate a few 'multiple' type questions if the count is greater than 5.
- **Formatting:** Ensure the 'id' for each question is unique (e.g., 'gen-1', 'gen-2'). The 'correctAnswers' array must contain the 'id' of the correct option(s).

Generate the questions in the specified JSON format. Ensure every single question object in the array is complete and adheres to the required schema, containing all required fields: id, text, options, correctAnswers, and type. Do not leave any object incomplete.`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
       {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});


const generateQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFlow',
    inputSchema: GenerateQuestionsInputSchema,
    outputSchema: GenerateQuestionsOutputSchema,
  },
  async (input) => {
    try {
      // First attempt with the default model
      console.log('Attempting to generate questions with default model...');
      const {output} = await prompt(input);
      return output!;
    } catch (error) {
      console.warn('Default model failed. Retrying with fallback model...', error);
      // Fallback attempt with a different model
      const {output} = await prompt(input, { model: 'googleai/gemini-1.5-flash-latest' });
      return output!;
    }
  }
);
