import React, { useState, useEffect } from "react";
import { GlobalStyle } from "@buffetjs/styles";
import { request } from "strapi-helper-plugin";
import { Tabs } from "antd";
import AnalyticsPage from "../AnalyticsPage";
import "antd/dist/antd.css";
import "./analytics_home.css";
import FormModal from "../FormModal";
import PageForm from "../PageForm";

const { TabPane } = Tabs;

const AnalyticsHome = () => {
	const [pages, setPages] = useState([]);

	const [activePage, setActivePage] = useState('');
	const [newPageFormVisible, setNewPageFormVisible] = useState(false);

	const getAllPages = async () => {
		const { data, ...rest } = await request("/analytics/find-pages", { method: "GET" });
		const savedPages = data.map((page) => {
			return {
				key: page.id.toString(),
				closable: true,
				title: page.title,
				description: page.description,
				updated_at: page.updated_at
			};
		});
		if (savedPages.length === 1) savedPages[0].closable = false;
		setPages(savedPages);
		setActivePage(savedPages[0].key);
	};

	useEffect(() => {
		getAllPages();
	}, []);

	const onChange = (activePage) => {
		setActivePage(activePage);
	};

	const createPage = async (page) => {
		try {
			const { data, ...rest } = await request("/analytics/create-page", {
				method: "POST", body: { title: page.title, description: page.description }
			});
			const newPages = [...pages];
			newPages.push({
				key: data.id.toString(),
				title: data.title,
				description: data.description,
				updatedAt: data.updated_at,
				closable: true,
			});
			if (newPages.length > 1) newPages[0].closable = true;
			setPages(newPages);
			setActivePage(data.id.toString());
		} catch (error) {
			console.log(error);
		};
	};

	const add = (data) => {
		setNewPageFormVisible(false);
		createPage(data);
	};

	const remove = async (targetPage) => {
		const { data, ...rest } = await request(
			`/analytics/delete-page/${targetPage}`,
			{ method: "DELETE", }
		);
		let newActivePage = activePage;
		const newPages = pages.filter((page) => page.key !== targetPage);
		if (newPages.length && newActivePage === targetPage) {
			let lastIndex;
			pages.forEach((page, index) => {
				if (page.key === targetPage) lastIndex = index - 1;
			});
			if (lastIndex >= 0) {
				newActivePage = newPages[lastIndex].key;
			} else {
				newActivePage = newPages[0].key;
			}
		}
		if (newPages.length === 1) newPages[0].closable = false;
		setPages(newPages);
		setActivePage(newActivePage);
	};

	const pagesTabs = pages.map((page) => (
		<TabPane
			key={page.key}
			tab={page.title}
			closable={false}
		>
			<AnalyticsPage page={page} onDelete={remove} />
		</TabPane>
	));

	return (
		<div className="card-container">
			<GlobalStyle />
			<Tabs
				tabPosition="left"
				type="editable-card"
				onChange={onChange}
				activeKey={activePage}
				onEdit={(_targetPage, action) => {
					if (action === "add") setNewPageFormVisible(true);
				}}
			>
				{pagesTabs}
			</Tabs>
			<FormModal
				visible={newPageFormVisible}
				dataSetter={(data) => add(data)}
				onCancel={() => setNewPageFormVisible(false)}
			>
				<PageForm />
			</FormModal>
		</div>
	);
};

export default AnalyticsHome;
