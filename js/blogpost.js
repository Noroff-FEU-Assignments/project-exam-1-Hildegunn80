const blogpostContainer = document.querySelector(".blogpostcontainer");
const queryString =document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

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

function createHTML(json) {

    blogpostContainer.innerHTML = "";
    
    console.log("Crete html Title: " + json.title.rendered);
    
    let featuredmedia = json._embedded['wp:featuredmedia'];

    if (typeof featuredmedia == "undefined") {
        throw new Error("missing wp:featuredmedia");
    }

    let source_url = featuredmedia['0'].source_url;
    source_url = source_url.replace("localhost","10.20.21.208");    // workaround dev

    blogpostContainer.innerHTML += `
                                <section class="carousel">
                                    <h2>${json.title.rendered}</h2>
                                    <img id="postImage" src="${source_url}" alt="${featuredmedia['0'].alt_text}" style="width:100%;max-width:300px">
                                    <div>${json.content.rendered}</div>
                                </section>
                                
                                <div id="imageModal" class="modal">
                                    <img class="modal-content" id="idImageModal">
                                </div>
                            `;
    
    enableModal();
}

function createHtmlError(error) {
    enableSpinner(false);

    document.body.style.backgroundColor = "white";  
    console.log("Exception: " + error);
    
    blogpostContainer.innerHTML += `
                            <div class="title"><h1>OPS 404 ERROR.....</h1></div>
                            <img src="/images/404.webp" height="200" style="max-width: 240px">
                            <div class="details-date">An error occurred trying to fetch the API data</div>
                            
                            <div class="home"><a href="index.html"><h1>Return to home</h1></a></div>
                            `;
    
    const title = document.querySelector(".title");
    title.style.color = "black";
}

function modalClick(event) {
    if(event.target.tagName == 'IMG') {
        return false;
    }

    let modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

function enableModal() {
    let modal = document.getElementById("imageModal");

    let img = document.getElementById("postImage");
    let modalImg = document.getElementById("idImageModal");
    
    img.onclick = function() {
        console.log("show image");
        modal.style.display = "block";
        modalImg.src = this.src;
    }

    modal.addEventListener('click', modalClick);
}