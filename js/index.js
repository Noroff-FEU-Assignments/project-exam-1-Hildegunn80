

const url = "http://10.20.21.208/Lowcarbheaven/wordpress/wp-json/wp/v2/posts?_embed&per_page=14";
const container = document.querySelector(".latest-posts");
let json;

async function fetchPosts() {
    try {
        const response =await fetch(url);
        const result =await response.json();
        createHTML(result);
    }
    catch (error){
        console.log(error);
        container.innerHTML =error;
    }
}

fetchPosts();

function createHTML(post) {

    post.forEach(function (post) {        
            let featuredmedia = post._embedded['wp:featuredmedia'];

            if (typeof featuredmedia == "undefined") {
                console.log("missing featuredmedia, skipping");
                return;
            }

            let source_url = featuredmedia['0'].source_url;

            container.innerHTML+= ` <section class="carousel">
                                    <div class"content-card-1">
                                    <div class="article"><h2>${post.title.rendered}</h2>
                                    <img src="${source_url}"></div>
                                    </div>
                                    </section>
                                    `;

            console.log ("title: "+post.title.rendered);
            console.log ("url: "+source_url);
        }
    )

    //console.log (fetchPosts);
}

    
    
  




