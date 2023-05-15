const url="http://10.20.21.208/Lowcarbheaven/wordpress/wp-json/wp/v2/posts";
const postContainer = document.querySelector(".latest-posts");

async function getPosts() {
    try{
        enableSpinner(true);
        const response =await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetch from API", {cause: response});
        }

        const getResults = await response.json();
        createHTML(getResults);
        enableSpinner(false);
    }
    catch(error){
        console.log(error);
        createHtmlError(error);
    }
}

function enableSpinner(show) {
    const loader = document.querySelector(".spinner");
    enableClass(loader,show);
}

function enableClass(className, show) {
    if(show) {
        className.style.display = "block";
    } else {
        className.style.display = "none";
    }   
}

function createHTML(posts){
    posts.forEach(function(posts){
        postContainer.innerHTML += `< href="productpage.html?id=${posts.id}">
        <h2>${posts.rendered}</h2>
        </a>`;
        console.log(getPosts);
        
    })
}

function createHtmlError(error) {
    enableSpinner(false);

    document.body.style.backgroundColor = "white";  
    console.log("Exception: " + error);
    
    postContainer.innerHTML += `<div class="title"><h1>OPS 404 ERROR.....</h1></div>
                            <img src="/images/404.webp" height="200" style="max-width: 240px">
                            <div class="details-date">An error occurred trying to fetch the API</div>
                            
                            <div class="home"><a href="index.html"><h1>Return to home</h1></a></div>
                            `;
    
    const title = document.querySelector(".title");
    title.style.color = "black";
}

getPosts();