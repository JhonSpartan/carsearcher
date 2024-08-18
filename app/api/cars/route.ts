import Car from "@/libs/models/car.model";
import { connectToDB } from "@/libs/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const cars = await Car.find();
  return NextResponse.json({ cars });
}
