// function loadJSON(callback) {   

//   const xobj = new XMLHttpRequest();
//       xobj.overrideMimeType("application/json");
//   xobj.open('GET', './data.json', true); // Replace 'my_data' with the path to your file
//   xobj.onreadystatechange = function () {
//         if (xobj.readyState == 4 && xobj.status == "200") {
//           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//           callback(JSON.parse(xobj.responseText));
//         }
//   };
//   xobj.send(null);  
// }
// console.log(loadJSON());

// store filter

const allCheckboxes = document.querySelectorAll('input[type=checkbox]');
const allProducts = Array.from(document.querySelectorAll('.store__data'));

Array.prototype.forEach.call(allCheckboxes, function (el) {
    el.addEventListener('change', toggleCheckbox);
  });

function toggleCheckbox(e) {
    e.target.classList.toggle('checked');
    setVisibility(e);
}  

function setVisibility(e) {
    allProducts.map(function (el) {
      if (e.target.classList.contains('checked') && el.classList.contains(e.target.value)) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  }