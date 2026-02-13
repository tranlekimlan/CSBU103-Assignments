document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("registerForm");
    form.addEventListener("submit", function(event){
        let isValid = true;

        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
        const confirmInput = document.getElementById("confirmPassword");

        const usernameValue = usernameInput.value;
        const passwordValue = passwordInput.value;
        const confirmValue = confirmInput.value;

        const usernameError = document.getElementById("usernameError");
        const passwordError = document.getElementById("passwordError");
        const confirmError = document.getElementById("confirmError");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(usernameValue) === false) {
                usernameError.style.display = "block";
                isValid = false;
            }
            else {
                usernameError.style.display = "none";
            }

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
            if (passwordRegex.test(passwordValue) === false) {
                passwordError.style.display = "block";
                isValid = false;
            } else {
                passwordError.style.display = "none";
            }

        if (passwordValue !== confirmValue){
            confirmError.style.display = "block";
            isValid = false;
        }
        else {
            confirmError.style.display = "none";
        }

        if (isValid == false){
            event.preventDefault();
            console.log("Blocked, failed to send");
        }
        else{
            console.log("Accepted, sending")
        }
    });
});