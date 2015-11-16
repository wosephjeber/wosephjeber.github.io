---
layout: post
title: Accessing clipboard data with Javascript
date: 2015-11-12 10:30:00
tags: javascript
---

You can access clipboard data after user input, but of course, it doesn't work the same way in every browser. Internet Explorer, I'm looking at you.

In Chrome, Safari, and Firefox, the `clipboardData` object is passed along with the event data. So you can access it with:

{% highlight javascript %}
// via jQuery
$('.content-editable-div').on('paste', function(e) {
  e.originalEvent.clipboardData;
});

// plain Javascript (IE9+ and modern browsers)
document.querySelector('.content-editable-div').addEventListener('paste', function(e) {
  e.clipboardData;
});
{% endhighlight %}

In Internet Explorer, the event data doesn't contain the clipboardData. However, the clipboardData is accessible via the `window` object. So, to normalize access to the clipboardData object, you could use:

{% highlight javascript %}
// via jQuery
$('.content-editable-div').on('paste', function(e) {
  var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
});

// plain Javascript (IE9+ and modern browsers)
document.querySelector('.content-editable-div').addEventListener('paste', function(e) {
  var clipboardData = e.clipboardData || window.clipboardData;
});
{% endhighlight %}
