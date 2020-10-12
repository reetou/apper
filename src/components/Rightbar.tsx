import React, { useContext } from 'react'
import BarContainer from "./BarContainer";
import BuilderContext, { CustomComponent, CustomPage, PageType } from "../store/BuilderContext";
import SettingsBlock from "./SettingsBlock";
import SettingsSelect from "./SettingsSelect";
import { CUSTOM_COMPONENT_TYPES } from "./mobile_components";
import EditTextBlock from "./forms/EditTextBlock";
import EditCustomGenericButton from "./forms/EditCustomGenericButton";
import EditCustomImage from "./forms/EditCustomImage";
import EditCustomInput from "./forms/EditCustomInput";

function componentForm(component?: CustomComponent) {
  switch (component?.item_type) {
    case CUSTOM_COMPONENT_TYPES.TextBlock:
      return <EditTextBlock />
    case CUSTOM_COMPONENT_TYPES.CustomGenericButton:
    case CUSTOM_COMPONENT_TYPES.CustomGenericButtonRounded:
      return <EditCustomGenericButton />
    case CUSTOM_COMPONENT_TYPES.CustomImage:
      return <EditCustomImage />
    case CUSTOM_COMPONENT_TYPES.CustomInput:
      return <EditCustomInput />
    default:
      return null
  }
}

export default function Rightbar() {
  const {
    openedPage,
    setOpenedPage,
    editingComponent,
  } = useContext(BuilderContext)
  const editPage = (page: CustomPage) => {
    setOpenedPage((prevPage: CustomPage | null) => ({
      ...prevPage,
      ...page,
    }))
  }
  if (!openedPage) {
    return null
  }
  return (
    <BarContainer>
      <h3>{`${openedPage.name}: Настройки`}</h3>
      <SettingsBlock
        title="Параметры страницы"
      >
        <SettingsSelect
          value={openedPage.page_type}
          onChange={(value) => {
            editPage({
              ...openedPage as CustomPage,
              page_type: value as PageType,
            })
            console.log(`New value is`, value)
          }}
          title="Тип страницы"
          options={[
            { value: 'modal', label: 'Модальное окно' },
            { value: 'screen', label: 'Экран' },
          ]}
        />
      </SettingsBlock>
      {componentForm(editingComponent)}
    </BarContainer>
  )
}