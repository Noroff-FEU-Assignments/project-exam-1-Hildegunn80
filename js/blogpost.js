const blogpostContainer = document.querySelector(".blogpostcontainer");
const queryString =document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "http://10.20.21.208/Lowcarbheaven/wordpress/wp-json/wp/v2/posts/"+ id+"?_embed";

async function fetchPost() {
    try {
        console.log("(debug) Get url: " + url)
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetch from API", {cause: response});
        }
        const json = await response.json();
        console.log(json);
        createHTML(json);

        return json;
    }
    catch(error) {
        console.log(error);
        createHtmlError(error);
    }
}

async function start() {
    enableSpinner(true);
    
    const blogpost = fetchPost(url);
    //console.log("past post");
    //console.log(blogpost);

    //let mediaUrl = getMediaUrl(blogpost);
    //console.log("media url: " + mediaUrl);

    //createHTML(blogpost);
    enableSpinner(false);
}

function enableSpinner(show) {
    const loader = document.querySelector(".spinner");
    enableClass(loader,show);
}

function enableClass(className, show) {
    if(show) {
        className.style.display = "block";
    } else {
        className.style.display = "none";
    }   
}

start();

function createHTML(json) {

    blogpostContainer.innerHTML = "";
    
    console.log("Crete html Title: " + json.title.rendered);
    
    let featuredmedia = json._embedded['wp:featuredmedia'];

        if (typeof featuredmedia == "undefined") {
            console.log("missing featuredmedia, skipping");
            return;
        }

    let source_url = featuredmedia['0'].source_url;
    source_url = source_url.replace("localhost","10.20.21.208");    // workaround
    console.log ("url: "+source_url);

    blogpostContainer.innerHTML += `<section class="carousel">
                                <h2>${json.title.rendered}</h2>
                                <img src="${source_url}"></div>
                                <div>${json.content.rendered}</div>
                            </section>
                            `;
    
}

function createHtmlError(error) {
    enableSpinner(false);

    document.body.style.backgroundColor = "white";  
    console.log("Exception: " + error);
    
    blogpostContainer.innerHTML += `<div class="title"><h1>OPS 404 ERROR.....</h1></div>
                            <img src="/images/404.webp" height="200" style="max-width: 240px">
                            <div class="details-date">An error occurred trying to fetch the API</div>
                            
                            <div class="home"><a href="index.html"><h1>Return to home</h1></a></div>
                            `;
    
    const title = document.querySelector(".title");
    title.style.color = "black";
}
