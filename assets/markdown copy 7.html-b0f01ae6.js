import{_ as m,N as p,s as c,v as r,X as n,x as s,Q as a,S as d,P as e,Z as v,$ as g,a9 as i,y as h}from"./framework-68a4c2fc.js";const b={},_=n("h1",{id:"markdown",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#markdown","aria-hidden":"true"},"#"),s(" Markdown")],-1),f={href:"https://commonmark.org/help/",target:"_blank",rel:"noopener noreferrer"},w=n("h2",{id:"语法扩展",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#语法扩展","aria-hidden":"true"},"#"),s(" 语法扩展")],-1),x={href:"https://github.com/markdown-it/markdown-it",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/markdown-it/markdown-it#syntax-extensions",target:"_blank",rel:"noopener noreferrer"},y=n("p",null,"本章节将会介绍 VuePress 内置支持的 Markdown 语法扩展。",-1),M=n("h3",{id:"内置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#内置","aria-hidden":"true"},"#"),s(" 内置")],-1),j=n("p",null,"由 markdown-it 内置支持：",-1),T={href:"https://help.github.com/articles/organizing-information-with-tables/",target:"_blank",rel:"noopener noreferrer"},E={href:"https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text",target:"_blank",rel:"noopener noreferrer"},L=n("h3",{id:"标题锚点",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#标题锚点","aria-hidden":"true"},"#"),s(" 标题锚点")],-1),V=n("p",null,[s("你可能已经注意到，当你把鼠标放在各个章节的标题上时，会显示出一个 "),n("code",null,"#"),s(" 锚点。点击这个 "),n("code",null,"#"),s(" 锚点，可以直接跳转到对应章节。")],-1),P={class:"custom-container tip"},R=n("p",{class:"custom-container-title"},"TIP",-1),A={href:"https://github.com/valeriangalliat/markdown-it-anchor",target:"_blank",rel:"noopener noreferrer"},z=n("h3",{id:"链接",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),s(" 链接")],-1),B={href:"https://spec.commonmark.org/0.29/#link-reference-definitions",target:"_blank",rel:"noopener noreferrer"},C=i(`<p>以我们文档的源文件为例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>└─ docs
   └─ zh
      ├─ guide
      │  ├─ getting-started.md
      │  ├─ markdown.md    <span class="token comment"># &lt;- 我们在这里</span>
      │  └─ README.md
      ├─ reference
      │  └─ config.md
      └─ README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>原始 Markdown</strong></p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token comment">&lt;!-- 相对路径 --&gt;</span>

<span class="token url">[<span class="token content">首页</span>](<span class="token url">../README.md</span>)</span>  
<span class="token url">[<span class="token content">配置参考</span>](<span class="token url">../reference/config.md</span>)</span>  
<span class="token url">[<span class="token content">快速上手</span>](<span class="token url">./getting-started.md</span>)</span>

<span class="token comment">&lt;!-- 绝对路径 --&gt;</span>

<span class="token url">[<span class="token content">指南</span>](<span class="token url">/zh/guide/README.md</span>)</span>  
<span class="token url">[<span class="token content">配置参考 &gt; markdown.links</span>](<span class="token url">/zh/reference/config.md#links</span>)</span>

<span class="token comment">&lt;!-- URL --&gt;</span>

<span class="token url">[<span class="token content">GitHub</span>](<span class="token url">https://github.com</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>转换为</strong></p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RouterLink</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/zh/<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>首页<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RouterLink</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RouterLink</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/zh/reference/config.html<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>配置参考<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RouterLink</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RouterLink</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/zh/guide/getting-started.html<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>快速上手<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RouterLink</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RouterLink</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/zh/guide/<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>指南<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RouterLink</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RouterLink</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/zh/reference/config.html#links<span class="token punctuation">&quot;</span></span>
		<span class="token punctuation">&gt;</span></span>配置参考 <span class="token entity named-entity" title="&gt;">&amp;gt;</span> markdown.links<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RouterLink</span>
	<span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://github.com<span class="token punctuation">&quot;</span></span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>_blank<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>noopener noreferrer<span class="token punctuation">&quot;</span></span>
		<span class="token punctuation">&gt;</span></span>GitHub<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
	<span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>渲染为</strong></p>`,7),I=n("br",null,null,-1),H=n("br",null,null,-1),D=n("br",null,null,-1),N=n("br",null,null,-1),S=n("br",null,null,-1),F={href:"https://github.com",target:"_blank",rel:"noopener noreferrer"},U=n("p",null,[n("strong",null,"解释")],-1),G=n("li",null,[s("内部链接会被转换为 "),n("code",null,"<RouterLink>"),s(" 以便进行 SPA 导航。")],-1),O=n("code",null,".md",-1),J=n("li",null,[s("外部链接会被添加 "),n("code",null,'target="_blank" rel="noopener noreferrer"'),s(" 属性。")],-1),W=n("p",null,[n("strong",null,"建议")],-1),X=n("p",null,"对于指向内部 Markdown 文件的链接，尽可能使用相对路径而不是绝对路径。",-1),Q=n("ul",null,[n("li",null,"相对路径是指向目标文件的有效链接，在你的编辑器或者代码仓库中浏览源文件时也可以正确跳转。"),n("li",null,"相对路径在不同 locales 下都是一致的，这样在翻译你的内容时就不需要修改 locale 路径了。")],-1),Z={class:"custom-container tip"},$=n("p",{class:"custom-container-title"},"TIP",-1),K=n("p",null,"链接扩展是由我们的内置插件支持的。",-1),Y=n("h3",{id:"emoji",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#emoji","aria-hidden":"true"},"#"),s(" Emoji 🎉")],-1),nn=n("p",null,[s("你可以在你的 Markdown 内容中输入 "),n("code",null,":EMOJICODE:"),s(" 来添加 Emoji 表情。")],-1),sn={href:"https://github.com/ikatyang/emoji-cheat-sheet",target:"_blank",rel:"noopener noreferrer"},an=n("p",null,[n("strong",null,"输入")],-1),en=n("div",{class:"language-markdown line-numbers-mode","data-ext":"md"},[n("pre",{class:"language-markdown"},[n("code",null,`VuePress 2 已经发布 :tada: ！
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),tn=n("p",null,[n("strong",null,"输出")],-1),on=n("p",null,"VuePress 2 已经发布 🎉 ！",-1),ln={class:"custom-container tip"},pn=n("p",{class:"custom-container-title"},"TIP",-1),cn={href:"https://github.com/markdown-it/markdown-it-emoji",target:"_blank",rel:"noopener noreferrer"},rn=i(`<h3 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h3><p>如果你想要把当前页面的目录添加到 Markdown 内容中，你可以使用 <code>[[toc]]</code> 语法。</p><p><strong>输入</strong></p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>[[toc]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>输出</strong></p>`,5),dn={class:"table-of-contents"},un=n("p",null,[s("目录中的标题将会链接到对应的 "),n("a",{href:"#%E6%A0%87%E9%A2%98%E9%94%9A%E7%82%B9"},"标题锚点"),s("，因此如果你禁用了标题锚点，可能会影响目录的功能。")],-1),kn={class:"custom-container tip"},mn=n("p",{class:"custom-container-title"},"TIP",-1),vn={href:"https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc",target:"_blank",rel:"noopener noreferrer"},gn=i(`<h3 id="代码块" tabindex="-1"><a class="header-anchor" href="#代码块" aria-hidden="true">#</a> 代码块</h3><p>下列代码块扩展是在 Node 端进行 Markdown 解析的时候实现的。这意味着代码块并不会在客户端被处理。</p><h4 id="行高亮" tabindex="-1"><a class="header-anchor" href="#行高亮" aria-hidden="true">#</a> 行高亮</h4><p>你可以在代码块添加行数范围标记，来为对应代码行进行高亮：</p><p><strong>输入</strong></p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">ts{1,6-8}</span>
<span class="token code-block language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> defaultTheme<span class="token punctuation">,</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuepress&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">&#39;你好， VuePress&#39;</span><span class="token punctuation">,</span>

  theme<span class="token operator">:</span> <span class="token function">defaultTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    logo<span class="token operator">:</span> <span class="token string">&#39;https://vuejs.org/images/logo.png&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defaultTheme<span class="token punctuation">,</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuepress&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">&#39;你好， VuePress&#39;</span><span class="token punctuation">,</span>

  theme<span class="token operator">:</span> <span class="token function">defaultTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    logo<span class="token operator">:</span> <span class="token string">&#39;https://vuejs.org/images/logo.png&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><div class="highlight-line"> </div><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>行数范围标记的例子：</p><ul><li>行数范围： <code>{5-8}</code></li><li>多个单行： <code>{4,7,9}</code></li><li>组合： <code>{4,7-13,16,23-27,40}</code></li></ul>`,10),hn={class:"custom-container tip"},bn=n("p",{class:"custom-container-title"},"TIP",-1),_n={href:"https://github.com/egoist/markdown-it-highlight-lines",target:"_blank",rel:"noopener noreferrer"},fn=i(`<h4 id="行号" tabindex="-1"><a class="header-anchor" href="#行号" aria-hidden="true">#</a> 行号</h4><p>你肯定已经注意到在代码块的最左侧会展示行号。这个功能是默认启用的，你可以通过配置来禁用它。</p><p>你可以在代码块添加 <code>:line-numbers</code> / <code>:no-line-numbers</code> 标记来覆盖配置项中的设置。</p><p><strong>输入</strong></p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">ts</span>
<span class="token code-block language-ts"><span class="token comment">// 行号默认是启用的</span>
<span class="token keyword">const</span> line2 <span class="token operator">=</span> <span class="token string">&quot;This is line 2&quot;</span>
<span class="token keyword">const</span> line3 <span class="token operator">=</span> <span class="token string">&quot;This is line 3&quot;</span></span>
<span class="token punctuation">\`\`\`</span></span>

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">ts:no-line-numbers</span>
<span class="token code-block language-ts"><span class="token comment">// 行号被禁用</span>
<span class="token keyword">const</span> line2 <span class="token operator">=</span> <span class="token string">&#39;This is line 2&#39;</span>
<span class="token keyword">const</span> line3 <span class="token operator">=</span> <span class="token string">&#39;This is line 3&#39;</span></span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 行号默认是启用的</span>
<span class="token keyword">const</span> line2 <span class="token operator">=</span> <span class="token string">&quot;This is line 2&quot;</span>
<span class="token keyword">const</span> line3 <span class="token operator">=</span> <span class="token string">&quot;This is line 3&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 行号被禁用</span>
<span class="token keyword">const</span> line2 <span class="token operator">=</span> <span class="token string">&#39;This is line 2&#39;</span>
<span class="token keyword">const</span> line3 <span class="token operator">=</span> <span class="token string">&#39;This is line 3&#39;</span>
</code></pre></div>`,8),wn={class:"custom-container tip"},xn=n("p",{class:"custom-container-title"},"TIP",-1),qn=n("p",null,"行号扩展是由我们的内置插件支持的。",-1),yn=n("h4",{id:"添加-v-pre",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#添加-v-pre","aria-hidden":"true"},"#"),s(" 添加 v-pre")],-1),Mn=n("p",null,[s("由于 "),n("a",{href:"#%E6%A8%A1%E6%9D%BF%E8%AF%AD%E6%B3%95"},"模板语法可以在 Markdown 中使用"),s("，它也同样可以在代码块中生效。")],-1),jn={href:"https://v3.vuejs.org/api/directives.html#v-pre",target:"_blank",rel:"noopener noreferrer"},Tn=i(`<p>你可以在代码块添加 <code>:v-pre</code> / <code>:no-v-pre</code> 标记来覆盖配置项中的设置。</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>模板语法的字符有可能会被语法高亮器解析，比如 &quot;Mustache&quot; 语法（即双花括号）。因此，就像下面的例子一样，在某些语言中 <code>:no-v-pre</code> 可能并不能生效。</p><p>如果你无论如何都想在这种语言中使用 Vue 语法，你可以尝试禁用默认的语法高亮，然后在客户端实现你的自定义代码高亮。</p></div><p><strong>输入</strong></p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">md</span>
<span class="token code-block language-md"><span class="token comment">&lt;!-- 默认情况下，这里会被保持原样 --&gt;</span>

1 + 2 + 3 = {{ 1 + 2 + 3 }}</span>
<span class="token punctuation">\`\`\`</span></span>

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">md:no-v-pre</span>
<span class="token code-block language-md"><span class="token comment">&lt;!-- 这里会被 Vue 编译 --&gt;</span>
1 + 2 + 3 = {{ 1 + 2 + 3 }}</span>
<span class="token punctuation">\`\`\`</span></span>

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js:no-v-pre</span>
<span class="token code-block language-js"><span class="token comment">// 由于 JS 代码高亮，这里不会被正确编译</span>
<span class="token keyword">const</span> onePlusTwoPlusThree <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出</strong></p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token comment">&lt;!-- 默认情况下，这里会被保持原样 --&gt;</span>

1 + 2 + 3 = {{ 1 + 2 + 3 }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token comment">&lt;!-- 这里会被 Vue 编译 --&gt;</span>
1 + 2 + 3 = 6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,7),En=i(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 由于 JS 代码高亮，这里不会被正确编译</span>
<span class="token keyword">const</span> onePlusTwoPlusThree <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,1),Ln={class:"custom-container tip"},Vn=n("p",{class:"custom-container-title"},"TIP",-1),Pn=n("p",null,"v-pre 扩展是由我们的内置插件支持的。",-1),Rn=i(`<h3 id="导入代码块" tabindex="-1"><a class="header-anchor" href="#导入代码块" aria-hidden="true">#</a> 导入代码块</h3><p>你可以使用下面的语法，从文件中导入代码块：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token comment">&lt;!-- 最简单的语法 --&gt;</span>

@<span class="token url">[<span class="token content">code</span>](<span class="token url">../foo.js</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你只想导入这个文件的一部分：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token comment">&lt;!-- 仅导入第 1 行至第 10 行 --&gt;</span>

@<span class="token url">[<span class="token content">code{1-10}</span>](<span class="token url">../foo.js</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码语言会根据文件扩展名进行推断，但我们建议你显式指定：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token comment">&lt;!-- 指定代码语言 --&gt;</span>

@<span class="token url">[<span class="token content">code js</span>](<span class="token url">../foo.js</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上，<code>[]</code> 内的第二部分会被作为代码块标记来处理，因此在上面 <a href="#%E4%BB%A3%E7%A0%81%E5%9D%97">代码块</a> 章节中提到的语法在这里都可以支持：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token comment">&lt;!-- 行高亮 --&gt;</span>

@<span class="token url">[<span class="token content">code js{2,4-5}</span>](<span class="token url">../foo.js</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是一个复杂的例子：</p><ul><li>导入 <code>&#39;../foo.js&#39;</code> 文件的第 3 行至第 10 行</li><li>指定语言为 <code>&#39;js&#39;</code></li><li>对导入代码的第 3 行进行高亮，即 <code>&#39;../foo.js&#39;</code> 文件的第 5 行</li><li>禁用行号</li></ul><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>@<span class="token url">[<span class="token content">code{3-10} js{3}:no-line-numbers</span>](<span class="token url">../foo.js</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要注意的是，路径别名在导入代码语法中不会生效。你可以通过下面的配置来自行处理路径别名：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> getDirname<span class="token punctuation">,</span> path <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@vuepress/utils&quot;</span>

<span class="token keyword">const</span> __dirname <span class="token operator">=</span> <span class="token function">getDirname</span><span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>url<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
	markdown<span class="token operator">:</span> <span class="token punctuation">{</span>
		importCode<span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token function-variable function">handleImportPath</span><span class="token operator">:</span> <span class="token punctuation">(</span>str<span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
				str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^@src</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&quot;path/to/src&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token comment">&lt;!-- 会被解析至 &#39;path/to/src/foo.js&#39; --&gt;</span>

@<span class="token url">[<span class="token content">code</span>](<span class="token url">@src/foo.js</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),An={class:"custom-container tip"},zn=n("p",{class:"custom-container-title"},"TIP",-1),Bn=n("p",null,"导入代码扩展是由我们的内置插件支持的。",-1),Cn=n("h2",{id:"在-markdown-中使用-vue",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#在-markdown-中使用-vue","aria-hidden":"true"},"#"),s(" 在 Markdown 中使用 Vue")],-1),In=n("p",null,"这一章节会介绍 Vue 在 Markdown 中一些基本用法。",-1),Hn=n("h3",{id:"模板语法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#模板语法","aria-hidden":"true"},"#"),s(" 模板语法")],-1),Dn=n("p",null,"我们知道：",-1),Nn=n("ul",null,[n("li",null,"Markdown 中允许使用 HTML。"),n("li",null,"Vue 模板语法是和 HTML 兼容的。")],-1),Sn={href:"https://v3.vuejs.org/guide/template-syntax.html",target:"_blank",rel:"noopener noreferrer"},Fn=i(`<p><strong>输入</strong></p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>一加一等于： {{ 1 + 1 }}

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>i in 3<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span> span: {{ i }} <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出</strong></p><p>一加一等于： 2</p>`,4),Un=i('<h3 id="组件" tabindex="-1"><a class="header-anchor" href="#组件" aria-hidden="true">#</a> 组件</h3><p>你可以在 Markdown 中直接使用 Vue 组件。</p><p><strong>输入</strong></p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>这是默认主题内置的 <span class="token code-snippet code keyword">`&lt;Badge /&gt;`</span> 组件 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Badge</span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>演示<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>输出</strong></p>',5),Gn=n("code",null,"<Badge />",-1),On={class:"custom-container tip"},Jn=n("p",{class:"custom-container-title"},"TIP",-1),Wn=n("h2",{id:"注意事项",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#注意事项","aria-hidden":"true"},"#"),s(" 注意事项")],-1),Xn=n("h3",{id:"非标准的-html-标签",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#非标准的-html-标签","aria-hidden":"true"},"#"),s(" 非标准的 HTML 标签")],-1),Qn=n("p",null,"非标准的 HTML 标签不会被 Vue 模板编译器识别成原生 HTML 标签。相反，Vue 会尝试将这些标签解析为 Vue 组件，而显然这些组件通常是不存在的。 例如：",-1),Zn={href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/center",target:"_blank",rel:"noopener noreferrer"},$n={href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/font",target:"_blank",rel:"noopener noreferrer"},Kn={href:"https://developer.mozilla.org/zh-CN/docs/Web/MathML",target:"_blank",rel:"noopener noreferrer"},Yn=n("p",null,"如果你无论如何都要使用这些标签的话，可以尝试下面两种方法之一：",-1),ns={href:"https://v3.cn.vuejs.org/api/directives.html#v-pre",target:"_blank",rel:"noopener noreferrer"},ss={href:"https://v3.vuejs.org/api/application-config.html#compileroptions",target:"_blank",rel:"noopener noreferrer"},as=n("code",null,"@bundler-webpack",-1),es=n("code",null,"@bundler-vite",-1);function ts(os,ls){const o=p("ExternalLinkIcon"),t=p("RouterLink"),l=p("router-link"),u=p("Badge");return c(),r("div",null,[_,n("p",null,[s("在阅读本章节之前，请确保你已经对 Markdown 有所了解。如果你还不了解 Markdown ，请先学习一些 "),n("a",f,[s("Markdown 教程"),a(o)]),s("。")]),d(" more "),w,n("p",null,[s("VuePress 会使用 "),n("a",x,[s("markdown-it"),a(o)]),s(" 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 "),n("a",q,[s("语法扩展"),a(o)]),s(" 。")]),y,n("p",null,[s("你也可以通过 "),a(t,{to:"/blog/reference/config.html#markdown"},{default:e(()=>[s("markdown")]),_:1}),s(" 和 "),a(t,{to:"/blog/reference/plugin-api.html#extendsmarkdown"},{default:e(()=>[s("extendsMarkdown")]),_:1}),s(" 来配置这些内置扩展、加载更多 markdown-it 插件、实现你自己的扩展等。")]),M,j,n("ul",null,[n("li",null,[n("a",T,[s("表格"),a(o)]),s(" (GFM)")]),n("li",null,[n("a",E,[s("删除线"),a(o)]),s(" (GFM)")])]),L,V,n("div",P,[R,n("p",null,[s("标题锚点扩展由 "),n("a",A,[s("markdown-it-anchor"),a(o)]),s(" 支持。")]),n("p",null,[s("配置参考： "),a(t,{to:"/blog/reference/config.html#markdown-anchor"},{default:e(()=>[s("markdown.anchor")]),_:1})])]),z,n("p",null,[s("在你使用 Markdown 的 "),n("a",B,[s("链接语法"),a(o)]),s(" 时， VuePress 会为你进行一些转换。")]),C,n("p",null,[a(t,{to:"/blog/"},{default:e(()=>[s("首页")]),_:1}),I,a(t,{to:"/blog/reference/config.html"},{default:e(()=>[s("配置参考")]),_:1}),H,a(t,{to:"/blog/guide/getting-started.html"},{default:e(()=>[s("快速上手")]),_:1}),D,a(t,{to:"/zh/guide/"},{default:e(()=>[s("指南")]),_:1}),N,a(t,{to:"/zh/reference/config.html#links"},{default:e(()=>[s("配置参考 > markdown.links")]),_:1}),S,n("a",F,[s("GitHub"),a(o)])]),U,n("ul",null,[G,n("li",null,[s("指向 "),O,s(" 文件的内部链接会被转换为目标页面的 "),a(t,{to:"/blog/guide/page.html#%E8%B7%AF%E7%94%B1"},{default:e(()=>[s("路由路径")]),_:1}),s("，并且支持绝对路径和相对路径。")]),J]),W,X,Q,n("div",Z,[$,K,n("p",null,[s("配置参考： "),a(t,{to:"/blog/reference/config.html#markdown-links"},{default:e(()=>[s("markdown.links")]),_:1})])]),Y,nn,n("p",null,[s("前往 "),n("a",sn,[s("emoji-cheat-sheet"),a(o)]),s(" 来查看所有可用的 Emoji 表情和对应代码。")]),an,en,tn,on,n("div",ln,[pn,n("p",null,[s("Emoji 扩展由 "),n("a",cn,[s("markdown-it-emoji"),a(o)]),s(" 支持。")]),n("p",null,[s("配置参考： "),a(t,{to:"/blog/reference/config.html#markdown-emoji"},{default:e(()=>[s("markdown.emoji")]),_:1})])]),rn,n("nav",dn,[n("ul",null,[n("li",null,[a(l,{to:"#语法扩展"},{default:e(()=>[s("语法扩展")]),_:1}),n("ul",null,[n("li",null,[a(l,{to:"#内置"},{default:e(()=>[s("内置")]),_:1})]),n("li",null,[a(l,{to:"#标题锚点"},{default:e(()=>[s("标题锚点")]),_:1})]),n("li",null,[a(l,{to:"#链接"},{default:e(()=>[s("链接")]),_:1})]),n("li",null,[a(l,{to:"#emoji"},{default:e(()=>[s("Emoji 🎉")]),_:1})]),n("li",null,[a(l,{to:"#目录"},{default:e(()=>[s("目录")]),_:1})]),n("li",null,[a(l,{to:"#代码块"},{default:e(()=>[s("代码块")]),_:1})]),n("li",null,[a(l,{to:"#导入代码块"},{default:e(()=>[s("导入代码块")]),_:1})])])]),n("li",null,[a(l,{to:"#在-markdown-中使用-vue"},{default:e(()=>[s("在 Markdown 中使用 Vue")]),_:1}),n("ul",null,[n("li",null,[a(l,{to:"#模板语法"},{default:e(()=>[s("模板语法")]),_:1})]),n("li",null,[a(l,{to:"#组件"},{default:e(()=>[s("组件")]),_:1})])])]),n("li",null,[a(l,{to:"#注意事项"},{default:e(()=>[s("注意事项")]),_:1}),n("ul",null,[n("li",null,[a(l,{to:"#非标准的-html-标签"},{default:e(()=>[s("非标准的 HTML 标签")]),_:1})])])])])]),un,n("div",kn,[mn,n("p",null,[s("目录扩展由 "),n("a",vn,[s("@mdit-vue/plugin-toc"),a(o)]),s(" 支持。")]),n("p",null,[s("配置参考： "),a(t,{to:"/blog/reference/config.html#markdown-toc"},{default:e(()=>[s("markdown.toc")]),_:1})])]),gn,n("div",hn,[bn,n("p",null,[s("行高亮扩展是由我们的内置插件支持的，该扩展 Fork 并修改自 "),n("a",_n,[s("markdown-it-highlight-lines"),a(o)]),s("。")]),n("p",null,[s("配置参考： "),a(t,{to:"/blog/reference/config.html#markdown-code-highlightlines"},{default:e(()=>[s("markdown.code.highlightLines")]),_:1})])]),fn,n("div",wn,[xn,qn,n("p",null,[s("配置参考： "),a(t,{to:"/blog/reference/config.html#markdown-code-linenumbers"},{default:e(()=>[s("markdown.code.lineNumbers")]),_:1})])]),yn,Mn,n("p",null,[s("为了避免你的代码块被 Vue 编译， VuePress 默认会在你的代码块添加 "),n("a",jn,[s("v-pre"),a(o)]),s(" 指令。这一默认行为可以在配置中关闭。")]),Tn,d(`
在 JS 代码块上使用 :no-v-pre 的话，会在使用 shiki 时遇到一些潜在的问题，所以这里
我们实际上没有使用 :no-v-pre ，只是作为一个错误用法的示例。
`),En,n("div",Ln,[Vn,Pn,n("p",null,[s("配置参考： "),a(t,{to:"/blog/reference/config.html#markdown-code-vpre-block"},{default:e(()=>[s("markdown.code.vPre.block")]),_:1})])]),Rn,n("div",An,[zn,Bn,n("p",null,[s("配置参考： "),a(t,{to:"/blog/reference/config.html#markdown-importcode"},{default:e(()=>[s("markdown.importCode")]),_:1})])]),Cn,In,n("p",null,[s("可以前往 "),a(t,{to:"/blog/advanced/cookbook/markdown-and-vue-sfc.html"},{default:e(()=>[s("Cookbook > Markdown 和 Vue SFC")]),_:1}),s(" 来了解更多内容。")]),Hn,Dn,Nn,n("p",null,[s("这意味着， Markdown 中允许直接使用 "),n("a",Sn,[s("Vue 模板语法"),a(o)]),s("。")]),Fn,n("p",null,[(c(),r(v,null,g(3,k=>n("span",null," span: "+h(k),1)),64))]),Un,n("p",null,[s("这是默认主题内置的 "),Gn,s(" 组件 "),a(u,{text:"演示"})]),n("div",On,[Jn,n("p",null,[s("前往 "),a(t,{to:"/blog/reference/components.html"},{default:e(()=>[s("内置组件")]),_:1}),s(" 查看所有内置组件。")]),n("p",null,[s("前往 "),a(t,{to:"/blog/reference/default-theme/components.html"},{default:e(()=>[s("默认主题 > 内置组件")]),_:1}),s(" 查看默认主题中的所有内置组件。")])]),Wn,Xn,Qn,n("ul",null,[n("li",null,[s("已废弃的 HTML 标签，比如 "),n("a",Zn,[s("<center>"),a(o)]),s(" 和 "),n("a",$n,[s("<font>"),a(o)]),s(" 等。")]),n("li",null,[n("a",Kn,[s("MathML 标签"),a(o)]),s("，它们可能会被一些 markdown-it 的 LaTeX 插件用到。")])]),Yn,n("ul",null,[n("li",null,[s("添加一个 "),n("a",ns,[s("v-pre"),a(o)]),s(" 指令来跳过这个元素和它的子元素的编译过程。注意所有的模板语法也都会失效。")]),n("li",null,[s("设置 "),n("a",ss,[s("compilerOptions.isCustomElement"),a(o)]),s(" 来告诉 Vue 模板编译器不要尝试作为组件来解析它们。 "),n("ul",null,[n("li",null,[s("对于 "),as,s(" ，设置 "),a(t,{to:"/blog/reference/bundler/webpack.html#vue"},{default:e(()=>[s("vue.compilerOptions")]),_:1})]),n("li",null,[s("对于 "),es,s(" ，设置 "),a(t,{to:"/blog/reference/bundler/vite.html#vuepluginoptions"},{default:e(()=>[s("vuePluginOptions.template.compilerOptions")]),_:1})])])])])])}const ps=m(b,[["render",ts],["__file","markdown copy 7.html.vue"]]);export{ps as default};