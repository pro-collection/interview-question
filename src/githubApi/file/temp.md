> 作者：大漠\_w3cpluscom  
> 链接：https://juejin.cn/post/7320288231111016498  
> 来源：稀土掘金  
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

---

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bad4c049c8834f989b6d7152a52722aa~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1460&h=730&s=34164&e=jpg&b=180d23)

CSS 的发展速度比以往任何时候都要快。在 [Flexbox 和 Grid](https://s.juejin.cn/ds/i8TmVYNt/ "https://s.juejin.cn/ds/i8TmVYNt/") 之后，CSS 的发展似乎经历了一段漫长的停滞期，但在近几年，[CSS 已经新增了许多新功能可用](https://s.juejin.cn/ds/i8Tmg379/ "https://s.juejin.cn/ds/i8Tmg379/")，而且还会有更多新功能即将推出。这个发展速度是令人兴奋的，同时也有些压倒性。

虽然 [CSS 新增了很多新功能](https://s.juejin.cn/ds/i8Tmg379/ "https://s.juejin.cn/ds/i8Tmg379/")，但很多 Web 开发者都认为这些花里胡哨的东西并没有给自己带来实质上的变化。换句话说，所有这些花里胡哨的东西（CSS 新特性）实际上改变了你编写 CSS 的方式吗？对于大多数 Web 开发者而言，CSS 的新特性确实影响了今天编写 CSS 的方式，但也许并没有像我预期的那样彻底。

虽然我看到很多博客文章以及我自己的小册《[现代 CSS](https://s.juejin.cn/ds/i8Tmg379/ "https://s.juejin.cn/ds/i8Tmg379/")》中有关这些新潮事物的介绍和示例，但我还没有看到这些实际应用在生产或日常中使用。这并不是对任何人或任何事情的抱怨。就我个人而言，我对 CSS 的演进感到非常兴奋。许多最新的功能是我们多年来一直渴望的。确实，其中有一些功能正在逐渐融入我的 CSS 中。虽然不是彻底改变，但足以让我比以往更喜欢编写 CSS。

### 2023 年对 CSS 来说是重要的一年！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ed3790de37f443b85a9bd3d547a0228~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3066&h=1762&s=462661&e=jpg&b=ffffff)

从年初的 [2023 Google I/O 大会](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fwhats-new-css-ui-2023 "https://developer.chrome.com/blog/whats-new-css-ui-2023")到年底的 [WWDC23 大会](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.apple.com%2Fvideos%2Fplay%2Fwwdc2023%2F10121%2F "https://developer.apple.com/videos/play/wwdc2023/10121/")，还有 [@Bramus 在乌得勒支@Frontmania 大会上的分享](https://link.juejin.cn?target=https%3A%2F%2Fwww.bram.us%2F2023%2F10%2F13%2Fwhats-new-in-css-2022-10-12-frontmania%2F "https://www.bram.us/2023/10/13/whats-new-in-css-2022-10-12-frontmania/")以及最近 Chrome 团队分享的《[CSS Wrapped: 2023!](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fcss-wrapped-2023 "https://developer.chrome.com/blog/css-wrapped-2023")》都在聊 CSS 的最新特性。我也不例外，[我花了半年的时间专门以小册的形式在阐述 CSS 现代特性](https://s.juejin.cn/ds/i8Tmg379/ "https://s.juejin.cn/ds/i8Tmg379/")。很庆幸的是，[我的小册所介绍的 CSS 最新特性](https://s.juejin.cn/ds/i8Tmg379/ "https://s.juejin.cn/ds/i8Tmg379/")基本上（达 `95%` 以上的特性）都在前面这些大会的主题上出现过。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6f5515a3ab54b988004ce47427752cf~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=4920&h=823&s=1795920&e=png&b=d7d3f4)

> 小册地址：[juejin.cn/book/722323…](https://juejin.cn/book/7223230325122400288 "https://juejin.cn/book/7223230325122400288")

可以说，零零总总有几十个 CSS 新特性得到了主流 Web 平台的支持，可以说 2023 年是 CSS 很重要的一年。这些进展使开发者们曾经认为在 Web 平台上不可能实现的功能成为现实。现在，主流的现代 Web 浏览器都支持 CSS 容器查询（[尺寸查询](https://juejin.cn/book/7223230325122400288/section/7259668032165773368 "https://juejin.cn/book/7223230325122400288/section/7259668032165773368")、[样式查询和状态查询](https://juejin.cn/book/7223230325122400288/section/7259316003635462201 "https://juejin.cn/book/7223230325122400288/section/7259316003635462201")等）、[子网格](https://juejin.cn/book/7161370789680250917/section/7160657953932967967 "https://juejin.cn/book/7161370789680250917/section/7160657953932967967")（`subgrid`）、[关系型选择器 :has()](https://juejin.cn/book/7223230325122400288/section/7224404685615005728 "https://juejin.cn/book/7223230325122400288/section/7224404685615005728") （也常被称为父选择器）、复杂的第 `n-*` 选择器，以及一系列新的[颜色空间](https://juejin.cn/book/7223230325122400288/section/7233227753909125178 "https://juejin.cn/book/7223230325122400288/section/7233227753909125178")和[函数](https://juejin.cn/book/7223230325122400288/section/7237288025221234744 "https://juejin.cn/book/7223230325122400288/section/7237288025221234744")，例如 `color()` 和 `color-mix()` 。Chrome 浏览器还支持仅用 [CSS 实现的滚动驱动动画](https://juejin.cn/book/7223230325122400288/section/7259272255786450981 "https://juejin.cn/book/7223230325122400288/section/7259272255786450981")，以及在 [Web 视图之间平滑过渡的视图过渡效果](https://juejin.cn/book/7223230325122400288/section/7259669097242329145 "https://juejin.cn/book/7223230325122400288/section/7259669097242329145")（如果你对 Web 动画感兴趣，可以移步阅读《[Web 动画之旅](https://s.juejin.cn/ds/i8T4KsX7/ "https://s.juejin.cn/ds/i8T4KsX7/")》）。最重要的是，有许多新的基础特性出现，例如 CSS[图层（@layer）](https://juejin.cn/book/7223230325122400288/section/7259563116462080037 "https://juejin.cn/book/7223230325122400288/section/7259563116462080037")、 [嵌套和作用域](https://juejin.cn/book/7223230325122400288/section/7259668111974989882 "https://juejin.cn/book/7223230325122400288/section/7259668111974989882")等，可以更好的提高 Web 开发者编写 CSS 的体验，甚至是改变 Web 开发者编写、维护和管理 CSS 的方式。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85d8d63a89ab4dafaddc0368c89ea15b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3252&h=1818&s=712500&e=jpg&b=fefefe)

很精彩的一年吧！看到这么多新特性，你是否有点迟疑了，CSS 有这么多新东西？甚至还有可能会令你感到困惑，这还是你认识的 CSS 吗？

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a90f2519f5404b52b836bf2e2894b41f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1305&h=683&s=205042&e=png&b=465166)

试问一下，自己认识多少，又用过多少。更重要的是这些新特性有没有真正的给你自己带来变化！

### 放弃你的迟疑

通常情况之下，人面对新鲜事物的表现因个体差异有所不同，有的人可能表现为好奇、兴奋和积极，而有的人可能表现为恐惧和抵触。同样的，Web 开发者面对 CSS 的新特性时，也可能会表现出多种反应和行为，这些反应和行为取决于他们的技术水平、项目需求、个人偏好以及对新技术的接受程度。比如，有的同学会对 CSS 新特性感到好奇、兴奋（比如我），对于这部分同学而言，他们会立即行动起来，去学习和实践这些新特性，甚至还有同学会积极参与社区建设，使这些新特性更完善。当然，也有一部分同学会表现出抗拒、保守，甚至是排斥。而且在中国社区，这部分人占多数，因为我经会听到身边小伙伴对新特性感迟疑。这些花里胡哨的东西，能用吗？兼容性好吗？等等！

在这里，我想说的是，随着时间的推移，新特性会不断进化和改进。正如当年在推广 CSS3 特性的时候，被问得最多的是“新特性能兼容 IE 吗”？

现如今，我同样会被问类似的问题：“这些新特性兼容性如何？” 同时，会有很多同学问我，如何以及在哪里可以获得这些新特性？其实，这是一件好事，意味着有更多的同学在放弃对新特性的迟疑、恐惧和排斥等。

这已经是一种改变。

事实上，当下的环境对于 Web 开发者而言是友好的，我们可以通过不同的方式获得新特性的版本发布信息、兼容性数据、互操作性以及 Web 平台的提供的信息。

### 版本发布

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2984f53e8a9d4e04b64c5c31270c2ac1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2852&h=1562&s=488740&e=png&b=fefdfd)

我们可以在 [Chrome](https://link.juejin.cn?target=https%3A%2F%2Fchromestatus.com%2Froadmap "https://chromestatus.com/roadmap")、[Safari](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.apple.com%2Fdocumentation%2Fsafari-release-notes "https://developer.apple.com/documentation/safari-release-notes") 和 [Firefox](https://link.juejin.cn?target=https%3A%2F%2Fwhattrainisitnow.com%2Fcalendar%2F "https://whattrainisitnow.com/calendar/") 等主流浏览器发版中获得各 Web 平台引入的新功能、错误修复等相关信息。

### 发布说明

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71511ad9a4d04765bd3502177934b74a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2740&h=1771&s=425669&e=png&b=ffffff)

Web 平台（[Chrome](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog "https://developer.chrome.com/blog")、[Safari](https://link.juejin.cn?target=https%3A%2F%2Fwebkit.org%2Fblog%2F "https://webkit.org/blog/") 和 [Firefox](https://link.juejin.cn?target=https%3A%2F%2Fwww.mozilla.org%2Fen-US%2Ffirefox%2Freleases%2F "https://www.mozilla.org/en-US/firefox/releases/")）每一次发布新版本都会提供相应的文档，其中包含有关新功能、改进和问题修复的详细信息。Web 开发者可以通过阅读发布说明来了解相关的信息。同样的，我们在相应的文档中也能获得 CSS 相关的信息，包括最新功能、功能改进和问题修复等信息。

### 兼容性数据

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bdef29b003849f79587574a09ade8c2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2320&h=1623&s=368358&e=png&b=ffffff)

Web 开发对 CSS 新特性止步的关键因素还是跨平台的兼容性。如果你想了解某个新特性的兼容性相关数据，可以通过 [Can I Use](https://link.juejin.cn?target=https%3A%2F%2Fcaniuse.com%2F "https://caniuse.com/")、[Browser Compat Data](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmdn%2Fbrowser-compat-data%2F "https://github.com/mdn/browser-compat-data/") 和 [Time to Stable](https://link.juejin.cn?target=https%3A%2F%2Ftime-to-stable.deno.dev%2F "https://time-to-stable.deno.dev/") 等平台上获取。

### 互操作性

Interop 是一项跨浏览器的努力，旨在提高 Web 的互操作性。互操作性指的是为改善 Web 技术在不同浏览器中的互操作性而进行的努力。互操作性是指确保在不同环境下（尤其是不同浏览器）使用相同的 Web 技术时，能够获得一致的行为和效果。简单地说，每种技术在所有浏览器中达到完全相同的状态。

Interop 是从 2021 年开始，现代浏览器都参与进来了，到目前已有 [Interop2021](https://link.juejin.cn?target=https%3A%2F%2Fwpt.fyi%2Finterop-2021 "https://wpt.fyi/interop-2021")、[Interop2022](https://link.juejin.cn?target=https%3A%2F%2Fwpt.fyi%2Finterop-2022 "https://wpt.fyi/interop-2022") 和 [Interop2023](https://link.juejin.cn?target=https%3A%2F%2Fwpt.fyi%2Finterop-2023 "https://wpt.fyi/interop-2023")：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79f02fcbb28b45ffb23845501e8038ec~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3051&h=1475&s=398349&e=png&b=fdfdfd)

从上图中，你就能发现 2023 年各 Web 平台对 CSS 付出的努力，这也是为什么 2023 年会有这么多 CSS 新特性得到主流 Web 浏览器的支持。

### 平台新闻

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/067427777f354c6dac2d083a410f6a20~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3360&h=1804&s=2797429&e=png&b=fcfbfb)

在 [web.dev 的博客中](https://link.juejin.cn?target=https%3A%2F%2Fweb.dev%2Fblog "https://web.dev/blog")，你将获得每个月关于 Web 平台的最新消息。这可能包括有关 Web 技术的更新、改进或变化的信息：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2f57964044f4e81b5f30a3b55f6b8ea~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3360&h=1804&s=636015&e=png&b=ffffff)

正如上图所示，它陈述了 2023 年 12 月份 Web 平台上的新功能。

### Baseline

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05f6c4ccd13a426aa4aa2d2b45b11655~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2904&h=1612&s=575198&e=png&b=fffefe)

在 2023 年 Google I/O 大会上推出了[基准](https://link.juejin.cn?target=https%3A%2F%2Fweb.dev%2Fbaseline%3Fhl%3Dzh-cn "https://web.dev/baseline?hl=zh-cn")，旨在明确说明网络平台功能是否可供使用。[Baseline 的原始定义](https://link.juejin.cn?target=https%3A%2F%2Fweb.dev%2Fblog%2Fbaseline-definition-update "https://web.dev/blog/baseline-definition-update")是，当所有主流浏览器（Chrome、Edge、Firefox 和 Safari）的现行版本和以往版本均支持这些功能时，这些功能已纳入 Baseline。

Baseline 即将登陆 [caniuse.com](https://link.juejin.cn?target=https%3A%2F%2Fcaniuse.com%2F "https://caniuse.com/")！这篇博文将介绍这项集成，并探索 2023 年 Baseline 中包含的一些功能。根据[基准的新定义](https://link.juejin.cn?target=https%3A%2F%2Fweb.dev%2Fblog%2Fbaseline-definition-update%3Fhl%3Dzh-cn "https://web.dev/blog/baseline-definition-update?hl=zh-cn")，功能生命周期分为两个阶段。第一个选项是*新推出*，然后在 30 个月后*全面推出*。如果某个功能在以下浏览器中可互操作，便会成为 Baseline 新提供的功能的一部分：

- Safari（macOS 和 iOS）

- Firefox（桌面版和 Android 版）

- Chrome（桌面版和 Android 版）

- Edge（桌面设备）

以后大家在 [caniuse.com](https://link.juejin.cn?target=https%3A%2F%2Fcaniuse.com%2F "https://caniuse.com/") 查看兼容数据时，你会看到一个标志，告知你相应功能是否已在 Baseline 中广泛提供。换句话说，如果你看到这个标志，你就可以大胆的使用，不用再担心跨浏览器的兼容性问题。这也就解决你对 CSS 新特性最大的疑惑——兼不兼容：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fdbd8e4b74c4df4906b1e681c22dcab~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3344&h=1676&s=633251&e=jpg&b=262118)

通过上面所述这些资源，你将获得 Web 平台的第一手信息，也你将获得 CSS 相关的最新信息。如果你对 CSS 感兴趣，或者说对 Web 平台相关技术感兴趣，那么请订阅它们，这样能确保你时刻获得跨平台的最新信息。有助于掌握更多的技能。

请留意接下来所介绍的 CSS 特性标题前的表情符，该表情符表示的是新 Baseline 徽章！具体详细性请猛击[此处](https://link.juejin.cn?target=https%3A%2F%2Fweb.dev%2Fblog%2Fbaseline-definition-update%3Fhl%3Dzh-cn "https://web.dev/blog/baseline-definition-update?hl=zh-cn")：

- 💯：新增主要浏览器的所有稳定版 （放心使用）

- 👁️：主要浏览器只支持部分功能（还得等一等）

### 架构基础

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea983ea88b7b474fb3107d7a06b78a1b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3236&h=1722&s=525334&e=jpg&b=ffffff)

让我们从 CSS 的核心功能开始。这些是对你如何编写和组织 CSS 具有基础性作用的特性，这些基础性特性解决了 CSS 中一直令 Web 开发者感到头痛的问题。可以说，这些特性将直接改变你编写、管理和维护 CSS 代码的姿势。

### 💯 级联层

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ecd7cf13cfc4e5ba196f04e2cc2dc28~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1400&h=826&s=1441440&e=png&b=e9e7e4)

级联层是 CSS 中最为重要的一个概念，很多 Web 开发者惧怕级联层，其中原因之一就是编写的 CSS 很容易造成冲突或者被覆盖。例如：

```CSS
CSSul[class] { /* (0,1,1) */
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.nav { /* (0,1,0) */
    margin: 0 40px; /* 被 ul[class] 中的 margin 覆盖 */
}
```

为了决定哪个声明（CSS 样式规则）会“获胜”（从而被应用到元素上），级联提供了相应的算法。了解级联算法有助于帮助我们理解浏览器是如何解决样式规则冲突，也就是浏览器决定哪个样式规则运用到元素上。但需要知道的是，级联算法在不同的规范中有不同的描述，在 Level 5 中提供了六个不同的级别。在不考虑级联层的情况下，其标准如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bd8daa7acbc40e1b9dbe9d4555162d0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=399&s=410186&e=png&b=131416)

如上面示例，我们根据该标准需要提高 `.nav` 权重：

```CSS
CSSul[class] { /* (0,1,1) */
    margin: 0;
    padding: 0;
    list-style-type: none;
}

ul.nav { /* (0,1,1) */
    margin: 0 40px;
}
```

熟悉 CSS 的同学，应该知道这些标准的优先级从高到低排列，并且一个接一个地检查，直到确定一个获取的声明。如果在较高的标准上不能确定哪一个属性声明会获胜，级联将转到下一个标准。比如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73071efeb04144e58d62d5df9e47ff52~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=836&s=328736&e=png&a=1&b=c9fced)

为了解决诸如此类的问题（级联与权重），CSS 新增了一个级联层的规则，即 `@layer` 。

简单地说： **级联层提供了一种结构化的方式来组织和平衡单一来源中的 CSS 规则，最终决定谁获胜**！。

由于 CSS 的级联层在 CSS 级联中有着独特的地位，使用它有一些好处，使开发者对级联有更多的控制。CSS 的级联层一般位于 “Style 属性”（Style Attribute）和 CSS 选择器权重（Specificity）之间，即：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e64ef3fd906423dae1c96e3f80bf98b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=354&s=382808&e=png&b=131416)

有了 `@layer` 之后，我们可以像下面这样改造前面所展示的代码：

```CSS
CSS@layer reset, components;

@layer reset {
    ul[class] {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
}

@layer components {
    .nav {
        margin: 0 40px;
    }
}
```

我使用下图来阐述有级联层 `@layer` 前后，CSS 级联的差异：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5158e765f0b449ca8903edda2b9d13df~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=835&s=630443&e=png&b=050505)

带来的直接变化是权重计算规则变了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85a728069e784afeaa58fc7d06bd11a4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3458&h=1942&s=1378442&e=png&b=000000)

有了 CSS 级联层 `@layer` 特性之后，你可以抛弃以前的一些 CSS 方法论（例如 ITCSS），因为 `@layer` 能更好的帮助你管理 CSS 的级联。

简单地说，级联层 `@layer` 是 CSS 的一个新特性，它影响着样式规则的应用和优先级。以下是级联层的一些关键细节：

- 添加到级联层： 可以通过 `@layer` 规则将样式添加到指定的级联层中。这使得开发者能够更有序地组织样式。

- 匿名级联层： 如果未使用 `@layer` 规则，样式将被放入默认的匿名级联层。这样可以确保未指定级联层的样式不会影响到指定级联层的样式。

- 预定义级联层顺序： 级联层可以预定义一个顺序，确保在样式规则中未明确指定级联层的情况下，样式按照默认的预定义级联层顺序应用。

- 加载外部 CSS 文件到级联层： 可以通过 `@layer` 规则加载外部 CSS 文件到指定的级联层中，这样可以更灵活地组织和加载样式。

- 无级联层样式： 可以使用 `@layer unlayered` 规则将样式添加到无级联层的样式层，这样的样式在默认情况下不会被任何级联层继承。

- 级联层嵌套： 可以将一个级联层嵌套在另一个级联层中，以创建更复杂的样式层次结构。

- 回滚级联层： 可以通过 `@layer` 规则回滚到之前的级联层状态，以便撤销某些样式的更改。

级联层为开发者提供了更精细的样式管理和组织的能力，使得在大型项目中更容易维护和扩展样式。

> 有关于 CSS 级联层 `@layer` 特性更详细的介绍，请移步阅读《[现代 CSS](https://s.juejin.cn/ds/i8wsdWCn/ "https://s.juejin.cn/ds/i8wsdWCn/")》中的《[CSS 分层：@layer](https://juejin.cn/book/7223230325122400288/section/7259563116462080037 "https://juejin.cn/book/7223230325122400288/section/7259563116462080037") 》课程！

### 💯 嵌套

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/154c46e66b2144b597a0ce8580456afd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1823&h=900&s=1079901&e=png&b=fcf9f8)

通常情况之下，Web 开发者如果不使用 CSS 处理器，例如 Sass（或 SCSS）、LESS 和 Stylus 等，每个 CSS 选择器都需要显式声明，彼此之间分开。例如：

```CSS
CSStable.colortable td {
    text-align: center;
}

table.colortable td .c {
    text-transform: uppercase;
}

table.colortable td:first-child,
table.colortable td:first-child + td {
    border: 1px solid black;
}

table.colortable th {
    text-align: center;
    background: black;
    color: white;
}
```

这将使得样式代码重复、冗余和分散。正因此，很多 Web 开发者会基于 CSS 处理器特性上，使用嵌套的方式来编写 CSS 的选择器。例如，上面的代码用 SCSS 的嵌套语法编写的话，会像下面这样：

```CSS
CSStable.colortable {
    td {
        text-align: center;
        .c {
            text-transform: uppercase;
        }
        &:first-child {
            border: 1px solid black;
            + td {
                border: 1px solid black;
            }
        }
    }
    th {
        text-align: center;
        background: black;
        color: white;
    }
}
```

现在，CSS 也具备像 SCSS 相似的嵌套特性，可以将相关样式规则分组到选择器中，从而继续创建选择器。

```CSS
CSStable.colortable {
    & td {
        text-align: center;
        .c {
            text-transform: uppercase;
        }
        &:first-child,
        &:first-child + td {
            border: 1px solid black;
        }
    }
    & th {
        text-align: center;
        background: black;
        color: white;
    }
}
```

嵌套可以减少样式表的大小、减少重复选择器的开销，并集中组件样式。该语法最初发布时存在一个限制：“**CSS 的任何选择器都可以嵌套到另一个选择器中，但它必须以** **`&`** **、** **`.`** **（类名）、** **`#`** **（ID）、** **`@`** **（** **`@`** **规则）、** **`:`** **、** **`::`** **、** **`*`** **、** **`+`** **、** **`~`** **、** **`>`** **或** **`[`** **符号开头。** ” 这些符号是一些识别符号，它会向解析器发出信号，表示它正在使用嵌套样式。后来，通过嵌套宽松的语法更新，该限制已被解决，例如不需要在元素选择器之前添加 `&` 识别符：

```CSS
CSStable.colortable {
    td {
        text-align: center;
        .c {
            text-transform: uppercase;
        }
        &:first-child,
        &:first-child + td {
            border: 1px solid black;
        }
    }
    th {
        text-align: center;
        background: black;
        color: white;
    }
}
```

同样的，它也可以和 `@` 规则相互嵌套，例如：

```CSS
CSSh1 {
    font-size: 2em;

    @media (width >= 40em) {
        & {
            font-size: 4em;
        }
    }
}

/* 宽松语法 */

h1 {
    font-size: 2em;

    @media (width >= 40em) {
        font-size: 4em;
    }
}
```

> 有关于 CSS 嵌套特性更详细的介绍，请移步阅读《[现代 CSS](https://s.juejin.cn/ds/i8wsdWCn/ "https://s.juejin.cn/ds/i8wsdWCn/")》中的《[CSS 的嵌套和作用域： & 和 @scope](https://juejin.cn/book/7223230325122400288/section/7259668111974989882 "https://juejin.cn/book/7223230325122400288/section/7259668111974989882") 》课程！

### 👁️ 作用域

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c288c07767524fe78231774e3edd6ac9~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1200&h=686&s=548897&e=png&b=c6d8e7)

众所周知，CSS 语言和其他程序语言不同，它是没有作用域的概念。通常情况之下，开发者需要通过 DOM 结构和选择器来达到类似作用域的功能。这使得 Web 开发者在编写选择器时，可能会发现自己在两个世界之间交替。一方面，Web 开发者需要明确具体选择哪些元素；另一方面，Web 开发者希望选择器保持晚于替换，而不是与 DOM 结构紧密耦合。这也是 [tailwindcss](https://link.juejin.cn?target=https%3A%2F%2Ftailwindcss.com%2F "https://tailwindcss.com/") 备受欢迎的原因之一。

为此，W3C 的 CSS 工作小组为 CSS 新增了作用域 `@scope` 特性，该特性首先得到了 Chrome （118 版本）的支持。`@scope` 是一个 `@` 规则，它主要有两个卖点：**基于接近度的样式**和**为选择器设置下限**。换句话说，作用域给 CSS 带来了两个关键的东西：

- 一组样式可以根据在 DOM 中的接近程度覆盖另一组样式

- 更多地控制选择器针对哪些元素（即更好地操作 CSS 的级联）

这意味着，`@scope` 规则可以让你将选择器的范围限定为文档的特定子树。借助作用域样式，你可以非常具体地选择元素，而无需编写过于具体的选择器或将它们与 DOM 结构紧密耦合。

```CSS
CSS/* 根作用域 */

@scope (.card) {
    img {
        border-color: green;
    }
}
```

限定了作用域的样式规则 `img { … }` 实际上只能选择在所匹配 `.card` 元素[范围内](https://link.juejin.cn?target=https%3A%2F%2Fdrafts.csswg.org%2Fcss-cascade-6%2F%23in-scope "https://drafts.csswg.org/css-cascade-6/#in-scope")的 `<img>` 元素。如需阻止卡片内容区域 (`.card__content`) 内的 `<img>` 元素处于选中状态，你可以使用更具体的 `img` 选择器。另一种方法是利用 `@scope` at 规则这一事实，也接受用于确定下限的*范围限制*。

```CSS
CSS@scope (.card) to (.card__content) {
    img {
        border-color: green;
    }
}
```

此限定了范围的样式规则仅定位到祖先树中位于 `.card` 和 `.card__content` 元素之间的 `<img>` 元素。这种包含上下边界的范围通常称为“圆环图范围”。

下面这个案例中，由于应用了范围限制，轮播图组件中的 `<img>` 元素不匹配：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3b140e479f548d28130507ecc212dc8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1764&h=2196&s=511858&e=png&b=ffffff)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Fpen%2FYzBLdjG "https://codepen.io/web-dot-dev/pen/YzBLdjG")

在 [CSS 级联](https://juejin.cn/book/7223230325122400288/section/7259563116462080037 "https://juejin.cn/book/7223230325122400288/section/7259563116462080037")内，`@scope` 还添加了一个新条件：**确定邻近区域**。该步骤在特异性之后，但出现在呈现顺序之前。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f02ef869493f4a8d91ece357a805a3d9~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3196&h=1796&s=490139&e=jpg&b=ffffff)

按照[规范](https://link.juejin.cn?target=https%3A%2F%2Fdrafts.csswg.org%2Fcss-cascade-6%2F%23cascade-proximity "https://drafts.csswg.org/css-cascade-6/#cascade-proximity")：“比较出现在具有不同范围根的样式规则中的声明时，范围根和限定范围的样式规则主题之间具有最少的代数或同级元素跃点的声明胜出”。

> 有关于 CSS 嵌套特性更详细的介绍，请移步阅读《[现代 CSS](https://s.juejin.cn/ds/i8wsdWCn/ "https://s.juejin.cn/ds/i8wsdWCn/")》中的《[CSS 的嵌套和作用域： & 和 @scope](https://juejin.cn/book/7223230325122400288/section/7259668111974989882 "https://juejin.cn/book/7223230325122400288/section/7259668111974989882") 》课程，或者请参阅《[如何使用 @scope 限制选择器的覆盖面](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Farticles%2Fat-scope%2F%3Fhl%3Dzh-cn "https://developer.chrome.com/articles/at-scope/?hl=zh-cn")》和 @Miriam Suzanne 的《[CSS @scope](https://link.juejin.cn?target=https%3A%2F%2F12daysofweb.dev%2F2023%2Fcss-scope%2F "https://12daysofweb.dev/2023/css-scope/")》。

### 💯 选择器 :is() 和 :where()

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7ada281316442c594f700d9da14d5bc~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1024&h=1024&s=848416&e=png&b=fefaef)

`:is()` 和 `:where()` 是两个伪类选择器，可以用于选择多个简单选择器的集合，并将它们作为一个整体来进行选择，以简化和优化选择器的编写。

- `:is()` 函数接受一个包含多个简单选择器的列表，它返回一个与其中任何一个简单选择器匹配的元素，类似于数组中的 `||`（逻辑或）。

- `:where()` 函数也接受一个包含多个简单选择器的列表，将选择器中的元素组合在一起，使其更易读、易用。

`:is()` 和 `:where()` 选择器属于宽容型选择器，使用 `:is()` 或 `:where()` 时，如果一个选择器无法解析，整个选择器列表不会被视为无效，而是会忽略不正确或不支持的选择器，并使用其他的选择器。另外，它们的使用方式基本相似，唯一的差别就是 \*\*\*\***`:where()`** **选择器权重总是为** **`0`** **，而** **`:is()`** **选择器的权重计数等同于选择器列表中最高权重的值**。

正因为 `:where()` 和 `:is()` 选择器可以用来改变选择器权重，因此，可以使用它们来做为级联层的一种简单替代方案。比如，你正在创建一个框架或者一个库，那么可以使用 `:where()` 伪类函数，将框架或库中的选择器权重降低至 `0` 。这样做的好处是，使用你的框架或库的 Web 开发者，无需处理选择器权重的问题，它可以很轻易的覆盖你框架或库中的样式规则。

简单地说，`:is()` 和 `:where()` 可以帮助我们更好地管理 CSS 选择器权重。最为有效的使用方式是：

- 在构建 CSS 框架或库的时候，使用 `:where()` 来管理所有选择器的权重，将选择器权重降至为 `0`

- 在使用框或库的时候，可以使用 `:is()` 来提高选择器权重，在不改变 HTML 代码的情况之下，可以将选择器权重提高到最高级别

考虑到 `:is()` 和 `:where()` 之间的差异，使用哪个选择器，最终还是取决于你的具体需求。

> 有关于 CSS 嵌套特性更详细的介绍，请移步阅读《[现代 CSS](https://s.juejin.cn/ds/i8wsdWCn/ "https://s.juejin.cn/ds/i8wsdWCn/")》中的《[CSS 选择器：:where() vs. :is()](https://juejin.cn/book/7223230325122400288/section/7226251495069450278 "https://juejin.cn/book/7223230325122400288/section/7226251495069450278") 》课程！

### 💯 选择器 :has()

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1eccbe14ad84bdba1ac5aad7811cfbd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=720&s=818668&e=png&b=16549a)

> CSS 的 `:has()` 选择器被称为 CSS 的父选择器！它和 CSS 的容器查询特性一样，一直以来是 Web 开发者最想要的 CSS 功能。

就我个人而言，CSS 的 `:has()` 是最接近 `if ... else ...` 功能的。它与 HTML 的 DOM 关系紧密相连，这也是它被称之为是关系型选择器的主要原因。比如下面这个示例，你正在寻找后代元素的存在，但应用的样式将是父元素。

```html
<!-- Case ① -->
<figure>
  <figcaption>CSS Pseudo-Class Specification</figcaption>
  <img src="https://picsum.photos/1240/?random=11" alt="" />
</figure>

<!-- Case ② -->
<figure>
  <div class="media">
    <img src="https://picsum.photos/1240/?random=12" alt="" />
  </div>
  <figcaption>CSS Pseudo-Class Specification</figcaption>
</figure>

<!-- Case ③ -->
<figure>
  <img src="https://picsum.photos/1240/?random=13" alt="" />
  <figcaption>CSS Pseudo-Class Specification</figcaption>
</figure>
```

这三个 Case 对应的 DOM 树如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/043f48d987e241549e9025bf68f3c9fd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2260&h=1199&s=756271&e=jpg&b=162b42)

添加下面这样一段 CSS 代码：

```CSS
CSS/* 匹配包含<figcaption>后代元素的<figure>元素 */
figure:has(figcaption) {
    background-color: #3f51b5;
}
```

`figure:has(figcaption)` 将能匹配所有 `figure` ，因为 `figure` 都包含了 `figcaption` 元素：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4298468056643dc9b2338481a1991a9~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2260&h=1863&s=1285726&e=jpg&b=162b42)

> Demo 地址：[codepen.io/airen/full/…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fairen%2Ffull%2FjOeMapz "https://codepen.io/airen/full/jOeMapz")

上面你所看到的只是 `:has()` 最简单地使用，它可以帮助你做更为复杂的事情，甚至是一些带交互行为的操作。比如下面这个示例，使用 `:has()` 选择器和状态选择器，可以实现一个纯 CSS 制作的评分组件（StarRating）：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9ac5d0b26dc420ab3e4f74dfe0786b6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1078&h=540&s=297430&e=gif&f=100&b=4c496b)

> Demo 地址：[codepen.io/airen/full/…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fairen%2Ffull%2FpoxeoeE "https://codepen.io/airen/full/poxeoeE")

也正因如此，我在《[防御式 CSS 精讲](https://juejin.cn/book/7199571709102391328?utm_source=profile_book "https://juejin.cn/book/7199571709102391328?utm_source=profile_book")》中，将 `:has() 纳入到条件 CSS 的范畴`，因为它在很多时候，能根据相关的动态条件，允许你使用不同的 CSS。

`:has()` 选择器是强大的，它除了能让我们不使用 JavaScript 脚本实现一些具有挑战性的 GUI 之外（比如上面这个示例），它还有很多其他的功能，比如 [@wesbos](https://link.juejin.cn?target=https%3A%2F%2Ftwitter.com%2Fwesbos "https://twitter.com/wesbos") 前段时间在 [Twitter 分享一张图](https://link.juejin.cn?target=https%3A%2F%2Ftwitter.com%2Fwesbos%2Fstatus%2F1737148340322652632 "https://twitter.com/wesbos/status/1737148340322652632")，介绍了 `:has()` 选择器十个小技巧：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fffb8c8ff3d4450bbb3748686068d13~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3324&h=2568&s=3092743&e=png&b=ec28d2)

> 图片来源：[twitter.com/wesbos/stat…](https://link.juejin.cn?target=https%3A%2F%2Ftwitter.com%2Fwesbos%2Fstatus%2F1737148340322652632 "https://twitter.com/wesbos/status/1737148340322652632")

有关于 `:has()` 选择器更详细的介绍，你还可以参阅：

- [CSS 父选择器：:has()](https://juejin.cn/book/7223230325122400288/section/7224404685615005728 "https://juejin.cn/book/7223230325122400288/section/7224404685615005728")

- [CSS 选择器：:has() 能解决哪些问题](https://juejin.cn/book/7223230325122400288/section/7224404685799555111 "https://juejin.cn/book/7223230325122400288/section/7224404685799555111")

- [CSS 选择器：:has() 和 :not() 的组合](https://juejin.cn/book/7223230325122400288/section/7226251495276609569 "https://juejin.cn/book/7223230325122400288/section/7226251495276609569")

### 💯 复杂的第 n-. 选择

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ef2a472fb594a4bb0a6db19770af18d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=720&s=401991&e=png&b=d637d1)

[CSS 选择器级别 4](https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fselectors-4%2F "https://www.w3.org/TR/selectors-4/") 中的新功能是可以选择将选择器列表传递到 `:nth-child()` 和 `:nth-last-child()`。

```CSS
CSS:nth-child(An+B [of S]?)
:nth-last-child(An+B [of S]?)
```

指定 `of S` 后，`An+B` 逻辑仅应用于与给定选择器列表 `S` 匹配的元素。这实际上意味着，你可以在 `An+B` 执行操作之前预先过滤子项。

我们借助 `:nth-child()` 伪类选择器，可以按索引选择 DOM 中的元素。你可以使用 `An+B 微语法`精确控制要选择哪些元素。

默认情况下，`:nth-*()` 伪代码会考虑所有子元素。从 Chrome 111 开始，你可以选择将选择器列表传递到 `:nth-child()` 和 `:nth-last-child()`。这样一来，就可以在 `An+B` 执行操作之前预先过滤子项列表。

在下面的演示中，通过使用 `of .small` 对小玩偶进行预过滤，`3n+1` 逻辑仅应用于它们。使用下拉菜单可动态更改所使用的选择器。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c376d556270147449a94141be1ba4e22~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1456&h=822&s=9440187&e=gif&f=302&b=fcfcfc)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FYzBLdLW "https://codepen.io/web-dot-dev/full/YzBLdLW")

更有意思的是，我们可以使用 `:has()` 、`:not()` 、`~` 和 `+` 组合在一起模拟 `:nth-child(An+B [of S]?)` 和 `:nth-last-child(An+B [of S]?)` 选择器，甚至是 CSS 中不存在的选择器：

- **`:first-in-ElementGroups-of-class(.😍)`** \*\*\*\*，即选中元素组（`ElementGroups`）中第一个元素（类名为 `.`**`😍`**），对应的选择器为 `.😍:not(:has(+ .😍))` 。

- **`:last-in-ElementGroups-of-class(.😍)`** \*\*\*\*，即选中元素组（`ElementGroups`）中最后一个元素（类名为 `.`**`😍`**），对应的选择器为 `.😍:not(:has(+ .😍))` 。

- **`:single-in-ElementGroups-of-class(.😍)`** ，即选中元素组（`ElementGroups`）中仅有的一个元素（类名为 `.`**`😍`**），对应的选择器为 `.😍:not(.😍 + .😍):not(:has(+ .😍))` 。

- **`:nth-in-ElementGroups-of-class(.😍)`** \*\*\*\*，即选中元素组（`ElementGroups`）中的第 `n` 个元素（类名为 `.`**`😍`**）。比如 `.😍:not(.😍 + .😍) + .😍` 选择元素组中第 `2` 个元素（类名为 `.`**`😍`**）；`.😍:not(.😍 + .😍) + .😍 + .😍` 选择元素组中第 `3` 个元素（类名为 `.`**`😍`**）。

- **`:nth-last-in-island-of-class(.special)`** ，即选中元素组（`ElementGroups`）中的倒数第 `n` 个元素（类名为 `.`**`😍`**）。比如 `.😍:not(:has(+ .😍 + .😍)):has(+ .😍)` 选中元素组中倒数第 `2` 个元素（类名为 `.`**`😍`**），`.😍:not(:has(+ .😍 + .😍 + .😍)):has(+ .😍 + .😍)` 选中元素组中倒数第 `3` 个元素（类名为 `.`**`😍`**）。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bd1ae41d78f4071a8e6727be24016ab~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=960&h=676&s=9359583&e=gif&f=447&b=494867)

> Demo 地址：[codepen.io/airen/full/…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fairen%2Ffull%2FrNqmGrN "https://codepen.io/airen/full/rNqmGrN")

### 💯 CSS 三角函数

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9385810036e4837889b589181adc96c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1424&h=945&s=613597&e=png&a=1&b=f8a0ef)

在 W3C 规范的 [CSS 值和单位模块 Level 4](https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-values-4%2F "https://www.w3.org/TR/css-values-4/") （CSS Values and Units Module Level 4）为 Web 开发者提供了[数学表达式](https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-values-4%2F%23math "https://www.w3.org/TR/css-values-4/#math")相关的能力。除了我们所熟悉的 `calc()` 函数和 [CSS 比较函数](https://juejin.cn/book/7223230325122400288/section/7241401565653762108 "https://juejin.cn/book/7223230325122400288/section/7241401565653762108")（比如 `min()` 、`max()` 和 `clamp()`）之外，还有 [CSS 的三角函数](https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-values-4%2F%23trig-funcs "https://www.w3.org/TR/css-values-4/#trig-funcs")，比如 `sin()` 、`cos()` 、`tan()` 、 `asin()` 、 `acos()` 、 `atan()` 和 `atan2()` 等。

现在，使用 CSS 的三角函数，你可以更轻松地在以一点为中心的圆圈上布置元素：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8805fd96b8f47b19e5997bc4440c9c2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1376&h=602&s=3062041&e=gif&f=117&b=fefefe)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FpoGVqLO "https://codepen.io/web-dot-dev/full/poGVqLO")

[如果你是一名动画爱好者或者说平时经常有开发动画的需求](https://s.juejin.cn/ds/i8K8poEy/ "https://s.juejin.cn/ds/i8K8poEy/")，那么 CSS 三角函数将是你最好的助手。动画开发过程中，你可以这样来使用 CSS 的三角函数：

- `sin()` 函数可用于改变元素尺寸或控制动画时长；

- `cos()` 函数可用于保持旋转元素的尺寸不变；

- `tan()` 函数可用于绘制平行四边形；

- `asin()` 、`acos()` 、`atan()` 和 `atan2()` 函数可用于旋转元素。

除此之外，三角函数在动画中有多种应用和作用，以下是一些常见的例子：

- **平滑运动和缓动效果**： 通过使用三角函数，特别是正弦（`sin()`）和余弦（`cos()`）函数，可以实现元素的平滑运动和缓动效果。这有助于使动画看起来更自然，避免了突然的加速和减速。

- **周期性动画**： 正弦（`sin()`）和余弦（`cos()`）函数是周期性的，因此它们经常用于创建具有循环或重复动作的动画效果。例如，通过调整正弦（`sin()`）函数的参数，可以创建水波纹或震荡效果。

- **旋转动画**： 三角函数的旋转性质使其成为创建对象旋转动画的理想选择。通过在正弦（`sin()`）和余弦（`cos()`）函数中使用时间变量，可以实现平滑的旋转效果。

- **路径动画**： 三角函数的周期性和平滑性使其适用于定义对象沿着复杂路径运动的动画。通过适当调整三角函数的参数，可以创建各种路径动画。

- **振荡效果**： 通过使用正弦（`sin()`）函数，可以模拟振荡效果，例如摆动或弹簧的弹性动画。

- **相位和频率调整**： 调整三角函数的相位和频率可以改变动画的速度和周期，从而提供更多的创造性控制。

这些只是三角函数在动画中的一些常见应用，创意的设计师和开发者可以发挥出更多的潜力，创造出丰富多彩且引人入胜的动画效果。例如下面这个摩天轮旋转动效，就应用了 CSS 的三角函数：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f70eb29d29b346bb8bd71809dbd90f6d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1038&h=642&s=7488355&e=gif&f=114&b=330631)

> Demo 地址：[codepen.io/airen/full/…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fairen%2Ffull%2FJjxzWgW "https://codepen.io/airen/full/JjxzWgW")

你可以从《[CSS 的三角函数](https://juejin.cn/book/7223230325122400288/section/7242216512176521277 "https://juejin.cn/book/7223230325122400288/section/7242216512176521277")》和 《[数学的魔法：探索数学在动画中的应用](https://juejin.cn/book/7288940354408022074/section/7307213432616648745 "https://juejin.cn/book/7288940354408022074/section/7307213432616648745")》两节课中获得 CSS 三角函数更多的信息！

### 💯 子网格 subgrid

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f971cfceec64bc79aab8df0e0565e33~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1541&h=1201&s=1064848&e=png&b=ffffff)

借助 CSS 子网格 `subgrid` ，你可以创建更复杂的网格布局，并在子布局之间实现更好的对齐。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e72c605bbbf54c0a9f658e6190530e5c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=570&s=391369&e=png&b=faf8f8)

