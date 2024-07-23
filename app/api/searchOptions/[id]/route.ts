import SearchOptions from "@/libs/models/searchOptions.model";
import { connectToDB } from "@/libs/mongoose";
import { ParamsShape } from "@/types";
import { NextResponse } from "next/server";


export async function PUT(request: Request, { params : {id} }: ParamsShape ) {
  const options  = await request.json();
  const { date , email, location } = options
  await connectToDB();
  await SearchOptions.findByIdAndUpdate(id, {email, location, date}, { status: 200 });
  return NextResponse.json({ message: "Search options updated" }, { status: 200 });

}
