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
		items: ArticleTypeData[]
		path: string
	}
}

export interface Article {
	path: string
}

export interface ArticleTypeData extends Article {
	info: ArticleInfo
}

export interface ArticleCategoryData extends Article {
	map: ArticleMap
	currentItems?: ArticleTypeData[]
}
