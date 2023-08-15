const container = document.querySelector(".latest-posts");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
let index = 0;
let json;

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
    const width = document.body.clientWidth;

    // boundary check
    if(index < 0) {
        index = 0;
    }
    let end;

    console.log(width);
    if(width<=1070) {
        console.log("less than 1070");
        end=index+2
        if(end >json.lenght){
            end=json.lenght;
            index =json.length-2;
        }
        console.log(width);
        if(width<=700) {
            console.log("less than 1070");
            end=index+2
            if(end >json.lenght){
                end=json.lenght;
                index =json.length-1;
            }
        }

    } else {
        end = index + 4
        if(end > json.length) {
            end = json.length;
            index = json.length -4;
        }
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

fetchJson().then(
    function (result) {
        json = result;
        createHTML();
    }
)
