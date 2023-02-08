var a, b, finished, action, fn_name, end, quick_i, shuffle_down;
var card, comparisons, swaps, operation;
var interval = 0;
quickstep = new Array(35);

/**
 * If all the elements in the document with type attribute equal to "text" contain a number, then
 * return true, otherwise return false.
 * </code>
 * @returns The value of `all_OK`.
 */
function validate() {
  // Select all elements in the document with type attribute equal to "text".
  var num = document.querySelectorAll("[type~=text]");
  // Get the length of the `num` NodeList.
  var i = num.length;
  // Initialize a variable to keep track of whether all elements are valid or not.
  var all_OK = true;
  // Iterates through the num array in reverse order, starting from the last element and decrementing i by 1 with each iteration.
  while (i--) {
    // Check if the value of the current element is not a number or if it's empty.
    if (isNaN(num[i].value) || num[i].value == "") {
      // If the current element is invalid, focus on it.
      num[i].focus();
      // Set `all_OK` to `false` to indicate that at least one element is invalid.
      all_OK = false;
    }
  }
  // If `all_OK` is `false`, then display an alert.
  if (!all_OK) {
    alert("All the boxes must contain a number.");
  }
  // Return the value of `all_OK`.
  return all_OK;
}

/**
 * Selects all the HTML elements with the type attribute set to "text", then assigns a random integer
 * between 0 and 99 to the value property of each element.
 */
function randomise() {
  //Selects all the HTML elements with the type attribute set to "text".
  var num = document.querySelectorAll("[type~=text]");
  // Declares a variable `i` and sets it to the length of the `num` array.
  var i = num.length;
  // Executes a while loop as long as `i` is greater than 0. The loop decrements `i` by 1 at the end of each iteration.
  while (i--) {
    // Assigns a random integer between 0 and 99 to the `value` property of the `i`th element in the `num` array.
    num[i].value = Math.floor(Math.random() * 100);
  }
}


/**
 * If the value of the element with ID "interval" is not equal to 2000, set a new interval with the
 * `next_step` function and the value of the element with ID "interval". If the value of the element
 * with ID "interval" is equal to 2000, check if `b` is greater than 0. If `b` is greater than 0,
 * enable the element with ID "next".
 */
function change_interval() {
  // Check if the interval is not equal to 0.
  if (interval != 0) {
    // If it's not, clear the current interval.
    clearInterval(interval);
  }
  // Check if the value of the element with ID "interval" is not equal to 2000.
  if (document.getElementById("interval").value != 2000) {
    // Check if the `fn_name` variable is not an empty string.
    if (fn_name > "") {
      // If both conditions are met, set a new interval with the `next_step` function and the value of the
      // element with ID "interval".
      interval = setInterval(
        next_step,
        document.getElementById("interval").value
      );
    }
    // Disable the element with ID "next".
    document.getElementById("next").disabled = true;
  } else {
    // If the value of the element with ID "interval" is equal to 2000, check if `b` is greater than 0.
    if (b > 0) {
      // If `b` is greater than 0, enable the element with ID "next".
      document.getElementById("next").disabled = false;
    }
  }
}


/**
 * It compares the values of two cards and returns true if the value of the second card is less than
 * the value of the first card, and false if the value of the second card is greater than or equal to
 * the value of the first card
 * @param i - The index of the first card.
 * @param j - The index of the second card.
 * @returns a boolean value.
 */
