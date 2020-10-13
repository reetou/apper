import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import FormTitleCollapsible from "../FormTitleCollapsible";
import SettingsInput from "../SettingsInput";
import SettingsMarginPadding from "../SettingsMarginPadding";
import { validateNumberValue } from "../../utils/componentUtils";

export default function EditCustomInput() {
  const { updateComponent, editingComponent } = useContext(BuilderContext)
  return (
    <React.Fragment>
      <FormTitleCollapsible title="Настройки поля ввода" />
      <SettingsInput
        value={editingComponent?.props?.inputPlaceholder || ''}
        onChange={val => {
          updateComponent({
            inputPlaceholder: val
          })
        }}
        title="Текст плейсхолдера"
      />
      <SettingsMarginPadding
        marginValue={editingComponent?.props.margin}
        paddingValue={editingComponent?.props.padding}
        onChangeMargin={(val) => {
          if (!validateNumberValue(val)) {
            console.error(`Not valid`, val)
            return
          }
          updateComponent({
            margin: Number(val)
          })
        }}
        onChangePadding={(val) => {
          if (!validateNumberValue(val)) {
            console.error(`Not valid`, val)
            return
          }
          updateComponent({
            padding: Number(val)
          })
        }}
      />
    </React.Fragment>
  )
}