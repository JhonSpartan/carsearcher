import { SearchResultsShape } from '@/types';
import MessagesAccordionClient from './MeassagesAccordionClient';

async function getResults() {
  const res = await fetch('http://localhost:3000/api/searchResults', {
    cache: "no-cache",
    next: {
      tags: ["results"]
    }
  });

  const searchResultsData = await res.json();
  const results: SearchResultsShape[] = searchResultsData.searchresults;
  return results;
}

const MessagesAccordionServer = async () => {

  const results = await getResults();

  return (
    <MessagesAccordionClient results={results} />
  )
}

export default MessagesAccordionServer;