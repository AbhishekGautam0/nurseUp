
'use server';
/**
 * @fileOverview A flow for generating and "sending" a One-Time Password (OTP).
 *
 * In a real application, this flow would integrate with an email or SMS service.
 * For this demo, it generates an OTP and logs it to the server console.
 *
 * - sendOtp - Generates and logs an OTP for a given email.
 * - SendOtpInput - The input type for the sendOtp function.
 * - SendOtpOutput - The return type for the sendOtp function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { customAlphabet } from 'nanoid';

// Define a function to generate a 6-digit numeric OTP
const nanoid = customAlphabet('1234567890', 6);

const SendOtpInputSchema = z.object({
  email: z.string().email().describe('The email address to send the OTP to.'),
});
export type SendOtpInput = z.infer<typeof SendOtpInputSchema>;

const SendOtpOutputSchema = z.object({
  success: z.boolean().describe('Whether the OTP was sent successfully.'),
  message: z.string().describe('A message indicating the result.'),
});
export type SendOtpOutput = z.infer<typeof SendOtpOutputSchema>;

// This is the exported function that the UI will call.
export async function sendOtp(input: SendOtpInput): Promise<SendOtpOutput> {
  return sendOtpFlow(input);
}

// Define the Genkit flow
const sendOtpFlow = ai.defineFlow(
  {
    name: 'sendOtpFlow',
    inputSchema: SendOtpInputSchema,
    outputSchema: SendOtpOutputSchema,
  },
  async (input) => {
    const otp = nanoid();

    // In a real-world scenario, you would integrate with an email service
    // like SendGrid, Resend, or AWS SES to send the OTP.
    // For this example, we will just log it to the console.
    
    console.log(`
    ================================================
    OTP Generated for: ${input.email}
    Your OTP is: ${otp}
    ================================================
    `);

    // Here, you would add logic to store the OTP and its expiration time
    // in a database or cache (e.g., Redis) associated with the user's email.
    // For this demo, we assume any OTP entered is valid.

    return {
      success: true,
      message: `OTP has been logged to the console for ${input.email}.`,
    };
  }
);
