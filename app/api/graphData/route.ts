
import GraphData from "@/libs/models/graphData.model";
import { connectToDB } from "@/libs/mongoose";
import { NextResponse } from "next/server";


export async function GET() {
  await connectToDB();
  const graphData = await GraphData.find();
  return NextResponse.json({ graphData });
}

export async function POST(request: Request) {
  const data  = await request.json();
  const graphData = data
  await connectToDB();
  await GraphData.create({ graphData });
  return NextResponse.json({ message: "Graph Data Created" }, { status: 201 });
}