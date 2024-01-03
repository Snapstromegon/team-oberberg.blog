---
layout: layouts/main.njk
eleventyNavigation:
  key: Start
  order: 1
---

{{settings.teaserText}}

## Der WM-Weg

<section class="timeline">
  {% for event in collections.events -%}
    {%- if event.data.unpublished -%}
      <div class="timeline-entry future">
        <span class="date">{{event.data.displayDate | default(event.date | niceDate)}}</span>
        <span class="title">{{event.data.title}}</span>
      </div>
    {%- else -%}
      <a href="{{event.url}}" class="timeline-entry">
        <span class="date">{{event.data.displayDate | default(event.date | niceDate)}}</span>
        <span class="title">{{event.data.title}}</span>
      </a>
    {%- endif -%}
  {%- endfor %}
</section>

## Neuster Blogeintrag
{% set newestPost = collections.blogposts | last %}
<a href="{{ newestPost.url }}">
  <article class="blogpost card card-hover">
    {% image newestPost.data.cover, "Post Cover Image", "(min-width: 35rem) 35rem, 100vw" %}
    <p class="post_date">{{ newestPost.date | niceDate }}</p>
    <h2 class="post_title">{{ newestPost.data.title }}</h2>
    <div class="post_abstract">
    
{{ newestPost.data.abstract }}

</div>
  </article>
</a>

## Unser Team für die USA

<section class="fahrer-cards">
  {%for fahrer in collections.fahrer | sortByStartNo%}
  <a href="{{fahrer.url}}" class="card fahrer card-hover">
    <h3 class="name">#&thinsp;{{fahrer.data.startNo}} {{ fahrer.data.name }}</h3>
    <div class="team">
    {%- for team in fahrer.data.teams -%}
    <h4>{{team}}</h4>
    {%- endfor %}
    </div>
    <div class="stats">
      <span class="age label">Alter</span>
      <span class="age value">{{fahrer.data.birthday | age}}</span>
      <span class="prevWM label"># WM</span>
      <span class="prevWM value">{{fahrer.data.wm}}</span>
      <span class="top3 label">Top 3 22/23</span>
      <span class="top3 value">{{fahrer.data.top3since2022}}</span>
      {%- if fahrer.data.top10inWM > 0 %}
      <span class="top10 label">Top 10 WM</span>
      <span class="top10 value">{{fahrer.data.top10inWM}}</span>
      {% endif -%}
    </div>
    {% image fahrer.data.image, fahrer.data.name %}
  </a>
  {%endfor%}
</section>
