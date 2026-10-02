document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("login-form");

    const usernameInput =
        document.getElementById("username");

    const passwordInput =
        document.getElementById("password");

    const togglePassword =
        document.getElementById("toggle-password");

    const loginError =
        document.getElementById("login-error");


    /*
     * اطلاعات ورود
     *
     * فعلاً برای تست است.
     * بعداً این قسمت را به سیستم واقعی
     * Backend متصل می‌کنیم.
     */

    const ADMIN_USERNAME = "soroush";

    const ADMIN_PASSWORD = "123456";


    /* نمایش / مخفی کردن رمز */

    togglePassword.addEventListener("click", () => {

        const isPassword =
            passwordInput.type === "password";

        passwordInput.type =
            isPassword ? "text" : "password";


        togglePassword.innerHTML =
            isPassword
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';

    });


    /* Login */

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value;


        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            /*
             * ذخیره وضعیت ورود
             */

            sessionStorage.setItem(
                "adminLoggedIn",
                "true"
            );


            /*
             * ورود به پنل
             */

            window.location.href =
                "admin.html";

        } else {

            loginError.classList.add("show");

            passwordInput.value = "";

            passwordInput.focus();


            setTimeout(() => {

                loginError.classList.remove("show");

            }, 3000);

        }

    });

});