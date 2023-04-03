const BASE_URL = 'https://gist.githubusercontent.com/abdalabaaji/d37dd1b0a82c94e0e92ac771d5737117/raw/9da419f4bfe7323934fc1ac41a5fd9fed0f10913/books'

// load html page in specific div using fetch api
async function loadPage(pageUrl) {
    const mainContent = document.getElementById('main-content');
    const page = await fetch(pageUrl)
    const pageHTMLContent = await page.text()
    mainContent.innerHTML = pageHTMLContent;

    form = document.querySelector('#book-form')
    form.addEventListener('submit', updateBook)
}

// HINT : beside the updateBook function [which only modifies the localstorage]  , 
// you also need to create a function that calls loadPage and also populates the values into the form 
// so that the user can see the values of the book he/she is editing