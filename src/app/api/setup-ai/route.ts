import { NextRequest, NextResponse } from 'next/server';
// import fs from 'fs/promises';
// import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

// URL of the OpenAI-Realtime-API backend
const OPENAI_REALTIME_API_URL = process.env.OPENAI_REALTIME_API_URL;
if (!OPENAI_REALTIME_API_URL) {
  throw new Error('OPENAI_REALTIME_API_URL is not set in the environment variables');
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { companyName, companySize, agentScript } = await req.json();

    // Validate input
    if (!companyName || !companySize || !agentScript) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the new SYSTEM_MESSAGE
    const newSystemMessage = `You are an AI receptionist for ${companyName}. ${agentScript}`;

    // Send the new SYSTEM_MESSAGE to the OpenAI-Realtime-API backend
    const response = await fetch(`${OPENAI_REALTIME_API_URL}/system-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemMessage: newSystemMessage }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: data.error || 'Failed to update SYSTEM_MESSAGE on backend' },
        { status: response.status }
      );
    }

    // Save the configuration to the user's profile in MongoDB
    await connectToDatabase();
    await User.findByIdAndUpdate(
      session.user.id,
      {
        aiConfig: {
          companyName,
          companySize,
          agentScript,
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    // Return success
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Setup AI error:', error);
      return NextResponse.json(
        { error: error.message || 'Something went wrong' },
        { status: 500 }
      );
    } else {
      console.error('Setup AI error:', error);
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      );
    }
  }
}
