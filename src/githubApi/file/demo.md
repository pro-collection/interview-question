**关键词**：html 语义化标签

在 HTML 中，语义化标签是具有明确含义的标签，它们可以更好地描述网页的结构和内容，提高代码的可读性、可维护性以及对搜索引擎的优化。以下是一些常见的语义化标签：

**一、文档结构相关标签**

1. `<header>`：

   - 定义文档的页眉部分，通常包含网站的标志、导航栏、搜索框等。
   - 例如：
     ```html
     <header>
       <h1>My Website</h1>
       <nav>
         <ul>
           <li><a href="#">Home</a></li>
           <li><a href="#">About</a></li>
           <li><a href="#">Contact</a></li>
         </ul>
       </nav>
     </header>
     ```

2. `<nav>`：

   - 用于定义导航链接的部分，可以包含网站的主要导航菜单、侧边栏导航等。
   - 例如：
     ```html
     <nav>
       <ul>
         <li><a href="#">Page 1</a></li>
         <li><a href="#">Page 2</a></li>
         <li><a href="#">Page 3</a></li>
       </ul>
     </nav>
     ```

3. `<footer>`：

   - 定义文档的页脚部分，通常包含版权信息、联系方式、相关链接等。
   - 例如：
     ```html
     <footer>
       <p>Copyright © 2024. All rights reserved.</p>
     </footer>
     ```

4. `<main>`：
   - 表示文档的主要内容部分，每个页面应该只有一个`<main>`元素。
   - 例如：
     ```html
     <main>
       <article>
         <h2>Article Title</h2>
         <p>Article content goes here.</p>
       </article>
     </main>
     ```

**二、内容组织相关标签**

1. `<article>`：

   - 表示一个独立的、完整的内容块，如一篇博客文章、新闻报道、论坛帖子等。
   - 例如：
     ```html
     <article>
       <h2>News Article</h2>
       <p>Article text here.</p>
     </article>
     ```

2. `<section>`：

   - 用于对页面内容进行分组和划分，通常包含一个主题相关的内容块。
   - 例如：
     ```html
     <section>
       <h2>Section Title</h2>
       <p>Section content goes here.</p>
     </section>
     ```

3. `<aside>`：
   - 表示与主要内容相关但可以独立存在的侧边栏内容，如广告、相关链接、注释等。
   - 例如：
     ```html
     <main>
       <article>
         <h2>Main Article</h2>
         <p>Article content.</p>
       </article>
       <aside>
         <h3>Related Links</h3>
         <ul>
           <li><a href="#">Link 1</a></li>
           <li><a href="#">Link 2</a></li>
         </ul>
       </aside>
     </main>
     ```

**三、文本内容相关标签**

1. `<h1>`到`<h6>`：

   - 标题标签，用于表示不同级别的标题，`<h1>`为最高级别，`<h6>`为最低级别。
   - 例如：
     ```html
     <h1>Main Title</h1>
     <h2>Subtitle</h2>
     ```

2. `<p>`：

   - 段落标签，用于包含文本段落。
   - 例如：
     ```html
     <p>This is a paragraph of text.</p>
     ```

3. `<strong>`和`<em>`：

   - `<strong>`用于表示强烈强调的文本，通常显示为粗体。`<em>`用于表示强调的文本，通常显示为斜体。
   - 例如：
     ```html
     <p>This is <strong>very important</strong> text. And this is <em>emphasized</em> text.</p>
     ```

4. `<blockquote>`：

   - 引用块标签，用于引用大段的文本内容。
   - 例如：
     ```html
     <blockquote>
       <p>“This is a long quote from someone.”</p>
     </blockquote>
     ```

5. `<q>`：
   - 短引用标签，用于引用简短的文本内容，通常会自动加上引号。
   - 例如：
     ```html
     <p>He said, <q>Hello!</q></p>
     ```
