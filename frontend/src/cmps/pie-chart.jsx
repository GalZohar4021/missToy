import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';

ChartJS.register(ArcElement, Tooltip, Legend);



export function PieChart({ data }) {
  return <Pie className='pieChart' data={data} />;
}
