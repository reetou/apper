import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import { Dialog, EditableText, Spinner } from "@blueprintjs/core";
import update from 'immutability-helper'
import { TextInput } from "react-native-web";

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
    return <Spinner intent="primary" size={100} />
  }
  return (
    <React.Fragment>
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
          console.log(`New val`, val)
          updateComponent({
            text: val
          })
        }}
      />
    </React.Fragment>
  )
}