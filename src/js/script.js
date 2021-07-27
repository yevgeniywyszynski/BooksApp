const select = {
  templateOf:{
    booksTemplate: '#template-book',
  },

  containerOf:{
    booksList: '.books-list',
    imagesList: '.books-list .book__image',
  },

  formsOf: {
    filters: '.filters'
  }
};

const templates = {
  booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
};

class BookList{
  constructor(){
    const thisBookList = this;

    thisBookList.favoriteList = [];
    thisBookList.filters = [];
    thisBookList.render();
    thisBookList.initAction();
  }
  render(){
    const thisBookList = this;
    for(let book of dataSource.books){
      const ratingBgc = thisBookList.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      const bookPlus = {
        id: book.id,
        name: book.name,
        price: book.price,
        image: book.image,
        rating: book.rating,
        ratingBgc: ratingBgc,
        ratingWidth: ratingWidth
      };
      const generatedHTML = templates.booksTemplate(bookPlus);
      console.log(book);
      //console.log(generatedHTML);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      //console.log(generatedDOM);
      const booksContainer = document.querySelector(select.containerOf.booksList);
      booksContainer.appendChild(generatedDOM);
    }
  }
  determineRatingBgc(rating){
    let background = '';
    if(rating < 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if(rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if(rating > 8 && rating <=9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if(rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  
    return background;
  }
  initAction(){
    const thisBookList = this;
    const booksList = document.querySelector(select.containerOf.booksList);
    const imagesList = booksList.querySelectorAll(select.containerOf.imagesList);
    //console.log(imagesList);
    const filter = document.querySelector(select.formsOf.filters);
  
    for(let OneImg of imagesList){
      OneImg.addEventListener('dblclick', function(event){
        event.preventDefault();
        let id = OneImg.getAttribute('data-id');
        if(thisBookList.favoriteList.includes(id)){
          thisBookList.favoriteList.splice(thisBookList.favoriteList.indexOf(id), 1);
          OneImg.classList.remove('favorite');
        } else {
          thisBookList.favoriteList.push(OneImg.getAttribute('data-id'));
          OneImg.classList.add('favorite');
        }
        console.log(thisBookList.favoriteList);
      });
    }
    filter.addEventListener('change', function(event){
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter')
        console.log(event.target.value);
      if(event.target.checked) {
        thisBookList.filters.push(event.target.value);
      } else {
        thisBookList.filters.splice(thisBookList.filters.indexOf(event.target.value));
      }
      console.log(thisBookList.filters);
      thisBookList.filtBooks();
    });
  } 

  filtBooks() {
    const thisBookList = this;
    for (let OneBook of dataSource.books){
      let toHide = false;
      for(let filt of thisBookList.filters){
        if(!OneBook.details[filt]){
          toHide = true;
        }
      }
      if(toHide == true){
        const bookCover = document.querySelector('.book__image[data-id="' + OneBook.id + '"]');
        bookCover.classList.add('hidden');
      } else {
        const bookCover = document.querySelector('.book__image[data-id="' + OneBook.id + '"]');
        bookCover.classList.remove('hidden');
      }
    }
  }
}

new BookList();







