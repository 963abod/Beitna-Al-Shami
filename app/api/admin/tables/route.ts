import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const sessionCookie = request.cookies.get('baitna_admin_session');

  if (!sessionCookie || sessionCookie.value !== 'authenticated') {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Staff login required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { tableId, status } = body;

    if (!tableId || !['available', 'reserved', 'occupied'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid payload parameters' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Table status updated to ${status}`,
      tableId,
      status
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 });
  }
}
