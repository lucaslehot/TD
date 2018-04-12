/*Désclaration des variables fondamentales*/
let container = document.querySelector("container")
let body = document.querySelector("body")
let leftStuff = document.querySelector(".leftStuff")
let midStuff = document.querySelector(".midStuff")
let rightStuff = document.querySelector(".rightStuff")
let goldCount, a, enemysBackUp
let enemysList = []
let timer=30
let waveCount=1
let turret1Blocks = document.querySelectorAll(".turret1")
let range1 = 80
let range2 = 40
let currentEnemyType
let enemy2HP = []
let enemy3HP = []
let enemy4HP = []
let scoreCount
let bdbsHP = 10
let deviantCount=0
let deviantTimer=0
let turret2Hp=['1','0.6','0.3']
let julSrc = ['images/jul1.png','images/jul2.png','images/jul3.png','images/jul4.png']
/*Génération des tableaux de couleurs qui correspondent aux HP des adversaires*/
for (let i=0;i<25;i++){
  enemy2HP.push("rgb("+(8*i)+", "+(255-8*i)+", "+0+")")
}
for (let i=0;i<80;i++){
  enemy3HP.push("rgb("+255+", "+3*i+", "+3*i+")")
}
for (let i=0;i<120;i++){
  enemy4HP.push("rgb("+2*i+", "+2*i+", "+255+")")
}

let enemyHP = [["rgb(0, 98, 102)","rgb(0, 148, 50)","rgb(163, 203, 56)","rgb(196, 229, 56)","rgb(255, 195, 18)","rgb(247, 159, 31)","rgb(238, 90, 36)","rgb(234, 32, 39)"],enemy2HP,enemy3HP,enemy4HP]

//AUDIO
/*Création d'une balise audio et ajout du Bon Son ; réglage du boutton mute / unmute*/
let sound = document.createElement('audio')
sound.setAttribute('src', 'audio/sound1.wav')
let toggleSound = document.querySelector("#mute")
toggleSound.addEventListener(
  'click',
  function(){
    if (toggleSound.getAttribute("src") == "images/mute.png"){
      toggleSound.setAttribute("src", "images/play.png")
      sound.play()
    }
    else {
      toggleSound.setAttribute("src", "images/mute.png")
      sound.pause()
    }
})

//START
/*Réglage du boutton start et de l'animation qui suit*/
let startPill = document.createElement('div')
startPill.innerHTML="- START GAME -"
startPill.classList.add('start')
startPill.addEventListener(
  'click',
  function(){
    sound.play()
    startPill.style.display = "none"
    let banner1 = document.querySelector("#banner1")
    let banner2 = document.querySelector("#banner2")
    let midBanner = document.querySelector("#midBanner")
    banner1.style.transition = "0.5s all ease"
    banner2.style.transition = "0.5s all ease"
    midBanner.style.transition = "0.5s all ease-in"
    banner1.style.opacity = "1"
    banner2.style.opacity = "1"
    midBanner.style.opacity = "1"
    banner1.style.left = 40 +"px"
    banner2.style.left = 940 +"px"
    let go = window.setTimeout(function(){
      banner1.style.transition = "4s all linear"
      banner2.style.transition = "4s all linear"
      banner1.style.left = "940px"
      banner2.style.left = "40px"
    },400)
    let go2 = window.setTimeout(function(){
      soundAnimationFunction()
      game()
      banner1.style.transition = "0.5s all ease-out"
      banner2.style.transition = "0.5s all ease-out"
      banner1.style.left = "2340px"
      banner2.style.left = "-1160px"
      banner1.style.opacity = "0"
      banner2.style.opacity = "0"
      midBanner.style.display = "none"
    },4400)
  }
)
document.querySelector('body').appendChild(startPill)

//GENERAL SETTINGS
/*réglage des variables initiales*/
scoreCount = 0
currentEnemyType = 1
goldCount = 300
enemysBackUp = 20

