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
                      product.image
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
  constructor(name, id, type, size, image) {
      this.name = name;
      this.id = id;
      this.type = type;
      this.size = size;
      this.image = image;
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
        <img src="assets/img/${product.image}" alt="${product.name}" class="store__img">
        <h3 class="product__title">${product.name}</h3>
        <p class="product__description">${product.size}</p>
        <a href="#" class="button button-link">Buy Now</a>
      `;
    storeContent.appendChild(productTemplate);
  })
);

// STORE FILTER
const allCheckboxes = document.querySelectorAll('input[type=checkbox]');

Array.prototype.forEach.call(allCheckboxes, function (el) {
    el.addEventListener('change', toggleCheckbox);
  });

function toggleCheckbox(e) {
    e.target.classList.toggle('checked');
    setVisibility(e);
}  

function setVisibility(e) {
  const allProducts = Array.from(document.querySelectorAll('.store__data'));
    allProducts.map(function (el) {
      if (e.target.classList.contains('checked') && el.classList.contains(e.target.value)) {
        el.style.display = 'block';
      } else if(!e.target.classList.contains('checked') && el.classList.contains(e.target.value)) {
        el.style.display = 'none';
      }
    });
  }