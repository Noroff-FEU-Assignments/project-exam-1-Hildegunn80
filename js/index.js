

const url = "http://10.20.21.208/Lowcarbheaven/wordpress/wp-json/wp/v2/posts?_embed&per_page=100";
const container = document.querySelector(".latest-posts");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
let json;
let index = 0;

async function fetchPosts() {    
    try {
        const response = await fetch(url);
        json = await response.json();
        createHTML();
    }
    catch (error){
        console.log(error);
        container.innerHTML =error;
    }
}

function goLeft() {
    index-=4;
    createHTML(index);
}

function goRight() {
    index+=4;
    createHTML(index);
}

function configureButtons() {
    console.log("Configure buttons")
    arrowLeft.addEventListener("click", goLeft);
    arrowRight.addEventListener("click", goRight);
}

function createHTML() {
    arrowLeft.style.color = "Red";
    arrowRight.style.color = "Green";

    // boundary check
    if(index < 0) {
        index = 0;
    }
    let end = index + 4
    if(end > json.length) {
        end = json.length;
        index = json.length -4;
    }

    container.innerHTML = "";
    for (let i = index; i < end; i++) {
        //console.log("Title: " + json[i].title.rendered);

        let featuredmedia = json[i]._embedded['wp:featuredmedia'];

        if (typeof featuredmedia == "undefined") {
            console.log("missing featuredmedia, skipping");
            continue;
        }

        let source_url = featuredmedia['0'].source_url;
        source_url = source_url.replace("localhost","10.20.21.208");    // workaround
        //console.log ("url: "+source_url);

        container.innerHTML += ` <section class="carousel">
                                <div class"content-card-1">
                                <div class="article"><h2>${json[i].title.rendered}</h2>
                                <img src="${source_url}"></div>
                                </div>
                                </section>
                                `;
    }    
}
    
configureButtons();
fetchPosts();