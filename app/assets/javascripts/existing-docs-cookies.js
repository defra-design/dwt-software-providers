// Cookie banner and cookies page behaviour for the existing docs prototype
// (v2, GOV.UK pattern option). Vanilla JavaScript; the pages work without it, but
// the cookie message and settings form need it, as on GOV.UK services.
//
// Uses Material for MkDocs' own __md_get and __md_set so the choice is stored in
// localStorage in the same way as on the live site. No real analytics are loaded.
// Add ?reset-cookies to any page URL to clear the choice and see the banner again.

(function () {
  var KEY = '__cookie_choice'

  if (/[?&]reset-cookies\b/.test(window.location.search)) {
    __md_set(KEY, null)
  }

  var choice = __md_get(KEY)
  var hasChoice = choice && typeof choice.analytics === 'boolean'

  function save (analytics) {
    __md_set(KEY, { analytics: analytics })
  }

  // Banner
  var banner = document.querySelector('[data-app-cookie-banner]')

  if (banner) {
    var messages = {}
    banner.querySelectorAll('[data-app-cookie-message]').forEach(function (message) {
      messages[message.getAttribute('data-app-cookie-message')] = message
    })

    var show = function (name) {
      Object.keys(messages).forEach(function (key) {
        messages[key].hidden = key !== name
      })
      banner.hidden = false
    }

    if (!hasChoice) {
      show('default')
    }

    banner.addEventListener('click', function (event) {
      var button = event.target.closest('[data-app-cookie-action]')
      if (!button) {
        return
      }
      var action = button.getAttribute('data-app-cookie-action')

      if (action === 'accept' || action === 'reject') {
        save(action === 'accept')
        show(action === 'accept' ? 'accepted' : 'rejected')
      } else if (action === 'hide') {
        banner.hidden = true
      }
    })
  }

  // Cookies page
  var form = document.querySelector('[data-app-cookie-form]')

  if (form) {
    var enhanced = document.querySelectorAll('[data-app-cookie-enhanced]')
    var noscript = document.querySelectorAll('[data-app-cookie-noscript]')
    var success = document.querySelector('[data-app-cookie-success]')

    enhanced.forEach(function (element) { element.hidden = false })
    noscript.forEach(function (element) { element.hidden = true })

    if (hasChoice) {
      var current = form.querySelector('input[name="analytics"][value="' + (choice.analytics ? 'yes' : 'no') + '"]')
      if (current) {
        current.checked = true
      }
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault()
      var selected = form.querySelector('input[name="analytics"]:checked')

      if (!selected) {
        return
      }

      save(selected.value === 'yes')

      if (success) {
        success.hidden = false
        success.setAttribute('tabindex', '-1')
        success.focus()
        window.scrollTo(0, 0)
      }
    })
  }
})()
