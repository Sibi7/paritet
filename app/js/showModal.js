function showModal(dopClass) {

   var main = document.querySelector('.modal');
   if (main) {
       if (dopClass === undefined) {
           main.parentNode.style.display = 'block';
       } else {
           main = document.querySelector('.modal' + '.' + dopClass.replace('.', ''));
           main.parentNode.style.display = 'block';
       }
   } else {
       return false
   }
    return false
}
