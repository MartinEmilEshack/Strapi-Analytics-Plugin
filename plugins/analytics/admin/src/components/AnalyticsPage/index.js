import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { request } from "strapi-helper-plugin";
import "antd/dist/antd.css";
import "./analytics_page.css";
import '@toast-ui/chart/dist/toastui-chart.css';
import PageHeader from "../PageHeader";
import ChartBlock from "../ChartBlock";
import FormModal from "../FormModal";
import ChartForm from "../ChartForm";
import Chart from "../Chart";
import ChartOptions from "../ChartOptions";

/**
 * @type {React.FC<{
 * 	page: { title: string, content: string, key: string, closable: boolean },
 * 	onDelete: Function,
 * }>}
 */
const AnalyticsPage = ({ page, onDelete }) => {

	const [newChartFormVisible, setNewChartFormVisible] = useState(false);
	const [charts, setCharts] = useState([]);

	const getAllCharts = async () => {
		const { data, ...rest } = await request(
			`/analytics/find-charts/${page.key}`,
			{ method: "GET" },
		);
		const savedCharts = data.map((chart) => {
			chart.options.chart.title += ` {${chart.id.toString()}}`;
			return {
				title: `${chart.title} {${chart.id.toString()}}`,
				type: chart.type,
				fullWidth: chart.fullWidth,
				page: chart.page,
				data: chart.data,
				options: chart.options,
				id: chart.id.toString(),
				updated_at: chart.updated_at,
			};
		});
		setCharts(savedCharts);
	};

	useEffect(() => { getAllCharts(); }, []);

	const addChart = async (chart) => {
		setNewChartFormVisible(false);
		try {
			const { data: chartSaved, ...rest } = await request("/analytics/create-chart", {
				method: "POST",
				body: {
					title: chart.chartTitle,
					type: chart.chartName,
					fullWidth: chart.fullWidth,
					page: page.key,
					options: {
						xAxis: { title: chart.xAxisTitle },
						yAxis: { title: chart.yAxisTitle },
						chart: { width: 'auto', height: 'auto', title: chart.chartTitle },
					},
					data: { model: chart.model, attribute: chart.attribute, category: chart.category },
				}
			});
			chartSaved.options.chart.title += ` {${chartSaved.id.toString()}}`;
			setCharts([...charts, {
				title: `${chartSaved.title} {${chartSaved.id.toString()}}`,
				type: chartSaved.type,
				fullWidth: chartSaved.fullWidth,
				page: chartSaved.page,
				data: chartSaved.data,
				options: chartSaved.options,
				id: chartSaved.id.toString(),
				updated_at: chartSaved.updated_at,
			}]);
		} catch (error) {
			console.log(error);
		};
	};

	const renderedCharts = charts.map(
		(chart) => {
			return (
				<ChartBlock key={chart.id} fullWidth={chart.fullWidth}>
					<Chart options={chart.options} data={chart.data}>
						{ChartOptions[chart.type]}
					</Chart>
				</ChartBlock>
			);
		}
	);

	return (
		<div className='page-container'>
			<PageHeader
				onAdd={() => setNewChartFormVisible(true)}
				page={page} onDelete={onDelete}
			/>
			<div className='content'>
				{renderedCharts}
			</div>
			<FormModal
				visible={newChartFormVisible}
				dataSetter={(data) => addChart(data)}
				onCancel={() => setNewChartFormVisible(false)}
			>
				<ChartForm />
			</FormModal>
		</div>
	);
};

AnalyticsPage.propTypes = {
	page: PropTypes.object,
	onDelete: PropTypes.func,
};

export default AnalyticsPage;

// const options = {
// 	chart: {
// 		width: 'auto',
// 		height: 'auto',
// 		title: 'Monthly Revenue',
// 	},
// 	yAxis: {
// 		title: 'Month',
// 	},
// 	xAxis: {
// 		title: 'Amount',
// 	},
// };
