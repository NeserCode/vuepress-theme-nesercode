import{_ as e,s as a,v as r,a2 as t}from"./framework-41077d84.js";const s={},i=t('<h1 id="css-知识总结" tabindex="-1"><a class="header-anchor" href="#css-知识总结" aria-hidden="true">#</a> CSS 知识总结</h1><h2 id="_1-css-优先级" tabindex="-1"><a class="header-anchor" href="#_1-css-优先级" aria-hidden="true">#</a> 1 CSS 优先级</h2><p>浏览器通过优先级来判断哪些属性值与一个元素最为相关，从而在该元素上应用这些属性值。优先级是基于不同种类选择器组成的匹配规则。</p><h3 id="_1-1-全局-css-优先级" tabindex="-1"><a class="header-anchor" href="#_1-1-全局-css-优先级" aria-hidden="true">#</a> 1.1 全局 CSS 优先级</h3><p>不包括 Javascript 部分：HTML 行内样式 ＞外联样式表</p><h3 id="_1-2-局内-css-优先级" tabindex="-1"><a class="header-anchor" href="#_1-2-局内-css-优先级" aria-hidden="true">#</a> 1.2 局内 CSS 优先级</h3><p>选择器优先级：ID 选择器＞类选择器=伪类选择器=属性选择器＞标签选择器＞通用选择器</p><p>局内优先级：!importent ＞行内样式＞外联样式表（选择器）＞继承＞浏览器默认属性</p><p>权重不会被不同阶数下的数量影响，即 10×10≠100</p><h2 id="_2-布局模式" tabindex="-1"><a class="header-anchor" href="#_2-布局模式" aria-hidden="true">#</a> 2 布局模式</h2><p>Css 中的布局模式主要有：块布局、行内布局、表格布局、定位布局、弹性盒子布局、网格布局</p><h3 id="_2-1-块布局、行内布局" tabindex="-1"><a class="header-anchor" href="#_2-1-块布局、行内布局" aria-hidden="true">#</a> 2.1 块布局、行内布局</h3><p>块布局与行内布局都是基础的布局方式。前者以块元素为主体，后者以行内元素为主体。</p><h3 id="_2-2-表格布局" tabindex="-1"><a class="header-anchor" href="#_2-2-表格布局" aria-hidden="true">#</a> 2.2 表格布局</h3><p>与 HTML 部分的 table 标签的表现形式相似。</p><h3 id="_2-3-定位布局" tabindex="-1"><a class="header-anchor" href="#_2-3-定位布局" aria-hidden="true">#</a> 2.3 定位布局</h3><p>包含静态定位、相对定位、绝对定位与固定定位。</p><p>Static 与 Relative 保持自己在文档流中的位置（顺序上），除了静态定位，其他定位方式都会在某种意义上偏离自己原来的视觉位置。其中，相对定位是相对于自己原来的位置进行偏移，绝对定位是相对于最近的、非 Static 定位的父元素（若无则相对于 body）进行偏移并不再占据自己原来在文档流中的位置。固定布局是相对于浏览器窗口进行定位的，它可以随着页面的滚动而保持固定的位置。</p><h3 id="_2-4-弹性盒子布局" tabindex="-1"><a class="header-anchor" href="#_2-4-弹性盒子布局" aria-hidden="true">#</a> 2.4 弹性盒子布局</h3><p>Flexible Box 模型，通常被称为 flexbox，是一种一维的布局模型。它给 flexbox 的子元素之间提供了强大的空间分布和对齐能力。</p><p>flexbox 是由两根轴线来统筹子元素的对齐、排列方式的：主轴与侧轴。</p><ul><li>主轴：由 flex-direction 定义，默认为 row，可选择的值包括 row 与 column 和对应的倒序。</li><li>侧轴：又称交叉轴，与主轴方向互斥。</li></ul><p>同时 flex 默认为单行不换行，换行需要设置 flex-warp 为 warp 或者 warp-reverse。</p><h4 id="_2-4-1-对齐" tabindex="-1"><a class="header-anchor" href="#_2-4-1-对齐" aria-hidden="true">#</a> 2.4.1 对齐</h4><p>主轴对齐方式由 justify-content 决定，侧轴由 align-items 决定。</p><p>justify-content 有 flex-start、flex-end、center、space-between、space-around 五项可选值，其中 space-between 指两端对齐，并由余下的空隙平分剩余空间。而 space-around 则为将剩余空间平分给各个元素的左右或者上下（取决于方向）。</p><p>align-items 有 flex-start、flex-end、center、baseline、stretch 五项可选值，默认值为 stretch，若未设置高度或者设置为 auto 则占满容器的高度。baseline 则是以子项的第一行文字的基线（底部）为基准对齐。</p>',27),h=[i];function d(n,c){return a(),r("div",null,h)}const l=e(s,[["render",d],["__file","1.CSS.html.vue"]]);export{l as default};
