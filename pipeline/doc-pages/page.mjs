/* Оболочка doc-страницы. Вся выборка примеров лежит в самой странице блоком
   application/json: так страница самодостаточна, а diff между сборками читаем. */

const HEAD = (title) => `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<title>${title} — Nuxt UI kit docs</title>
<link rel="stylesheet" href="../../styles.css">
<link rel="stylesheet" href="../../lib/docs.css">
<script src="https://cdn.jsdelivr.net/npm/iconify-icon@3/dist/iconify-icon.min.js"></script>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="../../_ds_bundle.js"></script>
</head><body class="bg-default text-default">`

export function pageHtml(doc) {
  const json = JSON.stringify(doc).replace(/</g, '\\u003c')
  return `${HEAD(doc.name)}
<div id="root"></div>
<script type="application/json" id="ds-doc">${json}</script>
<script type="module">
import { renderPage } from '../../lib/docs.js';
renderPage(JSON.parse(document.getElementById('ds-doc').textContent), document.getElementById('root'));
</script>
</body></html>
`
}
