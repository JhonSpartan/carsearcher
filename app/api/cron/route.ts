import { scrapeAndCompareCar } from "@/libs/actions";
import { useThemeContext } from "@/libs/contexts/context";
import SearchOptions from "@/libs/models/searchOptions.model";
import { connectToDB } from "@/libs/mongoose";

export const dynamic = 'force-dynamic';

export async function GET() {
  try{
    await connectToDB();
    const searchoptions = await SearchOptions.find();

    if (!searchoptions)  throw new Error('No options found');

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

  const { setNotify, setLoading } = useThemeContext();

  let cars: SearchResult[] = [];
  
  let maxTime: Date | undefined;

  let i = 0
    let DateCheck = true;
    
    do {
      i++
      const isValidLink = isValidOtomotoCarURL(`https://www.otomoto.pl/osobowe?page=${i}`);

      if(!isValidLink) return alert('Please provide a valid Otomoto link')

      try { 
        setLoading(true);

        const filteredCars: any = await scrapeAndCompareCar(`https://www.otomoto.pl/osobowe?page=${i}`);
      
        if (filteredCars.booleans.length === 0) {
          DateCheck = false;
        }

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
        setLoading(false);
      }
    }
    while (DateCheck === true);

  } catch (error) {
    throw new Error(`Error in GET: ${error}`)
  }
  
}