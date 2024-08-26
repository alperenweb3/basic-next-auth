import { createUser, findUserByEmail } from 'models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 409 },
    );
  }

  await createUser(name, email, password);
  return NextResponse.json({ message: 'User created' }, { status: 201 });
}
