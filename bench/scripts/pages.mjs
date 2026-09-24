/* Список страниц стенда визуальной сверки: имена файлов bench/app/pages/parity/*.vue без
   расширения. Имя страницы — это и маршрут пререндера, и имя артборда, и ключ пары в
   прогоне.

   Читают его шесть мест: nuxt.config.ts (список пререндера), shoot.mjs (что снимать),
   ledger.mjs (ожидаемый состав прогона), classes.mjs и roots.mjs (что разбирать) и тест
   покрытия стенда. Пока однострочник жил копией в каждом, правило «что считается
   страницей» менялось бы в одном месте и молча расходилось с остальными — тот же сценарий,
   ради которого вынесен разбор --only в only.mjs.

   Синхронно — потому что nuxt.config.ts вычисляет список при загрузке конфига, до всякого
   await; скриптам стенда это ничего не стоит. */
import { readdirSync } from 'node:fs'

export const PAGES_DIR = 'bench/app/pages/parity'

export function pageNames(dir = PAGES_DIR) {
  return readdirSync(dir).filter((f) => f.endsWith('.vue')).map((f) => f.slice(0, -4))
}
