const blogpostContainer = document.querySelector(".blogpostcontainer");
const banner = document.querySelector(".banner");
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
    
    console.log("Create html Title: " + json.title.rendered);
    
    let featuredmedia = json._embedded['wp:featuredmedia'];

    if (typeof featuredmedia == "undefined") {
        throw new Error("missing wp:featuredmedia");
    }

    let rendered = json.content.rendered.replace(/localhost/g,"10.20.21.208");  // workaround dev
    
    blogpostContainer.innerHTML += `
                                <div class="blogpost">${rendered}</div>

                                <div id="imageModal" class="modal">
                                    <img class="modal-content" id="idImageModal">
                                    <p id="shortenedText"></p>
                                </div>
                                `;
    banner.innerHTML += `
                               <h1>${json.title.rendered}</h1>`
    
    
    let modal = document.getElementById("imageModal");
    let modalImg = document.getElementById("idImageModal");
    modal.addEventListener('click', modalClick);

    for (const image of document.images) {
        image.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    }
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

