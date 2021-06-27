import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { InputText, Textarea } from '@buffetjs/core';
import FormModalContext from "../FormModal/FormModalContext";
import "antd/dist/antd.css";
import "./page_form.css";
import RequiredInput from "../RequiredInput";

const PageForm = () => {
	const dataSetter = useContext(FormModalContext);
	const [pageName, setPageName] = useState('');
	const [pageDescription, setPageDescription] = useState('');

	useEffect(() => dataSetter({
		title: pageName,
		accepted: pageName !== '',
		description: pageDescription,
		clear: () => { setPageName(''); setPageDescription(''); },
	}), [0]);

	return (
		<div>
			<RequiredInput required={pageName === ''} />
			<InputText
				name="Page Name"
				onChange={({ target: { value } }) => {
					setPageName(value);
					dataSetter({
						title: value,
						accepted: pageName !== '',
						description: pageDescription,
						clear: () => { setPageName(''); setPageDescription(''); },
					});
				}}
				placeholder="Page name"
				type="text"
				value={pageName}
			/>
			<br />
			<Textarea
				name="textarea"
				onChange={({ target: { value } }) => {
					setPageDescription(value);
					dataSetter({
						title: pageName,
						description: value,
						accepted: pageName !== '',
						clear: () => { setPageName(''); setPageDescription(''); },
					});
				}}
				value={pageDescription}
			/>
		</div>
	);
};

export default PageForm;