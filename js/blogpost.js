const blogpostContainer = document.querySelector(".blogpostcontainer");
const queryString =document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
var modal = document.getElementsByClassName(".modal");
var image = document.getElementsByClassName(".mediaPicture");


const postUrl = "http://10.20.21.208/Lowcarbheaven/wordpress/wp-json/wp/v2/posts/"+ id +"?_embed";

async function fetchPost() {
    try {
        const response = await fetch(postUrl);
        if (!response.ok) {
            throw new Error("Error fetch from API", {cause: response});
        }
        const json = await response.json();
        console.log(json);
        createHTML(json);
        enableSpinner(false);
    }
    catch(error) {
        console.log(error);
        createHtmlError(error);
    }
}

fetchPost();

image.onclick = function() {
    modal.style.display = "block";
  }

function createHTML(json) {

    blogpostContainer.innerHTML = "";
    
    console.log("Crete html Title: " + json.title.rendered);
    
    let featuredmedia = json._embedded['wp:featuredmedia'];

    if (typeof featuredmedia == "undefined") {
        throw new Error("missing wp:featuredmedia");
    }

    let source_url = featuredmedia['0'].source_url;
    source_url = source_url.replace("localhost","10.20.21.208");    // workaround dev

    blogpostContainer.innerHTML += ` <div class="modal">
                                <section class="carousel">
                                <h2>${json.title.rendered}</h2>
                                <img src="${source_url}" class="mediaPicture"></img>
                                <div>${json.content.rendered}</div>
                                </section>
                                </div>
                            `;
    
}

function createHtmlError(error) {
    enableSpinner(false);

    document.body.style.backgroundColor = "white";  
    console.log("Exception: " + error);
    
    blogpostContainer.innerHTML += `<div class="title"><h1>OPS 404 ERROR.....</h1></div>
                            <img src="/images/404.webp" height="200" style="max-width: 240px">
                            <div class="details-date">An error occurred trying to fetch the API data</div>
                            
                            <div class="home"><a href="index.html"><h1>Return to home</h1></a></div>
                            `;
    
    const title = document.querySelector(".title");
    title.style.color = "black";
}