/*Affichage et update initiale de ces variables*/
a=1000-waveCount*100
hp = document.createElement('div')
hp.classList.add('font')
hp.innerHTML = bdbsHP
let heartPic = document.createElement('img')
heartPic.setAttribute('src','images/hearth.png')
heartPic.style.height = "50px"
heartPic.style.width = "50px"
heartPic.style.margin = "50px 0 0 0"
leftStuff.appendChild(heartPic)
leftStuff.appendChild (hp)
clock = document.createElement('div')
clock.classList.add('font')
clock.innerHTML =timer
let clockPic = document.createElement('img')
clockPic.setAttribute('src','images/clock.png')
clockPic.style.height = "50px"
clockPic.style.width = "50px"
clockPic.style.margin = "50px 0 0 0"
leftStuff.appendChild(clockPic)
leftStuff.appendChild (clock)
gold = document.createElement('div')
gold.classList.add('font')
gold.innerHTML =goldCount
let goldPic = document.createElement('img')
goldPic.setAttribute('src','images/gold.png')
goldPic.style.height = "50px"
goldPic.style.width = "50px"
goldPic.style.margin = "50px 0 0 0"
leftStuff.appendChild(goldPic)
leftStuff.appendChild (gold)
backUp = document.createElement('div')
backUp.classList.add('font')
backUp.innerHTML=enemysBackUp
let bakcUpPic = document.createElement('img')
bakcUpPic.setAttribute('src','images/jul1.png')
bakcUpPic.style.height = "50px"
bakcUpPic.style.width = "50px"
bakcUpPic.style.margin = "50px 0 0 0"
leftStuff.appendChild(bakcUpPic)
leftStuff.appendChild (backUp)
score = document.createElement('div')
score.classList.add('font')
score.innerHTML=scoreCount
let scorePic = document.createElement('img')
scorePic.setAttribute('src','images/logo.png')
scorePic.style.height = "60px"
scorePic.style.width = "50px"
scorePic.style.margin = "50px 0 0 0"
leftStuff.appendChild(scorePic)
leftStuff.appendChild (score)
/*Aspect des compteurs*/
let counters = [clock,gold,backUp,score]
for (let i=0;i<4;i++){
  counters[i].style.positon = "fixed"
  counters[i].style.left = 50 + "px"
}


//GENERATING MAP
/*enemble des tableaux de coordonnées des blocks chemin et des emplacements de tourelles*/
let blockTypeList = ['blankBlock','rawBlock','wallBlock','pathBlock','spawnBlock','baseBlock','enemy1Block','enemy2Block','enemy3Block','enemy4Block','turret1','turret2','turret3','deviantBlock']
let map1Type3BlocksPosX = [160,200,240,280,320,360,400,440,480,520,520,520,520,520,480,440,400,360,360,360,360,360,360,360,360,360,360,360,360,400,440,480,520,560,600,640,680,720,760,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,840,880,920,960,1000,1040,1080,1120,1160,1200,1240,1280,1320,1360,1400,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1400,1360,1320,1280,1280,1280,1280,1280,1280,1240,1200,1160,1120,1080,1040,1040,1040,1040,1040,1040,]
let map1Type3BlocksPosY = [120,120,120,120,120,120,120,120,120,120,160,200,240,280,280,280,280,280,320,360,400,440,480,520,560,600,640,680,720,720,720,720,720,720,720,720,720,720,720,720,680,640,600,560,520,480,440,400,360,320,280,240,200,160,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,160,200,240,280,320,360,400,440,480,520,560,600,640,680,720,720,720,720,720,680,640,600,560,520,520,520,520,520,520,520,560,600,640,680,720]
let map1Type1BlocksPosX = [240,240,240,240,240,280,280,280,280,280,280,280,360,360,360,360,360,360,360,360,360,360,360,360,400,400,400,400,400,400,400,400,400,400,400,440,440,440,440,440,440,440,440,440,480,480,480,680,680,680,680,680,720,720,720,720,720,720,720,720,720,720,720,720,720,760,760,800,800,800,800,800,800,800,800,800,800,800,800,800,800,840,840,840,840,840,840,840,840,880,880,920,920,920,960,960,960,960,960,960,1000,1000,1040,1040,1040,1040,1080,1080,1080,1080,1120,1120,1120,1120,1120,1160,1160,1160,1160,1160,1200,1200,1200,1200,1200,1200,1240,1240,1240,1280,1280,1280,1280,1280,1320,1320,1320,1320,1320,1320,1360,1360,1360,1360,1360,1360,1360,1360,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440]
let map1Type1BlocksPosY = [360,400,440,600,640,360,400,440,600,640,320,480,80,160,200,240,320,360,400,440,480,520,560,680,80,160,200,240,320,400,440,480,520,640,680,80,160,200,240,320,360,400,640,680,80,320,680,480,600,640,680,760,80,160,200,240,320,360,400,480,520,600,640,680,760,80,760,40,80,160,200,320,360,400,480,520,600,640,680,720,760,40,80,160,200,480,600,640,680,40,80,80,720,760,80,480,520,560,680,720,160,480,160,480,680,720,160,200,720,760,160,200,560,600,640,160,200,560,600,640,160,80,560,600,640,40,80,160,40,80,600,640,680,760,40,80,600,640,680,760,80,600,640,680,760,240,280,320,160,200,240,320,360,400,560,600,640,680]

