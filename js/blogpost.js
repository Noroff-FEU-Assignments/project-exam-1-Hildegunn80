const blogpostContainer = document.querySelector(".blogpostcontainer");
const queryString =document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "http://10.20.21.208/Lowcarbheaven/wordpress/wp-json/wp/v2/posts?_embed/"+ id;

async function fetchPost() {
    try {
        enableSpinner(true);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetch from API", {cause: response});
        }

        const blogpostDetails = await response.json();
        console.log(blogpostDetails);
        createHTML(blogpostDetails);
        
        enableSpinner(false);       
    }
    catch(error) {
        console.log(error);
        createHtmlError(error);
    }
}

fetchPost();


