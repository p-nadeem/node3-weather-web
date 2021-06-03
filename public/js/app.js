
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-one')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    if (location) {
        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                message.textContent = data.forcast
            })
        })
    } else {
        message.textContent = 'Please enter location'
    }
})

