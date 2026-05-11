import { Handler } from '@netlify/functions';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL || 'sighnria@gmail.com';

// Simple in-memory rate limiting (best effort in serverless)
const ipCache: Record<string, number> = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

// Validate setup
if (!process.env.RESEND_API_KEY) {
  console.warn('Warning: RESEND_API_KEY is not set in environment variables');
}

export const handler: Handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const clientIp = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || 'unknown';
  
  // Check for API key at runtime
  if (!process.env.RESEND_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Configuration Error: Missing API Key' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { name, email, message } = data;

    // Validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Basic sanitization
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message.trim().slice(0, 2000);

    // Send Email
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: 'Collaborations <onboarding@resend.dev>',
      to: [adminEmail],
      subject: `New Collaboration Request from ${sanitizedName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #000;">New Collaboration Request</h2>
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${sanitizedMessage.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">Submitted via CrankTasy Collaborate Page</p>
        </div>
      `,
    });

    if (resendError) {
      console.error('Resend Error:', resendError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send email' }),
      };
    }

    // Optional: Log to MongoDB could be added here if URI is present
    // For now, we return success.

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: resendData?.id }),
    };
  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal Server Error',
        details: 'Check server logs for more information'
      }),
    };
  }
};
