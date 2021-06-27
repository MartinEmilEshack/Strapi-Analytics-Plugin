import React, { useState } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import "./chart_block.css";

/**
 * @param {boolean} fullWidth 
 */
const ChartBlock = ({ fullWidth, children }) => {
	return (
		<div
			style={{ 
				padding: '8px',
				height: '400px', 
				width: fullWidth ? '100%' : '50%' 
			}}>
			<div className='chart-block'>
				{children}
			</div>
		</div>
	);
};

export default ChartBlock;