"use server"

import { revalidateTag } from "next/cache";
import GraphData from "../models/graphData.model";
import { SearchResultsShape, CarShape } from "@/types";
import SearchOptions from "../models/searchOptions.model";
import SearchResults from "../models/searchResults.models";
import Car from "../models/car.model";
import { connectToDB } from "../mongoose";

export async function createCarAction(car: CarShape) {
  try {
    const { manufacturer, model, fuelType, transmission, yearOfProduction, carDrive, carType, generation, placesCount, doorsCount, uniqueKey } = car;
    await connectToDB();
    await Car.create({ manufacturer, model, fuelType, transmission, yearOfProduction, carDrive, carType, generation, placesCount, doorsCount, uniqueKey });
    revalidateTag("cars");
  } catch (error) {
    console.log(error);
  }
}

export async function updateCarsAction(car: any, id: string | undefined) {
  try {   
    const { manufacturer, model, fuelType, transmission, yearOfProduction, carDrive, carType, generation, placesCount, doorsCount } = car;
    await connectToDB();
    await Car.findOneAndUpdate({_id: id }, { manufacturer, model, fuelType, transmission, yearOfProduction, carDrive, carType, generation, placesCount, doorsCount });
    revalidateTag("cars");
  } catch (error) {
    console.log(error);
  } 
}

export async function deleteCarAction(id: string | undefined) {
  try {  
    await connectToDB();
    await Car.findByIdAndDelete(id);
    revalidateTag("cars");
  } catch (error) {
    console.log(error);
  }
}


export async function createGraphDataAction(graphData: number) {
  try { 
    await connectToDB();
    await GraphData.create({graphData});
    revalidateTag("graphData");
  } catch (error) {
    console.log(error);
  }
}

export async function createSearchResultsAction(results: SearchResultsShape) {
  try {   
    const { cars, read } = results;
    await connectToDB();
    await SearchResults.create({cars, read});
    revalidateTag("results");
  } catch (error) {
    console.log(error);
  }
}

export async function updateSearchResultsAction(read: boolean, id: string | undefined) {
  try {   
    await connectToDB();
    await SearchResults.findOneAndUpdate({_id: id }, {read: read});
    revalidateTag("results");
  } catch (error) {
    console.log(error);
  } 
}

export async function deleteSearchResultsAction(id: string | undefined) {
  try {   
    await connectToDB();
    await SearchResults.findByIdAndDelete(id);
    revalidateTag("results");
  } catch (error) {
    console.log(error);
  }
}

export async function updateLocationAction(loc: string) {
  try {   
    await connectToDB();
    await SearchOptions.findOneAndUpdate({ }, {location: loc});
    revalidateTag("options");
  } catch (error) {
    console.log(error);
  }
}

export async function updateDateAction(date: string | Date) {
  try {   
    await connectToDB();
    await SearchOptions.findOneAndUpdate({ }, {date: date});
    revalidateTag("options");
  } catch (error) {
    console.log(error);
  }
}

export async function updateEmailAction(email: string) {
  try {   
    await connectToDB();
    await SearchOptions.findOneAndUpdate({ }, {email: email});
    revalidateTag("options");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFirstItem(id: string) {
  try {
    await connectToDB();
    await GraphData.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
}
