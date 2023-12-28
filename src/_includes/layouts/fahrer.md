---
layout: layouts/main.njk
---

<div class="card fahrer">
  <h3 class="name">{{ name }}</h3>
  <div class="team">
  {%- for team in teams -%}
  <h4>{{team}}</h4>
  {%- endfor %}
  </div>
  <div class="stats">
    <span class="age label">Alter</span>
    <span class="age value">{{birthday | age}}</span>
    <span class="prevWM label"># WM</span>
    <span class="prevWM value">{{previousWMs}}</span>
    <span class="top3 label">Top 3 22/23</span>
    <span class="top3 value">{{top3since2022}}</span>
    {%- if top10inWM > 0 %}
    <span class="top10 label">Top 10 WM</span>
    <span class="top10 value">{{top10inWM}}</span>
    {% endif -%}
  </div>
  {% image image, name %}
</div>

{% if cite %}
> {{cite}}
{% endif %}

{{content | safe}}
