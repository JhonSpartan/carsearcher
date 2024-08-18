import { GraphDataShape } from '@/types';
import ChartClient from './ChartClient';

const URL = '';

async function getgraphdata() {

  const res = await fetch(`/api/graphData`, {
    cache: "no-cache",
    next: {
      tags: ["graphData"]
    }
  });
  const graphDataObj = await res.json();
  const graphData: GraphDataShape[] = graphDataObj.graphData;
  return graphData;
} 

const ChartServer = async () => {

  const graphData = await getgraphdata();

 
  return (
    <ChartClient graphData={graphData}/>
  )
}

export default ChartServer