/* 1. Shorten Me!
Implement 2 functions, one that shortens a string of values by replacing consecutive data
elements with just one data value and count of the consecutive values.
For Example, we can shorten the characters “AAAAAAAAAAABWWWWWWWWWWWBB” with
“11AB11W2B”
The other function should take the shortened string and give back the original value
For example, we take the above-shortened characters “11AB11W2B” and get back
“AAAAAAAAAAABWWWWWWWWWWWBB”
For simplicity, you can assume that the unencoded string will only contain the letters A through
Z (either lower or upper case) and whitespace. This way data to be encoded will never contain
any numbers and numbers inside data to be decoded always represent the count for the
following character.

Solution: */

let str = "AAAAAAAAAAABWWWWWWWWWWWBB";

let shortenStr = (str) => {

  let arr = str.split("");
  let newStr = "";
  let count = 1;
  
  for (let i=1; i<=arr.length; i++) {
  	if (arr[i-1] != arr[i]) {
    	newStr =  `${newStr}${count>1 ? count : ""}${arr[i-1]}`;
      count = 1;
    } else {
      count++;
    }
  }
  return newStr;
}

console.log(shortenStr(str));


/* 2. How many trails to 1?
Take a positive integer x. If x is even, divide x by 2 to get x / 2. If x is odd, multiply x by 3 and
add 1 to get 3x + 1. Repeat the process indefinitely. No matter which number you start with, you
will always reach 1 eventually during the process.
Given a number x, return the number of steps required to reach 1.
Examples
Starting with x = 12, the steps would be as follows:
12 - even (divide by 2)
6 - even (divide by 2)
3 - odd (3(3) + 1)
10 - even (divide by 2)
5 - odd (3(5) + 1)
16 - even (divide by 2)
8 - even (divide by 2)
4 - even (divide by 2)
2 - even (divide by 2)
1 - stop
We got to 1 in 9 steps. So for input x = 12, the return value would be 9.

Solution: */

let num = 12;

let getStepsToReachOne = (num) => {
    let steps = 0;
    while(num != 1) {
      if (num % 2 === 0) {
	  num = num/2;
      } else {
	  num = 3*num + 1;
      }
      steps++;
    }
    return steps;
}
console.log(getStepsToReachOne(num));


/* 3. Hide that PIN!
Write a function that converts a given PIN to a series of texts that
ensures it can be sent out in plain sight without anyone knowing it. You
first convert the given input number into binary and then use the table
below to generate the string equivalent.
1 = pop
10 = double rip
100 = hide your mints
1000 = fall
10000 = reverse the order of the output.
Examples:
3 -> binary 11 -> 1 + 10 -> output -> [“pop”,”double rip”]
19 -> binary 10011 -> 1 + 10 + 10000 -> output -> [“double rip”,”pop”]
NOTE: Please note the reversal operation in the second example due to the
presence of 10000
Solution: */

let num = 19;

let hideThatPin = (num) => {
  let dec = (num >>> 0).toString(2);
  let arr = [];
  let reversal = false;
  
  if (dec.length >= 5) {
    reversal = true;
    dec = dec % 10000 + ""
  }
  if (dec.length === 4) {
    arr.unshift("fall");
    dec = dec % 1000 + ""
  }
  if (dec.length === 3) {
    arr.unshift("hide your mints");
    dec = dec % 100 + ""
  }
  if (dec.length === 2) {
    arr.unshift("double rip");
    dec = dec % 10 + ""
  }
  if (dec.length === 1) {
    arr.unshift("pop");
  }
  if (reversal) arr.reverse();
  return arr;
}

console.log(hideThatPin(num));



/* 4. n-chai
You like chai very much and you want to drink exactly “n” cups of chai. You would be happy to
drink more but you have exactly “n” chai bags, “g” of them are green, and “b” are black.
You would not like to drink the same chai (green or black) more than “k” times in a row.
Your task is to determine the order of making tea so that you will be able to drink “n” cups of tea,
without drinking the same chai more than “k” times in a row, or to inform that it is impossible to
do that with the given inputs. Each chai bag can be used exactly once.
Note: g + b is always equal to “n”. I.e number of green and black chai bags total is always equal
to the number of times you want to drink chai.
Example:
Input -> n: 5, k: 1, g: 3, b: 2
Output -> [“Green”,”Black”,”Green”,”Black”,”Green”]
Input -> n: 4, k: 3, g: 4, b: 0
Output -> []

Solution: */

let iLoveChai = (n,k,g,b) => {
  let arr = [];
  
  let drinkGreen = () => { 
    arr.push("Green");
    g--;
  }
  let drinkBlack = () => { 
    arr.push("Black");
    b--;
  }
  
  let cg = k;
  let cb = k;
  
  while(n>0) {
  	if(g>0 && cg>0) {
    	drinkGreen();
      cg--;
      if(cg === 0) cb = k;
    } else if(b>0 && cb>0) {
      drinkBlack();
      cb--;
      if(cb === 0) cg = k;
    } else {
    	arr = []
    	break;
    }
  	n--;
  }
  
  return arr;
}

console.log(iLoveChai(5,1,3,2));