/*Génération de la map, type de bloc par type de bloc*/
for (let i=0;i<40;i++){
  for (let j=0;j<22;j++){
    generateBlock (i*40,j*40,0)
  }
}
for (let i=0;i<map1Type3BlocksPosX.length;i++){
  generateBlock (map1Type3BlocksPosX[i],map1Type3BlocksPosY[i],3)
}
for (let i=0;i<map1Type1BlocksPosX.length;i++){
  generateBlock (map1Type1BlocksPosX[i]+40,map1Type1BlocksPosY[i],1)
}
generateBlock (800,440,2)
generateBlock (40,80,4)
generateBlock (1000,760,5)

//SETTING BLOCKS ATTRIBUTES
/*Rend les emplacements de tourelles cliquables et gère l'action de ce clic*/
let rawBlocks = document.querySelectorAll(".rawBlock")
for (let i=0;i<rawBlocks.length;i++){
  rawBlocks[i].addEventListener(
    'click',
    function(){
      if (goldCount > 100){
        rawBlocks[i].classList.replace("rawBlock", "turret1")
        goldCount-=100
        let image = document.createElement('img')
        image.setAttribute("src","images/speaker.png")
        image.setAttribute("alt","speaker")
        image.style.height=35+"px"
        image.style.width=35+"px"
        rawBlocks[i].appendChild(image)
      }
      else (window.alert("Insufficient founds"))
    }
  )
  rawBlocks[i].addEventListener(
    'contextmenu',
    function(e){
      e.preventDefault()
      if (goldCount > 300){
        rawBlocks[i].classList.replace("rawBlock", "turret2")
        goldCount-=300
        let image = document.createElement('img')
        image.setAttribute("src","images/orchestra.png")
        image.setAttribute("alt","orchestra")
        image.style.height=35+"px"
        image.style.width=35+"px"
        rawBlocks[i].appendChild(image)
      }
      else (window.alert("Insufficient founds"))
    }
  )
}
//SOUND ANIMATION
let blankBlocks = document.querySelectorAll(".blankBlock")
function soundAnimationFunction(){
  let soundAnimation = setInterval(function(){
      for (let i=0;i<blankBlocks.length;i++){
        blankBlocks[i].style.background = "#D980FA"
        blankBlocks[i].style.transition = "all " + (3*i)/645.161 + "s ease"
        let animationPart2 = setTimeout(function(){
          blankBlocks[i].style.background = "#12CBC4"
          blankBlocks[i].style.transition = "all " + (3*i)/645.161 + "s ease"
        },645.161*2)
      }
  },(645.161)*4)
}
//TURRETS DAMAGES
/*Définie quand les tourelles vont s'activer et faire des dégats ainsi que l'ensemble des évènementsqui en découlent*/
let turretsHits = setInterval(function(){
  turret2Blocks = document.querySelectorAll(".turret2")
  turret1Blocks = document.querySelectorAll(".turret1")
  for (let i=0;i<turret1Blocks.length;i++){
    for (let j=0;j<enemysList.length;j++){
      if ((parseInt(enemysList[j].style.top)-parseInt(turret1Blocks[i].style.top))<=range1 && (parseInt(enemysList[j].style.top)-parseInt(turret1Blocks[i].style.top))>=(-range1) && (parseInt(enemysList[j].style.left)-parseInt(turret1Blocks[i].style.left))<=range1 && (parseInt(enemysList[j].style.left)-parseInt(turret1Blocks[i].style.left))>=(-range1)) {
        enemysList[j].style.background = enemyHP[currentEnemyType-1][enemyHP[currentEnemyType-1].indexOf(enemysList[j].style.background)+1]
        turret1Blocks[i].style.height=80+"px"
        turret1Blocks[i].style.width=80+"px"
        turret1Blocks[i].style.top=parseInt(turret1Blocks[i].style.top)-8+"px"
        turret1Blocks[i].style.left=parseInt(turret1Blocks[i].style.left)-8+"px"
        turret1Blocks[i].style.background="rgba(0,0,0,0.3)"
        turret1Blocks[i].style.transition="all 0.1s ease-in"
        turret1Blocks[i].firstChild.style.height=75+"px"
        turret1Blocks[i].firstChild.style.width=75+"px"
        turret1Blocks[i].firstChild.style.top=parseInt(turret1Blocks[i].style.top)+8+"px"
        turret1Blocks[i].firstChild.style.left=parseInt(turret1Blocks[i].style.left)+8+"px"
        turret1Blocks[i].firstChild.style.transition="all 0.1s ease-in"
        turret1Blocks[i].style.filter = "invert(100%)"
        let timeoutID = window.setTimeout(function(){
          turret1Blocks[i].style.height=40+"px"
          turret1Blocks[i].style.width=40+"px"
          turret1Blocks[i].style.top=parseInt(turret1Blocks[i].style.top)+8+"px"
          turret1Blocks[i].style.left=parseInt(turret1Blocks[i].style.left)+8+"px"
          turret1Blocks[i].style.background="grey"
          turret1Blocks[i].style.transition="all 0.3s ease-in"
          turret1Blocks[i].firstChild.style.height=35+"px"
          turret1Blocks[i].firstChild.style.width=35+"px"
          turret1Blocks[i].firstChild.style.top=parseInt(turret1Blocks[i].style.top)+8+"px"
          turret1Blocks[i].firstChild.style.left=parseInt(turret1Blocks[i].style.left)+8+"px"
          turret1Blocks[i].firstChild.style.transition="all 0.3s ease-in"
          turret1Blocks[i].style.filter = "none"
        },350)
        if (enemysList[j].style.background == enemyHP[currentEnemyType-1][(enemyHP[currentEnemyType-1].length-1)]){
          container.removeChild(enemysList[j])
          enemysList=document.querySelectorAll(".enemy1Block , .enemy2Block, .enemy3Block, .enemy4Block")
          goldCount+=Math.floor((5*waveCount+1)/2)
          scoreCount+=1
          score.innerHTML=scoreCount
        }
      }
    }
  }
  for (let i=0;i<turret2Blocks.length;i++){
    for (let j=0;j<enemysList.length;j++){
      if ((parseInt(enemysList[j].style.top)-parseInt(turret2Blocks[i].style.top))<=range2 && (parseInt(enemysList[j].style.top)-parseInt(turret2Blocks[i].style.top))>=(-range2) && (parseInt(enemysList[j].style.left)-parseInt(turret2Blocks[i].style.left))<=range2 && (parseInt(enemysList[j].style.left)-parseInt(turret2Blocks[i].style.left))>=(-range2)) {
        turret2Blocks[i].style.opacity = turret2Hp[turret2Hp.indexOf(turret2Blocks[i].style.opacity)+1]
        container.removeChild(enemysList[j])
        enemysList=document.querySelectorAll(".enemy1Block , .enemy2Block, .enemy3Block, .enemy4Block")
        goldCount+=Math.floor((5*waveCount+1)/2)
        scoreCount+=1
        score.innerHTML=scoreCount
        turret2Blocks[i].style.height=80+"px"
        turret2Blocks[i].style.width=80+"px"
        turret2Blocks[i].style.top=parseInt(turret2Blocks[i].style.top)-8+"px"
        turret2Blocks[i].style.left=parseInt(turret2Blocks[i].style.left)-8+"px"
        turret2Blocks[i].style.transition="all 0.1s ease-in"
        turret2Blocks[i].firstChild.style.height=75+"px"
        turret2Blocks[i].firstChild.style.width=75+"px"
        turret2Blocks[i].firstChild.style.top=parseInt(turret2Blocks[i].style.top)+8+"px"
        turret2Blocks[i].firstChild.style.left=parseInt(turret2Blocks[i].style.left)+8+"px"
        turret2Blocks[i].firstChild.style.transition="all 0.1s ease-in"
        let timeoutID = window.setTimeout(function(){
          turret2Blocks[i].style.height=40+"px"
          turret2Blocks[i].style.width=40+"px"
          turret2Blocks[i].style.top=parseInt(turret2Blocks[i].style.top)+8+"px"
          turret2Blocks[i].style.left=parseInt(turret2Blocks[i].style.left)+8+"px"
          turret2Blocks[i].style.transition="all 0.3s ease-in"
          turret2Blocks[i].firstChild.style.height=35+"px"
          turret2Blocks[i].firstChild.style.width=35+"px"
          turret2Blocks[i].firstChild.style.top=parseInt(turret2Blocks[i].style.top)+8+"px"
          turret2Blocks[i].firstChild.style.left=parseInt(turret2Blocks[i].style.left)+8+"px"
          turret2Blocks[i].firstChild.style.transition="all 0.3s ease-in"
        },350)
        if (turret2Blocks[i].style.opacity == 0.3){
          turret2Blocks[i].classList.replace("turret2", "rawBlock")
          turret2Blocks[i].removeChild(turret2Blocks[i].lastChild)
          turret2Blocks[i].style.opacity = '1'
        }
      }
    }
  }
},645.161)
//SETTING ENEMY BEHAVIOUR
function game(){
  /*Définie l'ajout constant de golds*/
  let addGold = setInterval(function(){
    goldCount++
    gold.innerHTML=goldCount
  },750)
  /*Définie les réglages des vagues*/
  let waves = setInterval(function(){
    timer-=1
    clock.innerHTML =timer
    if (timer==0 || enemysList.length==0){
      waveCount+=1
      timer+=40
      enemysBackUp+=(20 + waveCount*3)
      currentEnemyType=(Math.floor(waveCount/3)+1)
      if (currentEnemyType>4){
        currentEnemyType=4
      }
      if (waveCount==4){

        deviantCount++
      }
    }
  },1000)
  /*Définie le comportement du spawn enemie*/
  let spawns = setInterval(function(){
    if (enemysBackUp>0){
      generateBlock (120,120,currentEnemyType+5)
      enemysBackUp--
      backUp.innerHTML=enemysBackUp
    }
    if (enemysBackUp>timer){
      console.log("ok")
      let secondSpawns = setTimeout(function(){
        generateBlock (120,120,currentEnemyType+5)
        enemysBackUp--
        backUp.innerHTML=enemysBackUp
      },250)
    }
  },500);
  /*Définie le mouvement et la trajectoire des adversaires ainsi que leurs dégats*/
  let movement = setInterval(function(){
    for (let i=0;i<enemysList.length;i++){
      if (enemysList[i].style.top == "800px" && enemysList[i].style.left == "1040px"){
        console.log('yo')
        container.removeChild(enemysList[i])
        enemysList=document.querySelectorAll(".enemy1Block , .enemy2Block, .enemy3Block, .enemy4Block")
        bdbsHP--
        hp.innerHTML =bdbsHP
        if (bdbsHP==0){
          gameOver()
        }
      }
      if ((enemysList[i].style.top == "120px" && (enemysList[i].style.left == "520px" || enemysList[i].style.left == "1440px")
        ||(enemysList[i].style.top == "280px" && enemysList[i].style.left == "360px")
        ||(enemysList[i].style.top == "520px" && enemysList[i].style.left == "1040px"))){
          enemysList[i].classList.replace("dir1", "dir2")
          enemysList[i].classList.replace("dir3", "dir2")
      }
      else if ((enemysList[i].style.top == "720px" && enemysList[i].style.left == "360px")
             ||(enemysList[i].style.top == "120px" && enemysList[i].style.left == "800px")){
               enemysList[i].classList.replace("dir0", "dir1")
               enemysList[i].classList.replace("dir2", "dir1")
      }
      else if ((enemysList[i].style.top == "720px" && enemysList[i].style.left == "800px")
             ||(enemysList[i].style.top == "720px" && enemysList[i].style.left == "1280px")){
               enemysList[i].classList.replace("dir1", "dir0")
               enemysList[i].classList.replace("dir3", "dir0")
      }
      else if ((enemysList[i].style.top == "280px" && enemysList[i].style.left == "520px")
             ||(enemysList[i].style.top == "720px" && enemysList[i].style.left == "1440px")
             ||(enemysList[i].style.top == "520px" && enemysList[i].style.left == "1280px")){
               enemysList[i].classList.replace("dir0", "dir3")
               enemysList[i].classList.replace("dir2", "dir3")
      }
      if (enemysList[i].classList.contains("dir0")){
        let temp = parseInt(enemysList[i].style.top)
        temp-=1
        enemysList[i].style.top = temp + "px"
      }
      else if (enemysList[i].classList.contains("dir1")){
        let temp = parseInt(enemysList[i].style.left)
        temp+=1
        enemysList[i].style.left = temp + "px"
      }
      else if (enemysList[i].classList.contains("dir2")){
        let temp = parseInt(enemysList[i].style.top)
        temp+=1
        enemysList[i].style.top = temp + "px"
      }
      else if (enemysList[i].classList.contains("dir3")){
        let temp = parseInt(enemysList[i].style.left)
        temp-=1
        enemysList[i].style.left = temp + "px"
      }
    }
    enemysList=document.querySelectorAll(".enemy1Block , .enemy2Block, .enemy3Block, .enemy4Block")

  },10);
}

