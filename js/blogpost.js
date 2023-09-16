const form = document.querySelector("#commentForm");

const comment = document.querySelector ("#messagebox");
const messageError = document.querySelector("#messageError");
const firstName = document.querySelector("#FirstName");
const firstnameError =document.querySelector("#FnameError");
const lastName = document.querySelector("#LastName");
const lastNameError =document.querySelector("#LnameError");
const e_mail = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const formMessageValidated = document.querySelector("#form_validated");
const buttonCloseMessage = document.querySelector(".close-message");
const blogpostContainer = document.querySelector(".blogpostcontainer");
const banner = document.querySelector(".banner");
const queryString =document.location.search;
const params = new URLSearchParams(queryString);
const commentContainer = document.querySelector(".commentContainer");
const id = params.get("id");

const postUrl = "https://lowcarb.not.nu/backend/wp-json/wp/v2/posts/"+ id +"?_embed";
const commentEndpoint = "https://lowcarb.not.nu/backend/wp-json/wp/v2/comments";

async function fetchPost() {
    try {
        const response = await fetch(postUrl);
        if (!response.ok) {
            throw new Error("Error fetch from API", {cause: response});
        }
        const json = await response.json();
        createHTML(json); 
        enableSpinner(false);
    }
    catch(error) {
        createHtmlError(error,".blogpostcontainer");
    }
}

async function fetchComments() {
    try {
        const response = await fetch(commentEndpoint+"?post="+id);
        if (!response.ok) {
            throw new Error("Error fetch comment from API", {cause: response});
        }
        const json = await response.json();
        createCommentHTMLs(json); 
        enableSpinner(false);
    }
    catch(error) {
        createHtmlError(error,".blogpostcontainer");
    }
}

fetchPost();
fetchComments();

function createCommentHTMLs(json) {
    //console.log(json);
    
    commentContainer.innerHTML = "";

    for (let i = 0 ; i < json.length; i++) {        
        createCommentHTML(json[i]);
    }
}

function createCommentHTML(json) {
    console.log("comment:");
    console.log(json);

    commentContainer.innerHTML += ` <section class="commentWrapper">
                                        <h2>${json.author_name}</h2>
                                        <img src="${json.author_avatar_urls[48]}" alt="avatar" id="image"></img>
                                        <h3>${json.content.rendered}</h3>
                                        <h4>${json.date}</h4>
                                    </section>
                                    `;
}

function createHTML(json) {
    blogpostContainer.innerHTML = "";
    
    console.log("Create html Title: " + json.title.rendered);
    
    let featuredmedia = json._embedded['wp:featuredmedia'];

    if (typeof featuredmedia == "undefined") {
        throw new Error("missing wp:featuredmedia");
    }

    blogpostContainer.innerHTML += `
                                    <div class="blogpost">${json.content.rendered}</div>

                                    <div id="imageModal" class="modal">
                                        <img class="modal-content" id="idImageModal">
                                        <p id="shortenedText"></p>
                                    </div>
                                    <a href="bloglist.html" class="returnBloglist">Return to bloglist</a>
                                `;
    banner.innerHTML += `<h1>${json.title.rendered}</h1>`
    
    
    let modal = document.getElementById("imageModal");
    let modalImg = document.getElementById("idImageModal");
    modal.addEventListener('click', modalClick);

    for (const image of document.images) {
        image.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    }
}

function modalClick(event) {
    if(event.target.tagName == 'IMG') {
        return false;
    }

    let modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

function enableModal() {
    let modal = document.getElementById("imageModal");

    let img = document.getElementById("postImage");
    let modalImg = document.getElementById("idImageModal");
    
    img.onclick = function() {
        console.log("show image");
        modal.style.display = "block";
        modalImg.src = this.src;
    }

    modal.addEventListener('click', modalClick);
}

// https://lowcarb.not.nu/backend/wp-json/wp/v2/comments?

function postComment(firstName, lastName, email, comment, postId) {
    //console.log("post Comment..."+ postId);

    let json = JSON.stringify(
        {
            "author_name": firstName + " " + lastName,
            "content": comment,
            "post": postId,
            "author_email": email
        }
        );
    console.log(json);
    
    fetch(commentEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: json
    })
       .then(response => response.json())
       .then(response => createCommentHTML(response))
}

//* Validate comment form
function validateForm() {
    try {
        event.preventDefault();

        //postComment("Hildegunn", "Bjelland","hildegunn.bjelland@gmail.com", "wow this javascript rulez",id);

        
        let success = true;
        if(isLenghtValid(firstName.value,5)===true) {
            firstnameError.style.display ="none"
        } else {
            success = false;
            firstnameError.style.display ="block"
        }

        if(isLenghtValid(lastName.value,5)===true) {
            lastNameError.style.display ="none"
        } else {
            success = false;
            lastNameError.style.display ="block"
        }

        if(isLenghtValid(comment.value,10)===true) {
            messageError.style.display ="none"
        } else {
            success = false;
            messageError.style.display ="block"
        }

        if(isEmailValid(email.value)===true) {
            emailError.style.display ="none"
        } else {
            success = false;
            emailError.style.display ="block"
        }

        if(success) {
            postComment(firstName.value, lastName.value,email.value,comment.value,id);

            formMessageValidated.style.display=("block")
            form.reset();
        }
    }
    catch(error) {               
        createHtmlError(error,".blogpostcontainer");
    }
}

form.addEventListener("submit", validateForm );
buttonCloseMessage.addEventListener("click", closeMessage);

function closeMessage() {
    formMessageValidated.style.display=("none")
} 

