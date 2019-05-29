# Wheat House Rating

A simple vanilla JS web component used to create a rating experience for the end user.

## Installation

npm install wh-rating

## Usage

```
<wh-rating id="rating" value="25" number-of-icons="5"></wh-rating>
```

The initial value and number of icons can be specified as inputs. The default values are 0 and 5 respectively.

To catch an event, add a change event listener to the wh-rating element and inspect the target's value to get the percentage of the rating.

```
var $whRating = document.getElementById('wh-rating');
$whRating.addEventListener('change', (event) => {        
  console.log('Got change: ' + event.target.value);
});
```

Optionally, you may specify that the value defaults to the nearest whole rating value. For example, with 5 icons, the rating will default to a multiple of 20 rather than an exact percentage based on the user's input.

```
<wh-rating id="rating" use-multiples></wh-rating>
```
