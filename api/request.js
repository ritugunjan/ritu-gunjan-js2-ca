var BASE_URL = "https://api.noroff.dev/api/v1/social/";

async function sendRequest(endpoint, options)
{
    try
    {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const data = await response.json();

        if (response.status === 201)
        {
            displayMessage()
        } else
        {
            throw new Error(data.errors[0].message);
        }
    } catch (error)
    {
        throw new Error(error.message);
    }


}

function displayMessage(error)
{
    console.log({ error })
}