---
layout: page
permalink: /publications/
title: 论文
description: Publications by reverse chronological order.
nav: true
nav_order: 2
---

<link rel="stylesheet" href="{{ '/assets/css/site-polish-v5.css' | relative_url }}">
<script defer src="{{ '/assets/js/lang-toggle.js' | relative_url }}"></script>

<div class="wd-page-shell wd-publication-frame">
  <section class="wd-page-hero" aria-labelledby="wd-publications-title">
    <h1 id="wd-publications-title" data-zh="论文成果" data-en="Publications">论文成果</h1>
    <p data-zh="论文按时间倒序整理。作者高亮、链接和 BibTeX 信息通过 al-folio 的 BibTeX 管理方式维护。" data-en="Research papers are listed in reverse chronological order. Author highlighting and publication metadata are managed through BibTeX for easier long-term updates.">论文按时间倒序整理。作者高亮、链接和 BibTeX 信息通过 al-folio 的 BibTeX 管理方式维护。</p>
  </section>

  <section class="wd-coauthor-panel" aria-labelledby="wd-coauthor-title">
    <div class="wd-coauthor-head">
      <div>
        <h2 id="wd-coauthor-title" data-zh="合著者统计" data-en="Coauthor Statistics">合著者统计</h2>
        <p data-zh="基于当前已收录论文统计合著者出现次数。" data-en="Counts are based on the publications currently listed on this page.">基于当前已收录论文统计合著者出现次数。</p>
      </div>
      <div class="wd-coauthor-tabs" aria-label="Coauthor statistics tabs">
        <span class="is-active" data-zh="合著者" data-en="Coauthors">合著者</span>
        <span data-zh="论文数" data-en="Papers">论文数</span>
      </div>
    </div>
    <div class="wd-coauthor-list">
      <div class="wd-coauthor-row">
        <span class="wd-coauthor-avatar" aria-hidden="true">WM</span>
        <strong>Wenjia Meng</strong>
        <span data-zh="合著论文数" data-en="Coauthored papers">合著论文数</span>
        <b>1</b>
      </div>
      <div class="wd-coauthor-row">
        <span class="wd-coauthor-avatar" aria-hidden="true">ZZ</span>
        <strong>Zhengzhe Zhang</strong>
        <span data-zh="合著论文数" data-en="Coauthored papers">合著论文数</span>
        <b>1</b>
      </div>
      <div class="wd-coauthor-row">
        <span class="wd-coauthor-avatar" aria-hidden="true">YY</span>
        <strong>Yilong Yin</strong>
        <span data-zh="合著论文数" data-en="Coauthored papers">合著论文数</span>
        <b>1</b>
      </div>
      <div class="wd-coauthor-row">
        <span class="wd-coauthor-avatar" aria-hidden="true">XL</span>
        <strong>Xiankai Lu</strong>
        <span data-zh="合著论文数" data-en="Coauthored papers">合著论文数</span>
        <b>1</b>
      </div>
    </div>
  </section>

{% include bib_search.liquid %}

  <div class="publications">

{% bibliography %}

  </div>
</div>
