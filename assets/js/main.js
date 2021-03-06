// LOAD DATA FROM JSON
class ProductsRestApiService {
  static restApiUrl = 'https://my-json-server.typicode.com/bstolarski/hey-hooney';

  static getProducts(callback, errCallback) {
      fetch(`${this.restApiUrl}/products`)
          .then(resp => {
              if (resp.ok) {
                  return resp.json()
              } else {
                  throw new Error('Connection error');
              }
          })
          .then(products => {
              const data = products.map(product =>
                  new Product(
                      product.name,
                      product.id,
                      product.type,
                      product.size,
                      product.image,
                      product.newProduct,
                  )
              );
              if (typeof callback === 'function') {
                  callback(data);
              }
          })
          .catch(err => {
              if (typeof errCallback === 'function') {
                  errCallback(err);
              }
          })
  }
}

// PRODUCT MODEL
class Product {
  constructor(name, id, type, size, image, newProduct) {
      this.name = name;
      this.id = id;
      this.type = type;
      this.size = size;
      this.image = image;
      this.newProduct = newProduct;
  }
}
// RENDERING PRODUCTS LIST
const storeContent = document.querySelector('.store__content');

ProductsRestApiService.getProducts(
  products => products.map(function(product){
    const productTemplate = document.createElement("div");
    productTemplate.classList.add("store__data");
    productTemplate.classList.add(product.type);
    productTemplate.setAttribute("id", product.id);
    productTemplate.setAttribute("value", product.type);
    productTemplate.innerHTML = 
      `
        <img src="assets/img/${product.image}" alt="${product.name}" class="store__img ${product.newProduct}">
        <h3 class="product__title">${product.name}</h3>
        <p class="product__description">${product.size}</p>
        <a href="#" class="button button-link">Buy Now</a>
      `;
    storeContent.appendChild(productTemplate);
    // Store Filter and set defualt visibility on loaded products
    const allCheckboxes = document.querySelectorAll('input[type=checkbox]');
    Array.prototype.forEach.call(allCheckboxes, function (el, index) {
      el.addEventListener('change', toggleCheckbox);
      if (index == 0){
        el.classList.add('checked');
      }
      setVisibility(el);
    });
  })
);

// CHECKBOX FILTER
function toggleCheckbox(e) {
    e.target.classList.toggle('checked');
    setVisibility(e.target);
}  

function setVisibility(e) {
  const allProducts = Array.from(document.querySelectorAll('.store__data'));
    allProducts.map(function (el) {
      if (e.classList.contains('checked') && el.classList.contains(e.value)) {
        el.style.display = 'block';
      } else if(!e.classList.contains('checked') && el.classList.contains(e.value)) {
        el.style.display = 'none';
      }
    });
  }

// MOBILE NAVIGATION
// Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon
  const navIcon = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');

  navIcon.addEventListener("click", mobileMenu);

  function mobileMenu() {
    navIcon.classList.toggle("active");
    navList.classList.toggle("active");
  }

  const navLink = document.querySelectorAll('.nav__link');

  navLink.forEach(n => n.addEventListener("click", closeMenu));

  function closeMenu() {
    navIcon.classList.remove("active");
    navList.classList.remove("active");
  }

// SCROLL REVEAL

const reveal = ScrollReveal({
  duration: 2000,
  delay: 200,
  reset: true
});

const scale = ScrollReveal({
  duration: 1500,
  delay: 200,
  scale: 0.85,
  reset: true
})

const ContentArray = [
  document.querySelector('.home__data'),
  document.querySelector('.aboutus__data'),
  document.querySelector('.store__header'),
];

const ImageArray = [
  document.querySelector('.home__title::before'),
  document.querySelector('.home__img'),
  document.querySelector('.aboutus__img')
]

reveal.reveal(ContentArray, {
});
reveal.reveal('.button', {
  delay: 500
});

scale.reveal(ImageArray, {
});


// FORM VALIDATION
const form = document.querySelector("form[name='contact-form']");
const thankYou = document.querySelector(".hidden");
const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const messageInput = document.querySelector("textarea[name='message']");

nameInput.isValid = () => !!nameInput.value;
emailInput.isValid = () => isValidEmail(emailInput.value);
messageInput.isValid = () => !!messageInput.value;

const inputFields = [nameInput, emailInput, messageInput];

const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

let shouldValidate = false;
let isFormValid = false;

const validateInputs = () => {
  console.log("we are here");
  if (!shouldValidate) return;

  isFormValid = true;
  inputFields.forEach((input) => {
    input.classList.remove("invalid");
    input.nextElementSibling.classList.add("hide");

    if (!input.isValid()) {
      input.classList.add("invalid");
      isFormValid = false;
      input.nextElementSibling.classList.remove("hide");
    }
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  shouldValidate = true;
  validateInputs();
  if (isFormValid) {
    // TODO: DO REQUEST
    form.classList.add("hidden");
    thankYou.classList.remove("hidden");
    thankYou.classList.add("thank-you");
  }
});

inputFields.forEach((input) => input.addEventListener("input", validateInputs));