---
home:true
---

# 使用网页制作一个动态壁纸

### 前言

之前在逛 BiliBili 的时候，关注了一位十分有意思的 up : CodingStartup 起码课
有一期视频是讲：[用 CSS 画画|写代码的日与夜](https://www.bilibili.com/video/BV1fD4y1d75U)
是使用纯 Css 设计的一个静态网页，这对于当时正在学习 JavaScript 数据交互部分的我，简直是宛如见到了艺术品，因为这是我从未想到过的创意(类似的点子也没有想到过 :0 )，所以说，遇到当然不会错过，我自己又重新复现了代码，并且试着去实现让它跟随时间变化，成为一个类似时间壁纸的样子。后来我发现，Windows 的壁纸是要使用 C 写框架的，我只能暂时放弃使用它做壁纸的想法。直到今年六月份，我无意中了解到了其实 steam 家的 WallPaperEngine 是可以将一个网页项目制作成壁纸的。于是，就出现了现在的 日与夜 壁纸 。

### 工具

- WallPaperEngine
- day&night 项目源码

### 效果预览

暂无预览

### 解析

整体布局部分：

```html
<div class="sun"></div>
<div class="moon"></div>
<div class="sea" onmouseenter="changeMode()" onmouseleave="holdSec()">
	<div id="time">
		<span class="hour t"></span>
		<span class="sp">：</span>
		<span class="min t"></span>
		<span class="sp">：</span>
		<span class="sec t"></span>
	</div>
	<div id="timeA"><span class="A"></span></div>
</div>
```

Css 样式表部分:

```css
:root {
	--percent-clip: 50%;
}

body {
	margin: 0;
	padding: 0;
	min-width: 800px;
}

.sun {
	position: absolute;
	width: 100%;
	height: 100%;

	background-color: #ffeea2;

	display: flex;
	justify-content: center;
	align-items: center;

	z-index: 10;
	clip-path: inset(0px var(--percent-clip) 0px 0px);
	transition: all ease-in-out 1.2s;
}

.sun::after {
	content: "";
	display: block;
	width: 600px;
	height: 600px;
	background-color: orange;
	border-radius: 50%;
}

.sea {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 30%;
	backdrop-filter: blur(100px);
	-webkit-backdrop-filter: blur(100px);

	z-index: 20;
}

.moon {
	position: absolute;
	background-color: #040720;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.moon::after {
	content: "";
	display: block;
	width: 600px;
	height: 600px;
	box-shadow: 160px 180px 0px cyan;
	border-radius: 50%;
	transform: translate(-160px, -180px);
}

#time {
	user-select: none;
	font-family: Ts;
	font-size: 26px;
	font-weight: 600;
	color: rgba(23, 43, 12, 0.6);
	width: 140px;
	height: 60px;
	line-height: 60px;
	margin: 1rem auto;
	text-align: center;
	transition: opacity ease-in-out 0.75s;
}

#time .t {
	display: block;
	float: left;
	height: 60px;
	width: 40px;
}

#time .sp {
	display: block;
	float: left;
	line-height: 62px;
	height: 60px;
	width: 10px;
}

#timeA {
	width: 150px;
	height: 80px;
	margin: -2rem auto;
}

#timeA .A {
	user-select: none;
	display: block;
	height: 80px;
	width: 150px;
	text-align: center;
	line-height: 80px;
	font-size: 72px;
	font-family: Ts;
	transition: opacity ease-in-out 0.75s;
}
```

通过观察不难看出，这个设计主要是依靠改变 clip-path 这条 Css 属性来使日与夜的界限移动(原作是想让日与夜的界限跟随鼠标移动，在这里不作仔细说明)。

> `clip-path` 使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。
