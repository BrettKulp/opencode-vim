import type { VimEvent } from "./vim-handler"
import type { createVimState } from "./vim-state"

export type VimWindowNavigation = "up" | "down"

export function vimWindowNavigation(event: VimEvent, state: ReturnType<typeof createVimState>) {
  const key = event.name ?? ""

  if (state.pending() === "w") {
    if (key === "k") {
      state.clearPending()
      return { action: "up" as VimWindowNavigation, handled: true }
    }

    if (key === "j") {
      state.clearPending()
      return { action: "down" as VimWindowNavigation, handled: true }
    }

    return { handled: false }
  }

  return { handled: false }
}
