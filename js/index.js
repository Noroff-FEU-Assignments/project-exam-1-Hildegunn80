
const url = "http://localhost/Lowcarbheaven/wordpress/wp-json/wp/v2/posts?_embed";
const container = document.querySelector(".latest-posts");


async function fetchPosts() {
    try{
    const response =await fetch(url);
    const result =await response.json();
    const post = result;
    createHTML(post);
    }catch (error){
        console.log(error);
        container.innerHTML =error;
    }
}
fetchPosts();
 

    function createHTML(post){
        post.forEach(function (post){
        container.innerHTML+=
        `<h2>${post.title.rendered}</h2>
        <img src="${[post]._embedded['wp:featuredmedia']['0'].source_url}">`;
        
    })
        console.log (fetchPosts);

   
    }
    
    
  




