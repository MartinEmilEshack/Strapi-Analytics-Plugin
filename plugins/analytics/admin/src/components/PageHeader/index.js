import React, { useState } from "react";
import PropTypes from "prop-types";
import { PageHeader as HeaderBar, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import "./page_header.css";

const PageHeader = ({ page, onAdd, onDelete }) => {
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	return (
		<div className='page-header-wrapper'>
			<HeaderBar
				className="page-header"
				title={page.title}
				subTitle={page.description}
				extra={[
					<Button
						key={0}
						type="primary"
						onClick={() => onAdd()}
					>Add</Button>,
					<Button
						key={1}
						danger
						type="dashed"
						disabled={!page.closable}
						onClick={() => setVisibleDeleteModal(true)}
					>Delete Page</Button>,
				]} />
			<Modal
				centered
				closable
				icon={<ExclamationCircleOutlined />}
				visible={visibleDeleteModal}
				title="You are about to delete the whole page"
				onOk={() => onDelete(page.key)}
				onCancel={() => setVisibleDeleteModal(false)}
				footer={[
					<Button
						key={0}
						danger
						type="primary"
						onClick={() => onDelete(page.key)}
					>Delete</Button>,
					<Button key={1} onClick={() => setVisibleDeleteModal(false)}>
						Cancel
					</Button>,
				]}
			>
				<h2>Are you sure you want to delete this page ?</h2>
				<p>All the page's Charts will also be deleted</p>
			</Modal>
		</div>
	);
};

export default PageHeader;