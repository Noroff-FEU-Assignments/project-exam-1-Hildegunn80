const container = document.querySelector(".about-container");
const urlAbout = "https://lowcarb.not.nu/backend/wp-json/wp/v2/pages/149";

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
        createHtmlError(error, ".wrapper");
    }
    finally {
        enableSpinner(false);
    }
}

function createHTML(json) {
    container.innerHTML = `<p>${json.content.rendered}</p>`;
}

fetchJson();