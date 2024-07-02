const checkList = document.querySelector('.checkList');
const items = checkList.querySelectorAll('li');
const inputs = checkList.querySelectorAll('input');
for(let i = 0; i < items.length; i++){
    items[i].addEventListener('click',editItem);
    inputs[i].addEventListener('blur',updateItem);
    inputs[i].addEventListener('keypress',itemKeyPress);
}

function editItem(){
    this.className = 'edit';
    const input = this.querySelector('input');
    input.focus();
    input.setSelectionRange(0,input.value.length);
}
function updateItem(){
    this.previousElementSibling.innerHTML = this.value;
    this.parentNode.className = '';
}
function itemKeyPress(e){
    if(e.which === 13){
        updateItem.call(this);
    }
}

function debounce(fn, wait) {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    };
  }
 window.onscroll = debounce(()=>console.log('scoll'),1000)