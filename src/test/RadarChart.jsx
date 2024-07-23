import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, RadialLinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

const labels = ['Relations / Love','Health','Business / Career','Finances','Contribution to society','Family and friends','Fun and recreation','Personal growth','divison9' , ' divison10'];

function ApexChart() {
  const [series, setSeries] = useState([10, 7, 10, 10, 5, 10, 2, 5, 7, 9]);
  const [options, setOptions] = useState({
    chart: { type: 'polarArea' },
    fill: { opacity: 0.8 },
    labels: labels,
    plotOptions: { polarArea: { rings: { strokeWidth: 0 } } },
    responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }],
  });

  return (
    <div style={{ position: 'relative', width: '50%', height: '50%', margin: 'auto' }}>
      <div id="chart" style={{ position: 'relative', zIndex: 0 }}>
        
        <ReactApexChart options={options} series={series} type="polarArea" />
      </div>
      <div id="html-dist" className=' z-10'> <RadarChart /></div>
     
    </div>
  );
}

const RadarChart = () => {
  const dataPoints = [
    { current: 10, desired: 5 },{ current: 7, desired: 10 },{ current: 10, desired: 5 },{ current: 10, desired: 10 },{ current: 5, desired: 10 },{ current: 10, desired: 5 },{ current: 2, desired: 10 },{ current: 5, desired: 10 },{ current: 5, desired: 10 },{ current: 5, desired: 10 }];

  const radarData = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: dataPoints.map(point => point.desired),
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointStyle: 'circle',
        pointRadius: 5,
      }
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 13,
        ticks: {
          stepSize: 2,
          display: false
        },
        pointLabels: { display: false },
        angleLines: { display: false },
        grid: { display: false, circular: true },
      }
    },
    elements: {
      line: { borderWidth: 1 },
      point: { radius: 2 }
    }
  };

  return (
    <div style={{ position: 'absolute', top: '0', left: '0', bottom:'0', right:'0', width: '100%', height: '100%',  transform: 'rotate(20deg)' }}>
        <Radar data={radarData} options={radarOptions} />
     
    </div>
  );
};

export default ApexChart;
