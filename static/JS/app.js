const btnANGRY = document.querySelector('#btnANGRY')
const btnSURPRISED = document.querySelector('#btnSURPRISED')
const btnDISGUSTED = document.querySelector('#btnDISGUSTED')
const btnNEUTRAL = document.querySelector('#btnNEUTRAL')
const btnSAD = document.querySelector('#btnSAD')
const btnHAPPY = document.querySelector('#btnHAPPY')
const btnFEARFUL = document.querySelector('#btnFEARFUL')
let counter = 0

const updateCounter = () => {
    const counterBtn = document.querySelector('#counter')
    counterBtn.textContent = counter
}

const fetchAttribute = async ()=> {
    return await fetch('/getRandomImage/attribute', {
        method: 'GET'
    }).then(res => res.json())
}
const checkInput = async (attrib)=>{
    const data = await fetchAttribute()
    if(!data.attrib) {
        let message = "something went wrong, please restart your game."
        console.log(message);
    } else {
        attrib === data.attrib ? counter+=1 : ''
    }
    updateCounter()
}

btnANGRY.addEventListener('click', async()=>checkInput('angry'))
btnSURPRISED.addEventListener('click',()=>checkInput('surprised'))
btnDISGUSTED.addEventListener('click',()=>checkInput('disgusted'))
btnNEUTRAL.addEventListener('click',()=>checkInput('neutral'))
btnSAD.addEventListener('click',()=>checkInput('sad'))
btnHAPPY.addEventListener('click',()=>checkInput('happy'))
btnFEARFUL.addEventListener('click',()=>checkInput('fearful'))


const getRandomImage = async () => {
    const img = await fetch('/getRandomImage').then(res => res.blob())
    return img
}

const photobox = document.querySelector('#photobox')
const next = document.querySelector('#next')
next.addEventListener('click', async()=>{
    photobox.textContent = ''
    const img = new Image()
    const dataUrl = await getRandomImage()
    const myBlob = URL.createObjectURL(dataUrl)
    img.src  = myBlob
    img.width = '200'
    img.height = '200'
    photobox.appendChild(img)
})