它允许另一个网格内的网格将外部网格的行和列作为自己的行和列，方法是使用 `subgrid` 作为网格行或列的值。

简单地说，在一个网格项目上显式设置 `display` 的值为 `grid` 或 `inline-grid` ，或者继承其父网格容器的 `display` 值，就意味着该网格项目是一个独立的网格格式化上下文。同时，子网格的 `grid-template-columns` 和（或）`grid-template-rows` 显式设置值为 `subgrid` 时，就意味着子网格的内容参与其父网格的格式化上下文，而不会建立一个新的网格格式化上下文。

网格布局中的子网格是非常有用的，它将为我们提供更多的方法来实现 CSS 网格之前不可能实现的功能。`subgrid` 非常适合用来根据彼此的动态内容对齐同级，借助 `subgrid`，可以调整布局以适应内容。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b5690f1ba934f8184178a01cbcddfad~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1115&h=2292&s=1025101&e=png&b=555674)

> 如果你对子网格布局特性感兴趣，可以移步阅读《[现代 Web 布局](https://s.juejin.cn/ds/i8KNNR7j/ "https://s.juejin.cn/ds/i8KNNR7j/")》中的《[网格布局中的子网格和嵌套网格](https://juejin.cn/book/7161370789680250917/section/7160657953932967967 "https://juejin.cn/book/7161370789680250917/section/7160657953932967967")》！

### 排版

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c91d7728b40447dc8f63d489d2d462b7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3084&h=1772&s=1244295&e=png&b=ffffff)

