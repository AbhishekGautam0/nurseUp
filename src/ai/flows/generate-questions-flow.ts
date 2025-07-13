'use server';
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
  prompt: `You are an expert in nursing education. Generate {{count}} multiple-choice questions for a nursing exam on the topic of "{{topic}}".

Follow these rules:
- For each question, provide 4 options.
- The 'type' should be 'single' if there is only one correct answer, and 'multiple' if there are multiple correct answers.
- Ensure the 'id' for each question is unique. You can use a format like 'gen-1', 'gen-2', etc.
- The 'correctAnswers' array should contain the 'id' of the correct option(s).

Generate the questions in the specified JSON format.`,
});


const generateQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFlow',
    inputSchema: GenerateQuestionsInputSchema,
    outputSchema: GenerateQuestionsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
