import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const post = await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}