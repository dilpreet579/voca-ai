import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, company, email, password } = await req.json();

    // Validate input
    if (!firstName || !lastName || !company || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      company,
      email,
      password,
    });

    await user.save();

    // Return success without exposing password
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          company: user.company,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Registration error:', error);
      return NextResponse.json(
        { error: error.message || 'Something went wrong' },
        { status: 500 }
      );
    } else {
      console.error('Registration error:', error);
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      );
    }
  }
}
