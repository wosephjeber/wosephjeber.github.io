---
layout: post
title: "A smoothie recipe in code"
date: 2015-11-30 20:51:00
tags: ['recipe', 'javascript']
---

I made a delicious smoothie this morning and thought I would share the recipe
with you:

{% highlight javascript %}

var servings = 2;

var banana = new Ingredient({
  type: 'banana',
  quantity: 1
});

var yogurt = new Ingredient({
  type: 'yogurt',
  quantity: 1,
  unit: 'cup'
});

var spinach = new Ingredient({
  type: 'spinach',
  quantity: 0.5,
  unit: 'cup'
});

var pineapple = new Ingredient({
  type: 'frozen pineapple',
  quantity: 1,
  unit: 'cup'
});

var blueberry = new Ingredient({
  type: 'frozen blueberry',
  quantity: 1,
  unit: 'cup'
});

var orangeJuice = new Ingredient({
  type: 'orange juice',
  quantity: 12,
  unit: 'oz'
});

var blender = new Blender();

blender.add([banana, yogurt, spinach, pineapple, blueberry, orangeJuice]);
blender.blend({
  setting: 'high',
  time: '45s'
});

var cup;

for (i = 0; i < servings; i++) {
  cup = new Cup({
    size: '16oz'
  });
  
  blender.pour('16oz').into(cup);
}

{% endhighlight %}
