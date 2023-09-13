const latestPosts = document.querySelector(".latest-posts");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
let index = 0;
let json;
let visibleCounnt = 4;
const homePage="https://lowcarb.not.nu/backend/wp-json/wp/v2/pages/271"

function goLeft() {
    console.log("index: " + index);
    index-=visibleCounnt;
    createHTML();
}

function goRight() {
    index+=visibleCounnt;
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

    //console.log("page width: " + width);
    if(width<600) {
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

    latestPosts.innerHTML = "";
    for (let i = index; i < end; i++) {

        let featuredmedia = json[i]._embedded['wp:featuredmedia'];

        // show only valid images.
        if (typeof featuredmedia == "undefined") {
            end++;
            if(end > json.length) end = json.length;
            continue;
        }

    

        let source_url = featuredmedia['0'].source_url;
        let alt = featuredmedia['0'].alt_text;
        
        latestPosts.innerHTML += `<section class="carousel">
                                    <div class"content-card-1">
                                        <div class="article"><h2>${json[i].title.rendered}</h2>
                                          <img src="${source_url}" alt="${alt}">
                                          <a href ="blogpost.html?id=${json[i].id}"><button class="readmore" title="click to read this post"><i class="fa-solid fa-utensils" title="knive and fork"></i>Read post</button></a>
                                       </div>
                                    </div>
                                </section>
                                `;

    }
}

configureButtons();

//fetch Introduction
fetchIntroductionJson();

// fetch carousell
fetchJson().then(    
    function (result) {
        try {
            enableSpinner(true);
            json = result;
            createHTML();
            enableSpinner(false);
        }
        catch(error) {
            console.log("Exception in fetchIntroductionJson() :" + error);
            hideClass(".introduction");
            createHtmlError(error,".wrapper"); 
        }
    }
)

// update carousell
window.addEventListener("resize", createHTML);

async function fetchIntroductionJson() {
    try {
        console.log("fetch url: " + homePage);
        const response = await fetch(homePage);
        let json = await response.json();
        createIntroductionHTML(json);
    }
    catch(error) {
        console.log("Exception in fetchIntroductionJson() :" + error);
        hideClass(".introduction");
        createHtmlError(error,".wrapper"); 
    }
}

function createIntroductionHTML(json) {
    const description = document.querySelector(".description");
    const imagecontainer = document.querySelector(".imagecontainer");

    description.innerHTML = `
        <h1>${json.title.rendered}</h1>
        <a href="bloglist.html"><button class="recipes" ><i class="fa-solid fa-utensils"></i>Go to recipes</button></a> 
        `;    

    imagecontainer.innerHTML = `${json.content.rendered}`;
}