function compare(i, j) {
  // Increase the count of comparisons by 1.
  comparisons++;
  
  // Change the background color of the cards being compared.
  for (var n = 0; n < 10; n++) {
    if (n == i || n == j) {
      card[n].style.backgroundColor = "#00EAFF";
    } else {
      card[n].style.backgroundColor = "#FFFFFF";
    }
  }

  // Update the "commentary" element with the current count of comparisons and swaps and the cards being compared.
  document.getElementById("commentary").innerHTML ="<p><strong>Comparisons: " + comparisons + "<br>Swaps: " + swaps + "</strong></p><p>Comparing " + card[i].innerHTML + " and " + card[j].innerHTML + "...</p>";
  // If the value of the second card is less than the value of the first card, return true.
  if (eval(card[j].innerHTML) < eval(card[i].innerHTML)) {
    document.getElementById("commentary").innerHTML =`${document.getElementById("commentary").innerHTML}<p>${operation} required</p>`;
    return true;
  }
  // If the value of the second card is greater than or equal to the value of the first card, return false.
  else {
    document.getElementById("commentary").innerHTML = `${document.getElementById("commentary").innerHTML}<p>${operation} not required</p>`;
    return false;
  }
}


/**
 * It takes the value of the card at the first position and puts it in the card at the last position,
 * and then it takes the value of the card at the second position and puts it in the card at the first
 * position, and so on
 * @param first - The first card position
 * @param last - The last card position
 */
function shuffle(first, last) {
  // Initialize an array of size 10 to store the values of the cards
  value = new Array(10);
  // Loop through the cards and store their values in the value array
  for (var i = 0; i < 10; i++) {
    value[i] = eval(card[i].innerHTML);
  }
  // Check if the first card position is less than the last card position
  if (first < last) {
    // Loop through the cards from the first to the last position
    for (i = first; i < last; i++) {
      // Shift the values in the cards
      card[i].innerHTML = value[i + 1];
    }
  } else {
    // Loop through the cards from the first to the last position in reverse order
    for (i = first; i > last; i--) {
      // Shift the values in the cards
      card[i].innerHTML = value[i - 1];
    }
  }
  // Increment the swap count
  swaps++;
}


/**
 * The swap function takes two arguments, i and j, and swaps the values of the cards at those
 * positions.
 * @param i - the index of the first card to be swapped
 * @param j - the index of the card to be swapped
 */
function swap(i, j) {
  // increment the number of swaps by 1
  swaps++;
  // define a temporary variable to store a value
  var temp;
  // update the commentary to show that a swap is occurring
  document.getElementById("commentary").innerHTML = 
    `${document.getElementById("commentary").innerHTML}<p>Swapping ${card[i].innerHTML} and ${card[j].innerHTML}</p>`;
  // store the value of card[j] in the temporary variable
  temp = eval(card[j].innerHTML);
  // set the value of card[j] to the value of card[i]
  card[j].innerHTML = eval(card[i].innerHTML);
  // set the value of card[i] to the value stored in the temporary variable
  card[i].innerHTML = temp;
}


/**
 * The function inserts the value of card[n] into the correct position in the sorted array
 * @param n - The index of the card that is being inserted into the correct position.
 */
function insert(n) {
  // Increase the number of swaps by 1.
  swaps++;
  // Initialize a boolean variable "inserted" as false and an integer variable "i" as "n - 1".
  var inserted = false;
  var i = n - 1;
  
  // Update the commentary element to show that the value of card[n] has been inserted into the correct position.
  document.getElementById("commentary").innerHTML = `${document.getElementById("commentary").innerHTML}<p>Inserted ${card[n].innerHTML} into the correct position.</p>`;
  
  // Store the value of card[n] in a temporary variable.
  var temp = eval(card[n].innerHTML);
  
  // Shift the value of card[n - 1] to card[n].
  card[n].innerHTML = eval(card[i].innerHTML);
  
  // Set the background color of card[i] to white.
  card[i].style.backgroundColor = "white";
  
  // The loop continues until the value of "inserted" becomes true.
  while (!inserted) {
    // Increase the number of comparisons by 1.
    comparisons++;
    // Check if i is 0 or the value of card[i - 1] is less than or equal to the value of the temporary variable.
    if (i == 0 || eval(card[i - 1].innerHTML) <= temp) {
      // If the condition is true, set the value of card[i] to the value of the temporary variable.
      card[i].innerHTML = temp;
      // Set the value of "inserted" to true.
      inserted = true;
      // Set the background color of card[i] to #00EAFF.
      card[i].style.backgroundColor = "#00EAFF";
    } else {
      // If the condition is false, shift the value of card[i - 1] to card[i].
      card[i].innerHTML = eval(card[i - 1].innerHTML);
      
      // Decrement the value of "i" by 1.
      i--;
    }
  }
}