//QTE SETTINGS
let wordsList = [['I','A','M'],['M','A','R','L','E','Y'],['O','R','E','L','S','A','N']]
let wordsListKeyCodes = [[105,97,109],[109,97,114,108,101,121],[111,114,101,108,115,97,110]]

//DEVIANT BEHAVIOUR
let deviantLaunch = setInterval(function(){
  if (deviantCount==1){
    deviantCount--
    generateBlock(120,120,13)
    deviantDude = document.querySelector(".deviantBlock")
    let deviantImage = document.createElement('img')
    deviantImage.setAttribute('src','images/deviant.png')
    deviantImage.style.height='120px'
    deviantImage.style.width='120px'
    deviantDude.appendChild(deviantImage)
    let deviantGo = setTimeout(function(){
      let deviantAttack = setInterval(function(){
        deviantDude.style.top=(parseInt(deviantDude.style.top)+4.5)+'px'
        deviantDude.style.left=(parseInt(deviantDude.style.left)+6.75)+'px'
        deviantTimer++
        if (deviantTimer==150){
          container.removeChild(deviantDude)
          bdbsHP-=5
          hp.innerHTML = bdbsHP
          container.removeChild(deviantDude)
          clearInterval(deviantAttack)
          clearTimeout(deviantGo)
          if (bdbsHP<=0){
            gameOver()
          }
        }
      },10)
    },1000)
    let b = Math.floor(Math.random()*3)
    let qteWord = document.createElement('div')
    function printQTE(){
      for (let i=0;i<wordsList[b].length;i++){
        let qteLetter = document.createElement('div')
        qteLetter.innerHTML = wordsList[b][i]
        qteLetter.classList.add('qteLetter')
        qteLetter.classList.add('word'+i)
        qteWord.appendChild(qteLetter)
      }
      qteWord.classList.add('qteWord')
      midStuff.appendChild(qteWord)
    }
    printQTE()

    window.addEventListener(
      'keypress',
      function(e){
        console.log(e.keyCode)
        for (let i=0;i<wordsList[b].length;i++){
          if (e.keyCode==wordsListKeyCodes[b][i]){
            let toRemove = document.querySelector('.word'+i)
            qteWord.removeChild(toRemove)
          }
        let tab = document.querySelectorAll('.qteLetter')
        if (tab.length==0){
          container.removeChild(deviantDude)
          clearInterval(deviantAttack)
          clearTimeout(deviantGo)
        }
      }
      }
    )
  }
},1000)


