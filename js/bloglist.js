
const blogContainer = document.querySelector(".blogcontainer");
const morePosts = document.getElementsByClassName(".morePosts");
let json;
let index = 0;

fetchJson().then(
    function (result) {
        json = result;
        createHTML();
    }
)

function configureButton() {
    console.log("Configure button")
    morePosts.addEventListener("click", viewMore);
}


function viewMore() {
    index+=9;
    createHTML(index);
}

function createHTML() {

    // boundary check
    if(index < 0) {
        index = 0;
    }
    let end = index + 9
    if(end > json.length) {
        end = json.length;
        index = json.length -9;
    }

    blogContainer.innerHTML = "";
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

        blogContainer.innerHTML += ` <section class="carousel">
                                <div class"content-card-1">
                                <div class="article"><h2>${json[i].title.rendered}</h2>
                                <img src="${source_url}"></div>
                                </div>
                                </section>
                                `;
    }    
    configureButton();

    fetchJson().then(
        function (result) {
            json = result;
            createHTML();
        }
        )

}