/**
 * The selection function is used to increment the values of a and b.
 */
function selection() {
  //This line checks if both a and b are equal to 8 and 9, respectively. If the condition is true, the code inside the block will be executed.
  if (a == 8 && b == 9) {
    //This block checks the value of an element with an id of "interval". If the value is equal to 2000, the "next" button is disabled. 
    //If the value is not equal to 2000, the clearInterval function is called with interval as an argument to stop the interval and interval is set to 0.
    if (document.getElementById("interval").value == 2000) {
      document.getElementById("next").disabled = true;
    } 
    else {
      clearInterval(interval);
      interval = 0;
    }
    //The document.getElementById method is used to access the element, and the .innerHTML property is used to update its contents. 
    //The string assigned to .innerHTML is a template literal that includes the values of comparisons and swaps variables. These variables likely represent the number of comparisons and swaps made during the sorting process. 
    //The string is displayed as a level 3 heading (<h3>) in the HTML document.
    document.getElementById("commentary").innerHTML = `<h3>The sort is complete - there were ${comparisons} comparisons and ${swaps} swaps.</h3>`;
    //If the first condition (a equal to 8 and b equal to 9) is not true, this block of code increments either a or b depending on the value of b. 
    
    b = 0;
  } 
  else {
    //If b is equal to 9, a is incremented and b is set to a + 1. If b is not equal to 9, b is incremented.
    if (b == 9) {
      a++;
      b = a + 1;
    } else {
      b++;
    }
  }
}

/**
 * If the variable a is less than 8, a and b are incremented by 1. If the variable a is not less than
 * 8, the code checks the value of the variable finished. If finished is true, the code updates the
 * HTML content of commentary. If finished is false, the code indicates that the sorting process has
 * completed.
 */
function bubble() {
  //if the variable a is less than 8. If this condition is true, a and b are incremented by 1.
  //This increments both variables and moves the sorting algorithm to the next iteration.
  if (a < 8) {
    a++;
    b++;
  } else { //If the first condition (a less than 8) is not true, this block of code checks the value of the variable finished.
    if (finished) { //If finished is true, it means that the sorting process has completed and it's time to display the results.
      //if the value is equal to 2000, the code disables the next button.
      if (document.getElementById("interval").value == 2000) {
        document.getElementById("next").disabled = true;
      } else { //If the value of the element with the interval is not equal to 2000, the clearInterval method is called with interval to stop the interval, and the variable interval is set to 0.
        clearInterval(interval);
        interval = 0;
      }
      //Used to update the HTML content of commentary.
      document.getElementById("commentary").innerHTML = `<h3>The sort is complete - there were ${comparisons} comparisons and ${swaps} swaps.</h3>`;
      b = 0; //b is set to 0
    } else { //If finished is false, it means that the sorting process has not yet completed.
      finished = true; //Indicates that the sorting process has completed.
      //Resets the values of both variables to their initial values.
      a = 0;
      b = 1;
    }
  }
}

/**
 * If a is less than 8, a and b are incremented by 1. If not, the clearInterval method is called with
 * interval as an argument to stop the interval
 */
function insertion() {
  if (a < 8) { //Checks if a is less than 8.
    //If this condition is true, a and b are incremented by 1.
    a++;
    b++;
  } else { //if not true
    //Checks the value of interval. If the value is equal to 2000, the code disables next button.
    if (document.getElementById("interval").value == 2000) {
      document.getElementById("next").disabled = true;
    } 
    //if not equal to 2000, the clearInterval method is called with interval as an argument to stop the interval.
    else {
      clearInterval(interval);
      interval = 0; //interval is set to 0
    }
    //Update the HTML content commentary. 
    document.getElementById("commentary").innerHTML = `<h3>The sort is complete - there were ${comparisons} comparisons and ${swaps} insertions.</h3>`;
    b = 0; //b is set to 0.
  }
}

