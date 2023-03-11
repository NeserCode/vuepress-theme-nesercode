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
