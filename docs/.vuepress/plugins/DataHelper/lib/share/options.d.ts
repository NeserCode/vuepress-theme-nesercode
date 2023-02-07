export interface HelperOptions {
	/**
	 * Whether write a temp file to store pages
	 * @default false
	 */
	isTempPages?: boolean
	/**
	 * Filter pages whose path start with this patten
	 * @example "/blog/"
	 * @default "/blog"
	 */
	pagesStartWith?: string
}
