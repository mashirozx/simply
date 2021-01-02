/* Add Link in the Title for custom-kusi-doc.hbs
/* ---------------------------------------------------------- */
const setup = () => {
  // Return if no post box exists
  const markdown = document.querySelector('.js-kusi-doc')
  if (!markdown) return

  // Search the titles in the post
  // Return if no title exists
  const argTitles = ['h1', 'h2', 'h3']
  const titles = markdown.querySelectorAll(argTitles.join(','))

  if (!titles.length) return

  // Table of Contents Box
  const jsTableOfContent = document.querySelector('.js-table-content')
  const sidebar = document.querySelector('.js-sidebar-right')

  if (sidebar) document.querySelector('.js-sidebar-wrap').classList.remove('hidden')

  // Table of Content sidebar right
  function tableOfContent (link, el) {
    if (!jsTableOfContent) return

    link.textContent = el.textContent

    const tocList = document.createElement('li')

    if (el.closest('h3')) {
      link.classList = 'py-1 pl-3 block text-xs hover:text-primary'
    } else {
      link.classList = 'py-2 block hover:text-primary'
    }

    tocList.appendChild(link)
    jsTableOfContent.appendChild(tocList)
  }

  // Links To Titles
  function linkToTile (link, el) {
    link.setAttribute('aria-hidden', 'true')
    link.innerHTML = '<svg class="fill-current w-5 h-5" aria-hidden="true"><use xlink:href="#icon-link"></use></svg>'
    link.classList = 'anchor px-3 inline-block invisible opacity-0 -ml-10 text-gray-500'

    el.insertBefore(link, el.childNodes[0])
  }

  titles.forEach(el => {
    el.classList = 'hover-title'

    const titleLink = document.createElement('a')
    titleLink.href = `#${el.getAttribute('id')}`

    // Table of Content
    tableOfContent(titleLink.cloneNode(true), el)

    // Link To Title
    linkToTile(titleLink, el)
  })
}

document.addEventListener('DOMContentLoaded', setup)