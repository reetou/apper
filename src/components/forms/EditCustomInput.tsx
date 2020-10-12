import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import FormTitleCollapsible from "../FormTitleCollapsible";
import SettingsInput from "../SettingsInput";

export default function EditCustomInput() {
  const { updateComponent, setEditComponentForm, editingComponent } = useContext(BuilderContext)
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
    </React.Fragment>
  )
}