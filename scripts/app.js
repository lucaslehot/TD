let more = document.querySelector("#more")
let arrow = document.querySelector(".more")
let toggle = 0

arrow.addEventListener("click", display)
  function display(){
    if (toggle == 0){
      more.style.display = ('block')
      arrow.style.backgroundImage = "url('images/uparrow.png')"
      toggle = 1

    }
    else if (toggle == 1) {
        more.style.display = ('none')
        arrow.style.backgroundImage = "url('images/downarrow.svg')"
        toggle = 0
    }
  }
