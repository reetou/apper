import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import FormTitleCollapsible from "../FormTitleCollapsible";

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
      <div>
        Текст внутри блока:
      </div>
      <textarea
        style={{
          minHeight: 150,
          width: '100%',
        }}
        value={editingComponent?.props?.text}
        onChange={e => {
          const val = e.target.value
          updateComponent({
            text: val
          })
        }}
      />
    </React.Fragment>
  )
}