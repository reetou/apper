import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import FormTitleCollapsible from "../FormTitleCollapsible";
import SettingsInput from "../SettingsInput";
import SettingsSelect from "../SettingsSelect";

export default function EditTextBlock() {
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
    </React.Fragment>
  )
}