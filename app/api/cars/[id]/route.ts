import Car from "@/libs/models/car.model";
import { connectToDB } from "@/libs/mongoose";
import { ParamsShape } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: {id} }: ParamsShape ) {
  await connectToDB();
  const car = await Car.findOne({ _id: id });
  return NextResponse.json({ car }, { status: 200 });
}
