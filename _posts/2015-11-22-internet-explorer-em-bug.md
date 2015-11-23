---
layout: post
title: "Internet Explorer bug involving em units in before and after pseudo elements"
date: 2015-11-22 20:17:00
tags: ['internet explorer', 'bugs', 'css']
---

I ran into a frustrating bug in Internet Explorer the other week, and I wanted
to document it here, both for my own recollection and just in case someone
else stumbles upon this post and finds it helpful.

Basically, Internet Explorer versions 9-11 have a bug that ignores precedence rules
and multiplies together the value of font-size declarations inside of `:before` and
`:after` pseudo-elements when declared in `ems`. Take the following example:

{% highlight css %}
blockquote:before {
  content: "\201c";
  font-size: 3.25em;
}

@media (min-width: 30em) {
  blockquote:before {
    font-size: 4.375em;
  }
}
{% endhighlight %}

Here, all `blockquote` elements are preceded by a large opening quotation mark.
On small screens (below 30em) the font size should be 3.25em, and on any
screen larger than 30em the font size should be 4.375em. The second declaration
should take precedence over the first. However, IE 9-11 multiplies the em values
together, so you end up with a quotation mark that's 14.21875em instead!

There's an [open ticket for this bug](https://connect.microsoft.com/IE/feedback/details/813398/ie-11-css-before-with-font-size-in-em-units-ignores-css-precedence-rules), but it doesn't seem to be going anywhere. For now, the only
solution is to use a unit other than ems. Booo Internet Explorer!
