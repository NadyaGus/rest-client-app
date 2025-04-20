import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url, method, body, headers } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const requestInit: RequestInit = {
      method,
      headers: {
        ...headers,
      },
    };

    if (method !== 'GET' && method !== 'HEAD' && body) {
      requestInit.body = body;
    }

    const response = await fetch(url, requestInit);

    return NextResponse.json({
      status: response.status,
      body: await response.text(),
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
