import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req) {
  await dbConnect();

  try {
    const users = await User.find();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  
  try {
    const body = await req.json();
    const user = await User.create(body);
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 400 });
  }
}
