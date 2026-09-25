//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  const searchForm = document.querySelector('.app-docs-search__form')
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault()
    })
  }

  document.querySelectorAll('.app-docs-nav__toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true'
      const subnav = document.getElementById(button.getAttribute('aria-controls'))
      const item = button.closest('.app-docs-nav__item')

      button.setAttribute('aria-expanded', String(!expanded))

      if (subnav) {
        subnav.hidden = expanded
      }

      if (item) {
        item.classList.toggle('app-docs-nav__item--open', !expanded)
      }
    })
  })

  const updateAnchorNav = () => {
    const hash = window.location.hash

    document.querySelectorAll('.app-docs-nav__sublink[href*="#"]').forEach((link) => {
      const isCurrent = Boolean(hash) && link.hash === hash
      link.classList.toggle('app-docs-nav__sublink--current', isCurrent)

      if (isCurrent) {
        link.setAttribute('aria-current', 'location')
      } else {
        link.removeAttribute('aria-current')
      }
    })

    document.querySelectorAll('.app-docs-nav__item--current .app-docs-nav__link').forEach((link) => {
      const section = link.closest('.app-docs-nav__item')
      const hasHashCurrent = Boolean(section && section.querySelector('.app-docs-nav__sublink--current'))
      link.classList.toggle('app-docs-nav__link--current', !hasHashCurrent)
    })
  }

  updateAnchorNav()
  window.addEventListener('hashchange', updateAnchorNav)
})
