import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Logic is currently empty because we use LocalStorage.
  // Next.js Proxy runs on Edge and only has access to Cookies.
  return NextResponse.next();
}