/**
 * It takes the current step of the quick sort process, and performs the actions specified by that step
 */
function quick() {
  if (quickstep[quick_i] != "end") {
    // If the current step of the quick sort process is not "end"
    var args = quickstep[quick_i].split(",");
    // Split the current step string and store the values as an array in 'args'
    finished = false;
    // Set the 'finished' flag to false
    a = eval(args[0]);
    b = eval(args[1]);
    // Set the values of 'a' and 'b' to the values in the current step
    if (eval(args[4]) == 1) {
      // If the value in args[4] is 1
      var p = eval(args[0]);
      // Set the pivot value to the value in args[0]
    } else {
      var p = eval(args[1]);
      // Else, set the pivot value to the value in args[1]
    }
    for (var i = 0; i <= 9; i++) {
      // Loop through the card elements with index from 0 to 9
      if (i >= eval(args[2]) && i <= eval(args[3])) {
        // If the current index is within the range of values specified by args[2] and args[3]
        card[i].style.fontStyle = "italic";
        // Set the font style of the current card element to italic
      } else {
        card[i].style.fontStyle = "normal";
        // Else, set the font style of the current card element to normal
      }
      if (i == p) {
        card[i].style.color = "#3C8CE7";
        // If the current index is equal to the pivot value, set the color of the current card element to blue
      } else {
        card[i].style.color = "black";
        // Else, set the color of the current card element to black
      }
    }
    if (eval(args[4]) == 1) {
      shuffle_down = true;
      // If the value in args[4] is 1, set shuffle_down to true
    } else {
      shuffle_down = false;
      // Else, set shuffle_down to false
    }
  }

  if (finished || quickstep[quick_i] == "end") {
    // If the sort is finished or the current step is "end"
    if (document.getElementById("interval").value == 2000) {
      document.getElementById("next").disabled = true;
      // If the interval value is 2000, disable the "next" button
    } else {
      clearInterval(interval);
      interval = 0;
      // Else, clear the interval and set it to 0
    }
    document.getElementById("commentary").innerHTML = `<h3>The sort is complete - there were ${comparisons} comparisons and ${swaps} shifts.</h3>`;
    // Update the commentary with the sort completion information
    b = 0;
    // Set the value of b to 0
  }

  quick_i++;
  // Increment the value of quick_i
}


// This is the quicksort function that implements the QuickSort algorithm.
// The function sorts the elements within the indices lower and upper of the given list.

function quicksort(lower, upper) {
  // If the difference between the upper and lower indices is greater than 0, then the function continues
  // processing. This condition is a base case that stops the recursion when there are no elements left
  // to sort.
  if (upper - lower > 0) {
    // Declare some variables.
    var i, temp;
    // Compute the pivot index as the middle index of the list between lower and upper.
    var pivot = Math.round((upper + lower) / 2);

    // Loop from the lower index to the pivot index.
    for (i = lower; i < pivot; i++) {
      // Store the intermediate steps of the algorithm in quickstep for later visualization.
      quickstep[quick_i] =
        i + "," + pivot + "," + lower + "," + upper + "," + "-1";
      // Compare the value of the pivot element with the current element in the loop.
      if (eval(card[pivot].innerHTML) < eval(card[i].innerHTML)) {
        // If the current element is greater than the pivot element, swap the two elements.
        temp = eval(card[i].innerHTML);
        shuffle(i, pivot);
        card[pivot].innerHTML = temp;
        // Decrement the pivot index by 1.
        pivot--;
        // Decrement the current index by 1 to process the newly swapped element.
        i--;
      }
      // Increment the index to store the next intermediate step.
      quick_i++;
    }

    // Loop from the middle index + 1 to the upper index.
    for (i = Math.round((upper + lower) / 2) + 1; i <= upper; i++) {
      // Store the intermediate steps of the algorithm in quickstep for later visualization.
      quickstep[quick_i] =
        pivot + "," + i + "," + lower + "," + upper + "," + "1";
      // Compare the value of the pivot element with the current element in the loop.
      if (eval(card[i].innerHTML) < eval(card[pivot].innerHTML)) {
        // If the current element is less than the pivot element, swap the two elements.
        temp = eval(card[i].innerHTML);
        shuffle(i, pivot);
        card[pivot].innerHTML = temp;
        // Increment the pivot index by 1.
        pivot++;
      }
      // Increment the index to store the next intermediate step.
      quick_i++;
    }

    // Recursively call the quicksort function on the elements to the left and right of the pivot element.
    quicksort(lower, pivot - 1);
    quicksort(pivot + 1, upper);
  }
}


