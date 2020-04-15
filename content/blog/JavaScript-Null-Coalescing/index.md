---
title: Nullish Coalescing in JavaScript
date: "2020-04-14T05:47:32.169Z"
featuredImage: "./featured-image.jpg"
type: post
description: Taking a dive into the ES2020 Nullish Coalescing operator.
published: true
altText: bird's eye view of concrete crossroads
---

Hey there! It's been a while since I wrote an article; kinda had a writer's block. Well, I just recently learned about a really cool _thing_ in our beloved JavaScript and I thought it would be nice to share.

Today we'd be talking about <b>Nullish Coalescing</b> in JavaScript. The nullish coalescing operator (??) is considered a logical operator - much like the 'OR' (||), 'AND' (&&) and 'NOT' (!) operators - that returns the right side operand if _and only if_ the operand on the left-hand side has a **null** or **undefined** value. It is quite similar to the 'OR' operator, but with a significant difference which we will get to soon enough.

To see this in action, let's consider the code below:
```js
// for null values
let x = null;
let y = x ?? 'defaultValue'
console.log(y)  //returns 'defaultValue'

//for undefined values
let m = undefined
let n = m ?? 'defaultValue'
console.log(n)  //returns 'defaultValue'
```

This also works if the left-hand side operand has been declared but not yet assigned a value as this is also an undefined value, like in the example below.

```js
let f
let g = f ?? 'defaultValue'
console.log(g)  //returns 'defaultValue'
```
As I mentioned, the nullish operator is somewhat similar to the OR operator except for an important difference. The OR operator returns the right-hand side operand for not just null and undefined values but _also_ for falsy values. Consider the code below:
```js
// with nullish operator
let a = false
let b = a ?? 'defaultValue'
console.log(b) //returns false

//with OR operator
let k = false //also works with 0
let l = a || 'defaultValue'
console.log(b) //returns 'defaultValue'
```

You might be wondering what the use case for this is, let's consider the code block below:
```jsx
import React from 'react';
const profile = {
    numberOfPosts: 0,
    username: '',
}
let displayNumberOfPosts = numberOfPosts || 'An error occured while fetching data';
export const Example = () => {
    return <p>{displayNumberOfPosts}</p>
}

```
The above returns `<p>An error occured while fetching data</p>` because 0 is a _falsy_ value hence the OR operator returns the right hand side operand, in this case being 'An error occured while fetching data' which is unintended.
The desired result could be achieved by using the nullish coalescing operator as thus:
```js
import React from 'react';
const profile = {
    numberOfPosts: 0,
    username: '',
}
let displayNumberOfPosts = numberOfPosts ?? 'An error occured while fetching data';
export const Example = () => {
    return <p>{displayNumberOfPosts}</p>
}
```
The above will return `<p>0</p>` as the operator returns the right-hand side operand only if the left-hand side is a nullish value, and not a _falsy_ one.

The nullish coalescing operator is currently a stage four proposal for ES2020 which is the [last stage for the TC39 process](https://tc39.es/process-document/) and I'm sure we can't wait to start using it soon in the next version of JavaScript.

Thanks for taking the time to read this article.  I will be writing even more; stay tuned!

