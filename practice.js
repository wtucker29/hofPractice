// This repo is optional extra practice to use the underscore functions.
// Here we'll be writing new functions, but these functions will use
// the underscore functions within them.

// If you would like to take a look at the inputs that are passed into these functions, please
// feel free to check out the data.js file.

/*
 *
 *  _.each
 *
 */

// use _.each to create a copy of the given array.
var moreFruits = function (fruits) {
  var results = [];

  _.each(fruits, function(fruit, index, collection) {
    results.push(fruit);
  });

  return results;
};

// use _.each to traverse the number array and determine
// which are multiples of five.
var multiplesOfFive = function (numbers) {
  // use _.each to access the number array
  var countOf5 = 0;
  _.each(numbers, function(number, index, collection) {

    if (number % 5 === 0) {
      countOf5 += 1;
      var result = number;
    }
  });

  if (countOf5 === 1) {
    return result;
  } else if (countOf5 > 1) {
    return countOf5;
  }

};

// use _.each to build an array containing only tweets belonging to a specified user.
var getUserTweets = function(tweets, user) {
  var userArray = [];
  // use _.each to access tweets array/object
  _.each(tweets, function(tweet, index, collection) {
    if (tweet['user'] === user) {
      userArray.push(tweet);
    }
  });

  return userArray;
};

/*
 *
 *  _.filter
 *
 */

// use _.filter to return the fruits array with only the desired fruit.
var onlyOneFruit = function (fruits, targetFruit) {
  var testFruit = function(fruit) {
    return fruit === targetFruit;
  };
  var result = _.filter(fruits, testFruit);
  return result;
};

// use _.filter to return the fruits array with only fruits
// starting with the letter 'P'.
var startsWith = function (fruits, letter) {
  var testFruit = function(fruit) {
    return letter === fruit[0];
  };

  var result = _.filter(fruits, testFruit);
  return result;
};

// return a filtered array containing only cookie-type desserts.
var cookiesOnly = function (desserts) {
  var testCookie = function(dessert) {
    return dessert['type'] === 'cookie';
  };

  var result = _.filter(desserts, testCookie);
  return result;
};

// rebuild the getUserTweets function from above with _.filter instead
var filterUserTweets = function(tweets, user) {
  var testTweet = function(tweet) {
    return tweet['user'] === user;
  };

  var result = _.filter(tweets, testTweet);
  return result;
};

/*
 *
 *  _.map
 *
 */

// given an array of strings, use _.map to return a new array containing all
// strings converted to uppercase letters.
var upperCaseFruits = function (fruits) {
  var upper = function(fruit) {
    return fruit.toUpperCase();
  };

  var result = _.map(fruits, upper);
  return result;
};

// given an array of dessert objects, return a new array of objects
// that have a new "glutenFree" property, with a boolean value.
// TIP: Items that contain flour are not gluten-free.
var glutenFree = function (desserts) {
  var gluten = function(dessert) {
    if (dessert['ingredients'] === 'flour') {
      dessert['glutenFree'] = false;
      return dessert;
    } else {
      dessert['glutenFree'] = true;
      return dessert;
    }
  };

  var result = _.map(desserts, gluten);
  return result;
};

// given an array of tweet objects, return a new array of strings
// containing only the message properties.
var allUserMessages = function(tweets) {
  var messages = function(tweet) {
    return tweet['message'];
  };

  var result = _.map(tweets, messages);
  return result;
};

// use _.map to return an array of items with their sale prices, with a new property
// containing the sale price. round any decimals to 2 places.
//
// having trouble with decimals? check out this article:
// http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html
//
/*

 example output:
  var salePrices = applyCoupon(groceries, 0.20);
  [
    {
      id: 1,
      product: 'Olive Oil',
      price: '$12.1',
      salePrice: '$9.68'
    }
  ];

*/
var applyCoupon = function (groceries, coupon) {
  var applied = function(item) {
    var priceOnly = parseFloat((item['price'].substring(1)));
    var adjustedSale = priceOnly - (priceOnly * coupon);
    adjustedSale = Math.round(adjustedSale * 100) / 100;
    item['salePrice'] = '$' + adjustedSale;
    return item;
  };

  var result = _.map(groceries, applied);
  return result;
};

/*
 *
 *  _.reduce
 *
 */

// return the total price of all products.
var sumTotal = function (groceries) {
  var sum = function(total, product) {
    var itemPrice = parseFloat(product['price'].substring(1));
    return total + itemPrice;
  };

  var result = _.reduce(groceries, sum, 0);
  return result;
};

// return an object consisting of dessert types and how many of each.
// exampleOutput: { dessertType: 3, dessertType2: 1 }
var dessertCategories = function (desserts) {
  var category = function(catObj, dessert) {
    if (catObj[dessert.type] === undefined) {
      catObj[dessert.type] = 1;
    } else {
      catObj[dessert.type] += 1;
    }
    return catObj;
  };

  var result = _.reduce(desserts, category, {});
  return result;
};

// return an object with the proper count of all user messages
/*
 example output:
  var tweetCountPerUser = countMessagesPerUser(tweets);
  {
    "douglascalhoun": 5,
    "mracus": 6,
    "shawndrost": 5,
    "sharksforcheap": 3
  }
*/
var countMessagesPerUser = function(tweets) {
  var count = function(userObj, tweet) {
    if (userObj[tweet.user] === undefined) {
      userObj[tweet.user] = 1;
    } else {
      userObj[tweet.user] += 1;
    }
    return userObj;
  };

  var result = _.reduce(tweets, count, {});
  return result;
};

// given an array of movie data objects,return an array containing
// movies that came out between 1990 and 2000.
// TIP: use an array as your accumulator - don't push to an external array!
var ninetiesKid = function (movies) {
  var timeFrame = function(yearArr, movie) {
    if (movie.releaseYear >= 1990 && movie.releaseYear <= 2000) {
      yearArr.push(movie.title);
    }
    return yearArr;
  };

  var result = _.reduce(movies, timeFrame, []);
  return result;
};

// return an boolean stating if there exists a movie with a shorter
// runtime than your time limit.
// timeLimit is an integer representing a number of minutes.
var movieNight = function (movies, timeLimit) {
  var limit = function(time, movie) {
    if (movie.runtime <= timeLimit) {
      return true;
    }
    return time;
  };

  var result = _.reduce(movies, limit, false);
  return result;
};
