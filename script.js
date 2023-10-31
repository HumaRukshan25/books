document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form");
    var userList = document.getElementById("user-list");
    var usersData = [];

    function deleteContact(index) {
        var deletedUser = usersData[index];
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + deletedUser.id)
            .then(function (response) {
                console.log('User data deleted:', response.data);
                usersData.splice(index, 1);
                displayContactList(usersData);
            })
            .catch(function (error) {
                console.error('Error deleting user data:', error);
            });
    }

    function displayContactList(contacts) {
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
                `<button class="delete-button" data-index="${index}">Delete</button>` +
                `<button class="update-button" data-index="${index}">Update</button>`;

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

            axios.post('https://jsonplaceholder.typicode.com/posts', newUser)
                .then(function (response) {
                    console.log('User data sent to the server:', response.data);
                    newUser.id = response.data.id;
                    usersData.push(newUser);
                    displayContactList(usersData);
                    form.reset();
                })
                .catch(function (error) {
                    console.error('Error sending user data to the server:', error);
                });
        } else {
            alert("Please fill in all required fields.");
        }
    });

    userList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-button")) {
            var index = event.target.getAttribute("data-index");
            deleteContact(index);
        } else if (event.target.classList.contains("update-button")) {
            var index = event.target.getAttribute("data-index");
            var existingUser = usersData[index];
            document.getElementById("username").value = existingUser.username;
            document.getElementById("email").value = existingUser.email;
            document.getElementById("phoneNumber").value = existingUser.phoneNumber;
            document.getElementById("edit-user-index").value = index;
            document.getElementById("update-button").style.display = "block";
        }
    });

    document.getElementById("update-button").addEventListener("click", function () {
        var index = document.getElementById("edit-user-index").value;
        var updatedUser = usersData[index];
        updatedUser.username = document.getElementById("username").value;
        updatedUser.email = document.getElementById("email").value;
        updatedUser.phoneNumber = document.getElementById("phoneNumber").value;

        axios.put('https://jsonplaceholder.typicode.com/posts/' + updatedUser.id, updatedUser)
            .then(function (response) {
                console.log('User data updated:', response.data);
                usersData[index] = updatedUser;
                displayContactList(usersData);
                form.reset();
                document.getElementById("update-button").style.display = "none";
            })
            .catch(function (error) {
                console.error('Error updating user data:', error);
            });
    });
});
