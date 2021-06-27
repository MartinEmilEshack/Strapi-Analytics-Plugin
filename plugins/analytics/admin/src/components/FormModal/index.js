import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "antd";
import { FormModalProvider } from "./FormModalContext";
import "antd/dist/antd.css";
import "./form_modal.css";


const FormModal = ({ children, visible = false, dataSetter, onCancel }) => {
	// const [hasNext, setHasNext] = useState(false);
	const [data, setData] = useState({});
	const clearForm = useRef(() => console.log('nothing to clear'));

	const handleAction = (action, data) => {
		const clear = clearForm.current;
		if (action === 'cancel') {
			setData({});
			onCancel();
			clear();
		} else {
			dataSetter(data);
			setData({});
			clear();
		}
	};

	const checkData = (data) => {
		const { accepted, clear, ...rest } = data;
		clearForm.current = clear;
		if (!accepted) setData({});
		else setData(rest);
	};

	const formButtons = [
		<Button key={0}
			type="primary"
			disabled={Object.keys(data).length === 0}
			onClick={() => handleAction('ok', data)}
		>Done</Button>,
		<Button key={1} onClick={() => handleAction('cancel')}>Cancel</Button>,
	];

	return (
		<Modal
			centered
			closable
			width={700}
			visible={visible}
			title="Create new.."
			footer={formButtons}
			onCancel={() => handleAction('cancel')}
			onOk={() => handleAction('ok', data)}
		>
			<FormModalProvider value={(data) => checkData(data)}>
				{children}
			</FormModalProvider>
		</Modal >
	);
};

export default FormModal;