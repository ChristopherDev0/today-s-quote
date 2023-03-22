
document.addEventListener('DOMContentLoaded', startApp);

const selectCategories = document.querySelector('#select-categories');
const button = document.querySelector('#button');
const result = document.querySelector('#results');
const imgContainer = document.querySelector('#img-container');

function startApp(){
    getCategories();

    selectCategories.addEventListener('change', selectedCategory)
}

function getCategories(){
    const url = 'http://quotes.rest/qod/categories.json';
    fetch(url)
    .then( response => response.json())
    .then( result => {
        const resultOBJ = result.contents.categories;
        showCategories(resultOBJ)
     })
}

function showCategories(result) {
    for (let key in result) { /* console.log(`${objetto[valor]}`); */
       const option = document.createElement('OPTION');
       option.value = key;
       option.textContent = key;
       selectCategories.appendChild(option);
    }
}

function selectedCategory(e) {
    const category = e.target.value;
    const url = `http://quotes.rest/qod.json?category=${category}`;
    
    fetch(url)
    .then( response => response.json())
    .then( result => {
        const author = result.contents.quotes[0].author;
        const quote = result.contents.quotes[0].quote;
        const img = result.contents.quotes[0].background;

        button.addEventListener('click', () => {
            showResults(quote, author, img);
        });
    })
}

function showResults(quote, author, img){
    //clean HTML
    cleanTHML(result);
    cleanTHML(imgContainer);


    const quoteText = document.createElement('H2');
    quoteText.textContent = `" ${quote} "` ;

    const authorText = document.createElement('P');
    authorText.textContent = `- ${author}`;

    const imgValue = document.createElement('IMG');
    imgValue.src = img;

    //show in HTML
    result.appendChild(quoteText);
    result.appendChild(authorText);
    imgContainer.appendChild(imgValue);
    result.appendChild(imgContainer);

}

function cleanTHML(containerResult) {
    while(containerResult.firstChild){
        containerResult.removeChild(containerResult.firstChild);
    }
}


    

