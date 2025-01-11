console.log('Client side JS is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messsageOne = document.querySelector('#message-1')
const messsageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const input = search.value

    messsageOne.textContent = 'Loading...'
    messsageTwo.textContent = ''

    fetch('http://localhost:3000/weather?input=' + input).then((resp) => {
        resp.json().then((data) => {
            if(data.error) {
                messsageOne.textContent = data.error
            } else {
                messsageOne.textContent = data.location
                messsageTwo.textContent = 'Temperature: ' + data.temperature + ' Feels like: ' + data.feelslike
            }
        })
    })
})