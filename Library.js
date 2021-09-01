const myLibrary = JSON.parse(localStorage.getItem("Library"))
  ? JSON.parse(localStorage.getItem("Library"))
  : [];

// let lib = JSON.parse(localStorage.getItem("Library"));
// console.log(lib);
// lib = JSON.parse(localStorage.getItem("Library"));
console.log(myLibrary);
function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
// myLibrary = [];
//NEED TO DO STILL - adding a prototype to allow handling of toggling the read button
// Book.prototype.toggleRead = function(p) {
//     console.log("hello");
//     p.read = "read";
// }
// localStorage.setItem("name", "Kola");
let toggleRead = (q) => {
  console.log(myLibrary[q - 100]);
  if (myLibrary[q - 100].read === "not read") {
    myLibrary[q - 100].read = "read";
    clearLibrary();
    displayBooks();
  } else {
    myLibrary[q - 100].read = "not read";
    clearLibrary();
    displayBooks();
  }
};

let removeBooksFunc = (a) => {
  console.log("triggered");
  //   localStorage.removeItem("Library");
  myLibrary.splice(a, 1);
  localStorage.setItem("Library", JSON.stringify(myLibrary));
  clearLibrary();
  displayBooks();
};

let displayBooks = () => {
  for (i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("h3");
    const pages = document.createElement("h3");
    const read = document.createElement("h3");
    let removeButton = document.createElement("button");
    let readBookCheck = document.createElement("button");

    title.textContent = myLibrary[i].title;
    author.textContent = myLibrary[i].author;
    pages.textContent = myLibrary[i].pages + " " + "pages";
    read.textContent = myLibrary[i].read;
    removeButton.textContent = "Remove book";
    readBookCheck.textContent = "Read?";

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(removeButton);
    bookCard.appendChild(readBookCheck);

    removeButton.setAttribute("id", i);
    readBookCheck.setAttribute("id", i + 100);
    bookCard.setAttribute("id", "coolClass");

    //Interesitng - below when no function() added it triggres immediately. Because it is a callback function
    removeButton.onclick = function () {
      removeBooksFunc(removeButton.id);
    };
    // readBookCheck.onclick = function() {Book.toggleRead(readBookCheck.id)}
    readBookCheck.onclick = function () {
      toggleRead(readBookCheck.id);
    };

    document.getElementsByTagName("div")[0].appendChild(bookCard);
    document.getElementById("coolClass").classList.add("card");
  }
};

let clearLibrary = () => {
  let bookClear = document.getElementById("books-grid");
  bookClear.innerHTML = "";
};

displayBooks();

let bookInputFromForm = () => {
  let title = document.getElementById("title").value;
  let author = document.getElementById("auth").value;
  let pages = document.getElementById("pages").value;
  // let read = document.getElementById("read").value;
  let read = checkRead();
  let newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  document.getElementById("myForm").reset();
};

function addBookToLibrary(x) {
  // do stuff here - take user input and store the new book object into the array )push it in)
  clearLibrary();
  myLibrary.push(x);
  localStorage.clear();
  let newData = localStorage.setItem("Library", JSON.stringify(myLibrary));
  console.log(newData);
  displayBooks();
}

let checkRead = () => {
  let checkbox = document.getElementById("read");
  if (checkbox.checked == true) {
    return "read";
  } else {
    return "not read";
  }
};
