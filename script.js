document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form");

    function deleteContact(index) {
        // Implement your delete contact logic
    }

    function displayContactList(contacts) {
        var userList = document.getElementById("user-list");
        userList.innerHTML = "";

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

            // Send the user data to the server (test endpoint provided by JSONPlaceholder)
            axios.post('https://jsonplaceholder.typicode.com/posts', newUser)
                .then(function (response) {
                    console.log('User data sent to the server:', response.data);
                    // Refresh the contact list in the UI
                    displayContactList([newUser]);
                    form.reset();
                })
                .catch(function (error) {
                    console.error('Error sending user data to the server:', error);
                });
        } else {
            alert("Please fill in all required fields.");
        }
    });

    document.getElementById("user-list").addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-button")) {
            var index = event.target.getAttribute("data-index");
            deleteContact(index);
        }
    });
});
