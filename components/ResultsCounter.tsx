import { SearchResultsShape } from '@/types';

const ResultsCounter = async () => {

  const mData = await fetch('http://localhost:3000/api/searchResults', {
    cache: "no-cache",
    next: {
      tags: ["results"]
    }
  });

  const searchResultsData = await mData.json();
  const results: SearchResultsShape[] = searchResultsData.searchresults;

  let counter = 0;

  for (let item of results) {
    if (item.read === false) {
      counter++
    }
  }


  return (
    <div className={counter === 0 ? "invisible visible w-5 h-5 bg-red-500 text-white rounded-full flex justify-center items-center text-xs z-10 absolute xl:left-1/4 xs:left-1/2 top-1/2" : "visible w-5 h-5 bg-red-500 text-white rounded-full flex justify-center items-center text-xs z-10 absolute xl:left-1/4 xs:left-1/2 top-1/2"}>{counter}</div>
  )
}

export default ResultsCounter