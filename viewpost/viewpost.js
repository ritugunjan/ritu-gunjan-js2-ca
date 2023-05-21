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
    async function getPostData(token)
    {
        let { post_id } = getQueryParams()
        const endpoint = `posts/${post_id}`;
        const method = "GET";
        const options = {
            method,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        };
        document.getElementById("post_loader").classList.remove("d-none")
        await fetch(`${BASE_URL}${endpoint}?_author=true&_reactions=true&_comments=true'`, options)
            .then((response) => response.json())
            .then((data) =>
            {
                const { title, body, tags } = data;
                GlobalPost = data
                console.log({ GlobalPost })
                renderPost(GlobalPost)
            });

        document.getElementById("post_loader").classList.add("d-none")
    }
    let token = window.localStorage.getItem("accessToken");


    getPostData(token)

    function renderPost(postArray)
    {


        let container = document.getElementById("post_container");
        container.innerHTML = "";

        container.innerHTML = postHtmlElement(postArray)
    }

    function formatTimeElapsed(dateString)
    {
        var now = new Date();
        var date = new Date(dateString);

        var timeElapsed = Math.floor((now - date) / 1000); // Time elapsed in seconds

        if (timeElapsed < 60)
        {
            return timeElapsed + " second" + (timeElapsed === 1 ? "" : "s") + " ago";
        } else if (timeElapsed < 3600)
        {
            var minutes = Math.floor(timeElapsed / 60);
            return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
        } else if (timeElapsed < 86400)
        {
            var hours = Math.floor(timeElapsed / 3600);
            return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
        } else
        {
            var days = Math.floor(timeElapsed / 86400);
            var formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            return days + " days ago";
        }
    }

    function getAvatarOrInitial(avatar, name)
    {
        if (avatar)
        {
            return ` <img class="img-xs rounded-circle" src="${avatar}" alt>`;
        } else if (name)
        {
            return name.charAt(0).toUpperCase();
        } else
        {
            return "";
        }
    }

    function postHtmlElement(data)
    {
        let { body, created, id, media, tags, title, updated, _count, author } = data
        let { name, avatar } = author
        let { comments, reactions } = _count;
        let postElement = ` <div class="card rounded">
                                <div class="card-header">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <div class="user_avatar_initial" >
                                                ${getAvatarOrInitial(avatar, name)}
                                               
                                            </div>
                                            <div class="ml-2">
                                                <a href="/viewpost/?post_id=${id}">
                                                <p>${name}</p>
                                                </a>
                                                <p class="tx-11 text-muted">${formatTimeElapsed(updated)}</p>
                                            </div>
                                        </div>
                                        <div class='d-flex'>
                                            <a class="dropdown-item d-flex align-items-center" href="/updatepost/?post_id=${id}">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="feather feather-edit-2 icon-sm mr-2">
                                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                                </path>
                                            </svg></a>
                                        <div class="dropdown">
                                            
                                            <button class="btn p-0" type="button" id="dropdownMenuButton3"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewbox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-more-horizontal icon-lg pb-3px">
                                                    <circle cx="12" cy="12" r="1"></circle>
                                                    <circle cx="19" cy="12" r="1"></circle>
                                                    <circle cx="5" cy="12" r="1"></circle>
                                                </svg>
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                                                <a class="dropdown-item d-flex align-items-center" href="/deletepost/?post_id=${id}">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewbox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="feather feather-meh icon-sm mr-2">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="8" y1="15" x2="16" y2="15"></line>
                                                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                                    </svg> 
                                                    <span class>Delete</span>
                                                </a>
                                              </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <p class="mb-3 tx-14">${body}</p>
                                </div>
                                <div class="card-footer">
                                    <div class="d-flex post-actions">
                                        <a href="javascript:;" class="d-flex align-items-center text-muted mr-4">
                                            <p>${reactions}</p>
                                            <p class="d-none d-md-block ml-2">Like</p>
                                        </a>
                                        <a href="javascript:;" class="d-flex align-items-center text-muted mr-4">
                                            <p>${comments}</p>
                                            <p class="d-none d-md-block ml-2">Comment</p>
                                        </a>
                                      
                                    </div>
                                </div>
                            </div>`

        return postElement

    }