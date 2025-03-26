import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// PUT endpoint to update a post
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    const result = await prisma.post.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        content,
        published: true
      }
    });

    return NextResponse.json({
      data: result
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove a post
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 