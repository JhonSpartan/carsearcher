import axios from 'axios';
import * as cheerio from 'cheerio';
import { connectToDB } from "../mongoose";
import SearchOptions from '../models/searchOptions.model';


export async function scrapeOtomotoCar(url: string) {
  if(!url) return;

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  }

 

  await connectToDB();

  const location = await SearchOptions.find();
  const baseLocation = JSON.stringify(location[0].location);



  try {
    let response = await axios.get(url, options);
    let $ = cheerio.load(response.data);


    
    const carCards: (string | undefined)[] = $('section.ooa-qat6iw.e1vic7eh1').has(`p.ooa-gmxnzj:contains(${baseLocation})`).toArray().map((car) => 
      ($(car).find('a').attr('href')));

    let foundCars = [];

    for (let link of carCards) {

      response = await axios.get(link!, options);
      $ = cheerio.load(response.data);

      const manufacturer: string = $('p.e130ulp54.ooa-12b2ph5:contains("Marka pojazdu")').parent().children('a').text();
      const model: string = $('p.e130ulp54.ooa-12b2ph5:contains("Model pojazdu")').parent().children('a').text();
      const fuelType: string = $('p.e130ulp54.ooa-12b2ph5:contains("Rodzaj paliwa")').parent().children('a').text();
      const transmission: string = $('p.e130ulp54.ooa-12b2ph5:contains("Skrzynia biegów")').parent().children('a').text();
      const yearOfProduction: string = $('p.e130ulp54.ooa-12b2ph5:contains("Rok produkcji")').next().text();
      const time: string = $('div.ooa-1oivzan.edazosu6 > p.edazosu4.ooa-1afacld.er34gjf0').text();
      const carDrive: string = $('p.e130ulp54.ooa-12b2ph5:contains("Napęd")').parent().children('a').text();
      const carType: string = $('p.e130ulp54.ooa-12b2ph5:contains("Typ nadwozia")').parent().children('a').text();
      const generation: string = $('p.e130ulp54.ooa-12b2ph5:contains("Generacja")').parent().children('a').text();
      const doorsCount: string = $('p.e130ulp54.ooa-12b2ph5:contains("Liczba drzwi")').next().text();
      const placesCount: string = $('p.e130ulp54.ooa-12b2ph5:contains("Liczba miejsc")').next().text();
      const carLink: string | undefined = link;

      const data = {
        manufacturer: manufacturer,
        model: model,
        fuelType: fuelType,
        transmission: transmission,
        yearOfProduction: yearOfProduction,
        carType: carType,
        carDrive: carDrive,
        generation: generation,
        doorsCount: doorsCount,
        placesCount: placesCount,
        time: time,
        carLink: carLink
      }
      
      foundCars.push(data);
    }

    return foundCars;
    

  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`)
  }
  
}




