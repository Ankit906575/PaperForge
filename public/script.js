/*
=========================================================
QUESTION PAPER GENERATOR
LOCK SCREEN AUTHENTICATION
SIMPLE PASSWORD LOGIN
=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    const passwordInput =
        document.getElementById("password");

    const unlockBtn =
        document.getElementById("unlockBtn");


    /*
    =====================================================
    PASSWORD LOGIN
    =====================================================
    */

    if (unlockBtn) {

        unlockBtn.addEventListener(
            "click",
            async function () {

                const password =
                    passwordInput
                        ? passwordInput.value.trim()
                        : "";


                if (!password) {

                    alert(
                        "Please enter your password."
                    );

                    return;
                }


                unlockBtn.disabled =
                    true;

                unlockBtn.textContent =
                    "Checking...";


                try {

                    const response =
                        await fetch(
                            "/api/auth/login",
                            {
                                method:
                                    "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                credentials:
                                    "include",

                                body:
                                    JSON.stringify({
                                        password:
                                            password
                                    })
                            }
                        );


                    const data =
                        await response.json();


                    /*
                    =====================================
                    LOGIN SUCCESS
                    =====================================
                    */

                    if (
                        response.ok &&
                        data.success
                    ) {

                        /*
                        Login successful.
                        Open dashboard directly.
                        */

                        window.location.href =
                            "dashboard.html";

                        return;
                    }


                    /*
                    =====================================
                    LOGIN FAILED
                    =====================================
                    */

                    alert(
                        data.message ||
                        "Invalid password."
                    );


                } catch (error) {

                    console.error(
                        "Password login error:",
                        error
                    );


                    alert(
                        "Unable to connect to the server."
                    );

                } finally {

                    unlockBtn.disabled =
                        false;

                    unlockBtn.textContent =
                        "Unlock";

                }

            }
        );

    }

});