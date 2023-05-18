// Function to conditionally render a component based on the HTML file path


const routes = {
    '/': homeHandler,
    // '/about': aboutHandler,
    // '/contact': contactHandler,
};


document.addEventListener('DOMContentLoaded', async () =>
{

    // Call the route handler
    homeHandler();

})

async function homeHandler()
{
    let token = window.localStorage.getItem("accessToken");
    if (!token || token == 'undefined')
    {
        console.log("hell")
        window.location = "/login/"

    }
}

function testcall(event)
{
    console.log("calling main function")
}

