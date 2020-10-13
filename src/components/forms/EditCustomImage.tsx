import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import SettingsSelect from "../SettingsSelect";
import FormTitleCollapsible from "../FormTitleCollapsible";
import SettingsInput from "../SettingsInput";
import SettingsColorPicker from "../SettingsColorPicker";
import SettingsMarginPadding from "../SettingsMarginPadding";

export default function EditCustomImage() {
  const { updateComponent, setEditingComponent, setEditComponentForm, editingComponent } = useContext(BuilderContext)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    if (!editingComponent) {
      return
    }
    setEditComponentForm({
      value: editingComponent.data?.value
    })
    setLoading(false)
  }, [])
  if (loading) {
    return null
  }
  return (
    <React.Fragment>
      <FormTitleCollapsible title="Настройки изображения" />
      <SettingsInput
        value={editingComponent?.props?.imageUrl || ''}
        onChange={val => {
          updateComponent({
            imageUrl: val
          })
        }}
        title="Ссылка на картинку"
      />
      <SettingsSelect
        value={editingComponent?.props?.horizontalAlign}
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
        value={editingComponent?.props?.width || ''}
        onChange={val => {
          if (!Boolean(Number(val)) && val !== '') {
            console.error(`Not valid`)
            return
          }
          updateComponent({
            width: Number(val)
          })
        }}
        title="Ширина"
      />
      <SettingsInput
        value={editingComponent?.props?.height || ''}
        onChange={val => {
          if (!Boolean(Number(val)) && val !== '') {
            console.error(`Not valid`)
            return
          }
          updateComponent({
            height: Number(val)
          })
        }}
        title="Высота"
      />
      <SettingsMarginPadding
        marginValue={editingComponent?.props.margin}
        paddingValue={editingComponent?.props.padding}
        onChangeMargin={(val) => {
          if (!Boolean(Number(val)) && val !== '') {
            console.error(`Not valid`, val)
            return
          }
          updateComponent({
            margin: Number(val)
          })
        }}
        onChangePadding={(val) => {
          if (!Boolean(Number(val)) && val !== '') {
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