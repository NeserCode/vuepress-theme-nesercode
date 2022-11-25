import type { App } from "@vuepress/core"
import type { GitPluginOptions } from "@vuepress/plugin-git"

export function useGitPlugin(app: App, options: GitPluginOptions): void

export function removeGitPlugin(app: App): void
