import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import "antd/dist/antd.css";
import "./analytics_home.css";
import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';
import PageData from "../Page/PageData";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AnalyticsHome = () => {
	const [pages, setPages] = useState([new PageData(
		key = '0',
		title = 'Page 1',
		description = 'first Page',
		content = 'Martin',
		closable = false,
	)]);
	const [activePage, setActivePage] = useState(pages[0].key);
	const [collapsed, setCollapsed] = useState(false);

	const add = () => {
		const activeKey = pages.length.toString();
		const newPanes = [...pages];
		newPanes[0].closable = true;
		newPanes.push({
			title: `Page ${pages.length + 1}`,
			content: `Content of Tab ${pages.length + 1}`,
			key: activeKey,
			closable: true,
		});
		setPages(newPanes);
		setActivePage(activeKey);
	};

	const remove = (targetPage) => {
		let newActivePage = activePage;
		const newPages = pages.filter((page) => page.key !== targetPage);
		if (newPages.length && newActivePage === targetPage) {
			let lastIndex;
			pages.forEach((page, index) => {
				if (page.key === targetPage) lastIndex = index - 1;
			});
			if (lastIndex >= 0) newActivePage = newPages[lastIndex].key;
			else newActivePage = newPages[0].key;
		}
		if (newPages.length === 1) newPages[0].closable = false;
		setPages(newPages);
		setActivePage(newActivePage);
	};

	return (
		<Layout style={{ minHeight: '100%' }}>
			<Sider style={{
				overflow: 'auto',
				height: '100%',
			}} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
				<Menu defaultSelectedKeys={['1']} mode="inline">
					<Menu.Item key="1" icon={<PieChartOutlined />} >
						Option 1
            	</Menu.Item>
					<Menu.Item key="a" icon={<PieChartOutlined />} >
						<Button>Bob</Button>
					</Menu.Item>
					<Menu.Item key="b" icon={<PieChartOutlined />} >
						Option 1
            	</Menu.Item>
					<Menu.Item key="c" icon={<PieChartOutlined />} >
						Option 1
            	</Menu.Item>
					<Menu.Item key="d" icon={<PieChartOutlined />} >
						Option 1
            	</Menu.Item>
					<Menu.Item key="e" icon={<PieChartOutlined />} >
						Option 1
            	</Menu.Item>
					<Menu.Item key="f" icon={<PieChartOutlined />} >
						Option 1
            	</Menu.Item>
					<Menu.Item key="g" icon={<PieChartOutlined />} >
						Option 1
            	</Menu.Item>
					<Menu.Item key="h" icon={<PieChartOutlined />} >
						Option 1
            	</Menu.Item>
					<Menu.Item key="i" icon={<PieChartOutlined />} >
						Option 1
            	</Menu.Item>
					<Menu.Item key="j" icon={<PieChartOutlined />} >
						Option 1
            	</Menu.Item>
					<Menu.Item key="k" icon={<PieChartOutlined />} >
						Option 1
            	</Menu.Item>
					<Menu.Item key="l" icon={<PieChartOutlined />} >
						Option 1
            	</Menu.Item>
					<Menu.Item key="2" icon={<DesktopOutlined />}>
						Option 2
            	</Menu.Item>
					<SubMenu key="sub1" icon={<UserOutlined />} title="User">
						<Menu.Item key="3">Tom</Menu.Item>
						<Menu.Item key="4">Bill</Menu.Item>
						<Menu.Item key="5">Alex</Menu.Item>
					</SubMenu>
					<SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
						<Menu.Item key="6">Team 1</Menu.Item>
						<Menu.Item key="8">Team 2</Menu.Item>
					</SubMenu>
					<Menu.Item key="9" icon={<FileOutlined />}>
						Files
            </Menu.Item>
				</Menu>
			</Sider>
			{/* <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout> */}
		</Layout>
	);
};

// export default AnalyticsHome;