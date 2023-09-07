const container = document.querySelector(".latest-posts");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
let index = 0;
let json;
let visibleCounnt = 4;

function goLeft() {
    index-=visibleCounnt-1;
    createHTML();
}

function goRight() {
    index+=visibleCounnt+1;
    createHTML();
}

function configureButtons() {
    console.log("Configure buttons")
    arrowLeft.addEventListener("click", goLeft);
    arrowRight.addEventListener("click", goRight);
}

function createHTML() {
    const width = document.body.clientWidth;

    // boundary check
    if(index < 0) index = 0;

    console.log("page width: " + width);
    if(width<800) {
        visibleCounnt = 1;
    } else if(width<1070) {
        visibleCounnt = 2;
    } else if(width<1300) {
        visibleCounnt = 3;
    } else if(width >1300) {
        visibleCounnt = 4;
    }

    //console.log("Visible count: " + visibleCounnt);
    let end = index + visibleCounnt
    if(end > json.length) {
        end = json.length;
        index = json.length - visibleCounnt;
    }
    //console.log("render start: " + index +", end: " + end);

    container.innerHTML = "";
    for (let i = index; i < end; i++) {
        //console.log("Title: " + json[i].title.rendered);

        let featuredmedia = json[i]._embedded['wp:featuredmedia'];

        // show only valid images.
        if (typeof featuredmedia == "undefined") {
            //console.log("missing featuredmedia, skipping");
            end++;
            if(end > json.length) end = json.length;
            continue;
        }

        let source_url = featuredmedia['0'].source_url;
        source_url = source_url.replace("localhost","10.20.21.208");    // workaround
        //console.log ("url: "+source_url);

        container.innerHTML += `<section class="carousel">
                                    <div class"content-card-1">
                                        <div class="article"><h2>${json[i].title.rendered}</h2>
                                        <img src="${source_url}"></div>
                                        <a href ="blogpost.html?id=${json[i].id}"><button class="readmore"><i class="fa-solid fa-utensils"></i>Read more</button>
                                    </div>
                                </section>
                                `;
    }
}

configureButtons();

fetchJson().then(
    function (result) {
        json = result;
        createHTML();
    }
)

// update carusell
window.addEventListener("resize", createHTML);
