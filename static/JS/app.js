const btnANGRY = document.querySelector('#btnANGRY')
const btnSURPRISED = document.querySelector('#btnSURPRISED')
const btnDISGUSTED = document.querySelector('#btnDISGUSTED')
const btnNEUTRAL = document.querySelector('#btnNEUTRAL')
const btnSAD = document.querySelector('#btnSAD')
const btnHAPPY = document.querySelector('#btnHAPPY')
const btnFEARFUL = document.querySelector('#btnFEARFUL')


const fetchAttribute = ()=> {
    
    let attrib = ''
    fetch('/getRandomImage/attribute', {
        method: 'GET'
    })
    .then(res=> res.json())
    .then(res => {
        if(!res.attrib){
            attrib=null;
        }
        attrib=(res.attrib)
    })

    return attrib;
}

const checkInput = (attrib)=>{
    
    if(fetchAttribute()===null){
        console.log("KUCH TO GADBAD HAI");
    }
    else
    {
        if(attrib===fetchAttribute()){
            console.log("jalebi baby")
        }
        else{
            console.log("no jalebi baby")
        }
    }
}

btnANGRY.addEventListener('click',()=>{checkInput('angry')
    
})
btnSURPRISED.addEventListener('click',()=>{checkInput('surprised')
    
})
btnDISGUSTED.addEventListener('click',()=>{checkInput('disgusted')
    
})
btnNEUTRAL.addEventListener('click',()=>{checkInput('neutral')
    
})
btnSAD.addEventListener('click',()=>{checkInput('sad')
    
})
btnHAPPY.addEventListener('click',()=>{checkInput('happy')
    
})
btnFEARFUL.addEventListener('click',()=>{checkInput('fearful')
    
})


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

