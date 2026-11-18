// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

let resultCount
let resultList

function selectAttempts(filter) {
  const attempts = window.reportData.attempts

  if (filter === 'passed') {
    return attempts.filter((attempt) => attempt.passed === true)
  }

  if (filter === 'failed') {
    return attempts.filter((attempt) => attempt.passed === false)
  }

  return attempts
}

function renderAttempts(attempts) {
  let markup = ''

  attempts.forEach((attempt) => {
    const status = attempt.passed ? 'Порог пройден' : 'Порог не пройден'

    markup += `
      <li class="result-item">
        <span class="result-name">${escapeHtml(attempt.name)}</span>
        <span>${attempt.score} из ${window.reportData.questionCount} (${attempt.percentage}%) — ${status}</span>
      </li>`
  })

  resultList.innerHTML = markup
  resultCount.textContent = `Показано: ${attempts.length} из ${window.reportData.attempts.length}`
}

function startFilter() {
  const form = document.querySelector('#filter-form')
  const select = document.querySelector('#filter')
  resultCount = document.querySelector('#result-count')
  resultList = document.querySelector('#result-list')

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const attempts = selectAttempts(select.value)
    renderAttempts(attempts)
  })
}

startFilter()
