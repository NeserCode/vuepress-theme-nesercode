import { ComputedRef } from "vue"

export const usePluginState: (
	keyName: string,
	states:
		| string[]
		| {
				readingTime?: boolean
				comment?: boolean
				sidebarCategory?: boolean
		  }
		| undefined
) => ComputedRef<boolean>

export const enableUpandDown: (state: boolean) => void
export const initUpandDown: () => void
