document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form");

    // Function to delete a contact
    function deleteContact(index) {
        // Get the existing contact list from local storage
        var existingContacts = JSON.parse(localStorage.getItem("formData")) || [];

        // Check if the index is valid
        if (index >= 0 && index < existingContacts.length) {
            // Remove the contact from the array
            existingContacts.splice(index, 1);

            // Update the data in local storage
            localStorage.setItem("formData", JSON.stringify(existingContacts));

            // Refresh the contact list in the UI
            displayContactList(existingContacts);
        }
    }

    // Function to display the contact list in the UI
    function displayContactList(contacts) {
        var userList = document.getElementById("user-list");
        userList.innerHTML = ""; // Clear the existing list

        // Iterate through the contacts and display them
        contacts.forEach(function (contact, index) {
            var userItem = document.createElement("li");
            userItem.classList.add("user-item");
            userItem.innerHTML =
                `<div class="user-info">` +
                `<span>Name: ${contact.username}</span>` +
                `<span>Email: ${contact.email}</span>` +
                `<span>Phone: ${contact.phoneNumber}</span>` +
                `</div>` +
                `<button class="delete-button" data-index="${index}">Delete</button>`;

            userList.appendChild(userItem);
        });
    }

    // Event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var phoneNumber = document.getElementById("phoneNumber").value;

        if (username && email && phoneNumber) {
            var newUser = {
                username: username,
                email: email,
                phoneNumber: phoneNumber
            };

            var existingContacts = JSON.parse(localStorage.getItem("formData")) || [];
            existingContacts.push(newUser);

            localStorage.setItem("formData", JSON.stringify(existingContacts));

            // Refresh the contact list in the UI
            displayContactList(existingContacts);

            form.reset();
        } else {
            alert("Please fill in all required fields.");
        }
    });

    // Event delegation for delete buttons
    document.getElementById("user-list").addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-button")) {
            var index = event.target.getAttribute("data-index");
            deleteContact(index);
        }
    });

    // Initial display of the contact list
    var initialContacts = JSON.parse(localStorage.getItem("formData")) || [];
    displayContactList(initialContacts);
});
