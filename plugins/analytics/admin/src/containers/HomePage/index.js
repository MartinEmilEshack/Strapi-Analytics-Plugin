/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import AnalyticsHome from '../../components/AnalyticsHome';


const HomePage = () => {
	return (
		<div style={{ height: 'Calc(100vh - 6rem)', minHeight: 'Calc(100vh - 6rem)' }}>
			<AnalyticsHome />
		</div>
	);
};

export default memo(HomePage);
