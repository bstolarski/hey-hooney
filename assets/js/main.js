

// store filter

const allCheckboxes = document.querySelectorAll('input[type=checkbox]');
const allProducts = Array.from(document.querySelectorAll('.store__data'));
const checked = {};

Array.prototype.forEach.call(allCheckboxes, function (el) {
    el.addEventListener('change', toggleCheckbox);
  });

function toggleCheckbox(e) {
    e.target.classList.toggle('checked');
    setVisibility();
}  

function setVisibility() {
    allProducts.map(function (el) {
      const wielokwiatowy = e.target.classList.contains('checked"') ? el.classList.contains('wielokwiatowy') : true;
      const lipowy = e.target.classList.contains('checked"') ? el.classList.contains('lipowy') : true;
      const spadziowy = e.target.classList.contains('checked"') ? el.classList.contains('spadziowy') : true;
      if (wielokwiatowy && lipowy && spadziowy) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  }