import { searchPlugin } from "@vuepress/plugin-search"

export const getSearchPlugin = searchPlugin({
  hotKeys: [
    {
      key: "s",
      ctrl: true,
    }
  ],
  isSearchable: (page) => {
    return page.path.startsWith("/blog/")
  }
})