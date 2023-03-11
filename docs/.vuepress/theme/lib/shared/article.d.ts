export interface ArticleInfo {
	author: string
	categories: string[]
	date: string
	excerpt: string
	tags: string[]
	title: string
}

export interface ArticleMap {
	[key: string]: {
		items: ArticleCategoryData[]
		path: string
	}
}

export interface Article {
	path: string
}

export interface ArticleCategoryData extends Article {
	info: ArticleInfo
}

export interface ArticleTypeData extends Article {
	map: ArticleMap
}
