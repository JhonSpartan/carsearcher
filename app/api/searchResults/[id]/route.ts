import SearchResults from "@/libs/models/searchResults.models";
import { connectToDB } from "@/libs/mongoose";
import { ParamsShape } from "@/types";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params: {id} }: ParamsShape ) {
  await connectToDB();
  await SearchResults.findByIdAndDelete(id);
  return NextResponse.json({ message: "Search reuslt Deleted" }, { status: 200 });
}

export async function PUT(request: Request, { params : {id} }: ParamsShape ) {
  const results  = await request.json();
  const { read } = results
  await connectToDB();
  await SearchResults.findByIdAndUpdate(id, {read}, { status: 200 });
  return NextResponse.json({ message: "Search results updated" }, { status: 200 });

}