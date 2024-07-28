import SearchButton from '@/components/SearchButton';
import SearchOptions from '@/libs/models/searchOptions.model';
import { connectToDB } from '@/libs/mongoose';
import { Options } from '@/types';


export async function GET() {
  try {
    await connectToDB();

    const searchOptionsArray = await SearchOptions.find({});
    if(!searchOptionsArray) throw new Error("No cars found in data base");
    
    const options: Options = searchOptionsArray[0];

    const {AutoSearch} = SearchButton();
    AutoSearch(options);

    
  } catch (error) {
    throw new Error(`Error in GET: ${error}`);
  } 
}