一直以来，Web 上的排版都是非常复杂的，所涉及到的知识也很多。在刚刚已过去的 2023 年，Web 排版取得了一些重要的更新。例如，你可以使用 `text-wrap 属性实现排版布局调整`，你可以使用 `initial-letter 实现首字下沉的效果`，你甚至还可以在 Web 上使用[可变字体](https://juejin.cn/book/7223230325122400288/section/7246384512219742266 "https://juejin.cn/book/7223230325122400288/section/7246384512219742266")和[彩色字体](https://juejin.cn/book/7223230325122400288/section/7247046282135470139 "https://juejin.cn/book/7223230325122400288/section/7247046282135470139")，为用户提供更好的阅读体验。

### 👁️ 首字下沉

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58967303a24547588c8c8024379ef8be~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=622&s=486630&e=png&a=1&b=800000)

首字下沉最早出现在印刷媒体上，例如报纸、杂志、小说、教科书等。它可以为章节或段落的第一个字母增添一些时尚感。这些下沉字母能够吸引读者的注意力，并且还可以使用非常华丽的字体，因为它只会对一串文字中的一个字母进行处理，不会影响到文本的可读性。

[CSS 内联布局模块 Level 3](https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-inline-3%2F "https://www.w3.org/TR/css-inline-3/")（CSS Inline Layout Module Level 3）提供的 `initial-letter 属性`允许你更精细化的控制首字母下沉的样式。它可以指定下沉首字母、凹陷首字母和凸起首字母的大小和下沉行数。

