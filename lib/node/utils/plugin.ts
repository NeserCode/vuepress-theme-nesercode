import { gitPlugin } from "@vuepress/plugin-git"

import type { App } from "@vuepress/core"
import type { GitPluginOptions } from "@vuepress/plugin-git"

export const useGitPlugin = (app: App, options: GitPluginOptions) => {
	const plugins = app.pluginApi.plugins

	if (
		plugins.every((plugin) => plugin.name !== "vuepress-plugin-git") &&
		options
	)
		app.use(gitPlugin(options))
}

export const removeGitPlugin = (app: App) => {
	const plugins = app.pluginApi.plugins

	const index = plugins.findIndex(
		(plugin) => plugin.name === "vuepress-plugin-git"
	)
	if (index > -1) plugins.splice(index, 1)
}
