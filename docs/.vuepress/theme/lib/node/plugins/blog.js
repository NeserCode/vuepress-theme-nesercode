import { blogPlugin } from 'vuepress-plugin-blog2'

export const getBlogPlugin = () => blogPlugin({
  filter: ({ filePathRelative, frontmatter }) => {
    // 舍弃那些不是从 Markdown 文件生成的页面
    if (!filePathRelative) return false;

    // 舍弃 `archives` 文件夹的页面
    if (filePathRelative.startsWith("archives/")) return false;

    // 舍弃 `docs` 文件夹的页面
    if (filePathRelative.startsWith("docs/")) return false;

    // 舍弃那些没有使用默认布局的页面
    if (frontmatter.home || frontmatter.layout) return false;

    return true;
  },

  getInfo: (page) => {
    const { frontmatter, title } = page
    // 获取页面信息
    const info = {
      author: frontmatter.author || "",
      categories: frontmatter.categories || [],
      date: frontmatter.date ? new Date(frontmatter.date) : new Date(page.data.git?.createdTime),
      tags: frontmatter.tags || frontmatter.tag || [],
      excerpt: page.data.excerpt || "",
      title
    };

    return info;
  },
  category: [
    {
      key: "tag",
      getter: ({ frontmatter }) => (frontmatter.tag || []),
      path: "/tag/",
      layout: "TagPage",
      frontmatter: (path) => ({
        title: "类",
        localePath: path,
        plugins: {
          readingTime: false,
          readingLine: false,
          comment: false,
          sidebarCategory: false,
        }
      }),
      itemPath: "/tag/:name/",
      itemLayout: "TagPage",
      itemFrontmatter: (name, path) => ({
        title: `${name.toUpperCase()}`,
        localePath: path,
        plugins: {
          readingTime: false,
          readingLine: false,
          comment: false,
          sidebarCategory: false,
        }
      }),
    },
  ],
  type: [
    {
      key: "timeLine",
      filter: (page) => page.data.path.startsWith("/blog/"),
      sorter: (pageA, pageB) => new Date(pageB.data.git?.createdTime).getTime() - new Date(pageA.data.git?.createdTime).getTime(),
      path: "/timeLine/",
      layout: "TimeLine",
      frontmatter: (path) => ({
        title: "时",
        localePath: path,
        plugins: {
          readingTime: false,
          readingLine: false,
          comment: false,
          sidebarCategory: false,
        }
      }),
    }
  ],
})