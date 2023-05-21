const endpoint = "auth/login";
    const method = "POST";



    function errorMessage(type, err)
    {
        return `<div class="alert ${type}" role="alert">${err}</div>`
    }

    document.getElementById('registerform').addEventListener("submit", async (e) =>
    {
        document.getElementById("register_error").innerHTML = ""
        e.preventDefault()
        const formData = new FormData(e.target);
        const body = Object.fromEntries(formData.entries());
        const response = await fetch(BASE_URL + endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
            method,
            body: JSON.stringify(body),
        });

        try
        {
            const result = await response.json();
            console.log({ result })
            if (result?.statusCode)
            {
                let error = result.errors[0].message ? result.errors[0].message : "Something went wrong"
                document.getElementById("register_error").innerHTML = errorMessage("alert-danger", error)
            } else
            {
                const token = localStorage.setItem(
                    "accessToken",
                    JSON.stringify(result.accessToken)
                );
                localStorage.setItem("username", JSON.stringify(result.email));
                document.getElementById("register_error").innerHTML = errorMessage("alert-success", "Login was success , redirecting to posts")
                setTimeout(() =>
                {
                    window.location = "/"
                }, 500)
            }

            //redirectToPostFeed(token);
        } catch (error)
        {
            //document.getElementById("register_error").innerHTML = errorMessage("alert-danger", error)
            document.getElementById("register_error").innerHTML = errorMessage("alert-danger", error)
            return
        }

        //     method,
        //     body: JSON.stringify(newUser),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8",
        //     },
        // };
        // try
        // {
        //     let respose = await sendRequest(endpoint, registerOptions)
        //     console.log(respose)
        //     document.getElementById("register_error").innerHTML = errorMessage("alert-success", "user creation was success , redirecting to login page")
        //     // setTimeout(() =>
        //     // {
        //     //     window.location = "/login/"
        //     // }, 1000)
        // } catch (error)
        // {
        //     document.getElementById("register_error").innerHTML = errorMessage("alert-danger", error.message)
        // }

        //console.log(newUser)
        //login(profile);
    })