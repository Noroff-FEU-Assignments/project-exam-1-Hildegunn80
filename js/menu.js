/*
    Add section in array to expand menu.
*/

// Settings //
let pageIcon = "images/logosky.svg";
let pageIconAltText = "the cloud icon";
let menuClass = ".header";
let siteName = "Low carb heaven"
let menuTitle = "LOW CARB HEAVEN"
let mobileSize = false;

const htmlPages = [
    {
        file: "index.html",
        name: "home",
        visible: true
    },
    {
        file: "bloglist.html",
        name: "bloglist",
        visible: true
    },
    {
        file: "contact.html",
        name: "contact",
        visible: true
    },
    {
        file: "blogpost.html",
        name: "blogpost",
        visible: false
    },

    {
        file:"about.html",
        name:"about",
        visible: true
    }

];

/* CODE */
let currentPage = ""

function addLogo(menu) {
    if(pageIcon === undefined) return;

    // create logo DIV
    let logo = document.createElement("div");
    logo.classList.add("logo");    
    
    let a = document.createElement("a");
    a.setAttribute("href","index.html");
    
    let img = document.createElement("img");
    img.setAttribute("src",pageIcon);
    img.alt = pageIconAltText;

    a.appendChild(img);
    logo.appendChild(a);
    menu.appendChild(logo);
}

function addTitle(menu) {
    let title = document.createElement("title");
    title.classList.add("title");
    menu.appendChild(title);

    let h2 = document.createElement("h2");
    h2.textContent = menuTitle;
    title.appendChild(h2);
}

function addNav(menu) {
    let fileName = window.location.pathname.split("/").pop();
    console.log(" - current file : " + fileName );

    let nav = document.createElement("nav");
    menu.appendChild(nav);
    let ul = document.createElement("ul");
    nav.appendChild(ul);

    for (const page of htmlPages) {
        
        let li = document.createElement("li");
        
        let a = document.createElement("a");
        a.setAttribute("href",page.file);
        a.innerHTML = page.name;
        li.appendChild(a);
        
        if(page.file == fileName) {
            a.className = "current";
            currentPage = page.name
        }
        
        if(!page.visible) continue;
        ul.appendChild(li);
    }
}

function addMenu(menu) {
    // Add Input
    let input = document.createElement("input");
    input.setAttribute("type","checkbox");
    input.setAttribute("id","menu-checkbox");
    menu.appendChild(input);
   
    // Add Label
    let label = document.createElement("aria-label");
    label.setAttribute("for","menu-checkbox");
    label.classList.add("hamburger-icon");
    menu.appendChild(label);
    
    let i = document.createElement("i");
    i.className = "fas fa-bars fa-3x";

    i.setAttribute("aria-hidden","true");
    label.appendChild(i);
    
    addNav(menu);
}

function loadMenu() {
    // Cladd Location to create Menu system in.
    // in html:  <div class="header"></div>
    const menu = document.querySelector(menuClass);

    if (menu == null) {
        console.log("Error Menu '"+menuClass+"' class to appeend menu into, not found in html document.");
        return;        
    }
    console.log("Load Menu '"+menuClass+"' class detected successfully.");

    // add divs into class
    addLogo(menu);
    addTitle(menu);
    addMenu(menu);

    document.title = currentPage +" | " + siteName;
}

window.addEventListener('resize', () => {
    // Toggle on mobile
    if (window.innerWidth <= 670) {
        mobileSize = true;
    } else {
        mobileSize = false;
    }

  });

// load menu automatically..
window.onload = loadMenu();