console.log("git")
// Create a new <li> element
var newLi = document.createElement('li');
newLi.textContent = 'New Item'; // Set its content

// Add a class name to the new <li> element to make it distinct
newLi.className = 'new-item';

// Add the new <li> element to the <ul> with the ID "items"
var ul = document.getElementById('items');
ul.appendChild(newLi);

// Edit the new <li> element using getElementsByClassName
var elementsWithNewClass = document.getElementsByClassName('new-item');
for (var i = 0; i < elementsWithNewClass.length; i++) {
  elementsWithNewClass[i].style.color = 'blue'; // Change the text color
}

// Edit the new <li> element using getElementByTagName
var liElements = ul.getElementsByTagName('li');
var lastLi = liElements[liElements.length - 1]; // Get the last <li> element
lastLi.style.fontWeight = 'bold'; // Change the font weight
// Change the font color to green for the 2nd item in the item list
var secondItem = document.querySelector('#items li:nth-child(2)');
secondItem.style.color = 'green';

// Make all odd elements' background green
var oddItems = document.querySelectorAll('#items li:nth-child(odd)');
oddItems.forEach(function(item) {
  item.style.backgroundColor = 'green';
});
