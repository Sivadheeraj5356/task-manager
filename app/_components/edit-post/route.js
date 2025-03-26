import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { title, content } = await request.json();

    if (!title && !content) {
      return NextResponse.json(
        { error: "Title or content is required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title: title || undefined,
        content: content || undefined,
      },
    });

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}