/**
 * If the value of action is equal to 1, call the sorting algorithm specified in the fn_name variable.
 * If the value of action is not equal to 1, set action to 1 and perform different actions based on the
 * value of fn_name
 */
function next_step() {
  if (action == 1) { //Check if the value of action is equal to 1.
    // If compare(a, b) returns true, set action to -1.
    if (compare(a, b)) {
      action = -1;
    } //If compare(a, b) returns false.
    else {
      window[fn_name](); //call the sorting algorithm specified in the fn_name variable. 
    }
  } 
  else { //If the value of action is not equal to 1.
    action = 1; //Set action to 1.
    //If fn_name is equal to "insertion", call the insert function with b as an argument.
    if (fn_name == "insertion") {
      insert(b);
    }
    //If fn_name is equal to "selection" or "bubble", call the swap function with a and b as arguments.
    if (fn_name == "selection" || fn_name == "bubble") {
      swap(a, b);
    }
    //If fn_name is equal to "quick", perform different actions based on the value of shuffle_down
    if (fn_name == "quick") {
      //If shuffle_down is true, swap the elements at indices a and b and add a message to the "commentary" section indicating that the element 
      //at index b has been shifted to the left of the pivot.
      if (shuffle_down) {
        var temp = eval(card[b].innerHTML);
        shuffle(b, a);
        card[a].innerHTML = temp;
        document.getElementById("commentary").innerHTML = `${document.getElementById("commentary").innerHTML}<p>${temp} shifted to the left of the pivot.</p>`;
      } 
      //If shuffle_down is false, swap the elements at indices a and b and add a message to the "commentary" section indicating that the element 
      //at index a has been shifted to the right of the pivot.
      else {
        var temp = eval(card[a].innerHTML);
        shuffle(a, b);
        card[b].innerHTML = temp;
        document.getElementById("commentary").innerHTML = `${document.getElementById("commentary").innerHTML}<p>${temp} shifted to the right of the pivot.</p>`;
      }
      //Set the background color of the elements at indices a and b to white.
      card[a].style.backgroundColor = "white";
      card[b].style.backgroundColor = "white";
    }
    finished = false; //Set finished to false.
    window[fn_name](); //Call the sorting algorithm specified in the fn_name variable
  }
}

/**
 * It sets the innerHTML of each card element to the value of the corresponding num element and sets
 * the font-style of each card element to "italic". If i is equal to 5, it sets the color of the card
 * to "blue". It then calls the next_step function.
 */
