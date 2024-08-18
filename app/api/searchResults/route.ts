import SearchResults from "@/libs/models/searchResults.models";
import { connectToDB } from "@/libs/mongoose";
import { NextResponse } from "next/server";


export async function GET() {
  await connectToDB();
  const searchresults = await SearchResults.find();
  return NextResponse.json({ searchresults });
}