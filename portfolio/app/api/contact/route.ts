import { NextResponse } from 'next/server';
import { SMTPClient } from 'emailjs';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    const client = new SMTPClient({
      user: 'benjaminpellegrini@gmail.com',
      password: 'yjav mmfo mexu qpmd', 
      host: 'smtp.gmail.com',
      ssl: true,
    });

    try {
      const result = await client.sendAsync({
        from: `"${name}" <${email}>`,
        to: 'benjaminpellegrini@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
        `,
      });

      console.log('Email sent successfully:', result);
      return NextResponse.json({ success: true, result });
      
    } catch (emailError) {
      console.error('Email error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email', details: String(emailError) },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}