function start_sort() {
  // Validate the input data, if the input is invalid, show an alert
  if (validate()) {
    // Get all the text inputs and store them in the `num` variable
    var num = document.querySelectorAll("[type~=text]");
    // Get all the elements with the class name "card" and store them in the `card` variable
    card = document.querySelectorAll(".card");
    // Loop through the first 10 elements of `num` and `card`
    for (var i = 0; i < 10; i++) {
      // Set the inner HTML of the current `card` element to the value of the current `num` element
      card[i].innerHTML = num[i].value;
      // Set the font style of the current `card` element to "normal"
      card[i].style.fontStyle = "normal";
      // Set the color of the current `card` element to "black"
      card[i].style.color = "black";
    }
    // If the `interval` is not equal to 0
    if (interval != 0) {
      // Clear the interval
      clearInterval(interval);
      // Set the `interval` to 0
      interval = 0;
    }
    // Set the `action` variable to 1
    action = 1;
    // Set the `finished` variable to true
    finished = true;
    // Set the `comparisons` variable to 0
    comparisons = 0;
    // Set the `swaps` variable to 0
    swaps = 0;
    // Get the value of the id "sort_type" and store it in the `fn_name` variable
    fn_name = document.getElementById("sort_type").value;
    // Switch statement based on the value of "sort_type"
    switch (document.getElementById("sort_type").value) {
      // If the value is "bubble"
      case "bubble":
        // Set the `a` variable to 0
        a = 0;
        // Set the `b` variable to 1
        b = 1;
        // Set the `operation` variable to "Swap"
        operation = "Swap";
        // Call the `next_step` function
        next_step();
        break;
      // If the value is "selection"
      case "selection":
        // Set the `a` variable to 0
        a = 0;
        // Set the `b` variable to 1
        b = 1;
        // Set the `operation` variable to "Swap"
        operation = "Swap";
        // Call the `next_step` function
        next_step();
        break;
      // If the value is "insertion"
      case "insertion":
        // Set the `a` variable to 0
        a = 0;
        // Set the `b` variable to 1
        b = 1;
        // Set the `operation` variable to "Insertion"
        operation = "Insertion";
        // Call the `next_step` function
        next_step();
        break;
      // If the value is "quick"
      case "quick":
        //Setting the values of the variables a and b to 0 and 5, respectively.
        a = 0;
        b = 5;
        operation = "Shift"; //Setting the value of the operation variable to "Shift".
        quick_i = 0; //Setting the value of quick_i to 0.
        quicksort(0, 9); //Calling the quicksort function and passing in two arguments, 0 and 9, which represents the range of elements to sort.
        quickstep[quick_i] = "end"; //Setting the value of the first element in the quickstep array to "end".
        //it sets the innerHTML of each card element to the value of the corresponding num element and  
       
        for (var i = 0; i < 10; i++) {
          card[i].innerHTML = num[i].value;
        }
        quick_i = 1; //Setting the value of quick_i to 1
        action = 1; //Setting the value of action to 1.
        swaps = 0; //Setting the value of swaps to 0.
        for (var i = 0; i <= 9; i++) {
          //Sets the font-style of each card element to "italic".
          card[i].style.fontStyle = "italic";
          //If i is equal to 5, it sets the color of the card to "blue"
          if (i == 5) {
            card[i].style.color = "#3C8CE7";
          }
        }
        next_step(); //Calling the next_step function.
        break;
      default:
        operation = "";
        alert("Sorry - that option hasn't been coded yet.");
    }
    //Setting the click event of the next button to call the next_step function.
    document.getElementById("next").onclick = function () {
      next_step();
    };
    //checks if the value of the interval is equal to 2000.
    if (document.getElementById("interval").value == 2000) {
      //sets the disabled property of the next to false.
      document.getElementById("next").disabled = false;
    } else {
      //sets the disabled property of the next to true.
      document.getElementById("next").disabled = true;
      //if statement that checks if the value of interval is equal to 0.
      if (interval == 0) {
        //sets the value of interval to the return value of setInterval
        interval = setInterval(
          //sets a timer to call the next_step function every interval milliseconds
          next_step,
          document.getElementById("interval").value
        );
      } else {
        //Clears the interval set by setInterval.
        clearInterval(interval);
        //Sets the value of interval to 0.
        interval = 0;
      }
    }
  }
}
