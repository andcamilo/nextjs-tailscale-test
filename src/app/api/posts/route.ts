import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts, users, type NewPost } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        published: posts.published,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(posts)
      .leftJoin(users, eq(posts.userId, users.id));

    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, userId, published = false } = body;

    if (!title || !content || !userId) {
      return NextResponse.json(
        { error: 'Title, content, and userId are required' },
        { status: 400 }
      );
    }

    const userExists = await db.select().from(users).where(eq(users.id, userId));
    if (userExists.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const newPost: NewPost = {
      title,
      content,
      userId,
      published,
    };

    const createdPost = await db.insert(posts).values(newPost).returning();
    
    return NextResponse.json(createdPost[0], { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}