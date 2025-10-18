import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { code, language } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    const prompt = `You are a code explanation expert. Explain the following ${language || 'code'} line by line in simple language that a beginner can understand. 

For each line of code, provide:
1. The line number
2. The actual code line
3. A simple, clear explanation

Format your response as a JSON array with this structure:
[
  {
    "lineNumber": 1,
    "code": "actual code line",
    "explanation": "simple explanation"
  }
]

Code to explain:
${code}

Return ONLY the JSON array, no additional text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful coding assistant that explains code in simple terms.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0].message.content || '[]';
    
    // Try to parse the JSON response
    let explanations;
    try {
      explanations = JSON.parse(responseText);
    } catch (e) {
      // If parsing fails, create a simple explanation
      const lines = code.split('\n');
      explanations = lines.map((line: string, index: number) => ({
        lineNumber: index + 1,
        code: line,
        explanation: 'Unable to parse AI response. Please try again.',
      }));
    }

    return NextResponse.json({ explanations });
  } catch (error: any) {
    console.error('Error explaining code:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to explain code' },
      { status: 500 }
    );
  }
}