```CSS
CSSp::first-letter {
    initial-letter: 3 2;
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbb5501f5f5f4510991d00649c942f23~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1790&h=1146&s=176533&e=png&b=ffffff)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FXWOKGaL "https://codepen.io/web-dot-dev/full/XWOKGaL")

`initial-letter` 是一个小而美的 CSS 特性，可用于为首字母的放置位置设置样式。

> 有关于 CSS 首字母下沉 `initial-letter` 特性更详细的介绍，请移步阅读《[现代 CSS](https://s.juejin.cn/ds/i8wsdWCn/ "https://s.juejin.cn/ds/i8wsdWCn/")》中的《[首字母下沉：initial-letter](https://juejin.cn/book/7223230325122400288/section/7246991031319658557 "https://juejin.cn/book/7223230325122400288/section/7246991031319658557")》课程！

### 👁️ 均衡和美观

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa8f97f0a08c4578a5d0fe9fa0ab5c39~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2500&h=1200&s=240202&e=png&b=efebf7)

作为开发者，你不知道标题或段落的最终大小、字体大小，甚至是语言。有效且美观处理文本换行所需的所有变量均在浏览器中提供。由于浏览器了解所有因素（例如字体大小、语言和分配区域），因此非常适合用于处理高级、优质文本布局。

这就需要我们采用两种新的文本换行技术，一种称为 `balance`，另一种称为 `pretty`。`balance` 值旨在创建一个和谐的文本块，而 `pretty` 旨在防止孤立字符并确保健康的断字。传统上，这两项任务都是手动完成的，将这项工作交给浏览器，让它支持任何翻译的语言，真是太棒了。

`text-wrap: balance;` 会对行数有一个限制，但这取决于文本宽度下有多少行。使用 `text-wrap: balance;` 时，由于浏览器对文本包装的行数有限制，因此应该仅用于标题和副标题。将其应用于大段文本将没有效果，并且会带来性能成本，因为浏览器尽管不会应用任何内容，但仍在尝试计算最佳平衡。

文本排版时，你需要在平衡和美观做抉择。对于标题和副标题，使用 `text-wrap: balance;`。对于文本段落，使用 `text-wrap: pretty;` 以消除最后一行的孤立单词。这些特性是渐进增强的好候选项。如果某人不在支持的浏览器中，它不会对体验产生负面影响，但对于在支持的浏览器中的页面视觉平衡会有所提升。

> 有关于 CSS `text-wrap` 特性更详细的介绍，请移步阅读《[现代 CSS](https://s.juejin.cn/ds/i8wsdWCn/ "https://s.juejin.cn/ds/i8wsdWCn/")》中的《[经典排版技术：使用 text-wrap: balance 实现文本平衡换行](https://juejin.cn/book/7223230325122400288/section/7249196160626196515 "https://juejin.cn/book/7223230325122400288/section/7249196160626196515")》课程，在这节课中还涵盖了 CSS 中各种断词和换行的排版技术！

注意，这里仅向大家介绍了 `initial-letter` 和 `text-wrap` 两个排版特性，其实在 2023 年还有其他一些排版方面的特性得到 Web 平台的支持。例如：

- [F-mods：可用于 @font-face 的新特性](https://juejin.cn/book/7223230325122400288/section/7243643072888700985 "https://juejin.cn/book/7223230325122400288/section/7243643072888700985")

- [CSS 的 text-box-trim 和 text-box-edge 给排版带来的变化](https://juejin.cn/book/7223230325122400288/section/7244118525081485351 "https://juejin.cn/book/7223230325122400288/section/7244118525081485351")

- [Web 上的可变字体](https://juejin.cn/book/7223230325122400288/section/7246384512219742266 "https://juejin.cn/book/7223230325122400288/section/7246384512219742266")

- [Web 上的彩色字体](https://juejin.cn/book/7223230325122400288/section/7247046282135470139 "https://juejin.cn/book/7223230325122400288/section/7247046282135470139")

### 颜色

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9763fbaa9454c0f9fc66895f51d70f6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3188&h=1760&s=440294&e=jpg&b=ffffff)

2023 年是 Web 平台的色彩之年。通过新的颜色空间和函数，可以实现动态颜色主题，你可以创建丰富、鲜艳的主题，而且还可以进行定制！

### 💯 高清色彩空间

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d85a25edfbb4e45b3efba49fa98907c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=770&h=685&s=220525&e=png&b=f8fafc)

> URL：[www.saji8k.com/displays/co…](https://link.juejin.cn?target=https%3A%2F%2Fwww.saji8k.com%2Fdisplays%2Fcolor-space%2F "https://www.saji8k.com/displays/color-space/")

颜色与 Web 的问题在于，**CSS 并不支持高清晰度的准备工作**。CSS 在 1996 年引入 Web 时，大多数计算机显示器都非常糟糕，大多不是高清的。无论是使用 RGB 、HSL 或 HEX （十六进制）定义的颜色，都是在 sRGB 色域内，仅适用于当时的显示器。

现在，大多数新设备都具备广色域显示能力，比如使用 Display P3 色域，甚至还有像 Rec.2020 更大的色域。在 2023 年，我们拥有了新的颜色、更多的颜色、新的颜色空间、颜色函数和新的功能。

CSS 和颜色现在可以做到：

- 检查用户屏幕硬件是否支持广色域 HDR 颜色

- 检查用户的浏览器是否理解像 OKLCH 或 Display P3 这样的颜色语法

- 在 OKLAB、OKLCH、HWB、Display P3、Rec.2020、XYZ 等颜色空间中指定 HDR 颜色

- 创建带有 HDR 颜色的渐变

- 在替代颜色空间中插值渐变

- 使用 `color-mix()` 混合颜色

- 使用相对颜色语法创建颜色变体

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ca8f2b1ba8441feadc20dfa9978fc0b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1276&h=714&s=5431527&e=gif&f=68&b=cfd4da)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FyLZzmGM "https://codepen.io/web-dot-dev/full/yLZzmGM")

CSS 颜色将会在哪个颜色空间中解析颜色，主要分为 `sRGB` 和非 `sRGB` 。其中在 `sRGB` 颜色空间中解析的颜色有：

- 十六进制颜色

- `rgb()` 和 `rgba()`

- `hsl()` 和 `hsla()`

- `hwb()`

- 命名颜色，例如 `red` ，`black` 等

在非 `sRGB` 颜色空间中解析的颜色有：

- Lab 和 LCH：`lab()` 和 `lch()`

- OKLAB 和 OKLCH ：`oklab()` 和 `oklch()`

- 任何颜色空间：`color()`

有关于这方面更详细的介绍，可以参阅：

- [现代 CSS 中的颜色格式：RGB、HSL、HWB、LAB 和 LCH](https://juejin.cn/book/7223230325122400288/section/7231515598088306720 "https://juejin.cn/book/7223230325122400288/section/7231515598088306720")

- [新的 CSS 颜色空间：为 Web 设置高清颜色](https://juejin.cn/book/7223230325122400288/section/7233227753909125178 "https://juejin.cn/book/7223230325122400288/section/7233227753909125178")

- [CSS 中的 OKLAB 和 OKLCH](https://juejin.cn/book/7223230325122400288/section/7235205520154427429 "https://juejin.cn/book/7223230325122400288/section/7235205520154427429")

### 💯 color-mix() 函数

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8152c82c2e1149dbb00dfba8fed35b93~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1362&h=584&s=198501&e=png&b=00637c)

混合颜色是一项经典任务，在 2023 年，CSS 也可以做到这一点。你不仅可以为颜色混合白色或黑色，还可以混合透明度，并且可以在你选择的任何颜色空间中执行所有这些操作。相对于传统的颜色混合方法（比如，简单平均值、线性加权平均值等），`color-mix()` 函数提供了更灵活的混合方式。除此之外，它可以在不同的颜色空间进行混合，这在调整颜色时更加灵活，并且可以根据需要选择合适的颜色空间进行混合。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b64a949345ac43108ecf9ca355217b73~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1265&h=1280&s=681503&e=png&b=ffffff)

你可以把 `color-mix()` 想象成渐变中的一个时间点。在渐变中，我们可以看到从蓝色到白色的所有路段，而 `color-mix()` 只显示其中的一个步骤。当你开始考虑颜色空间并学习混合颜色空间与结果有多大差异时，事情就变得更加复杂。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/804c76ef1d3c4981b8813f21f0c2c766~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=962&h=712&s=3357182&e=gif&f=117&b=d490b2)

> URL: [color-mix.style/](https://link.juejin.cn?target=https%3A%2F%2Fcolor-mix.style%2F "https://color-mix.style/")

有关于 `color-mix()` 更详细的介绍，请移步阅读《[现代 CSS](https://s.juejin.cn/ds/i8wsdWCn/ "https://s.juejin.cn/ds/i8wsdWCn/")》中的《[CSS 的混合颜色：color-mix()](https://juejin.cn/book/7223230325122400288/section/7237288025221234744 "https://juejin.cn/book/7223230325122400288/section/7237288025221234744")》课程！

### 👁️ 相对颜色语法

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4e3ccf27bda45608e22bddbe7314f62~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1400&h=786&s=484085&e=png&b=edeff0)

**[CSS 颜色模块 Level 5](https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-color-5%2F%23relative-colors "https://www.w3.org/TR/css-color-5/#relative-colors")** 为 CSS 颜色函数引入[相对颜色语法](https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-color-5%2F%23relative-colors "https://www.w3.org/TR/css-color-5/#relative-colors")，进一步增强了颜色函数功能。此语法允许你基于另一个颜色定义新颜色。你可以通过首先使用 `from` 关键字定义起始颜色，然后像往常一样在颜色函数中指定新颜色的通道来使用它。

当你提供起始颜色时，你就可以访问“通道关键字”，这些关键字允许你在颜色空间中引用每个通道。关键字取决于你使用的颜色函数。对于 `rgb()`，你将有 `r`，`g` 和 `b` 通道关键字。对于 `oklch()`，你将有 `l`，`c` 和 `h` 关键字。对于每个颜色函数，你还有一个透明通道关键字，它引用起始颜色的 Alpha 通道。例如：

```CSS
CSS:root {
    --theme-primary: #8832CC;
}
.bg-primary-100 {
    background-color: hsl(from var(--theme-primary) h s 90%);
}

.bg-primary-200 {
    background-color: hsl(from var(--theme-primary) h s 80%);
}

.bg-primary-300 {
    background-color: hsl(from var(--theme-primary) h s 70%);
}

.bg-primary-400 {
    background-color: hsl(from var(--theme-primary) h s 60%);
}
```

拿其中的 `hsl(from var(--theme-primary) h s 30%)` 为例吧：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/161723cec062400e94f379cf09c0966e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=1033&s=306685&e=png&b=fefefe)

> Demo 地址：[codepen.io/airen/full/…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fairen%2Ffull%2FRweBMeY "https://codepen.io/airen/full/RweBMeY")

相对颜色语法 (RCS) 是对 `color-mix()` 的补充，用于创建颜色变体。它比 `color-mix()` 更强大，但同时也是不同的颜色处理策略。`color-mix()` 可能会混入白色来调亮颜色，通过 RCS 可以精确访问亮度通道，并能够在通道上使用 `calc()`，以编程方式降低或提高亮度。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/509a591142be4eef88c07bc1a83d1524~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1458&h=594&s=7866197&e=gif&f=211&b=eaeaea)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FYzBrmdB "https://codepen.io/web-dot-dev/full/YzBrmdB")

RCS 可让你对颜色进行相对和绝对处理。相对变化是指采用当前的饱和度或亮度值，并使用 `calc()` 进行修改。绝对变化是指将渠道值替换为全新的值，例如将不透明度设置为 `50%`。此语法可为时间变体等提供有意义的主题设置工具。

> 有关于相对颜色语法（RCS）更详细的介绍，请移步阅读《[现代 CSS](https://s.juejin.cn/ds/i8wsdWCn/ "https://s.juejin.cn/ds/i8wsdWCn/")》中的《[现代 CSS 中的颜色格式：RGB、HSL、HWB、LAB 和 LCH](https://juejin.cn/book/7223230325122400288/section/7231515598088306720 "https://juejin.cn/book/7223230325122400288/section/7231515598088306720")》课程中的[相对颜色语法](https://juejin.cn/book/7223230325122400288/section/7231515598088306720#heading-14 "https://juejin.cn/book/7223230325122400288/section/7231515598088306720#heading-14")！

除此之外，你还可以使用 [CSS 的 accent-color 和 color-scheme 来定制 Web 控件的 UI 颜色](https://juejin.cn/book/7223230325122400288/section/7238477651873103927 "https://juejin.cn/book/7223230325122400288/section/7238477651873103927")，以及使用 `color-contrast() 函数`设置颜色的对比度，提高用户体验！

### 👁️ 响应浅色或深色模式的 light-dark() 函数

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/101143fdec6f45ad89291bf71240fecc~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1801&h=1013&s=110008&e=png&b=003585)

为了根据使用的是浅色模式还是深色模式来更改颜色，通常会使用 `prefers-color-scheme 媒体查询`。为了让事情变得更简单，CSS 现在提供了一个名为 `light-dark()` 的实用函数。该函数接受两个颜色值作为参数。根据你当前使用的颜色方案，它将输出第一个或第二个参数。

[根据规范](https://link.juejin.cn?target=https%3A%2F%2Fdrafts.csswg.org%2Fcss-color-5%2F%23light-dark "https://drafts.csswg.org/css-color-5/#light-dark")：

> 如果使用的颜色方案是浅色或未知的，该函数计算为第一个颜色的计算值；如果使用的颜色方案是深色，则计算为第二个颜色的计算值。

使用的颜色方案不仅基于用户的浅色或深色模式设置，还基于 `color-scheme 属性的值`。这类似于 System Colors 的计算方式。

`color-scheme 属性`允许元素指示其设计为使用哪些颜色方案进行渲染。这些值与用户的偏好进行协商，最终形成一个使用的颜色方案。这意味着，要使 `light-dark()` 生效，你必须还包含一个 `color-scheme` 声明。

```CSS
CSS:root {
    color-scheme: light dark;
}

