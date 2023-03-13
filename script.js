const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const name = form.elements['name'].value;
  const email = form.elements['email'].value;
  const message = form.elements['message'].value;
  
  // Here you can use an AJAX request or any other method to submit the form data
  // to your server or backend service
  
  alert(`Thank you for your message, ${name}! We will get
