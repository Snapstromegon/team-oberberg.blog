---
layout: layouts/main.njk
eleventyNavigation:
  key: Blog
  order: 2
pagination:
  data: collections.blogposts
  size: 10
  alias: blogposts
  reverse: true
---

<ul class="blogpostList">
  {% for blogpost in blogposts %}
  <li>
    <a href="{{ blogpost.url }}">
      <article class="blogpost card card-hover">
        {% image blogpost.data.cover, "Post Cover Image" %}
        <p class="post_date">{{ blogpost.date | niceDate }}</p>
        <h2 class="post_title">{{ blogpost.data.title }}</h2>
    <div class="post_abstract">
    
{{ blogpost.data.abstract }}

</div>
      </article>
    </a>
  </li>
  {% endfor %}
</ul>

{%if pagination.href.previous%}[Neuere Posts]({{pagination.href.previous}}){%endif%}
{%if pagination.href.next%}[Ältere Posts]({{pagination.href.next}}){%endif%}