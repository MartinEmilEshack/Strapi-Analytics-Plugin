onRequestAnalysis = async analysisConfig => {
	this.analysisConfig = analysisConfig;
	this.setState({ analyzing: true }, async () => {
		try {
			const response = await request("/import-content/preAnalyzeImportFile", {
				method: "POST",
				body: analysisConfig
			});

			this.setState({ analysis: response, analyzing: false }, () => {
				strapi.notification.success(`Analyzed Successfully`);
			});
		} catch (e) {
			this.setState({ analyzing: false }, () => {
				strapi.notification.error(`Analyze Failed, try again`);
				strapi.notification.error(`${e}`);
			});
		}
	});
};


getModels = async () => {
	this.setState({ loading: true });
	try {
		const response = await request("/content-type-builder/content-types", {
			method: "GET"
		});

		// Remove non-user content types from models
		const models = get(response, ["data"], []).filter(
			obj => !has(obj, "plugin")
		);
		const modelOptions = models.map(model => {
			return {
				label: get(model, ["schema", "name"], ""), // (name is used for display_name)
				value: model.uid // (uid is used for table creations)
			};
		});

		this.setState({ loading: false });

		return { models, modelOptions };
	} catch (e) {
		this.setState({ loading: false }, () => {
			strapi.notification.error(`${e}`);
		});
	}
	return [];
};

