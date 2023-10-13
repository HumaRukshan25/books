document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var phoneNumber = document.getElementById("phoneNumber").value;

        if (username && email && phoneNumber) {
            // Get existing user data from local storage (if any)
            var existingData = JSON.parse(localStorage.getItem("formData")) || [];

            // Create a new user object
            var newUser = {
                username: username,
                email: email,
                phoneNumber: phoneNumber
            };

            // Make sure `existingData` is an array
            if (!Array.isArray(existingData)) {
                existingData = [];
            }

            // Add the new user to the existing data array
            existingData.push(newUser);

            // Store the updated data in local storage
            localStorage.setItem("formData", JSON.stringify(existingData));

            alert("Form data has been stored in local storage.");

            form.reset();
        } else {
            alert("Please fill in all required fields.");
        }
    });
});
