const url = "http://10.20.21.208/Lowcarbheaven/wordpress/wp-json/wp/v2/posts?_embed&per_page=100";

async function fetchJson() {
    try {
        console.log("fetch url: " + url);
        const response = await fetch(url);
        let json = await response.json();
        return json;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
