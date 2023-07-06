const url = "http://10.20.21.208/Lowcarbheaven/wordpress/wp-json/wp/v2/posts?_embed&per_page=100";
let json;
async function fetchJson() {    
    try {
        const response = await fetch(url);
        json = await response.json();
        return (json);
    }
    catch (error){
        console.log(error);
    }
}

fetchJson();