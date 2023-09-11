const container = document.querySelector(".about-container");
const urlAbout = "https://lowcarb.not.nu/backend/wp-json/wp/v2/pages?_embed/id=149";

async function fetchJson() {
    try {
        enableSpinner(true);
        console.log("fetch url: " + urlAbout);

        const response = await fetch(urlAbout);
        let json = await response.json();
        createHTML(json);

        enableSpinner(false);
    }
    catch (error) {
        console.log(error);
        return null;
    }
    finally {
        enableSpinner(false);
    }
}


function createHTML(json) {
    //console.log(json);
    
    container.innerHTML = ` 
        <p>${json[0].content.rendered}</p>
        `;
}

fetchJson();