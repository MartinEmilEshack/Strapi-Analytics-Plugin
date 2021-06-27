'use strict';

/**
 * analytics.js controller
 *
 * @description: A set of functions called "actions" of the `analytics` plugin.
 * 
 */

module.exports = {
	createChart: async (ctx) => {
		try {
			let { data: dataSource, ...rest } = await strapi
				.query('chart', 'analytics')
				.create(ctx.request.body);
			let modelResult = await strapi.query(dataSource.model).find({ _limit: -1 });
			modelResult = modelResult.reduce(({ categories, series }, entry) => {
				let catIndex = categories.indexOf(entry[dataSource.category]);
				if (catIndex > -1) {
					series[0].data[catIndex] += entry[dataSource.attribute];
				} else {
					categories.push(entry[dataSource.category]);
					series[0].data.push(entry[dataSource.attribute]);
				}
				return { categories, series };
			}, { categories: [], series: [{ name: dataSource.attribute, data: [] }] });
			ctx.send({ message: 'ok', data: { ...rest, data: modelResult } });
		} catch (error) {
			ctx.send({ message: 'not created' });
		}
	},
	findCharts: async (ctx) => {
		let results;
		const pageID = ctx.params.pageID;
		try {
			let results = await strapi
				.query('chart', 'analytics')
				.find({ _limit: -1, page: pageID });

			results = await Promise.all(results.map(async ({ data: dataSource, page, ...rest }) => {
				let modelResult = await strapi.query(dataSource.model).find({ _limit: -1 });
				modelResult = modelResult.reduce(({ categories, series }, entry) => {
					let catIndex = categories.indexOf(entry[dataSource.category]);
					if (catIndex > -1) {
						series[0].data[catIndex] += entry[dataSource.attribute];
					} else {
						categories.push(entry[dataSource.category]);
						series[0].data.push(entry[dataSource.attribute]);
					}
					return { categories, series };
				}, { categories: [], series: [{ name: dataSource.attribute, data: [] }] });
				return { ...rest, data: modelResult, page: page.id };
			}));
			ctx.send({ message: 'ok', data: results });
		} catch (error) {
			ctx.send({ message: 'not found', data: results });
		}
	},
	findModels: async (ctx) => {
		let results;
		try {
			results = Object.keys(strapi.contentTypes)
				.filter((key) => key.match(/^(application::).*$/))
				.map((key) => {
					const model = strapi.contentTypes[key];
					return {
						kind: model.kind,
						collectionName: model.collectionName,
						uid: model.uid,
						apiName: model.apiName,
						modelType: model.modelType,
						modelName: model.modelName,
						primaryKey: model.primaryKey,
						primaryKeyType: model.primaryKeyType,
						attributes: model.allAttributes
					};
				});
			ctx.send({ message: 'ok', data: results });
		} catch (error) {
			ctx.send({ message: 'not found', data: results });
		}
	},
	findPages: async (ctx) => {
		let results;
		try {
			results = await strapi.query('analytics-page', 'analytics').find({ _limit: -1 });
			ctx.send({ message: 'ok', data: results });
		} catch (error) {
			ctx.send({ message: 'not found', data: results });
		}
	},
	createPage: async (ctx) => {
		const { title, description } = ctx.request.body;
		let results;
		try {
			results = await strapi.query('analytics-page', 'analytics').create({
				title: title,
				description: description,
			});
			ctx.send({ message: 'created', data: results });
		} catch (error) {
			ctx.send({ message: 'not modified', data: results });
		}
	},
	deletePage: async (ctx) => {
		let results;
		const { id } = ctx.params;
		try {
			results = await strapi.query('analytics-page', 'analytics').delete({ id });
			ctx.send({ message: 'ok', data: results });
		} catch (error) {
			ctx.send({ message: 'not modified', data: results });
		}
	},
	index: async (ctx) => {
		ctx.send({
			message: 'ok',
		});
	}
};


// async getModels(ctx) {
// 	try {
// 		const { models } = strapi;
// 		const data = [];
// 		Object.keys(models).forEach(modelKey => {
// 			const model = models[modelKey];
// 			data.push({ name: model.info.name, attributes: model.attributes, key: modelKey });
// 		});
// 		ctx.send({
// 			message: 'ok',
// 			data: data
// 		});
// 	} catch (error) {
// 		ctx.response.status = 406;
// 		ctx.response.message = "could not get models: " + error;
// 	}
// 	// const isAdmin = 'not admin';
// 	// // if (ctx.state.user.role.name === 'Super Admin')
// 	// // 	isAdmin = 'Martin';
// 	// ctx.send({
// 	// 	data: isAdmin,
// 	// });
// },


// string
// text
// integer
// biginteger
// float
// decimal
// password
// date
// time
// datetime
// timestamp
// boolean
// binary
// uuid
// enumeration
// json
// email