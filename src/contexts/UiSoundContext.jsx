import React, { createContext, useContext } from "react"
import { useUiSounds } from "../hooks/useUiSounds"

const UiSoundContext = createContext(null)

export const UiSoundProvider = ({ children }) => {
  const api = useUiSounds()
  return <UiSoundContext.Provider value={api}>{children}</UiSoundContext.Provider>
}

export function useUiSoundApi() {
  const ctx = useContext(UiSoundContext)
  if (!ctx) {
    console.warn("useUiSoundApi used outside UiSoundProvider, returning no-op functions")
    return {
      playHover: () => {},
      playConfirm: () => {},
      playCancel: () => {},
      playTestSuccess: () => {},
      playTestFailure: () => {},
      startAmbient: () => {},
      stopAmbient: () => {},
    }
  }
  return ctx
}

