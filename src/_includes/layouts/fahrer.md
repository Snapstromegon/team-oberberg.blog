---
layout: layouts/main.njk
---

<div class="card fahrer">
  <h3 class="name">#&thinsp;{{startNo}} {{ name }}</h3>
  <div class="team">
  {%- for team in teams -%}
  <h4>{{team}}</h4>
  {%- endfor %}
  </div>
  <div class="stats">
    <span class="age label">Alter</span>
    <span class="age value">{{birthday | age}}</span>
    <span class="prevWM label"># WM</span>
    <span class="prevWM value">{{wm}}</span>
    {%- if biggestAchievement -%}
    <span class="biggestAchievement label">Mein größter Erfolg</span>
    <span class="biggestAchievement value">{{biggestAchievement}}</span>
    {%- endif -%}
  </div>
  {% image image, name %}
</div>
  <a href="https://instagram.com/{{instagram}}" class="insta">{% image "assets/img/logos/Instagram_Glyph_Gradient.png", "Instagram Logo", "3rem"%}</a>

{% if cite %}

> {{cite}}

{% endif %}

## Meine Wettkämpfe

<ul class="competition-calendar">
{% for day in competitionsByDay %}
  <li class="card">
    <p class="date">{{day.day | niceDate}}</p>
    <ul>
  {%-for competition in day.competitions-%}
      <li>{{competition.name}}</li>
  {%-endfor-%}
    </ul>
  </li>
{% endfor %}
</ul>

{{content | safe}}
