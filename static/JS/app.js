const img = document.querySelector('#randomImage')

const next = document.querySelector('#next')
next.addEventListener('click',()=>{

    fetch('/getRandomImage/attribute', {
        method: 'GET'
    })
    .then(res=> res.json())
    .then(res => {
        console.log(res.attrib)
    })
})