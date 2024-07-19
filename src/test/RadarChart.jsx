import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement);

const PieChart = ({ data, labels, backgroundColors }) => {
    const pieData = {
        labels,
        datasets: [
            {
                data: data.map(item => item.current),
                backgroundColor: backgroundColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return <Pie data={pieData} options={options} />;
};

const RadarChart = ({ data, labels, backgroundColors, borderColors }) => {
    const radarData = {
        labels,
        datasets: [
            {
                label: 'Desired',
                data: data.map(item => item.desired),
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: borderColors,
                borderWidth: 2,
                pointBackgroundColor: borderColors,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: borderColors,
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: 0,
                suggestedMax: 10,
                ticks: {
                    stepSize: 2,
                    display: false,
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                pointLabels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        elements: {
            line: {
                tension: 0.4,
            },
        },
    };

    return <Radar data={radarData} options={options} />;
};


const CombinedChart = () => {
    const data = [
        { current: 10, desired: 5 },
        { current: 7, desired: 10 },
        { current: 10, desired: 5 },
        { current: 10, desired: 10 },
        { current: 5, desired: 10 },
        { current: 10, desired: 5 },
        { current: 2, desired: 10 },
        { current: 5, desired: 10 },
    ];

    const labels = [
        "Relations / Love",
        "Health",
        "Business / Career",
        "Finances",
        "Contribution to society",
        "Family and friends",
        "Fun and recreation",
        "Personal growth",
    ];

    const backgroundColors = [
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(199, 199, 199, 0.2)',
        'rgba(83, 102, 255, 0.2)',
    ];

    const borderColors = [
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(199, 199, 199, 1)',
        'rgba(83, 102, 255, 1)',
    ];

    return (
        <div style={{ width: '50%', margin: 'auto', position: 'relative' }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <PieChart data={data} labels={labels} backgroundColors={backgroundColors} />
            </div>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <RadarChart data={data} labels={labels} backgroundColors={backgroundColors} borderColors={borderColors} />
            </div>
        </div>
    );
};

export default CombinedChart;