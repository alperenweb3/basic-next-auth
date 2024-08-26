import { NextRequest, NextResponse } from 'next/server';
import { updateUserPages } from '@/models/User';

export async function POST(
  req: NextRequest,
  { params }: { params: { email: string } },
) {
  const { email } = params;
  const { allowedPages } = await req.json();

  try {
    const user = await updateUserPages(email, allowedPages);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user permissions' },
      { status: 500 },
    );
  }
}
