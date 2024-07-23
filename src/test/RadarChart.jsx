import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Radar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	RadialLinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	ArcElement,
	RadialLinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend
);

const labels = [
	"Relations / Love",
	"Health",
	"Business / Career",
	"Finances",
	"Contribution to society",
	"Family and friends",
	"Fun and recreation",
	"Personal growth",
	"Division 9",
	"Division 10"
];
const colors = [
	"rgba(255, 99, 132, 1)",
	"rgba(54, 162, 235, 1)",
	"rgba(255, 206, 86, 1)",
	"rgba(75, 192, 192, 1)",
	"rgba(153, 102, 255, 1)",
	"rgba(255, 159, 64, 1)",
	"rgba(199, 199, 199, 1)",
	"rgba(100, 181, 246, 1)",
	"rgba(255, 138, 101, 1)",
	"rgba(124, 179, 66, 1)"
];

function ApexChart({ currentValues, desiredValues }) {
	const calculateOpacity = (value) => {
		// Map values between 0 and 1 where 10 maps to 1
		return Math.min(value / 10, 1);
	};

	const [options, setOptions] = useState({
		chart: {
			type: "polarArea"
		},
		fill: {
			// opacity: currentValues.map(calculateOpacity),
			gradient: {
				shade: 'light',
				type: "horizontal",
				shadeIntensity: 1,
				gradientToColors: undefined,
				inverseColors: true,
				opacityFrom: 0.1,
				opacityTo: 1,
				stops: [0, 100]
			}
		},
		colors: colors, // Add colors here
		labels: labels,
		plotOptions: {
			polarArea: {
				rings: {
					strokeWidth: 0
				}
			}
		},
		// responsive: [
		// 	{
		// 		breakpoint: 480,
		// 		options: {
		// 			chart: {
		// 				width: 400
		// 			},
		// 			legend: {
		// 				position: "bottom"
		// 			}
		// 		}
		// 	}
		// ]
	});

	return (
		<div
			// style={{
			// 	position: "relative",
			// 	width: "50%",
			// 	height: "50%",
			// 	margin: "auto"
			// }}
            className=" relative md:w-1/2 md:h-1/2 m-auto w-full h-full"
		>
			<div id="chart" style={{ position: "relative", zIndex: 1 }}>
				<ReactApexChart options={options} series={currentValues} type="polarArea" />
			</div>
			<div
				id="html-dist"
				style={{
					position: "absolute",
					top: "12px",
					left: "10px",
					right: "0",
					bottom: "0",
					zIndex: 2
				}}
			>
				<RadarChart desiredValues={desiredValues} />
			</div>
		</div>
	);
}

const RadarChart = ({ desiredValues }) => {
	const radarData = {
		labels: labels,
		datasets: [
			{
				label: "Desired",
				data: desiredValues,
				backgroundColor: "rgba(0, 0, 0, 0)",
				borderColor: "rgba(255, 99, 132, 1)",
				pointBackgroundColor: "rgba(255, 99, 132, 1)",
				pointBorderColor: "#fff",
				pointStyle: "circle",
				pointRadius: 5
			}
		]
	};

	const radarOptions = {
		scales: {
			r: {
				min: 0,
				max: 10,
				ticks: {
					stepSize: 2,
					display: false
				},
				pointLabels: {
					display: false
				},
				angleLines: {
					display: false
				},
				grid: {
					display: true,
					circular: true
				}
			}
		},
		elements: {
			line: {
				borderWidth: 2
			},
			point: {
				radius: 3
			}
		},
		plugins: {
			legend: {
				display: false
			}
		}
	};

	return (
		<div
			style={{
				position: "absolute",
				top: "26px",
				left: "12px",
				right: "10px",
				bottom: "0px",
				width: "100%",
				height: "100%",
				transform: "rotate(17deg)"
			}}
		>
			<Radar data={radarData} options={radarOptions} />
		</div>
	);
};

export default ApexChart;
