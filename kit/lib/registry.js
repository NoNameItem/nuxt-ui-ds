/* Tiny component registry.

   Many templates nest one kit component inside another (`<UAvatar v-bind="avatar">`
   inside User, ChatMessage, Timeline; `<UCheckbox>` inside CheckboxGroup;
   `<UTextarea>` inside ChatPrompt). The renderer cannot import those directly —
   they import the renderer — so components register themselves here on load and
   lib/factory.jsx looks them up at render time.

   Anything that did not call `register` is still reachable: the compiled bundle
   puts every component on one global namespace object, so a miss falls back to
   that object. Without it, mounting a nested component would need a `register`
   call added to fifteen files, and a new component would silently render as a
   bare styled <div> until someone remembered to add the sixteenth. */
const registry = {};

let ns;
function namespace() {
  if (ns !== undefined) return ns;
  ns = null;
  if (typeof window !== 'undefined') {
    for (const key of Object.getOwnPropertyNames(window)) {
      if (!/^NuxtUI/.test(key)) continue;
      const v = window[key];
      if (v && typeof v === 'object' && typeof v.Button === 'function' && typeof v.Alert === 'function') { ns = v; break; }
    }
  }
  return ns;
}

export function register(name, component) { registry[name] = component; }

export function lookup(name) {
  if (!name) return undefined;
  if (registry[name]) return registry[name];
  const found = namespace() && namespace()[name];
  return typeof found === 'function' ? found : undefined;
}
