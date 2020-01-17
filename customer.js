
const containerScroll = document.querySelector('.container--scroll')
let pages = Array.from(containerScroll.children).filter(page => page.classList.contains('page'))
const state = {
    events: {
        start: false,
        moviment: false,
        end: true
    }
}
const handlers = {
    ended: function () {
        state.events.end = true
        state.events.start = false
        state.events.moviment = false
    },
    start: function () {
        state.events.end = false,
            state.events.start = true,
            state.events.moviment = true
    }
}
renderControls(pages)
loadStatePage()
function renderControls(pages) {
    const controlElement = document.querySelector('.control')
    const typeControl = controlElement.dataset.typeControl
    const { length } = pages
    controlElement.innerHTML = ""
    for (let i = 0; i < length; i++) {
        const element = renderButton(typeControl, pages[i].dataset.page)

        element && controlElement.appendChild(element)

        element.addEventListener('click', (e) => {
            if(state.events.moviment) return
            const _page = getPage(e.target.dataset.value)
            scrollPage(parseInt(_page.dataset.top), window.pageYOffset)

        })
    }
}

function renderButton(type, value) {

    switch (type) {

        case 'point':
            return renderButtonPoint(value)
    }
}
function scrollPage(posElement, posPage) {


    scrollPageDown(posElement, posPage)
    scrollPageUp(posElement, posPage)
}

function scrollPageDown(posElement, posPage) {
    if (!state.events.start) handlers.start()
    if (posElement >= posPage) {

        window.scroll(0, posPage)
        requestAnimationFrame(() => scrollPageDown(posElement, posPage + 5))
    } else {
        handlers.ended()
    }
}

function scrollPageUp(posElement, posPage) {
    if (!state.events.start) handlers.start()
    if (posElement <= posPage) {

        window.scroll(0, posPage)
        requestAnimationFrame(() => scrollPageUp(posElement, posPage - 5))
    } else {
        handlers.ended()
    }
}
function getPage(page) {

    return pages.find(item => !item.dataset.page.localeCompare(page))
}
function renderButtonPoint(value) {

    const element = document.createElement('button')
    element.dataset.value = value

    return element

}

function loadStatePage() {
    _height = 0;

    pages.forEach(page => {
        page.dataset.top = _height

        _height += page.clientHeight
    })
}