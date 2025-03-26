import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        id: 'desc'
      }
    });

    return new NextResponse(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch posts' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 