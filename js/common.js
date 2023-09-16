const url = "https://lowcarb.not.nu/backend/wp-json/wp/v2/posts?_embed&per_page=100";

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

function enableSpinner(show) {
    const loader = document.querySelector(".spinner");
    enableClass(loader,show);
}

function enableClass(className, show) {
    if(className === null) {
        return
    }

    if(show) {
        className.style.display = "block";
    } else {
        className.style.display = "none";
    }   
}

function createHtmlError(error, classLocation) {
    enableSpinner(false);
    console.log("Exception: " + error);

    const class1 = document.querySelector(classLocation);
    if(class1 === null) {
        console.log("Error Class:" + classLocation + " not found, can't render HTML error.");
        return;
    }
    document.body.style.backgroundColor = "white";  
    class1.backgroundColor = "white";
    class1.style.backgroundImage = "none";

    class1.innerHTML = `
                            <div class="title"><h1>OPS 404 ERROR.....</h1></div>
                            <img src="/images/404.webp" height="200" style="max-width: 240px" alt" 404 an error has occurred">
                            <div class="details-date">An error occurred trying to fetch the API data</div>
                            
                            <div class="home"><a href="index.html"><h1>Return to home</h1></a></div>
                            `;
    
    const title = document.querySelector(".title");
    title.style.color = "black";
}

function hideClass(classLocation) {
    const class1 = document.querySelector(classLocation);

    if(class1 === null) {
        console.log("Error Class:" + classLocation + " not found.");
        return;
    }
    enableClass(class1,false);
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