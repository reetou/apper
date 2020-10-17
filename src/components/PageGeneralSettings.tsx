import React, { useContext, useEffect } from 'react'
import BuilderContext, { CustomComponent, CustomPage } from "../store/BuilderContext";
import SettingsBlock from "./SettingsBlock";
import { CUSTOM_COMPONENT_TYPES } from "./mobile_components";
import EditTextBlock from "./forms/EditTextBlock";
import EditCustomGenericButton from "./forms/EditCustomGenericButton";
import EditCustomImage from "./forms/EditCustomImage";
import EditCustomInput from "./forms/EditCustomInput";
import SettingsMarginPadding from "./SettingsMarginPadding";
import { validateNumberValue } from "../utils/componentUtils";
import EditCustomListView from "./forms/EditCustomListView";
import SettingsColorPicker from "./SettingsColorPicker";
import update from 'immutability-helper'

function componentForm(component?: CustomComponent) {
  switch (component?.item_type) {
    case CUSTOM_COMPONENT_TYPES.TextBlock:
    case CUSTOM_COMPONENT_TYPES.CustomTextTitle:
      return <EditTextBlock />
    case CUSTOM_COMPONENT_TYPES.CustomGenericButton:
    case CUSTOM_COMPONENT_TYPES.CustomGenericButtonRounded:
    case CUSTOM_COMPONENT_TYPES.CustomFloatingButton:
      return <EditCustomGenericButton />
    case CUSTOM_COMPONENT_TYPES.CustomImage:
      return <EditCustomImage />
    case CUSTOM_COMPONENT_TYPES.CustomInput:
      return <EditCustomInput />
    case CUSTOM_COMPONENT_TYPES.CustomListView:
    case CUSTOM_COMPONENT_TYPES.CustomTextListView:
      return <EditCustomListView />
    default:
      return null
  }
}

interface Props {
  editPage: (page: CustomPage) => void;
}

export default function PageGeneralSettings(props: Props) {
  const {
    openedPage,
    setOpenedPage,
    editingComponent,
    setEditingComponent,
  } = useContext(BuilderContext)
  const { editPage } = props
  useEffect(() => {
    const component = openedPage.components.find(c => c.id === editingComponent?.id)
    if (editingComponent && !component) {
      setEditingComponent(undefined)
    }
  }, [openedPage, editingComponent])
  if (!openedPage) {
    return null
  }
  return (
    <React.Fragment>
      <h3>{`${openedPage.name}: Настройки`}</h3>
      <SettingsBlock
        title="Параметры страницы"
      >
        <SettingsMarginPadding
          marginValue={String(openedPage.margin[0])}
          paddingValue={String(openedPage.padding[0])}
          onChangeMargin={(val) => {
            if (!validateNumberValue(val)) {
              console.error(`Not valid`, val)
              return
            }
            val = Number(val)
            editPage({
              ...openedPage as CustomPage,
              margin: [val, val, val, val],
            })
          }}
          onChangePadding={(val) => {
            if (!validateNumberValue(val)) {
              console.error(`Not valid`, val)
              return
            }
            val = Number(val)
            editPage({
              ...openedPage as CustomPage,
              padding: [val, val, val, val],
            })
          }}
        />
        <SettingsColorPicker
          value={openedPage.background_color || '#FFFFFF'}
          title="Фон страницы"
          onChange={(val) => {
            setOpenedPage(update(openedPage, {
              background_color: {
                $set: val
              }
            }))
          }}
        />
      </SettingsBlock>
      {componentForm(editingComponent)}
    </React.Fragment>
  )
}