:root {
    --text-color: light-dark(#333, #ccc); /* 在浅色模式下返回第一个值。在深色模式下返回第二个值。 */
}
```

由于 `color-scheme` 被考虑在内，这也意味着你可以在每个元素上覆盖它的值，以强制其进入特定模式：

```CSS
CSS.dark {
    color-scheme: dark; /* light-dark() 在此元素及其子元素上始终返回 dark */
}
```

相比而言，使用 `light-dark()` 函数要比使用 `prefers-color-scheme` 媒体查询要简单和方便得多。

### 响应式设计

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1019df97743c47c6b790ec6f1146ea6a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3218&h=1776&s=1160267&e=png&b=ffffff)

[@Una Kravets](https://link.juejin.cn?target=https%3A%2F%2Ftwitter.com%2Funa "https://twitter.com/una") 在 2021 的 [Google I/O 大会上的分享](https://link.juejin.cn?target=https%3A%2F%2Fio.google%2F2021%2Fsession%2Fa1760fa3-879a-4e98-a616-994ca8d3aab5%2F%3Flng%3Dzh-CN "https://io.google/2021/session/a1760fa3-879a-4e98-a616-994ca8d3aab5/?lng=zh-CN") 提出新的响应式设计：**组件驱动式 Web 设计（Component-Driven Web Design）** 。Web 生态即将进入响应式 Web 设计的新时代，并转变我们对其含义的看法，也为会 Web 设计带来新的变化。组件式驱动 Web 设计（或开发）也被称为是**下一代响应式 Web 设计**。

也就是说，我们又一次见证了响应式设计生态系统的演变，即 **CSS 新增的特性将直接基于组件而不是基于页面注入样式响应能力**。这种能力被称为 **组件驱动 Web 设计（Component-Driven Web Design）** ，基于组件驱动的开发将会成为一种真正流行的开发模式。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01ad5efee81548ce913c57b15aede5b1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1114&h=699&s=364547&e=png&b=ffffff)

> 我在《[现代 Web 布局](https://s.juejin.cn/ds/i8KDJgVN/ "https://s.juejin.cn/ds/i8KDJgVN/")》中也专门花了一节课的篇幅与大家一起探讨了这方面的话题：《[下一代响应式 Web 设计：组件驱动式 Web 设计](https://juejin.cn/book/7161370789680250917/section/7165845190614188062 "https://juejin.cn/book/7161370789680250917/section/7165845190614188062")》！

时隔两年之后，也就是 2023 年，可以说是响应式 Web 设计的一个突破性年份。这一年促成了多项新功能，这些功能彻底改变了我们构建响应式 Web 的方式，并开创了基于组件的响应式设计新模式。CSS 容器查询（[尺寸查询](https://juejin.cn/book/7223230325122400288/section/7259668032165773368 "https://juejin.cn/book/7223230325122400288/section/7259668032165773368")、[样式查询和状态查询](https://juejin.cn/book/7223230325122400288/section/7259316003635462201 "https://juejin.cn/book/7223230325122400288/section/7259316003635462201")）和 `:has() 选择器`的结合支持组件根据其父元素的大小以及任何子元素的存在或状态拥有其自己的响应式和逻辑样式。这意味着你终于可以将页面级别的布局（宏观布局）与组件级别的布局（微观布局）分开，并只需编写一次逻辑即可在所有地方使用你的组件！

### 💯 容器查询之尺寸查询

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7fd2d6137164b4e96f5f665be0cef4a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1920&h=1080&s=226887&e=png&b=bbcff8)

容器查询允许你根据元素容器的大小、计算样式和状态来应用样式。其最大的特点是： **容器查询允许开发者定义任何一个元素为包含上下文，查询容器的后代元素可以根据查询容器的大小或计算样式、状态的变化来改变风格** ！

换句话说，一个查询容器是通过使用容器类型属性（`container-type` 或 `container`）来指定其查询类型。同时，查询容器的后代元素的样式规则可以通过使用 `@container` 条件组规则进行独立设置。简单地说，**查询容器（也被称为 CSS 包容）提供了一种方法来隔离页面的各个部分，并向浏览器声明这些部分在样式和布局方面与页面的其他部分是独立的** 。

容器查询最早是只有尺寸查询，但随着时间的推移，容器查询新增了样式查询和状态查询。也就是说，容器查询包含三种类型：

- **尺寸查询**：根据查询容器大小来调整其后代元素的样式

- **样式查询**：根据查询容器样式或 CSS 变量来调整其后代元素的样式

- **状态查询**：根据查询容状态来调整其后代元素的样式

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/462d4a2f18634eaf92182fa0a33c17b8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1271&h=1280&s=248764&e=png&b=f8f8f8)

其中尺寸查询支持查询父元素的尺寸，而不是使用视口（浏览器视窗）的全局尺寸信息来应用 CSS 样式。这意味着，你可以在多个布局和多个视图中为组件设置动态样式。

如需使用此功能，请先在要查询的元素上设置元素，然后与媒体查询类似，使用带有尺寸参数的 `@container` 来应用样式。除了容器查询，你还可以获得容器查询大小。在以下演示中，容器查询大小 `cqi`（表示内嵌容器的大小）用于调整卡片标头的大小。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/127da776ed3f480aa3ea2599e533fa35~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1184&h=498&s=11571744&e=gif&f=278&b=fdfcfc)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FeYxBNQy "https://codepen.io/web-dot-dev/full/eYxBNQy")

如果你对该特性感兴趣，可以移步阅读《[下一代响应式 Web 设计：容器查询](https://juejin.cn/book/7161370789680250917/section/7164357178164248612 "https://juejin.cn/book/7161370789680250917/section/7164357178164248612")》和《[CSS 容器查询之尺寸查询](https://juejin.cn/book/7223230325122400288/section/7259668032165773368 "https://juejin.cn/book/7223230325122400288/section/7259668032165773368")》。注意，上成提到的 `cqi` 是容器查询单位，它有点类似于视窗单位，这方面更详细的介绍，可以参阅《[现代 CSS 中的相对单位](https://juejin.cn/book/7223230325122400288/section/7249357892611440700 "https://juejin.cn/book/7223230325122400288/section/7249357892611440700")》。

### 👁️ 容器查询之样式查询

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8101652e0984711a6baf55c1b2aeaba~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1794&h=1086&s=231842&e=png&b=f2f2f6)

样式查询与尺寸查询是非常相似的，你可以使用样式查询查询容器的计算样式，但通过 `style()` 函数来区分尺寸查询，`style()` 函数接受任何有效的样式声明：

```CSS
CSS@container style(font-style: italic) {
    em {
        background: var(--highlight);
        color: var(--highlight-text);
    }
}

@container style(--button: pill) {
    button {
        border-radius: 50%;
        padding-inline: 1em;
    }
}

@container colors style(background-color: black) {
    a:any-link {
        color: var(--link-on-dark);
    }
}
```

注意，样式查询的条件（即 `style()` 函数中的声明）比较的是计算值。

很多时候，样式查询也同样能达到尺寸查询相同的结果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a9bc1cacb1b41da9bad661863f2db36~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2852&h=2134&s=604467&e=png&b=fcfcfc)

也就是说，你可以在使用 `@container style()` 时查询父元素上的自定义属性的值。例如，查询自定义属性值是否存在，或者是否设置为特定的值，例如 `@container style(--rain: true)` ：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33278f74f77844e09648df85b2143483~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1732&h=474&s=465027&e=png&b=f9f9f9)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FmdvBgqv "https://codepen.io/web-dot-dev/full/mdvBgqv")

尽管这听起来类似于在 CSS 中使用类名称，但样式查询具有一些优势。首先，对于样式查询，您可以根据伪状态的需要更新 CSS 中的值。此外，在未来版本的实现中，你将能够查询值的范围（例如 `style(60 <= --weather <= 70)`）和根据属性值对（例如 `style(font-style: italic)`）来确定应用的样式。

> 有关于样式查询更详细的介绍，请移步阅读《[现代 CSS](https://s.juejin.cn/ds/i8wsdWCn/ "https://s.juejin.cn/ds/i8wsdWCn/")》中的《[CSS 容器查询之样式查询和状态查询](https://juejin.cn/book/7223230325122400288/section/7259316003635462201 "https://juejin.cn/book/7223230325122400288/section/7259316003635462201")》课程！

### 👁️ 容器查询之状态查询

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd73acbebdac4ab683253b671b081ce4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2200&h=1020&s=57481&e=png&b=f8f8f8)

@Una Kravets 在 2023 年的 **[CSS Day](https://link.juejin.cn?target=https%3A%2F%2Fcssday.nl%2F2023 "https://cssday.nl/2023")** 中分享了一个“[CSS 社区现状](https://link.juejin.cn?target=https%3A%2F%2Fcssday.nl%2F2023%2Fspeakers%23una "https://cssday.nl/2023/speakers#una")”相关的话题，主题内容中就有 CSS 容器查询的状态查询相关的话题。

事实上，CSS 的状态查询和 CSS 样式查询有点类似，我们主要使用 `state()` 函数来区分 CSS 容器查询中的尺寸查询和样式查询。例如：

```CSS
CSS@container state(dir: rtl) {
    /* RTL 布局 */
}
```

不过大家需要知道的是，到目前为止，CSS 的状态查询还仅是 Chromium 团队正在试验的一种新的查询类型。

### 💯 更新媒体查询

借助 `update` 媒体查询，你可以使界面适应设备的刷新率。该功能可以报告 `fast`、`slow` 或 `none` 值，这些值与不同设备的功能相关。

你设计的大多数设备都可能具有较快的刷新率。这包括桌面设备和大多数移动设备。电子阅读器以及低能耗付款系统等设备的刷新率可能会较慢。了解设备无法处理动画或频繁更新，意味着你可以节省电池电量或减少错误的视图更新。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c11bc20174c14821869c876fd4e74f9e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1184&h=658&s=681258&e=gif&f=171&b=ededed)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FwvNrVNa "https://codepen.io/web-dot-dev/full/wvNrVNa")

在制作动画时，如果你想针对网络慢的用户减少运动，这个媒体查询就非常有用。另外，它常和 `prefers-reduced-motion: reduce` 媒体查询一起使用，旨在为开启减少运动偏好的用户提供不同的动画效果：

```CSS
CSS@media (prefers-reduced-motion: reduce), (update: slow)  {
    *,
    ::before,
    ::after {
        animation-delay: -1ms !important;
        animation-duration: 1ms !important;
        animation-iteration-count: 1 !important;
        background-attachment: initial !important;
        scroll-behavior: auto !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
    }
 }
```

> 如果你对这方面感兴趣，尤其是如何制作可访问 Web 动画方面感兴趣，可以移步阅读《[Web 动画之旅](https://s.juejin.cn/ds/i8KtM3B6/ "https://s.juejin.cn/ds/i8KtM3B6/")》的《[提升可访问性动画的关键技巧](https://juejin.cn/book/7288940354408022074/section/7308623518789763083 "https://juejin.cn/book/7288940354408022074/section/7308623518789763083")》！

### 💯 脚本媒体查询

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c7b81c62e3f4fec8fcf58ef5ad82544~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1312&h=818&s=214531&e=png&b=161719)

脚本媒体查询（`scripting`）可用于检查 JavaScript 是否可用。这对于渐进式增强非常有用。在此媒体查询推出之前，一个用于检测 JavaScript 是否可用的策略是在 HTML 中放置一个 `nojs` 类，然后使用 JavaScript 将其移除。这些脚本可以移除，因为 CSS 现在可以检测 JavaScript 并进行相应调整。

```CSS
CSS.steam {
    transition: opacity .2s ease;
}

@media (scripting: none) {
    .steam {
        opacity: 0;
    }
}

@media (scripting: enabled) {
    .steam {
        opacity: 1;
    }
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/393b21b8c0304ebdb511a55fc597017b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1188&h=662&s=3153957&e=gif&f=152&b=fefefe)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FExrwqrQ "https://codepen.io/web-dot-dev/full/ExrwqrQ")

假设有一个网站上的主题切换，由于没有 JavaScript 可用，脚本媒体查询有助于使切换符合系统偏好设置。或者考虑使用 switch 组件 —— 如果 JavaScript 可用，那么只需通过手势来滑动开关，而不必打开和关闭。如果脚本可用，就可以有大量升级用户体验的机会；如果停用脚本，则可以提供有意义的基础体验。

### 👁️ 降低透明度的媒体查询

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78910c5900dc49a3b6c01eeda0b26881~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1920&h=1080&s=236904&e=png&b=191724)

非透明界面可能会导致头痛，或因各种类型的视觉缺陷而产生视觉上的视觉疲劳。因此，[Windows、macOS 和 iOS 具有系统偏好设置](https://link.juejin.cn?target=https%3A%2F%2Fpsdtohtml.dev%2Fideas%2Faccessibility-transparencies-css%2F%23%3A%257E%3Atext%3DHow%2520to%2520activate%2520transparency%2520reduction "https://psdtohtml.dev/ideas/accessibility-transparencies-css/#:%7E:text=How%20to%20activate%20transparency%20reduction")，可降低或移除界面的透明度。这个针对 `prefers-reduced-transparency` 的媒体查询非常适合使用其他偏好设置媒体查询，这让您可以既能发挥创意，又能为用户做出调整。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5329089e8b2461ebc13bbd6453e8e7f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=956&h=710&s=3021925&e=gif&f=118&b=fd6b09)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FRwvLXvO "https://codepen.io/web-dot-dev/full/RwvLXvO")

在某些情况下，你可以提供一种不会将内容叠加在其他内容上的备用布局。在其他情况下，可以将颜色的不透明度调整为不透明或几乎不透明。[@Adam Argyle 的博文中提供了更多鼓舞人心的演示，可根据用户偏好进行调整](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fcss-prefers-reduced-transparency "https://developer.chrome.com/blog/css-prefers-reduced-transparency")。

### 💯 媒体查询范围

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/035d02755ce04f128a0487d618cf4ca0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2400&h=1248&s=74577&e=png&b=212337)

在媒体查询中，`min-width` （或 `min-height`）和 `max-width` （或 `max-height`）等称为查询范围。只是使用 `min-` 和 `max-` 时常令人感到困惑，至少我自己有这种困惑：“使用 `min-width` 和 `max-width` 很多时候傻傻分不清楚他们的范围”。为此，我总是喜欢使用下图来做判断：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4cd79297c7ab44298316cc21d8fc1c1a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1028&h=834&s=16253&e=png&a=1&b=d1f3c8)

但是 [Media Queries Level 4 规范引入了一种新的语法](https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fmediaqueries-4%2F "https://www.w3.org/TR/mediaqueries-4/")，它使用常见的数学比较运算符(如 `<`、`>` 和 `=` )来确定视窗宽度的范围，这在语法上更有意义，同时编写的代码更少，更易于理解代码。

```CSS
CSS/* 老方式的查询范围语法 * /
@media ( min-width : 375px ) {
    /* 视窗宽度大于或等于 375px */
}

@media ( max-width : 768px ) {
    /* 视窗宽度小于或等于 768px */
}

@media ( min-width : 375px ) and ( max-width : 768px ) {
    /* 视窗宽度在 375px ~ 768px 之间 */
}

/* 新式的查询范围语法 */
@media (width >= 375px) {
    /* 视窗宽度大于或等于 375px */
}

@media (width <= 768px) {
    /* 视窗宽度小于或等于 768px */
}

@media (375px <= width <= 768px) {
    /* 视窗宽度在 375px ~ 768px 之间 */
}
```

Media Queries Level 4 规范中最大的变化是我们有了比较值而不是组合值的新操作符：

- **`<`** ：计算一个值是否小于另一个值

- **`>`** ：计算一个值是否大于另一个值

- **`=`** ：计算一个值是否等于另一个值

- **`>=`** ：计算一个值是否大于或等于另一个值

- **`<=`** ：计算一个值是否小于或等于另一个值

有了这些新的操作符之后，CSS 媒体查询的语法规则也相应的变成下图这样：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5206cc08e6e4b3aab379c4167b29c3c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1436&h=1410&s=561379&e=jpg&b=ffffff)

通常，当我们编写 CSS 媒体查询时，我们会创建一个所谓的断点，即一个设计“中断”的条件，并应用一组样式来修复它。一个设计可以有一堆断点！它们通常基于两个宽度之间的视窗：断点开始的地方和断点结束的地方。

新语法除了语法的视觉差异之外，它们的工作方式也略有不同。使用 `min-` 和 `max-` 相当于使用数学比较运算符：

- `max-width` 相当于 `<=` 运算符，例如，`(max-width: 320px)` 与 `(width <= 320px)` 相同

- `min-width` 相当于 `>=` 运算符，例如，`(min-width: 320px)` 与 `(width >= 320px)` 相同

注意，两者都不等同于 `>` 或 `<` 操作符。

> 有关于 CSS 媒体查询更详细的介绍，请移步阅读《[现代 CSS](https://s.juejin.cn/ds/i8KWSYp2/ "https://s.juejin.cn/ds/i8KWSYp2/")》中的《[CSS 媒体查询新特性：@media](https://juejin.cn/book/7223230325122400288/section/7257368158451793935 "https://juejin.cn/book/7223230325122400288/section/7257368158451793935") 》！

### 交互动画

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e4370a4336a49568d26764761761ba8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2948&h=1770&s=435095&e=jpg&b=ffffff)

交互动画是数字体验的基石。它帮助用户获取他们点击的内容以及他们在虚拟空间中的位置的反馈。2023 年，有许多令人兴奋的功能陆续推出，使得交互动画更容易组织和实施，实现了平滑的用户体验和更精致的网络体验。

> 我自己正在编写一本与 Web 动画相关的小册，如果你对 Web 动画感兴趣的话，可以关注《[Web 动画之旅](https://s.juejin.cn/ds/i8KWwxUk/ "https://s.juejin.cn/ds/i8KWwxUk/")》！

### 👁️ 视图过渡

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eba8dad9ef394b8fae936912963e2d42~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1182&h=831&s=198837&e=png&b=ffffff)

视图过渡会对 Web 的用户体验产生巨大影响。借助 CSS View Transitions API，你可以在单页应用的两个页面状态之间创建视觉过渡。这些转换可以是整页转换，也可以是网页上某些较小的转换，例如向列表中添加或移除新项。

CSS View Transitions API 的核心是 `document.startViewTranstion` 函数。传入将 DOM 更新为新状态的函数，此 API 会为你处理所有工作。为此，它会拍摄前后快照，然后在两者之间转换。使用 CSS，你可以控制捕获的内容，并视需要自定义这些快照的动画呈现方式。

