'use strict';

module.exports = async () => {
  const actions = [
	{
      section: 'plugins',
      displayName: 'FindModels',
      uid: 'find-models',
      pluginName: 'analytics',
    },
	{
      section: 'plugins',
      displayName: 'FindPages',
      uid: 'find-pages',
      pluginName: 'analytics',
    },
	 {
      section: 'plugins',
      displayName: 'CreatePage',
      uid: 'create-page',
      pluginName: 'analytics',
    },
	 {
      section: 'plugins',
      displayName: 'DeletePage',
      uid: 'delete-page',
      pluginName: 'analytics',
    },
  ];

  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};