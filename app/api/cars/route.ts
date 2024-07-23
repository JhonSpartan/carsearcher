import Car from "@/libs/models/car.model";
import { connectToDB } from "@/libs/mongoose";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const car = await request.json();
  const { manufacturer, model, fuelType, transmission, yearOfProduction, carDrive, carType, generation, placesCount, doorsCount, uniqueKey } = car;

  await connectToDB();
  await Car.create({ manufacturer, model, fuelType, transmission, yearOfProduction, carDrive, carType, generation, placesCount, doorsCount, uniqueKey });
  return NextResponse.json({ message: "Car Created" }, { status: 201 });
}

export async function GET() {
  await connectToDB();
  const cars = await Car.find();
  return NextResponse.json({ cars });
}
