import React, { useContext } from 'react'
import BarContainer from "./BarContainer";
import CustomComponentContainer from "./CustomComponentContainer";
import CustomInput from "./mobile_components/CustomInput";
import BuilderContext, { CustomComponent, CustomPage } from "../store/BuilderContext";
import { CustomGenericButtonData, CustomGenericRoundedButtonData, CustomInputData } from "./mobile_components";
import CustomGenericButton from "./mobile_components/CustomGenericButton";
import CustomComponentBlock from "./CustomComponentBlock";

export default function Leftbar() {
  const { openedPage, setOpenedPage } = useContext(BuilderContext)
  const onAdd = (component: CustomComponent) => {
    setOpenedPage((prevPage) => {
      if (!prevPage) {
        return prevPage
      }
      return {
        ...prevPage,
        components: [...prevPage.components, {...component}],
      }
    })
  }
  return (
    <BarContainer>
      <h3>Компоненты</h3>
      <CustomComponentBlock
        title="Взаимодействие"
      >
        <CustomComponentContainer
          onClick={onAdd}
          data={CustomInputData()}
        >
          <CustomInput thumbnail />
        </CustomComponentContainer>
        <CustomComponentContainer
          onClick={onAdd}
          data={CustomGenericButtonData()}
        >
          <CustomGenericButton thumbnail />
        </CustomComponentContainer>
        <CustomComponentContainer
          onClick={onAdd}
          data={CustomGenericRoundedButtonData()}
        >
          <CustomGenericButton thumbnail rounded />
        </CustomComponentContainer>
      </CustomComponentBlock>
    </BarContainer>
  )
}