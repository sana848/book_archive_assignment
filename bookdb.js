document.getElementById('error-message').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        const booksDiv = document.getElementById('book-details');
        document.getElementById('search-result').innerHTML = '';
        booksDiv.innerHTML = '';
        document.getElementById('book-details').style.display = 'block';
        booksDiv.innerHTML = `
            <p>Please enter proper value</p>
        `;
    }
    else {
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayDocuments(data.docs))
            .catch(error => displayError(error));
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}


const displayDocuments = books => {
    const booksDiv = document.getElementById('book-details');
    booksDiv.innerHTML = '';
    document.getElementById('book-details').style.display = 'block';
    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('book')
        div.innerHTML = `
                <h3>${book.title}</h3>
                <p>${book.author_name}</p>
                <p>${book.first_publish_year}</p>
                <p>${book.publisher}</p>
                <button onclick="displayCountryDetail(${book.cover_i})">Details</button>
            `;

        booksDiv.appendChild(div);
    });

}


const displayCountryDetail = (cover_i) => {
    const coverDiv = document.getElementById('search-result');
    coverDiv.innerHTML = '';

    document.getElementById('book-details').style.display = 'none';
    const div = document.createElement('div');
    div.classList.add('card');

    if (cover_i != undefined) {
        coverDiv.innerHTML = `
        <img width="200px" src=" https://covers.openlibrary.org/b/id/${cover_i}-M.jpg">
    `;
    }
    else {
        coverDiv.innerHTML = `
        <h5 class="card-title">Cover image is not found</h5>
    `;
    }

    coverDiv.appendChild(div);
}
