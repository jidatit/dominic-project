// src/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
	const data = {
		labels: [
			"Relations / Love",
			"Health",
			"Business / Career",
			"Finances",
			"Contribution to Society",
			"Family and Friends",
			"Fun and Recreation",
			"Personal Growth",
		],
		datasets: [
			{
				data: [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5],
				backgroundColor: [
					"#EF4444",
					"#F87171",
					"#FDE68A",
					"#D1FAE5",
					"#93C5FD",
					"#3B82F6",
					"#6366F1",
					"#8B5CF6",
				],
				hoverBackgroundColor: [
					"#DC2626",
					"#FB7185",
					"#FBBF24",
					"#34D399",
					"#60A5FA",
					"#2563EB",
					"#4F46E5",
					"#7C3AED",
				],
			},
		],
	};

	return (
		<div className="flex items-center justify-center ">
			<div className="w-96 h-96 mb-4">
				<h1 className="text-xl bold text-center mb-4">Preview</h1>
				<Pie data={data} />
			</div>
		</div>
	);
};

export default PieChart;
