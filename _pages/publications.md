---
layout: page
permalink: /publications/
title: 论文
description: Publications by reverse chronological order.
nav: true
nav_order: 2
---

<link rel="stylesheet" href="{{ '/assets/css/site-polish-v2.css' | relative_url }}">
<script defer src="{{ '/assets/js/lang-toggle.js' | relative_url }}"></script>

<div class="wd-page-shell wd-publication-frame">
  <section class="wd-page-hero" aria-labelledby="wd-publications-title">
    <h1 id="wd-publications-title" data-zh="论文成果" data-en="Publications">论文成果</h1>
    <p data-zh="论文按时间倒序整理。作者高亮、链接和 BibTeX 信息通过 al-folio 的 BibTeX 管理方式维护。" data-en="Research papers are listed in reverse chronological order. Author highlighting and publication metadata are managed through BibTeX for easier long-term updates.">论文按时间倒序整理。作者高亮、链接和 BibTeX 信息通过 al-folio 的 BibTeX 管理方式维护。</p>
  </section>

{% include bib_search.liquid %}

  <div class="publications">

{% bibliography %}

  </div>
</div>
