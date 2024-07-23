"use client"

import { deleteFirstItem } from '@/libs/actions';
import { useGetGraphData } from '@/libs/hooks';
import { datasetShape, GetGraphData } from '@/types';
import { LinearProgress } from '@mui/material';
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import moment from 'moment';

const Chart = () => {

  let dataset: datasetShape[] = [];

  const {isLoading, data} = useGetGraphData();
  
  if (isLoading) return (
    <div>
      <h1>Loading...</h1>
      <LinearProgress />
    </div>
  )

  const arrayForming = () => data.slice(-5).map((item: GetGraphData) => {
    const dataItem = {
      carsFound: item.graphData,
      createdAt: moment(item.createdAt).format('DD/MM/YYYY | HH:mm:ss'), 
    }
    dataset.push(dataItem)
  })

  if (data.length !== 0) arrayForming();

  if (data.length > 5) {
    deleteFirstItem(data[0]._id);
  }

  const chartSetting = {
    yAxis: [
      {
        label: 'Cars found',
      },
    ],
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',   
      },
      [`.${axisClasses.tickLabel}`]: {
      },
    },
  };

  const valueFormatter = (value: number | null) => `${value} cars`;

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'createdAt' }]}
      series={[
        { dataKey: 'carsFound', label: 'Cars found', valueFormatter },
      ]}
      {...chartSetting}
    />
  )
}

export default Chart