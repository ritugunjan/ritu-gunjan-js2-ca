const endpoint = "posts";
const method = "PUT";

let token = window.localStorage.getItem("accessToken");

function errorMessage(type, err)
{
    return `<div class="alert ${type}" role="alert">${err}</div>`
}
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

document.getElementById('registerform').addEventListener("submit", async (e) =>
{
    document.getElementById("register_error").innerHTML = ""
    e.preventDefault()
    const formData = new FormData(e.target);
    const newPostData = Object.fromEntries(formData.entries());

    let { post_id } = getQueryParams()
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
    const response = await fetch(`${BASE_URL}${endpoint}/${post_id}?_author=true&_reactions=true&_comments=true`, createPostOptions);

    try
    {
        const result = await response.json();
        if (result?.statusCode)
        {
            let error = result.errors[0].message ? result.errors[0].message : "Something went wrong"
            document.getElementById("register_error").innerHTML = errorMessage("alert-danger", error)
        } else
        {
            document.getElementById("register_error").innerHTML = errorMessage("alert-success", "Post updated Success")
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