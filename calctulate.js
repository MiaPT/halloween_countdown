import dayjs from 'dayjs'

const today = dayjs()

const afterHalloween = today.month() > 10

const halloween = dayjs(new Date(today.year() + afterHalloween, 9, 31))


// +1 because the diff between one day and the next is 0. 
// This will be wrong between 00:00:00 and 00:00:01, so don't do that when that matters:)
let timeLeft = halloween.diff(today, "day") + 1
let unit = "DAGER"

if (timeLeft < 3){
    timeLeft =  halloween.diff(today, "hour")
    unit = "TIMER"
}


document.getElementById("countdown").innerHTML = "" + timeLeft + " " + unit
document.getElementById("title").innerHTML = "" + timeLeft + " " + unit.toLowerCase() + " til halloween:)"
