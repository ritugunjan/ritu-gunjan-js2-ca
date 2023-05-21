let GlobalPost = [];
    const method = "POST";
    let timer = null

    function getQueryParams()
    {
        var queryParams = {};
        var searchParams = new URLSearchParams(window.location.search);

        for (var pair of searchParams.entries())
        {
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1] || "");
            queryParams[key] = value;
        }

        return queryParams;
    }

    async function deletePostData(token)
    {
        let { post_id } = getQueryParams()
        const endpoint = `posts/${post_id}`;
        const method = "DELETE";
        const options = {
            method,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        };
        document.getElementById("post_loader").classList.remove("d-none")
        await fetch(`${BASE_URL}${endpoint}`, options)
            .then((response) => response.json())
            .then((data) =>
            {
                document.getElementById("post_container").innerHTML = `post id ${post_id} was deleted`;
                setTimeout(() => window.location = "/", 400)
            });
        document.getElementById("post_loader").classList.add("d-none")
    }
    let token = window.localStorage.getItem("accessToken");


    deletePostData(token)