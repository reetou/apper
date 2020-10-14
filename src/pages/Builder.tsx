import React, { useContext } from 'react'
import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";
import styled from 'styled-components'
import Simulator from "../components/Simulator";
import BuilderContext from "../store/BuilderContext";
import { CUSTOM_COMPONENT_TYPES } from "../components/mobile_components";
import EditTextBlock from "../components/forms/EditTextBlock";
import ReactModal from 'react-modal';
import update from 'immutability-helper'
import CustomGenericButton from "../components/mobile_components/CustomGenericButton";
import BuilderModeToggle from "../components/BuilderModeToggle";
import Navigation from "../components/Navigation";
import EditTabbar from "../components/forms/EditTabbar";
import CustomOnboarding from "../components/mobile_pages/CustomOnboarding";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function Builder() {
  const { mode } = useContext(BuilderContext)
  return (
    <Container>
      <Leftbar />
      <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
        <BuilderModeToggle />
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
      <Rightbar/>
      {/*<ReactModal*/}
      {/*  isOpen={Boolean(editingComponent)}*/}
      {/*  style={{*/}
      {/*    content: {*/}
      {/*      top: 200,*/}
      {/*      left: 200,*/}
      {/*      right: 200,*/}
      {/*      bottom: 200,*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  onRequestClose={() => {*/}
      {/*    setEditingComponent(undefined)*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <div>*/}
      {/*    {editingComponent?.item_type === CUSTOM_COMPONENT_TYPES.TextBlock ? <EditTextBlock /> : null}*/}
      {/*  </div>*/}
      {/*  <button*/}
      {/*    onClick={() => {*/}
      {/*      setEditingComponent(undefined)*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Применить*/}
      {/*  </button>*/}
      {/*</ReactModal>*/}
    </Container>
  )
}