const endpoint = "auth/register";
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
        const newUser = Object.fromEntries(formData.entries());
        const registerOptions = {
            method,
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        try
        {
            let respose = await sendRequest(endpoint, registerOptions)
            document.getElementById("register_error").innerHTML = errorMessage("alert-success", "user creation was success , redirecting to login page")
            setTimeout(() =>
            {
                window.location = "/login/"
            }, 1000)
        } catch (error)
        {
            document.getElementById("register_error").innerHTML = errorMessage("alert-danger", error.message)
        }

        console.log(newUser)
        //login(profile);
    })