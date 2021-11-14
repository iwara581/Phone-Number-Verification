document.addEventListener('DOMContentLoaded', domContent)

const input = document.querySelector('#input')
const btn = document.querySelector('button')
const result = document.querySelector('.result')
const load = document.querySelector('.loader')
const err = document.querySelector('.err')

function domContent() {
  btn.onclick = () => {
    const val = input.value
    
    if (val.length < 1) {
      errHandler('Please Enter A Phone Number')
      
      return
    }
    
   if (val.length > 15) {
      errHandler('Invalid Phone Number. Number Contain 11 Digit')
      
     return
   }
   const key = '5949113c9dd98f5623b5ab8290e741a9'
   
   loader(1)
    numChecker(val, 1, key)
  }
}

function design(data) {
  result.classList.add('pix')
  
  loader(0)
  
  const {valid, international_format, country_code, country_name, location, carrier, line_type } = data
  result.innerHTML = `
    <ul>
      <li><b>valid =</b> ${valid}</li>
      <li><b>phone number =</b> ${international_format}</li>
      <li><b>country code =</b> ${country_code}</li>
      <li><b>country name =</b> ${country_name}</li>
      <li><b>location =</b> ${location}</li>
      <li><b>carrier =</b> ${carrier}</li>
      <li><b>line_type =</b> ${line_type}</li>
    </ul>
  `
  console.log(data)
}

function loader(sw) {
  if (sw === 1) {
    load.classList.add('load')
  }
  
  if (sw === 0) {
    load.classList.remove('load')
  }
}

function errHandler(msg) {
    const div = document.createElement('div')
    div.innerText = msg
    div.style.color = 'red'
    err.appendChild(div)
    setInterval(() => {
      div.remove('err')
    }, 1000);
}

async function numChecker(num, format, access) {
  try {
  const { data, status } = await axios.get(`http://apilayer.net/api/validate?access_key=${access}&number=${num}&country_code=&format=${format}`)
  
  if (status === 200) {
    design(data)
  }
  
  if (status != 200) {
    loader(0)
    alert('Invalid Number')
    
    return
  }
  } catch (e) {
    alert('server issue')
    console.log(error)
  }
}
