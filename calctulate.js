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
