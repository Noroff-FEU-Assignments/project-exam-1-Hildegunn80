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
const id = params.get("id");

const postUrl = "https://lowcarb.not.nu/backend/wp-json/wp/v2/posts/"+ id +"?_embed";

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

fetchPost();

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
    banner.innerHTML += `
                               <h1>${json.title.rendered}</h1>`
    
    
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


//* Validate comment form

function validateForm() {
    try {
        event.preventDefault();

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

function isEmailValid(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

function isLenghtValid(value,len ) {
    if (value.trim().length>=len) {
        return true;
    } else {
        return false;
    }
}