//FUNCTIONS LIST
function generateBlock (x,y,z){
  block = document.createElement('div')
  container.appendChild(block)
  if (block.classList.contains('blankBlock')){
    block.classList.replace('blankBlock',blockTypeList[z])
  }
  else {
    block.classList.add(blockTypeList[z])
  }
  block.classList.add("block")
  block.style.top = y + "px"
  block.style.left = x + "px"
  if (z==5){
    let bdbsImg=document.createElement('img')
    bdbsImg.setAttribute('src','images/bdbs.png')
    block.appendChild(bdbsImg)
  }
  else if (z==4){
    let spawnImg=document.createElement('img')
    spawnImg.setAttribute('src','images/spawn.png')
    block.appendChild(spawnImg)
  }
  else if (z==6 || z==7 || z==8 || z==9 ){
    block.classList.add("dir1")
    /*permet de cliquer sur les enemis pour leur faire perde des hp*/
    block.addEventListener(
      'click',
      function(e){
        this.style.background = enemyHP[currentEnemyType-1][enemyHP[currentEnemyType-1].indexOf(this.style.background)+1]
        if (this.style.background == enemyHP[currentEnemyType-1][(enemyHP[currentEnemyType-1].length-1)]){
          container.removeChild(this)
          enemysList=document.querySelectorAll(".enemy1Block , .enemy2Block, .enemy3Block, .enemy4Block")
          goldCount+=Math.floor(5*waveCount+1/2)
          scoreCount+=1
          score.innerHTML=scoreCount
        }
      }
    )
    let julImage = document.createElement('img')
    julImage.classList.add('julImg')
    julImage.setAttribute('src',julSrc[z-6])
    block.appendChild(julImage)
  }
}
function gameOver (){
  for (let i=0; i < 50; i++){
    window.clearInterval(i)
    document.querySelector("#gameOver").style.display = "block"
  }
}
