
const blogContainer = document.querySelector(".blogcontainer");
const morePosts = document.getElementById("more-posts");

let json;
let count = 10;

configureButton();

fetchJson().then(
    function (result) {
        try {
            json = result;
            createHTML();
            enableSpinner(false);
        }
        catch(error) {
            console.log("Exception in fetchJson() :" + error);
            createHtmlError(error,".wrapper"); 
        }
    }
)

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
            //console.log("missing featuredmedia, skipping");
            continue;
        }

        let source_url = featuredmedia['0'].source_url;
        let alt = featuredmedia['0'].alt_text;

        blogContainer.innerHTML += `<section class="blogPostWrapper">
                                        <a href="blogpost.html?id=${json[i].id}">
                                            <div="imagecontainer">
                                                <img src="${source_url}" alt="${alt}"id="image"></img>
                                            </div>
                                            <div class="text-content">
                                                <h2>${json[i].title.rendered}</h2>
                                                <h3 id="date">${"Date:"+json[i].date}</h3>
                                                <p> ${json[i].excerpt.rendered}</p>
                                            </div>
                                            <a class="readmore" href ="blogpost.html?id=${json[i].id}" title="click to read this post">Read more<i class="fas fa-long-arrow-alt-right"></i></a>
                                    </section>
                                    `;
    }
}
