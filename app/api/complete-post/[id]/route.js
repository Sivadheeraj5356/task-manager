import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;

    // First get the current post to toggle its status
    const currentPost = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!currentPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Toggle the completed status
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        completed: !currentPost.completed,
      },
    });

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update completion status" },
      { status: 500 }
    );
  }
} 