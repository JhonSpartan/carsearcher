import Car from "@/libs/models/car.model";
import { connectToDB } from "@/libs/mongoose";
import { ParamsShape } from "@/types";
import { NextResponse } from "next/server";


export async function PUT(request: Request, { params : {id} }: ParamsShape ) {
  const car  = await request.json();
  const { manufacturer, model, fuelType, transmission, yearOfProduction, carDrive, carType, generation, placesCount, doorsCount } = car;
  await connectToDB();
  await Car.findByIdAndUpdate(id, {manufacturer, model, fuelType, transmission, yearOfProduction, carDrive, carType, generation, placesCount, doorsCount});
  return NextResponse.json({ message: "Car updated" }, { status: 200 });
}

export async function GET(request: Request, { params: {id} }: ParamsShape ) {
  await connectToDB();
  const car = await Car.findOne({ _id: id });
  return NextResponse.json({ car }, { status: 200 });
}

export async function DELETE(request: Request, { params: {id} }: ParamsShape ) {
  await connectToDB();
  await Car.findByIdAndDelete(id);
  return NextResponse.json({ message: "Car Deleted" }, { status: 200 });
}