```CSS
CSS:root {
    view-transition-name: none;
}
::view-transition-group(*) {
    animation-duration: 0.5s;
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8229ecb25344d79b316f11eed38b549~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1000&h=702&s=8845030&e=gif&f=109&b=fefefe)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FExrLGJx "https://codepen.io/web-dot-dev/full/ExrLGJx")

有关于视图过渡更详细的介绍，请移步阅读《[Web 动画之旅](https://s.juejin.cn/ds/i8KWwxUk/ "https://s.juejin.cn/ds/i8KWwxUk/")》的《[使用 CSS 视图过渡创造流畅的界面动效](https://juejin.cn/book/7288940354408022074/section/7308623298618163212 "https://juejin.cn/book/7288940354408022074/section/7308623298618163212")》；或者参阅《[现代 CSS](https://s.juejin.cn/ds/i8KWSYp2/ "https://s.juejin.cn/ds/i8KWSYp2/")》中的《[解锁 CSS View Transitions API 的魔力](https://juejin.cn/book/7223230325122400288/section/7259669097242329145 "https://juejin.cn/book/7223230325122400288/section/7259669097242329145")》！

### 👁️ 滚动驱动动效

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3360261c9fbe477d93237d06d477a3a6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=720&s=268144&e=png&b=c3e0e2)

滚动驱动的动画是从 Chrome 115 开始提供的一项令人兴奋的功能。它们允许你将现有的 [CSS 动画](https://juejin.cn/book/7288940354408022074/section/7292735608995184678 "https://juejin.cn/book/7288940354408022074/section/7292735608995184678")或使用 [Web Animations API](https://juejin.cn/book/7288940354408022074/section/7308623717105008652 "https://juejin.cn/book/7288940354408022074/section/7308623717105008652") 构建的动画与滚动器的滚动偏移关联起来。当你上下滚动，或者在水平滚动器中左右滚动时，关联的动画将直接响应地前后倒播。

使用 `ScrollTimeline`，你可以跟踪滚动器的整体进度，正如以下演示所示。当你滚动到页面末尾时，文本会逐个字符地显示出来。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24f92f611061424fb88959a7bf61ac4c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1190&h=652&s=1129795&e=gif&f=83&b=fefefe)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FJjxvwqG "https://codepen.io/web-dot-dev/full/JjxvwqG")

使用 `ViewTimeline`，你可以跟踪元素在滚动视口中的移动。这类似于 `IntersectionObserver` 跟踪元素的方式。在下面的演示中，每个图像在进入滚动视口的瞬间开始逐渐显现，直到位于中心位置。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fd8d50ba0554eebb21f1283f9f3f354~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1192&h=656&s=8079164&e=gif&f=55&b=ad79fb)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FXWOqovr "https://codepen.io/web-dot-dev/full/XWOqovr")

由于滚动驱动的动画与 CSS 动画和 Web Animations API 一起工作，你可以从这些 API 带来的所有优势中受益。这包括能够使这些动画脱离主线程运行。现在，您只需添加几行额外的代码，即可拥有丝滑顺滑的动画、由滚动操作驱动、在主线程之外运行，还有什么不喜欢呢？

通过 CSS 应用滚动驱动的动画时，查找控制滚动条的查询机制始终向上遍历 DOM 树，因而仅限于滚动祖先实体。但通常情况下，需要添加动画效果的元素不是滚动条的子元素，而是位于完全不同的子树中的元素。

若要允许动画元素查找非祖先实体的已命名滚动时间轴，请对共享父项使用 `timeline-scope` 属性。这样一来，就可以将具有该名称的已定义 `scroll-timeline` 或 `view-timeline` 附加到其中，从而赋予其更广泛的范围。这样，该共享父级的任何子级都可以使用具有该名称的时间轴。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90753aa9202944d792e15716b08a82be~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=840&s=606893&e=png&b=f2fafd)

在共享父级上声明 `timeline-scope` 后，滚动条上声明的 `scroll-timeline` 可供使用该滚动条作为 `animation-timeline` 的元素找到。

现如今天，我们只需要使用纯 CSS 就可以实现。将 [CSS 的滚动捕捉](https://juejin.cn/book/7199571709102391328/section/7199846103007625227 "https://juejin.cn/book/7199571709102391328/section/7199846103007625227")、[自定义属性](https://juejin.cn/book/7223230325122400288/section/7258870477462962236 "https://juejin.cn/book/7223230325122400288/section/7258870477462962236")和滚动驱动动效相结合，就可以实现一个视差滚动的动画效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45920d57442b45e39336c085a42878a8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1116&h=468&s=13120049&e=gif&f=101&b=f7f1ef)

> Demo 地址：[codepen.io/airen/full/…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fairen%2Ffull%2FYzBMgQB "https://codepen.io/airen/full/YzBMgQB")

上面这个示例还带有响应式功能，当你将浏览器屏幕缩小到小于 `768px` 时，页面也可以整屏幕滚动，带视差效果更明显：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53a576cf7cf8471b85626590f473715b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=614&h=748&s=14426069&e=gif&f=106&b=f5e9e7)

> 有关于 CSS 滚动驱动动效更详细的介绍，请移步阅读《[Web 动画之旅](https://s.juejin.cn/ds/i8KWwxUk/ "https://s.juejin.cn/ds/i8KWwxUk/")》的《[CSS 滚动驱动动效的艺术](https://juejin.cn/book/7288940354408022074/section/7307223031717724172 "https://juejin.cn/book/7288940354408022074/section/7307223031717724172")》；或者参阅《[现代 CSS](https://s.juejin.cn/ds/i8KWSYp2/ "https://s.juejin.cn/ds/i8KWSYp2/")》中的《[CSS 滚动驱动动效](https://juejin.cn/book/7223230325122400288/section/7259272255786450981 "https://juejin.cn/book/7223230325122400288/section/7259272255786450981")》！

### 👁️ 离散属性动画

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d71658ef383b435d96ce9d46c41b7733~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2401&h=1351&s=1536880&e=png&b=285eca)

2023 年的另一个新功能是能够对离散属性进行动画处理，例如在 `display: none` 和 `display: block` 之间进行动画处理。从 Chrome 116 开始，你可以在关键帧规则中使用 `display` 和 `content-visibility`。你还可以在 `50%` 的位置而不是 `0%` 的位置上过渡任何离散属性。这是通过使用 `transition-behavior` 属性的 `allow-discrete` 值，或在 `transition` 属性中作为速记方式来实现的。

`transition-behavior` 属性值 `allow-discrete` ，允许对离散属性进行一些平滑的过渡。这使得在离散属性上应用过渡变得更加灵活。这意味着，使用 `allow-discrete` 模式，你可以实现对离散属性的平滑过渡，而不是突然切换。这对于一些需要在离散属性上应用过渡的情况非常有用，使得在这些属性上创建更加流畅的动画效果成为可能。

```CSS
CSS@layer transition {
    .card {
        transition: opacity 0.25s, display 0.25s;
        transition-behavior: allow-discrete;
    }

    .fade-out {
        opacity: 0;
        display: none;
    }
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac77627fd92c42bca6ca9053f951625c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1432&h=700&s=13498335&e=gif&f=83&b=4a4969)

> Demo 地址：[codepen.io/airen/full/…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fairen%2Ffull%2FxxMxrgy "https://codepen.io/airen/full/xxMxrgy")

有关于离散属性动画更详细的介绍，可以在阅《[Web 动画之旅](https://s.juejin.cn/ds/i8EaLoRb/ "https://s.juejin.cn/ds/i8EaLoRb/")》的《[帧动画与过渡动画：谁更适合你的业务场景](https://juejin.cn/book/7288940354408022074/section/7292735608995184678#heading-5 "https://juejin.cn/book/7288940354408022074/section/7292735608995184678#heading-5")》！

### 👁️ @starting-style

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf6099c595da43b698c4724d4027bb8c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=980&h=420&s=185525&e=png&b=fefdfd)

