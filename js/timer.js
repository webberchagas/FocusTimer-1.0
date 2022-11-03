import Sound from "./sounds.js"

export function Timer({
  minutesDisplay,
  secondsDisplay,
  resetControls,
}){
    let timerTimeout
    let minutes = minutesDisplay.textContent

    function updateDisplay(newMinutes, seconds) {
      newMinutes = newMinutes === undefined ? minutes : newMinutes 
      seconds = seconds === undefined ? 0 : seconds 
      minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
      secondsDisplay.textContent = String(seconds).padStart(2, "0")
    }

    function reset(){
      clearTimeout(timerTimeout)
      updateDisplay(minutes, 0)
    }

    function countdown(){
      timerTimeout = setTimeout(function() {
        let seconds = Number(secondsDisplay.textContent)
        let minutes = Number(minutesDisplay.textContent)
        let isFinish = minutes <= 0 && seconds <= 0

        updateDisplay(minutes, 0)

        if(isFinish) {
          resetControls()
          updateDisplay()
          Sound().timerEnd()
          return
        }

        if(seconds <= 0) {
          seconds = 6
          --minutes
        }

        updateDisplay(minutes, seconds -1)

        countdown()
      }, 1000)
    }

    function updateMinutes(newMinutes){
      minutes = newMinutes
    }

    function holdTimer(){
      clearTimeout(timerTimeout)
    }

    return {
      countdown,
      reset,
      updateDisplay,
      updateMinutes,
      holdTimer
    }
  }