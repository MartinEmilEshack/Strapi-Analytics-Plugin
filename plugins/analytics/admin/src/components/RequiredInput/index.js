import React from "react";

const RequiredInput = ({ required }) => {
	return required ? <h6 style={{ color: 'red' }}>* required</h6> : <></>;
};

export default RequiredInput;