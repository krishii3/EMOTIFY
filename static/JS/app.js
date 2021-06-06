const btnANGRY = document.querySelector('#btnANGRY')
const btnSURPRISED = document.querySelector('#btnSURPRISED')
const btnDISGUSTED = document.querySelector('#btnDISGUSTED')
const btnNEUTRAL = document.querySelector('#btnNEUTRAL')
const btnSAD = document.querySelector('#btnSAD')
const btnHAPPY = document.querySelector('#btnHAPPY')
const btnFEARFUL = document.querySelector('#btnFEARFUL')
const btnNext=document.querySelector('#next')
const btnEnd=document.querySelector('#end')
let counter = 0
localStorage.setItem("userTime", JSON.stringify([]))
// HELPER FUNCTIONSS


const addUserTimeTaken = (usedTime) => {
    let userTime = []
    let savedTimes = JSON.parse(localStorage.getItem("userTime"))
    console.log(savedTimes)
    userTime = [...savedTimes]
    userTime.push(usedTime)
    localStorage.setItem("userTime", JSON.stringify(userTime))
}


const disableInput = () => {
    btnANGRY.setAttribute("disabled",true)
    btnSURPRISED.setAttribute("disabled",true)
    btnDISGUSTED.setAttribute("disabled",true)
    btnNEUTRAL.setAttribute("disabled",true)
    btnSAD.setAttribute("disabled",true)
    btnFEARFUL.setAttribute("disabled",true)
    btnHAPPY.setAttribute("disabled",true)
    // btnNext.setAttribute("disabled",true)
    // btnEnd.setAttribute("disabled",true)
}

const enableInput = () => {
    btnANGRY.removeAttribute("disabled")
    btnSURPRISED.removeAttribute("disabled")
    btnDISGUSTED.removeAttribute("disabled")
    btnNEUTRAL.removeAttribute("disabled")
    btnSAD.removeAttribute("disabled")
    btnFEARFUL.removeAttribute("disabled")
    btnHAPPY.removeAttribute("disabled")
    // btnNext.removeAttribute("disabled")
    // btnEnd.removeAttribute("disabled")
}

// FUNCTION FOR TIMERS 
// THIS IS FOR TEXT TIMER
function Countdown(elem, seconds) {
    var that = {};
  
    that.elem = elem;
    that.seconds = seconds;
    that.totalTime = seconds * 100;
    that.usedTime = 0;
    that.startTime = +new Date();
    that.timer = null;
  
    that.count = function() {
      that.usedTime = Math.floor((+new Date() - that.startTime) / 10);
  
      var tt = that.totalTime - that.usedTime;
      if (tt <= 0) {
        that.elem.innerHTML = '00.00';
        clearInterval(that.timer);
      } else {
        var mi = Math.floor(tt / (60 * 100));
        var ss = Math.floor((tt - mi * 60 * 100) / 100);
        var ms = tt - Math.floor(tt / 100) * 100;
  
        that.elem.innerHTML =  that.fillZero(ss) + "." + that.fillZero(ms);
      }
    };
    
    that.init = function() {
      if(that.timer){
        clearInterval(that.timer);
        that.elem.innerHTML = '00.00';
        that.totalTime = seconds * 100;
        that.usedTime = 0;
        that.startTime = +new Date();
        that.timer = null;
      }
    };
  
    that.start = function() {
      if(!that.timer){
         that.timer = setInterval(that.count, 1);
      }
    };
  
    that.stop = function() {
    //   console.log('usedTime = ' + countDown.usedTime);
      addUserTimeTaken(countDown.usedTime)
      if (that.timer) clearInterval(that.timer);
    };
  
    that.fillZero = function(num) {
      return num < 10 ? '0' + num : num;
    };
  
    return that;
  }
//   THIS IS FOR VISUALISATION
  function timerCountDown (){

    const timer = document.getElementById("timerBar")
    var that = {}
    that.timer = null
    that.width = 500

    that.init = function(){
        if(that.timer) {
            clearInterval(that.timer)
            timer.style.width = 500
        }
    }
    that.frame = function(){
        if(that.width <= 0){
            clearInterval(that.timer)
            disableInput()
        } else {
            --that.width
            timer.style.width = that.width + 'px'
        }
    }  
    that.start = function() {
        if(!that.timer) {
            that.timer = setInterval(that.frame, 10)
        }
    }
    that.stop = function(){
        if(that.timer){
            clearInterval(that.timer)
        }
    }
    return that
}




const updateCounter = () => {
    const counterBtn = document.querySelector('#counter')
    counterBtn.textContent = counter
}

const fetchAttribute = async ()=> {
    return await fetch('/getRandomImage/attribute', {
        method: 'GET'
    }).then(res => res.json())
}


const getRandomImage = async () => {
    const img = await fetch('/getRandomImage').then(res => res.blob())
    return img
}

const photobox = document.querySelector('#photobox')
const next = document.querySelector('#next')
const time = document.querySelector('#time')
let countDown, countViz



next.addEventListener('click', async()=>{
    enableInput()
    photobox.textContent = ''
    const img = new Image()
    const dataUrl = await getRandomImage()
    const myBlob = URL.createObjectURL(dataUrl)
    img.src  = myBlob
    img.width = '200'
    img.height = '200'
    photobox.appendChild(img)
    countDown = new Countdown(time, 5)
    countViz = new timerCountDown()
    countDown.start()
    countViz.start()
})

const stopTimer = () => {
    countDown.stop()
    countViz.stop()
    disableInput()
}

const checkInput = async (attrib)=>{
    const data = await fetchAttribute()
    if(!data.attrib) {
        let message = "something went wrong, please restart your game."
        console.log(message);
    } else {
        attrib === data.attrib ? counter+=1 : ''
    }
    stopTimer()
    updateCounter()
}

btnANGRY.addEventListener('click', async()=>checkInput('angry'))
btnSURPRISED.addEventListener('click',()=>checkInput('surprised'))
btnDISGUSTED.addEventListener('click',()=>checkInput('disgusted'))
btnNEUTRAL.addEventListener('click',()=>checkInput('neutral'))
btnSAD.addEventListener('click',()=>checkInput('sad'))
btnHAPPY.addEventListener('click',()=>checkInput('happy'))
btnFEARFUL.addEventListener('click',()=>checkInput('fearful'))


// IMAGES WIDTH HANDLERS

const emojis = document.querySelectorAll('img')
emojis.forEach(img => {
    img.width = 20
    img.height = 20
})