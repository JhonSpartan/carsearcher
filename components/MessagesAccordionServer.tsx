import { SearchResultsShape } from '@/types';
import MessagesAccordionClient from './MeassagesAccordionClient';

const URL = '';

async function getResults() {

  const res = await fetch(`/api/searchResults`, {
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