import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import { Dialog, EditableText, Spinner } from "@blueprintjs/core";
import update from 'immutability-helper'
import { TextInput } from "react-native-web";

export default function EditTextBlock() {
  const { editComponentForm, setEditComponentForm, editingComponent } = useContext(BuilderContext)
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
        value={editComponentForm.value}
        onChange={e => {
          const val = e.target.value
          setEditComponentForm(prevState => {
            return update(prevState, {
              value: {
                $set: val
              }
            })
            }
          )
        }}
      />
    </React.Fragment>
  )
}