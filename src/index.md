---
layout: layouts/main.njk
eleventyNavigation:
  key: Start
  order: 1
---

An der diesjährigen UNICON 18 - Unicycling Worldchampionships 2016 im spanischen Donostia-San Sebastián nehmen vier Sportler/innen der Einrad-Wettkampfgruppe "All Stars on(e) Wheel" vom "TuS Reichshof" teil. Über unsere sportlichen Leistungen und Erlebnisse wollen wir Euch in diesem Blog auf dem Laufenden halten.

## Neuster Blogeintrag

### {{(collections.blogposts | last).data.title}}

Datum: {{(collections.blogposts | last).date | niceDate}}

{{(collections.blogposts | last).data.abstract}}

## Unsere Team für die USA

<section class="fahrer-cards">
  {%for fahrer in collections.fahrer%}
  <a href="{{fahrer.url}}" class="card fahrer card-hover">
    <h3 class="name">{{ fahrer.data.name }}</h3>
    <h4 class="team">SSV Nümbrecht</h4>
    <div class="stats">
      <span class="age label">Alter</span>
      <span class="age value">{{fahrer.data.birthday | age}}</span>
      <span class="prevWM label"># WM</span>
      <span class="prevWM value">{{fahrer.data.previousWMs}}</span>
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
