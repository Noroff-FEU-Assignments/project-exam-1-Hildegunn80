const blogpostContainer = document.querySelector(".blogpostcontainer");
const banner = document.querySelector(".banner");
const queryString =document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const postUrl = "https://lowcarb.not.nu/backend/wp-json/wp/v2/posts/"+ id +"?_embed";

async function fetchPost() {
    try {
        const response = await fetch(postUrl);
        if (!response.ok) {
            throw new Error("Error fetch from API", {cause: response});
        }
        const json = await response.json();
        createHTML(json); 
        enableSpinner(false);
    }
    catch(error) {
        createHtmlError(error,".blogpostcontainer");
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

    blogpostContainer.innerHTML += `
                                    <div class="blogpost">${json.content.rendered}</div>

                                    <div id="imageModal" class="modal">
                                        <img class="modal-content" id="idImageModal">
                                        <p id="shortenedText"></p>
                                    </div>
                                    <a href="bloglist.html" class="returnBloglist">Return to bloglist</a>
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

