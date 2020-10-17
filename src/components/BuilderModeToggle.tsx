import React, { useContext } from 'react'
import BuilderContext from "../store/BuilderContext";
import Button from "./Button";

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
      <Button disabled={mode === 'simulator'} onClick={() => setMode('simulator')}>
        Симулятор
      </Button>
      <Button disabled={mode === 'edit_tabbar'} onClick={() => setMode('edit_tabbar')}>
        Таббар
      </Button>
      <Button disabled={mode === 'edit_onboarding'} onClick={() => setMode('edit_onboarding')}>
        Онбординг
      </Button>
      <Button disabled={mode === 'navigation'} onClick={() => setMode('navigation')}>
        Навигация
      </Button>
    </div>
  )
}