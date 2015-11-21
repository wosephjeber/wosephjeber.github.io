---
layout: post
title: "Today I Learned: Rendering View and Layout in Rails"
date: 2015-11-15 9:15:00
tags: ['rails', 'today I learned']
---

It's possible to specify both the view and the layout when calling the `render` method in a Rails controller. Most examples of using the `render` method (at least that I've seen) only show how to specify the view, defaulting to the layout defined for the whole controller or application:

{% highlight ruby %}
# renders the specified view within the layout defined at the controller level
render 'view_name'
{% endhighlight %}

But there may be times when you want a few controller methods to render a view within a different layout. You can accomplish that with:

{% highlight ruby %}
# renders the specified view within the specified layout
render 'view_name', layout: 'layout_name'
{% endhighlight %}

Or, if the view is named following Rails conventions (matching the controller method name), you can just use:

{% highlight ruby %}
# render the default view within the specified layout
render layout: 'layout_name'
{% endhighlight %}
