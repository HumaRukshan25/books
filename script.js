document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form"); // Select the form element

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting initially

        // Get form input values
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var phoneNumber = document.getElementById("phoneNumber").value;

        // Validate form fields (rest of your validation code)

        // If all validations pass, store the form data in local storage
        if (username && email && phoneNumber) {
            var formData = {
                username: username,
                email: email,
                phoneNumber: phoneNumber
            };

            // Store the data in local storage as JSON
            localStorage.setItem("formData", JSON.stringify(formData));

            // You can provide a success message or redirect to another page here
            alert("Form data has been stored in local storage.");

            // Optionally, clear the form
            form.reset();
        } else {
            alert("Please fill in all required fields.");
        }
    });
});
