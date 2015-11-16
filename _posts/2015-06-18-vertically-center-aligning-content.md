---
layout: post
title: Vertically Center Aligning Content with CSS
tags: [CSS, vertical aligning]
date: 2015-06-18 15:23:42
---

One of the most frustrating limitations of less-than-modern browsers is their
inability to easily vertically center align content. I'm not the first to write
about this, and there are many different strategies out there already. I've tried
several over the years, looking for an as-close-as-possible pure CSS solution that
is cross-browser compatible (I'm one of the unlucky ones who still needs to support
IE8). Flexbox has solved this issue for the latest modern browser versions,
but cross-browser support is still too lacking for me to implement it in my work.
I think I've arrived at a good solution that relies almost entirely on CSS and
only requires minimal JS to handle IE8 and cases when the content's height
exceeds the height of its container.

##An Overview of the solution

My solution relies on using absolute positioning and 2D transformations to vertically
center content using nothing but CSS. For browsers that don't support the `transform`
property (IE8, Opera Mini), I'm using JS to set a negative `margin-top`. And to handle edge cases
where the content height is greater than the container height, I'm using JS to
set the `min-height` property of the container to be equivalent to the content height.

##More details

Here's a simplistic example of how you might implement this solution.

###Markup

{% highlight html %}
<div class="container">
  <div class="content">
    [content goes here]
  </div>
</div>
{% endhighlight %}

###CSS

{% highlight css %}
.container {
  height: 100vh; /* or whatever height you want the container to be */
  position: relative;
}

.content {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
}
{% endhighlight %}

###Javascript

{% highlight js %}
// Function to set min-height of container
var setMinHeight = function() {
  $('.content').each(function() {
    $(this).parent().css('min-height', $(this).outerHeight(true));
  });
}

// Call that function on load
setMinHeight();

// Recalculate min-height on window resize
$(window).on('resize', setMinHeight);
{% endhighlight %}
