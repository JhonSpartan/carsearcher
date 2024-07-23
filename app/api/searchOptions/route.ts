import SearchOptions from "@/libs/models/searchOptions.model";
import { connectToDB } from "@/libs/mongoose";
import { NextResponse } from "next/server";


export async function GET() {
  await connectToDB();
  const searchoptions = await SearchOptions.find();
  return NextResponse.json({ searchoptions });
}


