import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin, password } = body;

    // PIN '1982' or password 'admin'
    if (pin === '1982' || password === 'admin') {
      const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });

      response.cookies.set({
        name: 'baitna_admin_session',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 12 // 12 hours
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'رمز الدخول أو كلمة المرور غير صحيحة / Invalid PIN or password' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 });
  }
}
