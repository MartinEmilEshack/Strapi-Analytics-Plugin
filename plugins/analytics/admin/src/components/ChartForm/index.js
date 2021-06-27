import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Select, Checkbox, InputText } from '@buffetjs/core';
import FormModalContext from "../FormModal/FormModalContext";
import "antd/dist/antd.css";
import "./chart_form.css";
import RequiredInput from "../RequiredInput";
import { ChartNames } from "../ChartOptions";
import { request } from "strapi-helper-plugin";

// const data = {
// 	categories: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'],
// 	series: [
// 		{
// 			name: 'Budget',
// 			data: [5000, 3000, 5000, 7000, 6000, 4000],
// 		},
// 		{
// 			name: 'Income',
// 			data: [8000, 1000, 7000, 2000, 5000, 3000],
// 		},
// 	],
// };

const ChartForm = () => {
	const dataSetter = useContext(FormModalContext);

	const [chartSelected, setChartSelected] = useState('area-chart');
	const [chartTitle, setChartTitle] = useState('');
	const [xAxisTitle, setXAxisTitle] = useState('');
	const [yAxisTitle, setYAxisTitle] = useState('');
	const [fullWidth, setFullWidth] = useState(false);

	const [models, setModels] = useState([]);
	const [modelSelected, setModelSelected] = useState('');
	const [attributeSelected, setAttributeSelected] = useState('');
	const [categorySelected, setCategorySelected] = useState('');

	const getModels = async () => {
		const { data, ...rest } = await request("/analytics/find-models", { method: "GET" });
		setModels(data);
		setModelSelected(data[0].modelName);
		setAttributeSelected(Object.keys(data[0].attributes)[0]);
		setCategorySelected(Object.keys(data[0].attributes)[0]);
	};

	const clearer = () => {
		setChartSelected('area-chart');
		setChartTitle('');
		setXAxisTitle('');
		setYAxisTitle('');
		setFullWidth(false);
		setModelSelected(models.length ? models[0].modelName : '');
		setAttributeSelected(models.length ? Object.keys(models[0].attributes)[0] : '');
		setCategorySelected(models.length ? Object.keys(models[0].attributes)[0] : '');
	};

	const checkAcceptance = () => {
		return chartTitle !== ''
			&& xAxisTitle !== ''
			&& yAxisTitle !== '';
	};

	useEffect(() => { getModels(); }, []);
	useEffect(() => {
		dataSetter({
			accepted: checkAcceptance(),
			clear: clearer,
			chartName: chartSelected,
			chartTitle: chartTitle,
			xAxisTitle: xAxisTitle,
			yAxisTitle: yAxisTitle,
			fullWidth: fullWidth,
			model: modelSelected,
			attribute: attributeSelected,
			category: categorySelected,
		});
	}, [
		chartSelected, chartTitle, xAxisTitle, yAxisTitle,
		fullWidth, modelSelected, attributeSelected, categorySelected
	]);

	let lazySelects;
	if (models[0] && modelSelected != '')
		lazySelects =
			<div>
				<br />
				< Select
					name="selectModel"
					value={modelSelected}
					options={models.map((model) => model.modelName)}
					onChange={({ target: { value } }) => setModelSelected(value)}
				/>
				<br />
				<br />
				< Select
					name="selectAttribute"
					value={attributeSelected}
					options={Object.keys(
						models.filter((model) => model.modelName === modelSelected)[0].attributes
					)}
					onChange={({ target: { value } }) => setAttributeSelected(value)}
				/>
				<br />
				<br />
				< Select
					name="selectCategory"
					value={categorySelected}
					options={Object.keys(
						models.filter((model) => model.modelName === modelSelected)[0].attributes
					)}
					onChange={({ target: { value } }) => setCategorySelected(value)}
				/>
			</div>;
	else lazySelects = <div />;

	return (
		<div>
			<Checkbox
				message="Full Width ?"
				name="fullWidth"
				value={fullWidth}
				onChange={({ target: { value } }) => setFullWidth(value)}
			/>
			<br />
			<RequiredInput required={chartTitle === ''} />
			<InputText
				type="text"
				name="chartTitle"
				value={chartTitle}
				placeholder="Chart title"
				onChange={({ target: { value } }) => setChartTitle(value)}
			/>
			<br />
			<RequiredInput required={xAxisTitle === ''} />
			<InputText
				type="text"
				name="xAxisTitle"
				value={xAxisTitle}
				placeholder="X-axis title"
				onChange={({ target: { value } }) => setXAxisTitle(value)}
			/>
			<br />
			<RequiredInput required={yAxisTitle === ''} />
			<InputText
				type="text"
				name="yAxisTitle"
				value={yAxisTitle}
				placeholder="Y-axis title"
				onChange={({ target: { value } }) => setYAxisTitle(value)}
			/>
			<br />
			<Select
				name="selectChart"
				value={chartSelected}
				options={ChartNames}
				onChange={({ target: { value } }) => setChartSelected(value)}
			/>
			<br />
			{lazySelects}
		</div>
	);
};

export default ChartForm;