import { NextResponse } from 'next/server';

export interface ProxyResponse {
  status: number;
  body: string;
  error?: string;
}

export const proxyResponse = {
  success(status: number, body: string): NextResponse<ProxyResponse> {
    return NextResponse.json({
      status,
      body,
      error: undefined,
    });
  },

  error(error: string, status = 0): NextResponse<ProxyResponse> {
    return NextResponse.json(
      {
        status,
        body: '',
        error,
      },
      { status: 200 }
    );
  },
};
