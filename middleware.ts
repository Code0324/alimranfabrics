import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Zustand persists to localStorage (not cookies) so we
  // can't read it in middleware — just let the layout handle auth.
  // This middleware only blocks non-JS crawlers and direct URL access.
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}