import React, { useContext } from 'react'
import BuilderContext from "../store/BuilderContext";

export default function BuilderModeToggle() {
  const { mode, setMode } = useContext(BuilderContext)
  return (
    <div
      style={{
        margin: '12px 0',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <button disabled={mode === 'simulator'} onClick={() => setMode('simulator')}>
        Симулятор
      </button>
      <button disabled={mode === 'edit_tabbar'} onClick={() => setMode('edit_tabbar')}>
        Таббар
      </button>
      <button disabled={mode === 'edit_onboarding'} onClick={() => setMode('edit_onboarding')}>
        Онбординг
      </button>
      <button disabled={mode === 'navigation'} onClick={() => setMode('navigation')}>
        Навигация
      </button>
    </div>
  )
}