const endpoint = "posts";
    const method = "POST";

    let token = window.localStorage.getItem("accessToken");

    function errorMessage(type, err)
    {
        return `<div class="alert ${type}" role="alert">${err}</div>`
    }

    document.getElementById('registerform').addEventListener("submit", async (e) =>
    {
        document.getElementById("register_error").innerHTML = ""
        e.preventDefault()
        const formData = new FormData(e.target);
        const newPostData = Object.fromEntries(formData.entries());

        const { postTitle, postBody, postTags } = newPostData;
        const createPostOptions = {
            method,
            body: JSON.stringify({
                title: postTitle,
                body: postBody,
                tags: [postTags],
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        };
        const response = await fetch(BASE_URL + endpoint, createPostOptions);

        try
        {
            const result = await response.json();
            if (result?.statusCode)
            {
                let error = result.errors[0].message ? result.errors[0].message : "Something went wrong"
                document.getElementById("register_error").innerHTML = errorMessage("alert-danger", error)
            } else
            {
                document.getElementById("register_error").innerHTML = errorMessage("alert-success", "Post Created Success")
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

        //login(profile);
    })