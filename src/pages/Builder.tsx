import React, { useContext } from 'react'
import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";
import styled from 'styled-components'
import Simulator from "../components/Simulator";
import BuilderContext from "../store/BuilderContext";
import BuilderModeToggle from "../components/BuilderModeToggle";
import Navigation from "../components/Navigation";
import EditTabbar from "../components/forms/EditTabbar";
import Button from '../components/Button';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function Builder() {
  const { mode, pages, onboarding, tabbarSettings, tabbarEnabled } = useContext(BuilderContext)
  return (
    <Container>
      <Leftbar />
      <div
        style={{
          minWidth: '40%',
        }}
      >
        <div>
          <BuilderModeToggle />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {
            mode === 'simulator' ? <Simulator /> : null
          }
          {
            mode === 'navigation' ? <Navigation /> : null
          }
          {
            mode === 'edit_tabbar' ? <EditTabbar /> : null
          }
          {
            mode === 'edit_onboarding' ? <Simulator /> : null
          }
        </div>
        <div
          style={{ marginTop: 12 }}
        >
          <Button onClick={() => {
            navigator.clipboard.writeText(JSON.stringify({
              project_name: 'Default',
              tabbar_enabled: tabbarEnabled,
              tabbar_settings: tabbarSettings,
              onboarding,
              pages,
            }, null, 2))
          }}>
            Выгрузить
          </Button>
        </div>
      </div>
      <Rightbar/>
    </Container>
  )
}