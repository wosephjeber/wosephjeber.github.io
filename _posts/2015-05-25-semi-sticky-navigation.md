---
layout: post
title: "Semi-sticky Navigation"
tags: [javascript, navigation]
date: 2015-05-25 21:43:42
---

I've been working on a proof-of-concept for a fixed navigation bar that is partially
hidden/revealed in response to the scroll direction. I don't know what the correct term is
for this type of navigation interaction, so for now I'm calling it "semi-sticky".

##The Backstory

We're working on a fully-responsive redesign of opportunity.org, and one of the
biggest challenges has been to redesign the navigation. The design we've landed
on calls for two rows of links. The main navigation links and donate button are on the bottom
row, and some secondary actions (view your donation basket, log in, sign up for
our email newsletter, etc.) are on the top row. We want the navigation to be fixed,
but the new design requires more vertical space than the original and we don't want it
to take up too much real estate as you are scrolling down the page. 

The solution we're looking at involves hiding the row of secondary actions as
the user scrolls down, and revealing the row as they scroll up. This way the
main navigation is always visible, but the secondary actions are easily accessible.
This is a similar interaction to the navigation bar on Facebook's iPhone app,
but the difference here is that only the top row is hidden/revealed with our implementation.
The main navigation links are always visible and stick to the top of the window
as the secondary row "scrolls" with the rest of the document.

##The Result

The first step was to create a proof-of-concept. I'm pretty pleased that in
just 2 hours, with 40 lines of Javascript, I was able to make it happen.

The script attaches to the `scroll` event and  modifies the CSS `top` property of the
`nav` element.

I've defined three states that the navigation can have: `"fixed"`, `"scrolling"`,
and `"hidden"`. The nav is `"fixed"` when the secondary links are fully visible,
`"hidden"` when the secondary links are fully hidden, and `"scrolling"` when
it's in between those two states (i.e. the secondary links are being hidden/revealed).

The scroll handler first checks to see if the designated scroll threshold has been
reached. In this case, I've arbitrarily set the threshold to 50px, meaning that
the hide/reveal interaction won't start until the user has scrolled up or down
50px.

If the threshold has been reached, it determines whether the user is scrolling up
or down. I'm accomplishing this by caching the previous scroll position in a variable
and comparing it to the new scroll position after the scroll event fires. The difference
between the two is stored in a variable named `delta`. The `delta` is positive when
the user scrolls up and negative when the user scrolls down.

If the user is scrolling down, and the nav state is not already `"hidden"`, then
the `currentOffsetAmount` of the navigation element is updated according to the `delta`,
being sure to max out at the `offsetLimit`. When the `currentOffsetAmount` reaches
the `offsetLimit`, the state is changed to `"hidden"` and the threshold counter is reset.

Likewise, if the user is scrolling up and the nav state is not already `"fixed"`, then
the `currentOffsetAmount` is combined with the `delta`, bottoming out at `0`, i.e.
no offset. When the `currentOffsetAmount` reaches 0, the state is changed to `"fixed"`
and the threshold counter is reset.

A CodePen of the proof-of-concept is below.

<p data-height="400" data-theme-id="15440" data-slug-hash="xGRGEL" data-default-tab="result" data-user="wosephjeber" class='codepen'>See the Pen <a href='http://codepen.io/wosephjeber/pen/xGRGEL/'>Semi-sticky Navigation</a> by Joe Weber (<a href='http://codepen.io/wosephjeber'>@wosephjeber</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
