const container = document.querySelector(".about-container");
const url = "http://10.20.21.208/Lowcarbheaven/wordpress/wp-json/wp/v2/pages?_embed/id=149";

async function fetchJson() {
    try {
        console.log("fetch url: " + url);
        const response = await fetch(url);
        let json = await response.json();
        createHTML(json);
    }
    catch (error) {
        console.log(error);
        return null;
    }
}


function createHTML(json) {
    console.log(json);
    
    container.innerHTML = ` 
        <h1>${json[0].title.rendered} </h1>
        <p>${json[0].content.rendered}</p>
        `;
}

fetchJson();