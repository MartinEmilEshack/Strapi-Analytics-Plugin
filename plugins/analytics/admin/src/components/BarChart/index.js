import React, { useState, useRef } from 'react';
import { BarChart } from '@toast-ui/react-chart';
import '@toast-ui/chart/dist/toastui-chart.css';

const BarChartDemo = () => {
	const [data, setData] = useState({
		categories: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'],
		series: [
			{
				name: 'Budget',
				data: [5000, 3000, 5000, 7000, 6000, 4000],
			},
			{
				name: 'Income',
				data: [8000, 1000, 7000, 2000, 5000, 3000],
			},
		],
	});

	const [options, setOptions] = useState({
		chart: {
			width: 'auto',
			height: 'auto',
			title: 'Monthly Revenue',
		},
		yAxis: {
			title: 'Month',
		},
		xAxis: {
			title: 'Amount',
		},
	});

	const chartRef = useRef(null);

	const handleClickButton = () => {
		console.log('type:', chartRef.current.getInstance().showSeriesDataLabel());
	};

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<BarChart style={{
				width: '100%', height: '100%'
			}} ref={chartRef} data={data} options={options} />
		</div>
	);
};

export default BarChartDemo;