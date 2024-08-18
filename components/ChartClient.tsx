"use client"

import { deleteFirstItem } from '@/libs/services';
import { datasetShape, GraphDataShape } from '@/types';
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import moment from 'moment';

const ChartClient = (props: {graphData: GraphDataShape[]}) => {

  const { graphData } = props;

  let dataset: datasetShape[] = [];

  const arrayForming = () => graphData!.slice(-5).map((item: GraphDataShape) => {
    const dataItem = {
      carsFound: item.graphData,
      createdAt: moment(item.createdAt).format('DD/MM/YYYY | HH:mm:ss'), 
    }
    dataset.push(dataItem)
  })

  if (graphData!.length !== 0) {
    arrayForming();
  }

  if (graphData!.length > 5) {
    deleteFirstItem(graphData![0]._id);
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

export default ChartClient