> 上图来源于 [@XboxYan](https://link.juejin.cn?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000044401764 "https://segmentfault.com/a/1190000044401764")

`@starting-style` 是 CSS 新增的一个 `@` 规则，该规则借助新的 Web 功能，用于实现对 `display: none` 的元素进行入场和出场的动画。该规则提供了一种在元素在页面上打开之前，浏览器可以查找的“打开之前（before-open）”样式的方式。这对于入场动画以及对弹出窗口或对话框等元素进行动画处理非常有用。它还可用于在创建元素并希望赋予其动画效果时使用。以下示例将 `popover` 属性以动画形式呈现，使其从视口外平滑进入视图并进入顶层。

```CSS
CSS/*   IS-OPEN STATE   */
dialog[open] {
    translate: 0 0;
}

/*   EXIT STATE   */
dialog {
    transition:
        translate 0.7s ease-out,
        overlay 0.7s ease-out,
        display 0.7s ease-out allow-discrete;
    translate: 0 100vh;
}

/*   0. BEFORE-OPEN STATE   */
@starting-style {
    dialog[open] {
        translate: 0 100vh;
    }
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10e67a0dbef94032a2ed4f498aa5e449~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1670&h=832&s=760505&e=gif&f=116&b=ffffff)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FOJdjjdX "https://codepen.io/web-dot-dev/full/OJdjjdX")

有关于 `@starting-style` 更详细的介绍，可以参阅《[Web 动画之旅](https://s.juejin.cn/ds/i8EaLoRb/ "https://s.juejin.cn/ds/i8EaLoRb/")》的《[帧动画与过渡动画：谁更适合你的业务场景](https://juejin.cn/book/7288940354408022074/section/7292735608995184678#heading-5 "https://juejin.cn/book/7288940354408022074/section/7292735608995184678#heading-5")》！

### 👁️ overlay

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a64291e79f54234bebe6200994e7db7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1800&h=1104&s=295507&e=png&b=8432f0)

新的 CSS `overlay` 属性可以添加到你的过渡中，让具有顶层样式（例如 `popover 和 dialog`）的元素平滑地从顶层动画移出。如果你没有使用 `overlay` 过渡，你的元素将立即返回到被裁剪、变换和覆盖的状态，你将看不到过渡发生。类似地，将 `overlay` 添加到顶层元素时，`::backdrop` 也可以平滑地动画移出。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/984a3bd5f3144fb48d81a4c391d938ad~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1674&h=822&s=8687384&e=gif&f=361&b=ffffff)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FzYeJbgw "https://codepen.io/web-dot-dev/full/zYeJbgw")

如果你对进场和退场动画感兴趣，或者说想制作一个流畅的进场和退场动画，请参阅 @Una Kravets 和 @Joey Arhar 的教程《[四个新的 CSS 功能，可实现流畅的进入和退出动画](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fentry-exit-animations "https://developer.chrome.com/blog/entry-exit-animations")》。

### 👁️ 锚点定位

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff9d8564c00c48e2807cc93492649ae8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1200&h=675&s=150818&e=png&b=ffffff)

CSS 锚点定位（CSS Anchor Positioning）是一种用于在 Web 页面上定位元素的新方法，它是 CSS 的一个新特性。[W3C 规范是这样描述](https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-anchor-position-1%2F%23intro "https://www.w3.org/TR/css-anchor-position-1/#intro")的：“通过锚点定位（通过锚定位函数 `anchor()` 和 `anchor-size()`）可以将一个绝对定位的元素与页面上的一个或多个其他元素锚定在一起，同时还允许他们尝试多种可能的位置，以找到避免重叠和溢出的最佳位置”。

简单地说，CSS 锚点定位提高了元素绝对定位的能力，Web 开发者可以使用一种更简单、更自然的方式来定位元素之间的关系，使得页面元素能够根据其包含块内的其他元素的位置和大小进行定位和调整。该功能的出现为 Web 开发人员提供了更多的控制权和灵活性，同时减少了对 JavaScript 依赖，使页面的性能更加优化。

CSS 锚点定位通过引入一组属性和值，使元素能够与彼此连接，为 Web 布局中的定位提供了一种全新的范式：

- 首先，使用 `anchor-name` 来定义一个锚点，经过标记的元素会作为绝对定位的基准目标

- 其次，将 `anchor()` 或 `anchor-size()` 函数用作被定位元素的内嵌属性（`top` 、`right` 、`bottom` 、`left` 或它们的逻辑等效属性）的值

- 最后，使用 `@position-fallback` 规则为锚点定位提供回退机制，即设置多套不同的锚点定位规则，以适应更为复杂的 Web 布局

以往要实现熔岩灯菜单效果，我们不得不依赖 JavaScript 脚本来完成。现在，我们可以使用 CSS 锚点定位来实现它。例如：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca62e86d1e4340c7ad19c4be6098fbf8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1044&h=328&s=460975&e=gif&f=159&b=4a4969)

> Demo 地址：[codepen.io/airen/full/…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fairen%2Ffull%2FRwEpMxM "https://codepen.io/airen/full/RwEpMxM")

如果你想了解 CSS 锚点定位更多的内容，可以移步阅读《[现代 CSS](https://s.juejin.cn/ds/i8E923hC/ "https://s.juejin.cn/ds/i8E923hC/")》中的《[CSS 锚点定位：探索下一代 Web 布局](https://juejin.cn/book/7223230325122400288/section/7259669151743279159 "https://juejin.cn/book/7223230325122400288/section/7259669151743279159")》！

### 👁️ 动画合成

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac54e4e582c945b8b90cd3fcee2b227b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1600&h=840&s=116204&e=png&b=131313)

[W3C 规范是这样描述 CSS 合成动画的](https://link.juejin.cn?target=https%3A%2F%2Fdrafts.csswg.org%2Fcss-animations-2%2F%23animation-composition "https://drafts.csswg.org/css-animations-2/#animation-composition")：

> The `animation-composition` property defines the composite operation used when multiple animations affect the same property simultaneously.

大致的意思是说：“`animation-composition` 属性定义了在多个动画同时影响同一属性时所使用的复合操作”。

换句话说，CSS 动画合成（`animation-composition`）是指同时使用多个 CSS 动画效果来影响同一属性时，通过一些属性和方法来控制这些动画如何组合影响动画元素的属性值。这使得在多个动画效果同时作用于元素时，可以更加灵活地控制动画的表现方式，包括属性值的叠加、替换等。这为 Web 开发人员提供了更多的控制权，以创建复杂的动画效果，而不必依赖于单一的动画规则。

有关于 `animation-composition` 更详细的介绍，可以参阅《[Web 动画之旅](https://s.juejin.cn/ds/i8EaLoRb/ "https://s.juejin.cn/ds/i8EaLoRb/")》的《[多个 CSS 动画与动画合成：创造更复杂的动画效果](https://juejin.cn/book/7288940354408022074/section/7308623246604599307 "https://juejin.cn/book/7288940354408022074/section/7308623246604599307")》，也可以移步阅读 《[现代 CSS](https://s.juejin.cn/ds/i8E923hC/ "https://s.juejin.cn/ds/i8E923hC/")》中的《[CSS 动画合成：animation-composition](https://juejin.cn/book/7223230325122400288/section/7259316083402735674 "https://juejin.cn/book/7223230325122400288/section/7259316083402735674")》！

### 👁️ 缓动函数 linear()

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6dac19f25fcf49f8a8bfbceea7e89535~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1200&h=675&s=92084&e=png&b=282b3d)

不要让这个函数的名字误导你。`linear()` 函数（不要与 `linear` 关键字混淆）允许你以简单的方式创建复杂的缓动函数，以牺牲一些精度为代价。

在引入 `linear()` 之前（在 Chrome 113 中发布），在 CSS 中创建弹跳或弹簧效果是不可能的。由于有了 `linear()`，可以通过将这些缓动函数简化为一系列点，然后在这些点之间进行线性插值来近似这些缓动效果。

```CSS
CSS:root {
  --linear: linear(0, 1);
  --quad-in: linear( 0, 0.0039, 0.0156, 0.0352, 0.0625, 0.0977, 0.1407, 0.1914, 0.2499, 0.3164, 0.3906 62.5%, 0.5625, 0.7656, 1 );
  --quad-out: linear( 0, 0.2342, 0.4374, 0.6093 37.49%, 0.6835, 0.7499, 0.8086, 0.8593, 0.9023, 0.9375, 0.9648, 0.9844, 0.9961, 1 );
  --quad-in-out: linear( 0, 0.0027, 0.0106 7.29%, 0.0425, 0.0957, 0.1701 29.16%, 0.2477, 0.3401 41.23%, 0.5982 55.18%, 0.7044 61.56%, 0.7987, 0.875 75%, 0.9297, 0.9687, 0.9922, 1 );
  --power-1-in: linear( 0, 0.0039, 0.0156, 0.0352, 0.0625, 0.0977, 0.1407, 0.1914, 0.2499, 0.3164, 0.3906 62.5%, 0.5625, 0.7656, 1 );
  --power-1-out: linear( 0, 0.2342, 0.4374, 0.6093 37.49%, 0.6835, 0.7499, 0.8086, 0.8593, 0.9023, 0.9375, 0.9648, 0.9844, 0.9961, 1 );
  --power-1-in-out: linear( 0, 0.0027, 0.0106 7.29%, 0.0425, 0.0957, 0.1701 29.16%, 0.2477, 0.3401 41.23%, 0.5982 55.18%, 0.7044 61.56%, 0.7987, 0.875 75%, 0.9297, 0.9687, 0.9922, 1 );
  --cubic-in: linear( 0, 0.0014 11.11%, 0.0071 19.24%, 0.0188 26.6%, 0.037 33.33%, 0.0634 39.87%, 0.0978 46.07%, 0.1407 52.02%, 0.1925 57.74%, 0.2559 63.49%, 0.3295 69.07%, 0.4135 74.5%, 0.5083 79.81%, 0.6141 85%, 0.7312 90.09%, 1 );
  --cubic-out: linear( 0, 0.2688 9.91%, 0.3859 15%, 0.4917 20.19%, 0.5865 25.5%, 0.6705 30.93%, 0.7441 36.51%, 0.8075 42.26%, 0.8593 47.98%, 0.9022 53.93%, 0.9366 60.13%, 0.963 66.67%, 0.9812 73.4%, 0.9929 80.76%, 0.9986 88.89%, 1 );
  --cubic-in-out: linear( 0, 0.0036 9.62%, 0.0185 16.66%, 0.0489 23.03%, 0.0962 28.86%, 0.1705 34.93%, 0.269 40.66%, 0.3867 45.89%, 0.5833 52.95%, 0.683 57.05%, 0.7829 62.14%, 0.8621 67.46%, 0.8991 70.68%, 0.9299 74.03%, 0.9545 77.52%, 0.9735 81.21%, 0.9865 85%, 0.9949 89.15%, 1 );
  --power-2-in: linear( 0, 0.0014 11.11%, 0.0071 19.24%, 0.0188 26.6%, 0.037 33.33%, 0.0634 39.87%, 0.0978 46.07%, 0.1407 52.02%, 0.1925 57.74%, 0.2559 63.49%, 0.3295 69.07%, 0.4135 74.5%, 0.5083 79.81%, 0.6141 85%, 0.7312 90.09%, 1 );
  --power-2-out: linear( 0, 0.2688 9.91%, 0.3859 15%, 0.4917 20.19%, 0.5865 25.5%, 0.6705 30.93%, 0.7441 36.51%, 0.8075 42.26%, 0.8593 47.98%, 0.9022 53.93%, 0.9366 60.13%, 0.963 66.67%, 0.9812 73.4%, 0.9929 80.76%, 0.9986 88.89%, 1 );
  --power-2-in-out: linear( 0, 0.0036 9.62%, 0.0185 16.66%, 0.0489 23.03%, 0.0962 28.86%, 0.1705 34.93%, 0.269 40.66%, 0.3867 45.89%, 0.5833 52.95%, 0.683 57.05%, 0.7829 62.14%, 0.8621 67.46%, 0.8991 70.68%, 0.9299 74.03%, 0.9545 77.52%, 0.9735 81.21%, 0.9865 85%, 0.9949 89.15%, 1 );
  --quart-in: linear( 0, 0.0039 25%, 0.0117 32.89%, 0.0248 39.68%, 0.0457 46.22%, 0.0743 52.21%, 0.1113 57.77%, 0.1575 63%, 0.218 68.33%, 0.2901 73.39%, 0.3745 78.23%, 0.4718 82.88%, 0.5827 87.37%, 0.7074 91.71%, 0.8462 95.91%, 1 );
  --quart-out: linear( 0, 0.1538 4.09%, 0.2926 8.29%, 0.4173 12.63%, 0.5282 17.12%, 0.6255 21.77%, 0.7099 26.61%, 0.782 31.67%, 0.8425 37%, 0.8887 42.23%, 0.9257 47.79%, 0.9543 53.78%, 0.9752 60.32%, 0.9883 67.11%, 0.9961 75%, 1 );
  --quart-in-out: linear( 0, 0.0029 13.8%, 0.0184 21.9%, 0.0339 25.51%, 0.0551 28.81%, 0.0827 31.88%, 0.1168 34.76%, 0.1962 39.57%, 0.3005 44.02%, 0.4084 47.53%, 0.6242 53.45%, 0.7493 57.93%, 0.8495 62.97%, 0.8888 65.67%, 0.9213 68.51%, 0.9629 73.9%, 0.9876 80.16%, 0.998 87.5%, 1 );
  --power-3-in: linear( 0, 0.0039 25%, 0.0117 32.89%, 0.0248 39.68%, 0.0457 46.22%, 0.0743 52.21%, 0.1113 57.77%, 0.1575 63%, 0.218 68.33%, 0.2901 73.39%, 0.3745 78.23%, 0.4718 82.88%, 0.5827 87.37%, 0.7074 91.71%, 0.8462 95.91%, 1 );
  --power-3-out: linear( 0, 0.1538 4.09%, 0.2926 8.29%, 0.4173 12.63%, 0.5282 17.12%, 0.6255 21.77%, 0.7099 26.61%, 0.782 31.67%, 0.8425 37%, 0.8887 42.23%, 0.9257 47.79%, 0.9543 53.78%, 0.9752 60.32%, 0.9883 67.11%, 0.9961 75%, 1 );
  --power-3-in-out: linear( 0, 0.0029 13.8%, 0.0184 21.9%, 0.0339 25.51%, 0.0551 28.81%, 0.0827 31.88%, 0.1168 34.76%, 0.1962 39.57%, 0.3005 44.02%, 0.4084 47.53%, 0.6242 53.45%, 0.7493 57.93%, 0.8495 62.97%, 0.8888 65.67%, 0.9213 68.51%, 0.9629 73.9%, 0.9876 80.16%, 0.998 87.5%, 1 );
  --quint-in: linear( 0, 0.0024 29.91%, 0.008 38.03%, 0.0179 44.72%, 0.035 51.16%, 0.0595 56.88%, 0.0922 62.08%, 0.1338 66.88%, 0.1914 71.85%, 0.262 76.5%, 0.3461 80.88%, 0.4447 85.04%, 0.5587 89.01%, 0.689 92.82%, 0.8359 96.48%, 1 );
  --quint-out: linear( 0, 0.1641 3.52%, 0.311 7.18%, 0.4413 10.99%, 0.5553 14.96%, 0.6539 19.12%, 0.738 23.5%, 0.8086 28.15%, 0.8662 33.12%, 0.9078 37.92%, 0.9405 43.12%, 0.965 48.84%, 0.9821 55.28%, 0.992 61.97%, 0.9976 70.09%, 1 );
  --quint-in-out: linear( 0, 0.0012 14.95%, 0.0089 22.36%, 0.0297 28.43%, 0.0668 33.43%, 0.0979 36.08%, 0.1363 38.55%, 0.2373 43.07%, 0.3675 47.01%, 0.5984 52.15%, 0.7121 55.23%, 0.8192 59.21%, 0.898 63.62%, 0.9297 66.23%, 0.9546 69.06%, 0.9733 72.17%, 0.9864 75.67%, 0.9982 83.73%, 1 );
  --power-4-in: linear( 0, 0.0024 29.91%, 0.008 38.03%, 0.0179 44.72%, 0.035 51.16%, 0.0595 56.88%, 0.0922 62.08%, 0.1338 66.88%, 0.1914 71.85%, 0.262 76.5%, 0.3461 80.88%, 0.4447 85.04%, 0.5587 89.01%, 0.689 92.82%, 0.8359 96.48%, 1 );
  --power-4-out: linear( 0, 0.1641 3.52%, 0.311 7.18%, 0.4413 10.99%, 0.5553 14.96%, 0.6539 19.12%, 0.738 23.5%, 0.8086 28.15%, 0.8662 33.12%, 0.9078 37.92%, 0.9405 43.12%, 0.965 48.84%, 0.9821 55.28%, 0.992 61.97%, 0.9976 70.09%, 1 );
  --power-4-in-out: linear( 0, 0.0012 14.95%, 0.0089 22.36%, 0.0297 28.43%, 0.0668 33.43%, 0.0979 36.08%, 0.1363 38.55%, 0.2373 43.07%, 0.3675 47.01%, 0.5984 52.15%, 0.7121 55.23%, 0.8192 59.21%, 0.898 63.62%, 0.9297 66.23%, 0.9546 69.06%, 0.9733 72.17%, 0.9864 75.67%, 0.9982 83.73%, 1 );
  --strong-in: linear( 0, 0.0024 29.91%, 0.008 38.03%, 0.0179 44.72%, 0.035 51.16%, 0.0595 56.88%, 0.0922 62.08%, 0.1338 66.88%, 0.1914 71.85%, 0.262 76.5%, 0.3461 80.88%, 0.4447 85.04%, 0.5587 89.01%, 0.689 92.82%, 0.8359 96.48%, 1 );
  --strong-out: linear( 0, 0.1641 3.52%, 0.311 7.18%, 0.4413 10.99%, 0.5553 14.96%, 0.6539 19.12%, 0.738 23.5%, 0.8086 28.15%, 0.8662 33.12%, 0.9078 37.92%, 0.9405 43.12%, 0.965 48.84%, 0.9821 55.28%, 0.992 61.97%, 0.9976 70.09%, 1 );
  --strong-in-out: linear( 0, 0.0012 14.95%, 0.0089 22.36%, 0.0297 28.43%, 0.0668 33.43%, 0.0979 36.08%, 0.1363 38.55%, 0.2373 43.07%, 0.3675 47.01%, 0.5984 52.15%, 0.7121 55.23%, 0.8192 59.21%, 0.898 63.62%, 0.9297 66.23%, 0.9546 69.06%, 0.9733 72.17%, 0.9864 75.67%, 0.9982 83.73%, 1 );
  --elastic-in: linear( 0, 0.0019 13.34%, -0.0056 27.76%, -0.0012 31.86%, 0.0147 39.29%, 0.0161 42.46%, 0.0039 46.74%, -0.0416 54.3%, -0.046 57.29%, -0.0357, -0.0122 61.67%, 0.1176 69.29%, 0.1302 70.79%, 0.1306 72.16%, 0.1088 74.09%, 0.059 75.99%, -0.0317 78.19%, -0.3151 83.8%, -0.3643 85.52%, -0.3726, -0.3705 87.06%, -0.3463, -0.2959 89.3%, -0.1144 91.51%, 0.7822 97.9%, 1 );
  --elastic-out: linear( 0, 0.2178 2.1%, 1.1144 8.49%, 1.2959 10.7%, 1.3463 11.81%, 1.3705 12.94%, 1.3726, 1.3643 14.48%, 1.3151 16.2%, 1.0317 21.81%, 0.941 24.01%, 0.8912 25.91%, 0.8694 27.84%, 0.8698 29.21%, 0.8824 30.71%, 1.0122 38.33%, 1.0357, 1.046 42.71%, 1.0416 45.7%, 0.9961 53.26%, 0.9839 57.54%, 0.9853 60.71%, 1.0012 68.14%, 1.0056 72.24%, 0.9981 86.66%, 1 );
  --elastic-in-out: linear( 0, 0.0009 8.51%, -0.0047 19.22%, 0.0016 22.39%, 0.023 27.81%, 0.0237 30.08%, 0.0144 31.81%, -0.0051 33.48%, -0.1116 39.25%, -0.1181 40.59%, -0.1058 41.79%, -0.0455, 0.0701 45.34%, 0.9702 55.19%, 1.0696 56.97%, 1.0987 57.88%, 1.1146 58.82%, 1.1181 59.83%, 1.1092 60.95%, 1.0057 66.48%, 0.986 68.14%, 0.9765 69.84%, 0.9769 72.16%, 0.9984 77.61%, 1.0047 80.79%, 0.9991 91.48%, 1 );
  --bounce-in: linear( 0, 0.0117, 0.0156, 0.0117, 0, 0.0273, 0.0468, 0.0586, 0.0625, 0.0586, 0.0468, 0.0273, 0 27.27%, 0.1093, 0.1875 36.36%, 0.2148, 0.2343, 0.2461, 0.25, 0.2461, 0.2344, 0.2148 52.28%, 0.1875 54.55%, 0.1095, 0, 0.2341, 0.4375, 0.6092, 0.75, 0.8593, 0.9375 90.91%, 0.9648, 0.9843, 0.9961, 1 );
  --bounce-out: linear( 0, 0.0039, 0.0157, 0.0352, 0.0625 9.09%, 0.1407, 0.25, 0.3908, 0.5625, 0.7654, 1, 0.8907, 0.8125 45.45%, 0.7852, 0.7657, 0.7539, 0.75, 0.7539, 0.7657, 0.7852, 0.8125 63.64%, 0.8905, 1 72.73%, 0.9727, 0.9532, 0.9414, 0.9375, 0.9414, 0.9531, 0.9726, 1, 0.9883, 0.9844, 0.9883, 1 );
  --bounce-in-out: linear( 0, 0.0078, 0, 0.0235, 0.0313, 0.0235, 0.0001 13.63%, 0.0549 15.92%, 0.0938, 0.1172, 0.125, 0.1172, 0.0939 27.26%, 0.0554 29.51%, 0.0003 31.82%, 0.2192, 0.3751 40.91%, 0.4332, 0.4734 45.8%, 0.4947 48.12%, 0.5027 51.35%, 0.5153 53.19%, 0.5437, 0.5868 57.58%, 0.6579, 0.7504 62.87%, 0.9999 68.19%, 0.9453, 0.9061, 0.8828, 0.875, 0.8828, 0.9063, 0.9451 84.08%, 0.9999 86.37%, 0.9765, 0.9688, 0.9765, 1, 0.9922, 1 );
  --expo-in: linear( 0, 0.0085 31.26%, 0.0167 40.94%, 0.0289 48.86%, 0.0471 55.92%, 0.0717 61.99%, 0.1038 67.32%, 0.1443 72.07%, 0.1989 76.7%, 0.2659 80.89%, 0.3465 84.71%, 0.4419 88.22%, 0.554 91.48%, 0.6835 94.51%, 0.8316 97.34%, 1 );
  --expo-out: linear( 0, 0.1684 2.66%, 0.3165 5.49%, 0.446 8.52%, 0.5581 11.78%, 0.6535 15.29%, 0.7341 19.11%, 0.8011 23.3%, 0.8557 27.93%, 0.8962 32.68%, 0.9283 38.01%, 0.9529 44.08%, 0.9711 51.14%, 0.9833 59.06%, 0.9915 68.74%, 1 );
  --expo-in-out: linear( 0, 0.0053 17.18%, 0.0195 26.59%, 0.0326 30.31%, 0.0506 33.48%, 0.0744 36.25%, 0.1046 38.71%, 0.1798 42.62%, 0.2846 45.93%, 0.3991 48.37%, 0.6358 52.29%, 0.765 55.45%, 0.8622 59.3%, 0.8986 61.51%, 0.9279 63.97%, 0.9481 66.34%, 0.9641 69.01%, 0.9856 75.57%, 0.9957 84.37%, 1 );
  --circ-in: linear( -0, 0.0048 9.8%, 0.0192 19.5%, 0.043 29.02%, 0.0761 38.26%, 0.1181 47.13%, 0.1685 55.56%, 0.227 63.44%, 0.2929 70.71%, 0.3656 77.3%, 0.4445 83.15%, 0.5285 88.19%, 0.6173 92.39%, 0.7099 95.7%, 0.805 98.08%, 0.9021 99.52%, 1 );
  --circ-out: linear( 0, 0.0979 0.48%, 0.195 1.92%, 0.2901 4.3%, 0.3827 7.61%, 0.4715 11.81%, 0.5555 16.85%, 0.6344 22.7%, 0.7071 29.29%, 0.773 36.56%, 0.8315 44.44%, 0.8819 52.87%, 0.9239 61.74%, 0.957 70.98%, 0.9808 80.5%, 0.9952 90.2%, 1 );
  --circ-in-out: linear( -0, 0.0033 5.75%, 0.0132 11.43%, 0.0296 16.95%, 0.0522 22.25%, 0.0808 27.25%, 0.1149 31.89%, 0.1542 36.11%, 0.1981 39.85%, 0.2779 44.79%, 0.3654 48.15%, 0.4422 49.66%, 0.5807 50.66%, 0.6769 53.24%, 0.7253 55.37%, 0.7714 58.01%, 0.8142 61.11%, 0.8536 64.65%, 0.9158 72.23%, 0.9619 80.87%, 0.9904 90.25%, 1 );
  --sine-in: linear( 0, 0.0035, 0.0141 10.7%, 0.0318 16.09%, 0.0566 21.51%, 0.0885 26.98%, 0.1278 32.53%, 0.2288 43.93%, 0.3563 55.48%, 0.5171 67.92%, 0.7139 81.53%, 1 );
  --sine-out: linear( 0, 0.2861 18.47%, 0.4829 32.08%, 0.6437 44.52%, 0.7712 56.07%, 0.8722 67.47%, 0.9115 73.02%, 0.9434 78.49%, 0.9682 83.91%, 0.9859 89.3%, 0.9965, 1 );
  --sine-in-out: linear( 0, 0.007 5.35%, 0.0282 10.75%, 0.0638 16.26%, 0.1144 21.96%, 0.1833 28.16%, 0.2717 34.9%, 0.6868 62.19%, 0.775 68.54%, 0.8457 74.3%, 0.9141 81.07%, 0.9621 87.52%, 0.9905 93.8%, 1 );
  --back-in: linear( 0, -0.0029 4.31%, -0.0119 9.02%, -0.0838 31.27%, -0.0956 36.64%, -0.1 41.45%, -0.0953 47.03%, -0.0792 52.25%, -0.0512 57.19%, -0.0111 61.92%, 0.0512 67.19%, 0.131 72.27%, 0.2284 77.18%, 0.3443 81.96%, 0.479 86.62%, 0.6329 91.17%, 0.8065 95.63%, 1 );
  --back-out: linear( 0, 0.1935 4.37%, 0.3671 8.83%, 0.521 13.38%, 0.6557 18.04%, 0.7716 22.82%, 0.869 27.73%, 0.9488 32.81%, 1.0111 38.08%, 1.0512 42.81%, 1.0792 47.75%, 1.0953 52.97%, 1.1 58.55%, 1.0956 63.36%, 1.0838 68.73%, 1.0119 90.98%, 1.0029 95.69%, 1 );
  --back-in-out: linear( 0, -0.0077 5.2%, -0.0452 16.98%, -0.0493 22.35%, -0.0418 25.57%, -0.0258 28.57%, -0.0007 31.42%, 0.0335 34.15%, 0.1242 39.03%, 0.2505 43.65%, 0.3844 47.35%, 0.656 53.68%, 0.81 58.37%, 0.9282 63.52%, 0.9719 66.23%, 1.0055 69.04%, 1.0255 71.4%, 1.0396 73.87%, 1.0477 76.48%, 1.05 79.27%, 1.0419 84.36%, 1.0059 95.49%, 1 );
  --spring-1: linear(0, 0.006, 0.025 2.8%, 0.101 6.1%, 0.539 18.9%, 0.721 25.3%, 0.849 31.5%,0.937 38.1%, 0.968 41.8%, 0.991 45.7%, 1.006 50.1%, 1.015 55%, 1.017 63.9%,1.001);
  --spring-2: linear(0, 0.007, 0.029 2.2%, 0.118 4.7%, 0.625 14.4%, 0.826 19%, 0.902, 0.962,1.008 26.1%, 1.041 28.7%, 1.064 32.1%, 1.07 36%, 1.061 40.5%, 1.015 53.4%,0.999 61.6%, 0.995 71.2%, 1);
  --spring-3: linear(0, 0.009, 0.035 2.1%, 0.141 4.4%, 0.723 12.9%, 0.938 16.7%, 1.017, 1.077,1.121, 1.149 24.3%, 1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%,1.051 39.6%, 1.017 43.1%, 0.991, 0.977 51%, 0.974 53.8%, 0.975 57.1%,0.997 69.8%, 1.003 76.9%, 1);
  --spring-4: linear(0, 0.009, 0.037 1.7%, 0.153 3.6%, 0.776 10.3%, 1.001, 1.142 16%, 1.185, 1.209 19%, 1.215 19.9% 20.8%, 1.199, 1.165 25%, 1.056 30.3%, 1.008 33%, 0.973,0.955 39.2%, 0.953 41.1%, 0.957 43.3%, 0.998 53.3%, 1.009 59.1% 63.7%,0.998 78.9%, 1);
  --spring-5: linear(0, 0.01, 0.04 1.6%, 0.161 3.3%, 0.816 9.4%, 1.046, 1.189 14.4%, 1.231,1.254 17%, 1.259, 1.257 18.6%, 1.236, 1.194 22.3%, 1.057 27%, 0.999 29.4%,0.955 32.1%, 0.942, 0.935 34.9%, 0.933, 0.939 38.4%, 1 47.3%, 1.011,1.017 52.6%, 1.016 56.4%, 1 65.2%, 0.996 70.2%, 1.001 87.2%, 1);
  --bounce-1: linear(0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141, 0.191, 0.25, 0.316, 0.391 36.8%,0.563, 0.766, 1 58.8%, 0.946, 0.908 69.1%, 0.895, 0.885, 0.879, 0.878, 0.879,0.885, 0.895, 0.908 89.7%, 0.946, 1);
  --bounce-2: linear(0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141 15.1%, 0.25, 0.391, 0.562, 0.765,1, 0.892 45.2%, 0.849, 0.815, 0.788, 0.769, 0.757, 0.753, 0.757, 0.769, 0.788,0.815, 0.85, 0.892 75.2%, 1 80.2%, 0.973, 0.954, 0.943, 0.939, 0.943, 0.954,0.973, 1);
  --bounce-3: linear(0, 0.004, 0.016, 0.035, 0.062, 0.098, 0.141 11.4%, 0.25, 0.39, 0.562, 0.764,1 30.3%, 0.847 34.8%, 0.787, 0.737, 0.699, 0.672, 0.655, 0.65, 0.656, 0.672,0.699, 0.738, 0.787, 0.847 61.7%, 1 66.2%, 0.946, 0.908, 0.885 74.2%, 0.879,0.878, 0.879, 0.885 79.5%, 0.908, 0.946, 1 87.4%, 0.981, 0.968, 0.96, 0.957, 0.96, 0.968, 0.981, 1);
  --bounce-4: linear(0, 0.004, 0.016 3%, 0.062, 0.141, 0.25, 0.391, 0.562 18.2%, 1 24.3%, 0.81,0.676 32.3%, 0.629, 0.595, 0.575, 0.568, 0.575, 0.595, 0.629, 0.676 48.2%,0.811, 1 56.2%, 0.918, 0.86, 0.825, 0.814, 0.825, 0.86, 0.918, 1 77.2%,0.94 80.6%, 0.925, 0.92, 0.925, 0.94 87.5%, 1 90.9%, 0.974, 0.965, 0.974, 1);
  --bounce-5: linear(0, 0.004, 0.016 2.5%, 0.063, 0.141, 0.25 10.1%, 0.562, 1 20.2%, 0.783, 0.627,0.534 30.9%, 0.511, 0.503, 0.511, 0.534 38%, 0.627, 0.782, 1 48.7%, 0.892,0.815, 0.769 56.3%, 0.757, 0.753, 0.757, 0.769 61.3%, 0.815, 0.892, 1 68.8%,0.908 72.4%, 0.885, 0.878, 0.885, 0.908 79.4%, 1 83%, 0.954 85.5%, 0.943,0.939, 0.943, 0.954 90.5%, 1 93%, 0.977, 0.97, 0.977, 1);
}
```

这些缓动曲线会使你的动画更具动力感、重量感等，它们使动画与现实生活中的物体运动又更近了一层。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8478e8da0be496eaa081527216f619d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1428&h=758&s=1961042&e=gif&f=56&b=ffffff)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FbGzMOJM "https://codepen.io/web-dot-dev/full/bGzMOJM")

有关于 `linear()` 函数更详细的介绍，可以参阅《[Web 动画之旅](https://s.juejin.cn/ds/i8EaLoRb/ "https://s.juejin.cn/ds/i8EaLoRb/")》的《[使用 linear() 函数创建令人惊叹的动画曲线](https://juejin.cn/book/7288940354408022074/section/7301665456824254515 "https://juejin.cn/book/7288940354408022074/section/7301665456824254515")》！

### 👁️ Scrollend 事件

许多界面包含滚动互动，有时界面需要同步与当前滚动位置相关的信息，或根据当前状态提取数据。在 `scrollend` 事件之前，你必须使用不准确的超时方法，该方法可以在用户的手指仍在屏幕上时触发。借助 `scrollend` 事件，你可以实现精确计时的 `scrollend` 事件，了解用户是否仍在进行手势操作。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83ac847d31b64d11a2a58e517e63ddb9~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1664&h=822&s=375250&e=gif&f=139&b=ffffff)

> Demo 地址：[codepen.io/web-dot-dev…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fweb-dot-dev%2Ffull%2FOJdxKqJ "https://codepen.io/web-dot-dev/full/OJdxKqJ")

这对浏览器拥有非常重要，因为在滚动过程中，JavaScript 无法跟踪手指在屏幕上的存在，而相关信息就是无法获得。现在可以删除大量不准确的滚动结束尝试代码，并将其替换为浏览器拥有的高精确度事件。

> 有关于 `scrollend` 事件更详细的介绍，可以参阅 @Adam Argyle 的《[Scrollend（一种新的 JavaScript 事件）](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fscrollend-a-new-javascript-event "https://developer.chrome.com/blog/scrollend-a-new-javascript-event")》！

### 💯 滚动捕捉

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b723e2a5cf1946bc8b1345b7c660c3d2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=720&s=397928&e=png&b=381dbf)

其实[滚动捕捉](https://juejin.cn/book/7199571709102391328/section/7199846103007625227 "https://juejin.cn/book/7199571709102391328/section/7199846103007625227")并不是 2023 年刚得到支持的特性，但我还是将这个特性列入到这篇文章，主要原因之一，它的的确确可以帮助我们改善用户的体验，是一个非常不错，而且易用的特性。

CSS 滚动捕捉为我们提供了一种方法，**可以在用户滚动浏览文档时，将其滚动到特定的点（位置）** 。这对于在移动设备上，甚至在桌面端上为某些类型的应用程序（比如 `<Carousel>` 件）创造一个更类似于应用程序（原生客户端）的体验是很有帮助的。 简而言之，CSS 滚动捕捉可以：

- 防止滚动时出现尴尬的滚动位置 ；

- 创建更好的滚动体验 。

CSS 滚动捕捉相关的属性和 CSS 的 Flexbox、Grid 属性类似，分为**作用于容器（滚动容器）属性**和**作用于定位子项（滚动容器子元素）属性**。其中作用于滚动容器的属性主要有 `scroll-snap-type` 、 `scroll-padding` 和 `scroll-snap-stop` ；作用于定位子项的属性主要有 `scroll-margin` 和 `scroll-snap-align`。

现在，你可以将滚动捕捉和滚动驱动动画以及自定义滚动条相结合起来，就可以不依赖任何 JavaScript 实现下图这样的 3D 封面效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec80ae60efb541668da04beb8edab8f7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=980&h=426&s=15208114&e=gif&f=148&b=101010)

> Demo 地址：[codepen.io/airen/full/…](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fairen%2Ffull%2FyLZWJog "https://codepen.io/airen/full/yLZWJog")

大家需要知道的是，除了[滚动捕捉](https://juejin.cn/book/7199571709102391328/section/7199846103007625227 "https://juejin.cn/book/7199571709102391328/section/7199846103007625227")之外，还有其他的方式也可以提高用户的滚动体验。更详细的可以参阅《[防御式 CSS 精讲](https://s.juejin.cn/ds/i8EgL3qe/ "https://s.juejin.cn/ds/i8EgL3qe/")》中的《[CSS 如何改善滚动体验](https://juejin.cn/book/7199571709102391328/section/7199845609447096358 "https://juejin.cn/book/7199571709102391328/section/7199845609447096358")》、《[美化滚动条 UI：自定义滚动条 UI](https://juejin.cn/book/7199571709102391328/section/7199846155080400899 "https://juejin.cn/book/7199571709102391328/section/7199846155080400899")》和《[CSS 的滚动捕捉](https://juejin.cn/book/7199571709102391328/section/7199846103007625227 "https://juejin.cn/book/7199571709102391328/section/7199846103007625227")》！

### 往期回顾

首先我要声明的是，前面所介绍的内容是我自己觉得 2023 年 CSS 特性发展最快的部分！另外，上面内容有些是摘取 Chrome 团队刚发布的《[CSS Wrapped: 2023!](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fcss-wrapped-2023 "https://developer.chrome.com/blog/css-wrapped-2023")》，但我舍弃了组件部分的介绍，主要原因这部分内容更多的是与 HTML 有关。

其实，自 2020 年，我个人基本上有一个惯例，那就是每年都会发一篇有关于 CSS 新特性相关的总结性文章。如果你对往期内容感兴趣，可以阅读下面这些文章：

- [2020 年 CSS 有哪些新特性](https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3cplus.com%2Fcss%2Fwhat-is-new-css-2020.html "https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3cplus.com%2Fcss%2Fwhat-is-new-css-2020.html")

- [应用于下一代 Web 的样式](https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3cplus.com%2Fcss%2Fnext-generation-web-styling.html "https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3cplus.com%2Fcss%2Fnext-generation-web-styling.html")

- [2021 年你可能不知道的 CSS 特性](https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3cplus.com%2Fcss%2Fwhat-is-new-css-in-2021.html "https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3cplus.com%2Fcss%2Fwhat-is-new-css-in-2021.html")

- [2022 年的 CSS](https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3cplus.com%2Fcss%2Fwhat-is-new-css-in-2022.html "https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3cplus.com%2Fcss%2Fwhat-is-new-css-in-2022.html")

- [CSS In 2023](https://juejin.cn/post/7232187022399586362 "https://juejin.cn/post/7232187022399586362")

如果你也对 CSS 感兴趣，也可以关注我的小册：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/074f646b36054cb8b795204b1c0820ba~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2476&h=2040&s=1567133&e=jpg&b=d3deee)

- 《[现代 Web 布局](https://s.juejin.cn/ds/i8EpT1B3/ "https://s.juejin.cn/ds/i8EpT1B3/")》：主要讲述可用于 Web 布局的现代 CSS 特性

- 《[现代 CSS](https://s.juejin.cn/ds/i8Epcmfe/ "https://s.juejin.cn/ds/i8Epcmfe/")》：主要讲述 CSS 领域最新特性，前面所介绍的特性，基本上在该小册中能找到

- 《[Web 动画之旅](https://s.juejin.cn/ds/i8EpQB3s/ "https://s.juejin.cn/ds/i8EpQB3s/")》：主要讲述如何制作 Web 动画，从理论、设计原则到实战，如果你喜欢动画的话，那这本小册的内容你肯定会喜欢

- 《[防御式 CSS 精讲](https://s.juejin.cn/ds/i8EgL3qe/ "https://s.juejin.cn/ds/i8EgL3qe/")》：主要讲述我们在编写 CSS 的时候，应该以“万一”的心理来编写。该小册也称得上是 CSS 技巧集锦，可以实实大大的帮助你解决很多生产中碰到的 CSS 问题

### 写在最后

CSS 在过去几年内（尤其是在 2023 年）大获成功。如果你对 CSS 感兴趣，或者想提高这方面的技能以及想最及时获得 CSS 最新特性。那么请关注我！我将带你领略不一样的 CSS!
