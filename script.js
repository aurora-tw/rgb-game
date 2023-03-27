let squares = document.getElementsByClassName("square")
let taskSquares = 3
let easyMode = document.getElementById("easy")
let hardMode = document.getElementById("hard")
let newColors = document.getElementById("newcolors")
let resultButton = document.getElementById("result")
let header = document.getElementsByClassName("header")[0]

const init = () => {
    clearContainer()
    addSquares()
    initTask()
}

const addSquares = () => {
    clearContainer()

    for (let i = 0; i < taskSquares; i++) {
        let container = document.getElementsByClassName("container")[0]
        let square = document.createElement("div")
        square.setAttribute("class", "square")
        container.append(square)
    }
}

const setUpSquares = (color = "") => {
    let taskColor = document.getElementById("rbg")
    if (color.length > 1) {
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = color
            squares[i].style.border = "none"
        }
    } else {
        let squareForTask = Math.floor(Math.random() * squares.length)
        for (let i = 0; i < squares.length; i++) {
            let backgroundColor = generateColor()
            squares[i].style.backgroundColor = backgroundColor
            squares[i].style.border = "none"
            squares[i].classList.add("hover-effect")
            if (squareForTask === i) {
                taskColor.innerHTML = backgroundColor
            }
            squares[i].addEventListener("click", function () {
                let squarecolor = this.style.backgroundColor
                if (squarecolor.replaceAll(" ", "") === taskColor.innerHTML) {
                    console.log("correct")
                    resultButton.innerHTML = "correct"
                    resultButton.removeAttribute("style")
                    newColors.innerHTML = "play again"
                    header.style.backgroundColor = squarecolor
                    addSquares()
                    setUpSquares(squarecolor)

                } else {
                    this.style.backgroundColor = "#333333"
                    this.classList.remove("hover-effect")
                }
            })

        }
    }

}

const initTask = () => {

    setUpSquares()

    hardMode.addEventListener("click", function (e) {
        changeMode("hard")
    })

    easyMode.addEventListener("click", function (e) {
        changeMode("easy")
    })
    newColors.innerHTML = "new colors"
    newColors.addEventListener("click", initTask)
    resultButton.setAttribute("style", "display:none")
    header.removeAttribute("style")
}

const generateColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`
}

const clearContainer = () => {
    if (squares.length === 0) {
        return
    }
    squares[0].remove()
    clearContainer()
}

const changeMode = (mode) => {
    taskSquares = 3
    hardMode.setAttribute("class", "mode")
    easyMode.setAttribute("class", "mode selected")
    if (mode === "hard") {
        taskSquares = 6
        easyMode.setAttribute("class", "mode")
        hardMode.setAttribute("class", "mode selected")
    }
    init()
}

init()
