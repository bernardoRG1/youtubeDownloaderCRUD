
const linkInput = document.querySelector('#linkInput');
const linkSubmit = document.querySelector('#linkSubmit')
const videoContainer = document.querySelector('#videoInfoContainer')
const formulario = document.querySelector('#miFormulario')


formulario.addEventListener('submit', (e) => {
   e.preventDefault()
   videoContainer.innerHTML = `<h2>hola</h2>`
})