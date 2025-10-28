import { NextResponse } from 'next/server';

type ServeRequest = {
  placement?: string;   // e.g., 'sidebar', 'inline', etc.
  userId?: string | null;
};

export async function POST(req: Request) {
  // Read JSON body (ok if empty)
  let body: ServeRequest = {};
  try {
    if (req.headers.get('content-type')?.includes('application/json')) {
      body = await req.json();
    }
  } catch {
    // ignore bad/empty json for now
  }

  // TODO: look up an ad based on placement / user / targeting rules.
  // For now return a stub
  return NextResponse.json({
    ok: true,
    ad: null,
    debug: { received: body },
  });
}

// Optional GET for easy manual testing in the browser
export async function GET() {
  return NextResponse.json({ ok: true, ad: null });
}
