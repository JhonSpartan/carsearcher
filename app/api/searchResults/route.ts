import SearchResults from "@/libs/models/searchResults.models";
import { connectToDB } from "@/libs/mongoose";
import { NextResponse } from "next/server";


export async function GET() {
  await connectToDB();
  const searchresults = await SearchResults.find();
  return NextResponse.json({ searchresults });
}

export async function POST(request: Request) {
  const data = await request.json();
  const { cars, read } = data;
  await connectToDB();
  await SearchResults.create({ cars, read });
  return NextResponse.json({ message: "Search Results Created" }, { status: 201 });
}