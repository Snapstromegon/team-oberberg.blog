---
layout: layouts/main.njk
---
<article>
{% image cover, "Post Cover" %}

# {{title}}

{{content | safe}}
</article>