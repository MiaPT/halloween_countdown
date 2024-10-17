import dayjs from 'dayjs'

const today = dayjs()

const afterHalloween = today.month() > 10

const halloween = dayjs(new Date(today.year() + afterHalloween, 9, 31))


let daysLeft = halloween.diff(today, "day")

let timeLeft = daysLeft
let unit = "DAGER"

if (timeLeft < 3){
    timeLeft =  halloween.diff(today, "hour")
    unit = "TIMER"
}


document.getElementById("countdown").innerHTML = "" + timeLeft + " " + unit


const emojiList = ["🎃",  "👽", "🕷️", "💀", "🦇", "🕸️", "🍬"]
const animationDuration = 24

emojiList.forEach((emoji, index) => {
    const emojiElement = document.createElement("div")
    
    const css = { 
        position: "absolute",
        animationName: "spin",
        animationDuration: `${animationDuration}s`,
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
        animationDelay: `-${(animationDuration/emojiList.length) * index}s`,
     }
     Object.assign(emojiElement.style, css)
    emojiElement.innerHTML = emoji
    document.getElementById("emojis").appendChild(emojiElement)
})
