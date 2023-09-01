const form = document.querySelector("#contactForm");

const firstName = document.querySelector("#FirstName");
const firstnameError =document.querySelector("#FnameError");

const lastName = document.querySelector("#LastName");
const lastNameError =document.querySelector("#LnameError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const messageBox = document.querySelector("#messagebox");
const messageError = document.querySelector("#messageError");
const formMessageValidated = document.querySelector("#form_validated");
const buttonCloseMessage = document.querySelector(".close-message");

function validateForm() {
    try {
        event.preventDefault();

        dsgfsdfgsdfg();
        
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


        if(isLenghtValid(subject.value,15)===true) {
            subjectError.style.display ="none"
        } else {
            success = false;
            subjectError.style.display ="block"
        }

        if(isLenghtValid(messageBox.value,25)===true) {
            subjectError.style.display ="none"
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
        createHtmlError(error);
    }
}

function createHtmlError(error) {
    const errorContainer = document.querySelector("#contactForm");
    console.log("Exception: " + error);
    document.body.style.backgroundColor = "white";
    
    errorContainer.innerHTML = `<div class="title"><h1>OPS 404 ERROR.....</h1></div>
                            <img src="/images/404.webp" height="200" style="max-width: 240px">
                            <div class="details-date">An error occurred processing data</div>
                            
                            <div class="home"><a href="index.html"><h1>Return to home</h1></a></div>
                            `;
    
    const title = document.querySelector(".title");
    title.style.color = "black";
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


