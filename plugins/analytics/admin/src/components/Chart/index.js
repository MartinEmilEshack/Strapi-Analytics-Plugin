import React, { Children, isValidElement, cloneElement } from 'react';

const Chart = ({ children, style, options, data }) => {

	const chartChild = Children.map(children, (child) => {
		if (isValidElement(child))
			return cloneElement(child, {
				style: { width: '100%', height: '100%', ...style },
				options,
				data,
			});
		return child;
	});

	return (
		<div style={{ width: '100%', height: '100%' }}>
			{chartChild}
		</div>
	);
};

export default Chart;


// const charts = useRef({
// 	'area-chart': <AreaChart style={style} data={data} options={options} />,
// 	'line-chart': <LineChart style={style} data={data} options={options} />,
// 	'bar-chart': <BarChart style={style} data={data} options={options} />,
// 	'box-plot-chart': <BoxPlotChart style={style} data={data} options={options} />,
// 	'bubble-chart': <BubbleChart style={style} data={data} options={options} />,
// 	'bullet-chart': <BulletChart style={style} data={data} options={options} />,
// 	'column-chart': <ColumnChart style={style} data={data} options={options} />,
// 	'column-line-chart': <ColumnLineChart style={style} data={data} options={options} />,
// 	'heatmap-chart': <HeatmapChart style={style} data={data} options={options} />,
// 	'line-area-chart': <LineAreaChart style={style} data={data} options={options} />,
// 	'line-scatter-chart': <LineScatterChart style={style} data={data} options={options} />,
// 	'nested-pie-chart': <NestedPieChart style={style} data={data} options={options} />,
// 	'pie-chart': <PieChart style={style} data={data} options={options} />,
// 	'radar-chart': <RadarChart style={style} data={data} options={options} />,
// 	'scatter-chart': <ScatterChart style={style} data={data} options={options} />,
// 	'treemap-chart': <TreemapChart style={style} data={data} options={options} />,
// });