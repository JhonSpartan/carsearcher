import Car from "@/libs/models/car.model";
import { connectToDB } from "@/libs/mongoose";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectToDB();
  const cars = await Car.find();
  return NextResponse.json({ cars });
}
