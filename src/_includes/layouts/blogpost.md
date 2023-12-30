---
layout: layouts/main.njk
---
<article>
{% if cover %}
  {% image cover, "Post Cover" %}
{% endif %}

# {{title}}

{{content | safe}}
</article>