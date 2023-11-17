(function() {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            var emailInput = document.getElementById('email-input');
            var emailValue = emailInput.value;
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard simple email regex
            if (emailRegex.test(emailValue)) {
                // If the email is valid
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');

                // Show success toast
                var successToastEl = document.getElementById('successToast');
                var successToast = new bootstrap.Toast(successToastEl);
                successToast.show();

                // Close the modal
                var modalEl = document.getElementById('dappModal');
                var modalInstance = bootstrap.Modal.getInstance(modalEl);
                modalInstance.hide();
                // Close the newsletter modal
                var modalEl = document.getElementById('newsLetterModal');
                var modalInstance = bootstrap.Modal.getInstance(modalEl);
                modalInstance.hide();

                // Submit the form data using JavaScript
                submitFormData(form);
            } else {
                // If the email is invalid
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
            }
            form.classList.add('was-validated');
        });
    });

    function submitFormData(form) {
        var xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200 && xhr.responseText === '') {
                // Form submission success
                console.log('Form submitted successfully');
            } else {
                // Form submission failed
                console.log('Form submission failed');
            }
        };
        var formData = new FormData(form);
        var params = new URLSearchParams(formData).toString();
        xhr.send(params);
    }
})();

document.addEventListener('DOMContentLoaded', (event) => {
    const radios = document.querySelectorAll('input[type="radio"][name="options"]');
    const button = document.getElementById('openFormButton');
    let selectedUrl = '';

    radios.forEach((radio) => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedUrl = e.target.dataset.href;
            }
        });

        // Pre-select the checked radio button
        if (radio.checked) {
            selectedUrl = radio.dataset.href;
        }
    });

    button.addEventListener('click', () => {
        if (selectedUrl) {
            window.open(selectedUrl, '_blank');
        }
    });
});


function truncateText() {
    var elements = document.getElementsByClassName("maxCharacter");
    var length = 300;
    for (var i = 0; i < elements.length; i++) {
        var str = elements[i].textContent;
        var trimmedString = str.length > length ?
            str.substring(0, length - 3) + "..." :
            str;
        elements[i].textContent = trimmedString;
    }
}