import { addUserEmailToProduct, scrapeAndCompareCar } from "@/libs/actions";
import { connectToDB } from "@/libs/mongoose";
import { createGraphDataAction, createSearchResultsAction, updateDateAction } from "@/libs/services";
import { Options, SearchResultsShape } from "@/types";

export const dynamic = 'force-dynamic';
export const revalidate = true;

export async function cronLogic() {

  const isValidOtomotoCarURL = (url: string) => {
    try {
      const parsedURL = new URL(url);
      const hostname = parsedURL.hostname;
  
      if(
        hostname.includes('otomoto.pl') || 
        hostname.includes ('otomoto.') || 
        hostname.endsWith('otomoto')
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
  
    return false;
  }



  const res = await fetch('http://localhost:3000/api/searchOptions');

  const searchOptionsData = await res.json();
  const options: Options = searchOptionsData.searchoptions[0];
  const { email } = options;

  let cars: any = [];

  let maxTime: Date | undefined;

  let DateCheck = 0;

  let i = 0

    do {

      i++
      const isValidLink = isValidOtomotoCarURL(`https://www.otomoto.pl/osobowe?page=${i}`);

      if(!isValidLink) return alert('Please provide a valid Otomoto link')

      try { 

        const filteredCars: any = await scrapeAndCompareCar(`https://www.otomoto.pl/osobowe?page=${i}`);
        console.log(filteredCars.booleans)
      

        if (filteredCars.booleans.length === 0) DateCheck += 1;

        if (filteredCars.booleans.length > 0 && DateCheck > 0) DateCheck = 0;


        for (let car of filteredCars.cars) {
          cars.push(car);
        }

        if(maxTime === undefined) {
          maxTime = filteredCars.maxTime;
        } else {
          if (filteredCars.maxTime > maxTime) {
            maxTime = filteredCars.maxTime;
          }
        }


      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    
    while (DateCheck < 5);
    DateCheck = 0;

    const results: SearchResultsShape = {
      cars: cars,
      read: false
    }

    const graphData: number = cars.length;

    if (cars.length > 0) {
     
      await createSearchResultsAction(results);
      await createGraphDataAction(graphData);
      await addUserEmailToProduct(cars, email);
    }

    if (maxTime) await updateDateAction(maxTime); 

}