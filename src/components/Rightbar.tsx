import React, { useContext } from 'react'
import BarContainer from "./BarContainer";
import BuilderContext, { CustomPage, PageType } from "../store/BuilderContext";
import SettingsBlock from "./SettingsBlock";
import SettingsSelect from "./SettingsSelect";
import { CUSTOM_COMPONENT_TYPES } from "./mobile_components";
import EditTextBlock from "./forms/EditTextBlock";

export default function Rightbar() {
  const {
    openedPage,
    setOpenedPage,
    editingComponent,
    editComponentForm,
    setEditComponentForm,
    setEditingComponent,
    updateComponent,
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
          value={openedPage.pageType}
          onChange={(value) => {
            editPage({
              ...openedPage as CustomPage,
              pageType: value as PageType,
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
      {
        editingComponent?.item_type === CUSTOM_COMPONENT_TYPES.TextBlock ? <EditTextBlock/> : null
      }
    </BarContainer>
  )
}