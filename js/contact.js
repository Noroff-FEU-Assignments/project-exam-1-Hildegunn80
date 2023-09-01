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

function validateForm(){
    event.preventDefault();
    if(isLenghtValid(firstName.value,5)===true){
        firstnameError.style.display ="none"
    }else{
        firstnameError.style.display ="block"
    }

    if(isLenghtValid(lastName.value,5)===true){
        lastNameError.style.display ="none"
    }else{
        lastNameError.style.display ="block"
    }

}

form.addEventListener("submit", validateForm );{
    formMessageValidated.style.display=("block")
    form.reset();

}


buttonCloseMessage.addEventListener("click", closeMessage);
function closeMessage(){
    formMessageValidated.style.display=("none")
} 


function isEmailValid(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

function isLenghtValid (value,len ){
    if (value.trim().length>=len){ 
    return true;
    }else{
    return false;
    }
    }


    
