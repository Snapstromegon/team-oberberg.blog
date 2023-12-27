---
layout: layouts/main.njk
eleventyNavigation:
  key: Blog
  order: 2
---

<ul class="blogpostList">
  {% for blogpost in collections.blogposts | reverse %}
  <li>
    <a href="{{ blogpost.url }}">
      <article class="card card-hover">
        {% image blogpost.data.cover, "Post Cover Image" %}
        <p class="post_date">{{ blogpost.date | niceDate }}</p>
        <h2 class="post_title">{{ blogpost.data.title }}</h2>
        <p class="post_abstract">{{ blogpost.data.abstract }}</p>
      </article>
    </a>
  </li>
  {% endfor %}
</ul>