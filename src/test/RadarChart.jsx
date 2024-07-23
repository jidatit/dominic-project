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
	Legend,
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
	"Division 10",
];
const colors = [
	"rgba(255, 99, 132, 0.5)",
	"rgba(54, 162, 235, 0.5)",
	"rgba(255, 206, 86, 0.5)",
	"rgba(75, 192, 192, 0.5)",
	"rgba(153, 102, 255, 0.5)",
	"rgba(255, 159, 64, 0.5)",
	"rgba(199, 199, 199, 0.5)",
	"rgba(255, 99, 132, 0.5)",
	"rgba(54, 162, 235, 0.5)",
	"rgba(255, 206, 86, 0.5)",
];

function ApexChart({ currentValues, desiredValues }) {
	const calculateOpacity = (value) => {
		// Map values between 0 and 1 where 10 maps to 1
		return Math.min(value / 10, 1);
	};
	const [options, setOptions] = useState({
		chart: { type: "polarArea" },
		fill: {
			opacity: currentValues.map(calculateOpacity),
		},
		labels: labels,
		plotOptions: { polarArea: { rings: { strokeWidth: 0 } } },
		responsive: [
			{
				breakpoint: 480,
				options: { chart: { width: 200 }, legend: { position: "bottom" } },
			},
		],
	});

	return (
		<div
			style={{
				position: "relative",
				width: "50%",
				height: "50%",
				margin: "auto",
			}}
		>
			<div id="chart" style={{ position: "relative", zIndex: 1 }}>
				<ReactApexChart
					options={options}
					series={currentValues}
					type="polarArea"
				/>
			</div>
			<div
				id="html-dist"
				style={{
					position: "absolute",
					top: "12px",
					left: "10px",
					right: "0",
					bottom: "0",
					zIndex: 2,
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
				pointRadius: 5,
			},
		],
	};

	const radarOptions = {
		scales: {
			r: {
				min: 0,
				max: 10,
				ticks: {
					stepSize: 2,
					display: false,
				},
				pointLabels: { display: false },
				angleLines: { display: false },
				grid: { display: true, circular: true },
			},
		},
		elements: {
			line: { borderWidth: 2 },
			point: { radius: 3 },
		},
		plugins: {
			legend: { display: false },
		},
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
				transform: "rotate(17deg)",
			}}
		>
			<Radar data={radarData} options={radarOptions} />
		</div>
	);
};

export default ApexChart;
