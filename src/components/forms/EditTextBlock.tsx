import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import FormTitleCollapsible from "../FormTitleCollapsible";
import SettingsInput from "../SettingsInput";
import SettingsSelect from "../SettingsSelect";
import SettingsMarginPadding from "../SettingsMarginPadding";
import { validateNumberValue } from "../../utils/componentUtils";

export default function EditTextBlock() {
  const { updateComponent, editingComponent } = useContext(BuilderContext)
  return (
    <React.Fragment>
      <FormTitleCollapsible title="Настройки блока с текстом" />
      <SettingsInput
        textarea
        value={editingComponent?.props?.text || ''}
        onChange={val => {
          updateComponent({
            text: val
          })
        }}
        title="Текст внутри блока:"
      />
      <SettingsSelect
        value={editingComponent?.props?.horizontalAlign || 'flex-start'}
        onChange={(val) => {
          updateComponent({
            horizontalAlign: val
          })
        }}
        title="Расположение по горизонтали"
        options={[
          { value: 'center', label: "По центру" },
          { value: 'flex-start', label: "Слева" },
          { value: 'flex-end', label: "Справа" },
        ]}
      />
      <SettingsInput
        value={editingComponent?.props?.fontSize || 14}
        onChange={(val) => {
          updateComponent({
            fontSize: Number(val)
          })
        }}
        slider
        title="Размер шрифта"
      />
      <SettingsInput
        value={Number(editingComponent?.props?.fontWeight) || 400}
        onChange={(val) => {
          updateComponent({
            fontWeight: String(val)
          })
        }}
        slider
        min={300}
        max={900}
        step={100}
        title="Толщина текста"
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