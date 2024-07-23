"use server"

import { connectToDB } from "../mongoose";
import Car from "../models/car.model";
import { scrapeOtomotoCar } from "../scraper";
import { generateEmailBody, sendEmail } from "../nodemailer";
import SearchOptions from "../models/searchOptions.model";
import { SearchResult } from "@/types";
import GraphData from "../models/graphData.model";


export async function scrapeAndCompareCar(productUrl: string) {
  if(!productUrl) return;

  try {
    await connectToDB();
    let booleans = [];
    let filteredCars = [];
    let maxTime = undefined;


    const date = await SearchOptions.find();
    const baseTime = date[0].date;

    const scrapedCars = await scrapeOtomotoCar(productUrl);

    for (let car of scrapedCars!) {
      const carsBase = await Car.find({ manufacturer: car.manufacturer, model: car.model, fuelType: car.fuelType, transmission: car.transmission});
      const newDate = new Date(car.time.replace(/lipca/gi, 'july'));
      const dateComparison = baseTime < newDate;
      if (dateComparison === true) {
        booleans.push(dateComparison);
      }

      if(maxTime === undefined && newDate > baseTime) {
        maxTime = newDate;
      }  else if (newDate > maxTime! && newDate > baseTime) {
          maxTime = newDate;
        }
      
      if(carsBase.length !== 0 && newDate >= baseTime )  {
        filteredCars.push(car)
      } 
    }

    const scrapedResults: object = {
      booleans: booleans,
      cars: filteredCars,
      maxTime: maxTime,
    };

    return scrapedResults;
 
  } catch (error: any) {
    throw new Error(`Failed to scrape and commapre car: ${error.message}`)
  }
}

export async function addUserEmailToProduct(cars: SearchResult[], userEmail: string) {
  try {   
    const emailContent = await generateEmailBody(cars, "WELCOME");
    await sendEmail(emailContent, [userEmail]);
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

