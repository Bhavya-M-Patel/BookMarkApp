/**
 * bookMarks array is used to maintain localcopy of items
 * bookMarkStorageKey is used to save bookMarks array into localstorage
*/

let bookMarks = [];
const booKMarkStorageKey = "BookMarks";

window.onload = function () {
    //Loading bookmarks from localstorage
    bookMarks = JSON.parse(localStorage.getItem(booKMarkStorageKey)) || [];
    bookMarks.forEach(element => appendBookmark(element));

    //setting clickListener to open and close bookmark form and button
    setShowHideClickListener("show-modal");
    setShowHideClickListener("close-modal");

    getElementRef("AddBookMarkBtn").addEventListener("click",()=>addBookMark('bookmark-form'));
}
    
function setShowHideClickListener(id){
    getElementRef(id).addEventListener("click",function(){
        showHideElement('model-container');
    })
}
/***
 * BookMark class model to save bookMark
*/
class BookMark {
    constructor(name, URL) {
        this.ID = parseInt(Math.random() * 1000);
        this.name = name;
        this.URL = URL;
    }
}



// returns DOM reference of given id
function getElementRef(id) {
    return document.getElementById(id);
}


//toggles visibility of bookmark form
function showHideElement(ele_id) {
    getElementRef(ele_id).classList.toggle("show-modal");
}

/**
 * @param {string} form_ID of Bookmark form
 * inserts Bookmark data to bookMarks array
 */
function addBookMark(form_ID) {
    let form = getElementRef(form_ID);
    let elements = form?.elements;
    if (elements) {
        if (form.checkValidity()) {
            let name = elements["website-name"]?.value;
            let URL = elements["website-url"]?.value;
            let bookmark = new BookMark(name, URL);

            bookMarks.push(bookmark);
            updateStorage();
            appendBookmark(bookmark);
            form.reset();
        }
        else
            alert("Enter proper URL and name");
    }
}

/**
 *generate and appends bookmark to HTML element container
*/
function appendBookmark(bookmark) {
    let container = document.getElementsByClassName("container")[0];
    let bookmarkEle = document.createElement("div");

    //generating Element with bookmark data
    bookmarkEle = generateElement(bookmarkEle, bookmark);

    container.appendChild(bookmarkEle);
}

function generateElement(ele, data) {

    //making URL of favicon
    let faviconURL = `http://www.google.com/s2/favicons?domain=${data.URL}`;
    
    //setting class and ID and item HTML
    ele.classList.add("item");
    ele.setAttribute("id", data.ID);
    ele.innerHTML = `
    <i class="fas fa-times" onclick = RemoveBookMark(${data.ID})></i>
    <div class="name">
        <img src=${faviconURL}>
        <a href=${encodeURI(data.URL)} target="_blank">${data.name}</a>
    </div>`
    return ele;
}

//updates localStorage with latest bookmark local copy
function updateStorage() {
    localStorage.setItem(booKMarkStorageKey, JSON.stringify(bookMarks));
}


function RemoveBookMark(item_id) {
    //delete items from local Array
    let index = bookMarks.findIndex((element) => element.ID == item_id)
    bookMarks.splice(index, 1);
    
    //remove HTML Element
    getElementRef(item_id).remove();
    
    updateStorage();
    
}
