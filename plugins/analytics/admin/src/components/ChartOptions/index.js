import React from "react";
import {
	AreaChart,
	BoxPlotChart,
	BubbleChart,
	BulletChart,
	BarChart,
	ColumnLineChart,
	ColumnChart,
	HeatmapChart,
	LineChart,
	LineAreaChart,
	LineScatterChart,
	NestedPieChart,
	PieChart,
	RadarChart,
	ScatterChart,
	TreemapChart,
	RadialBarChart,
	GaugeChart,
} from '@toast-ui/react-chart';

const ChartOptions = {
	'area-chart': <AreaChart />,
	'line-chart': <LineChart />,
	'bar-chart': <BarChart />,
	'box-plot-chart': <BoxPlotChart />,
	'bubble-chart': <BubbleChart />,
	'bullet-chart': <BulletChart />,
	'column-chart': <ColumnChart />,
	'column-line-chart': <ColumnLineChart />,
	'heatmap-chart': <HeatmapChart />,
	'line-area-chart': <LineAreaChart />,
	'line-scatter-chart': <LineScatterChart />,
	'nested-pie-chart': <NestedPieChart />,
	'pie-chart': <PieChart />,
	'radar-chart': <RadarChart />,
	'scatter-chart': <ScatterChart />,
	'treemap-chart': <TreemapChart />,
	'radial-bar-chart': <RadialBarChart />,
	'gauge-chart': <GaugeChart />,
};

const ChartNames = Object.keys(ChartOptions);

export default ChartOptions;
export { ChartNames };