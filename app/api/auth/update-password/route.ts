import { getServerSession } from 'next-auth/next';
import { compare } from 'bcryptjs';
import { findUserByEmail, updateUserPassword } from '../../../../models/User';
import { authOptions } from '../../../../lib/authOptions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();
  const userEmail = session.user.email || '';
  const user = await findUserByEmail(userEmail);

  const isPasswordValid = await compare(currentPassword, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid current password' }, { status: 400 });
  }

  await updateUserPassword(user.email, newPassword);
  return NextResponse.json({ message: 'Password updated' }, { status: 200 });
}
