import React, { useContext } from 'react'
import BuilderContext from "../store/BuilderContext";
import Button from "./Button";
import { trackAnalyticsEvent } from "../utils/googleAnalyticsUtils";

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
      <Button
        disabled={mode === 'simulator'}
        onClick={() => {
          trackAnalyticsEvent({
            category: 'Builder',
            action: 'ModeSimulator',
          })
          setMode('simulator')
        }}
      >
        Симулятор
      </Button>
      <Button
        disabled={mode === 'edit_tabbar'}
        onClick={() => {
          trackAnalyticsEvent({
            category: 'Builder',
            action: 'ModeEditTabbar',
          })
          setMode('edit_tabbar')
        }}
      >
        Таббар
      </Button>
      <Button
        disabled={mode === 'edit_onboarding'}
        onClick={() => {
          trackAnalyticsEvent({
            category: 'Builder',
            action: 'ModeEditOnboarding',
          })
          setMode('edit_onboarding')
        }}
      >
        Онбординг
      </Button>
      <Button
        disabled={mode === 'navigation'}
        onClick={() => {
          trackAnalyticsEvent({
            category: 'Builder',
            action: 'ModeNavigation',
          })
          setMode('navigation')
        }}
      >
        Навигация
      </Button>
    </div>
  )
}