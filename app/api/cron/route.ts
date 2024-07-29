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

  const { setNotify } = useThemeContext();

  } catch (error) {
    throw new Error(`Error in GET: ${error}`)
  }
  
}