import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, 
  { params }: {params: Promise<{ id: string }>}
) {

  const id = (await params).id
  const URL = `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${id}`
  const response = await fetch(URL)
  const data = await response.json()
  
  return NextResponse.json(data, {
    status: response.status
  })
}