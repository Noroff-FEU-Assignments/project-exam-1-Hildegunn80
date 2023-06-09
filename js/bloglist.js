
const blogContainer = document.querySelector(".blogcontainer");
const morePosts = document.getElementById("more-posts");
let json;
let count = 10;

fetchJson().then(
    function (result) {
        json = result;
        createHTML();
    }
)
configureButton();

function configureButton() {
    console.log("Configure button")
    morePosts.addEventListener("click", viewMore);
}

function viewMore() {
    count+=10;
    createHTML();
}

function createHTML() {
    // boundary check
    if(count > json.length) {
        count = json.length;
    }

    blogContainer.innerHTML = "";
    for (let i = 0 ; i < count; i++) {
        //console.log("Title: " + json[i].title.rendered);
        let featuredmedia = json[i]._embedded['wp:featuredmedia'];

        if (typeof featuredmedia == "undefined") {
            console.log("missing featuredmedia, skipping");
            continue;
        }

        let source_url = featuredmedia['0'].source_url;
        source_url = source_url.replace("localhost","10.20.21.208");    // workaround
        //console.log ("url: "+source_url);

        blogContainer.innerHTML += ` <section class="carousel">
                                <div class"content-card-1">
                                <div class="article"><h2>${json[i].title.rendered}</h2>
                                <img src="${source_url}"></div>
                                </div>
                                </section>
                                `;
    }
}
