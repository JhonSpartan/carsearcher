
import GraphData from "@/libs/models/graphData.model";
import { connectToDB } from "@/libs/mongoose";
import { NextResponse } from "next/server";


export async function GET() {
  await connectToDB();
  const graphData = await GraphData.find();
  return NextResponse.json({ graphData });
}