import dayjs from 'dayjs'

const today = dayjs()
const afterHalloween = today.month() > 9

const halloween = dayjs(new Date(today.year() + afterHalloween, 9, 31))
const todayIsHalloween = today.isSame(halloween, "day")

// +1 because the diff between one day and the next is 0. 
// This will be wrong between 00:00:00 and 00:00:01, so don't do that when that matters:)
const daysLeft = halloween.diff(today, "day") + 1
const hoursLeft = halloween.diff(today, "hour")

let time = null
let unit = null

if (hoursLeft === 0){
    const minutesLeft = halloween.diff(today, "minute")
    time = minutesLeft
    unit = "MINUTTER"
}
else if (daysLeft < 3){
    time = hoursLeft
    unit = "TIMER"
}
else {
    time = daysLeft
    unit = "DAGER"
}

document.getElementById("countdown").innerHTML = "" + time + " " + unit
document.getElementById("title").innerHTML = "" + time + " " + unit.toLowerCase() + " til halloween:)"


if (todayIsHalloween){
    document.getElementById("countdown").innerHTML = "HALLOWEEN!!"
    document.getElementById("title").innerHTML = "Det er halloween!!<3"
    document.getElementById("bottomText").style.display = "none"
}
