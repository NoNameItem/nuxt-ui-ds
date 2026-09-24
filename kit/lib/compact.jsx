import React from 'react';

/* `compact` is not a prop a caller threads by hand — a palette declares that
   everything inside it is compact (`ChatPalette.vue:25`, `<Slot compact>`) and
   the flag reaches messages nested at any depth (ChatMessages.vue:205 ->
   ChatMessage.vue:45). Cloning the palette's children cannot express that: the
   renderer places children as slot VALUES, and a value that is re-created
   downstream loses props added by the clone. A context is placement-independent
   — whatever the factory does with the element tree, the flag is read where the
   message finally renders. */
export const CompactContext = React.createContext(undefined);

/** `props.compact` when the caller set it, otherwise the enclosing scope's. */
export function useCompact(own) {
  const inherited = React.useContext(CompactContext);
  return own !== undefined ? own : inherited;
}

export function CompactScope({ value, children }) {
  return React.createElement(CompactContext.Provider, { value }, children);
}
