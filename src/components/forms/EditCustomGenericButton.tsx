import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import SettingsSelect from "../SettingsSelect";
import { NAVIGATION_MOVE_ONCLICK_TYPES, ONCLICK_TYPES } from "../../utils/buttonUtils";
import { CUSTOM_INPUTS } from "../mobile_components";
import FormTitleCollapsible from "../FormTitleCollapsible";

export default function EditCustomGenericButton() {
  const { updateComponent, setEditingComponent, pages, openedPage, setEditComponentForm, editingComponent } = useContext(BuilderContext)
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
  const onClickTypeOptions = () => {
    const isFirst = pages[0].id === openedPage.id
    return [
      { value: ONCLICK_TYPES.noop, label: 'Ничего не делать' },
      { value: ONCLICK_TYPES.navigatePush, label: 'Перейти на страницу' },
      { value: ONCLICK_TYPES.navigateReplace, label: 'Заменить страницу на другую' },
      { value: ONCLICK_TYPES.submitForm, label: 'Сохранить данные из полей ввода' },
      { value: ONCLICK_TYPES.navigateBack, label: 'Перейти на страницу назад', disabled: isFirst },
    ]
  }
  if (loading) {
    return null
  }
  return (
    <React.Fragment>
      <FormTitleCollapsible title="Настройки кнопки" />
      <div>
        Текст кнопки:
      </div>
      <input
        style={{
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
      <SettingsSelect
        value={editingComponent?.props?.onClickType}
        onChange={(val) => {
          updateComponent({
            onClickType: val,
          })
        }}
        title="При нажатии:"
        options={onClickTypeOptions()}
      />
      <SettingsSelect
        value={editingComponent?.props?.newPageName}
        onChange={(val) => {
          updateComponent({
            newPageName: val,
          })
        }}
        hidden={!editingComponent?.props?.onClickType || !NAVIGATION_MOVE_ONCLICK_TYPES.includes(editingComponent?.props?.onClickType)}
        title="Новая страница:"
        options={pages.filter(p => p.id !== openedPage.id).map(p => ({ value: p.id, label: p.name }))}
      />
    </React.Fragment>
  )
}