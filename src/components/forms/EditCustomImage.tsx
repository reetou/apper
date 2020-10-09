import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import SettingsSelect from "../SettingsSelect";
import FormTitleCollapsible from "../FormTitleCollapsible";

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
      <div>
        Ссылка на картинку
      </div>
      <input
        style={{
          width: '100%',
        }}
        value={editingComponent?.props?.image_url}
        onChange={e => {
          const val = e.target.value
          updateComponent({
            image_url: val
          })
        }}
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
      <div>
        Ширина
      </div>
      <input
        style={{
          width: '100%',
        }}
        value={editingComponent?.props?.width}
        onChange={e => {
          const val = e.target.value
          if (!Boolean(Number(val)) && val !== '') {
            console.error(`Not valid`)
            return
          }
          updateComponent({
            width: Number(val)
          })
        }}
      />
      <div>
        Высота
      </div>
      <input
        style={{
          width: '100%',
        }}
        value={editingComponent?.props?.height}
        onChange={e => {
          const val = e.target.value
          if (!Boolean(Number(val)) && val !== '') {
            console.error(`Not valid`)
            return
          }
          updateComponent({
            height: Number(val)
          })
        }}
      />
    </React.Fragment>
  )
}