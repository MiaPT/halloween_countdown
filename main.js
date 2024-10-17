

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
