import { addUserEmailToProduct, scrapeAndCompareCar } from '@/libs/actions';
import { useThemeContext } from '@/libs/contexts/context';
import { useCreateSearchResults, useSearchOptions, useUpdateSearchOptions, useCreateGraphData } from '@/libs/hooks';
import { NotifyData, Options, SearchResult, SearchResults } from '@/types';



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

const SearchButton = async ({options, setNotify, notify}: {options: Options, setNotify: React.Dispatch<React.SetStateAction<NotifyData>>, notify: NotifyData}) => {

  const { loading, setLoading } = useThemeContext();

  const { data } = useSearchOptions();
  const { email } = data;

  const updateSearchOptionMutation = useUpdateSearchOptions();

  const createSearchResultsMutation = useCreateSearchResults(setNotify);
  const createGraphDataMutation = useCreateGraphData();

  let cars: SearchResult[] = [];
  
  let maxTime: Date | undefined = undefined;


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

    const results: SearchResults = {
      cars: cars,
      read: false
    }

    const graphData: number = cars.length;

    if (cars.length > 0) {
      createSearchResultsMutation.mutate(results);
      createGraphDataMutation.mutate(graphData);
      await addUserEmailToProduct(cars, email);
    } else {
      setNotify({
        isOpen: true,
        message: 'No cars found',
        type: 'success'
      });
    }

    if (maxTime) {
      updateSearchOptionMutation.mutate({...options, date: maxTime})
    }
 

  
}

export default SearchButton