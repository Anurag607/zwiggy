// @ts-nocheck
const sortbar = () => {
    const main = document.querySelector("#sortbar")
    const elements = document.querySelectorAll(".overlay")
    const filterImg = document.querySelector("#filterImg")
    const overlayCnt = document.querySelector("#overlayCnt")
    if(main.offsetTop > 0) {
        filterImg.style.filter = 'invert(1)'
        main.style.backgroundColor = '#000000'
        main.style.color = '#ffffff'
        elements.forEach(el => {
            el.parentElement.onmouseout = function() {
                this.children[0].style.backgroundColor = '#000000'
                this.style.color = '#ffffff'
            }
            el.parentElement.onmouseover = function() {
                this.children[0].style.backgroundColor = '#ffffff'
                this.style.color = '#000000'
            }
        })

        overlayCnt.parentElement.onmouseout = function() {
            this.children[0].style.backgroundColor = '#000000'
            this.style.color = '#ffffff'
        }
        overlayCnt.parentElement.onmouseover = function() {
            this.children[0].style.backgroundColor = '#ffffff'
            this.style.color = '#ffffff'
        }

        filterImg.parentElement.onmouseout = function() {
            filterImg.style.filter = 'invert(1)'
            this.children[1].style.backgroundColor = '#000000'
            this.style.color = '#ffffff'
        }
        filterImg.parentElement.onmouseover = function() {
            filterImg.style.filter = 'invert(0)'
            this.children[1].style.backgroundColor = '#ffffff'
            this.style.color = '#000000'
        }
    }
}

export default sortbar