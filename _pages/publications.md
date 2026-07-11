---
layout: page
permalink: /publications/
title: publications
description: Publications by reverse chronological order.
nav: true
nav_order: 2
---

<link rel="stylesheet" href="{{ '/assets/css/site-polish.css' | relative_url }}">

<div class="wd-page-shell wd-publication-frame">
  <section class="wd-page-hero" aria-labelledby="wd-publications-title">
    <h1 id="wd-publications-title">Publications</h1>
    <p>Research papers are listed in reverse chronological order. Author highlighting and publication metadata are managed through BibTeX for easier long-term updates.</p>
  </section>

  {% include bib_search.liquid %}

  <div class="publications">

  {% bibliography %}

  </div>
</div>
