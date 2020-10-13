import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import SettingsSelect from "../SettingsSelect";
import { NAVIGATION_MOVE_ONCLICK_TYPES, ONCLICK_TYPES } from "../../utils/buttonUtils";
import FormTitleCollapsible from "../FormTitleCollapsible";
import SettingsColorPicker from "../SettingsColorPicker";
import SettingsInput from "../SettingsInput";
import SettingsMarginPadding from "../SettingsMarginPadding";

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
  if (loading || !editingComponent) {
    return null
  }
  return (
    <React.Fragment>
      <FormTitleCollapsible title="Настройки кнопки" />
      <SettingsInput
        value={editingComponent.props?.text || ''}
        onChange={(val) => {
          updateComponent({
            text: val
          })
        }}
        title="Текст кнопки"
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
      <SettingsInput
        value={editingComponent.props?.borderWidth}
        onChange={(val) => {
          if (!Boolean(Number(val)) && val !== '') {
            console.error(`Not valid`, val)
            return
          }
          updateComponent({
            borderWidth: Number(val)
          })
        }}
        title="Ширина обводки"
      />
      <SettingsColorPicker
        value={editingComponent.props.backgroundColor || ''}
        title="Цвет фона"
        onChange={(val) => {
          updateComponent({
            backgroundColor: val
          })
        }}
      />
      <SettingsColorPicker
        value={editingComponent.props.textColor || ''}
        title="Цвет текста"
        onChange={(val) => {
          updateComponent({
            textColor: val
          })
        }}
      />
      <SettingsColorPicker
        value={editingComponent.props.borderColor || ''}
        title="Цвет обводки"
        onChange={(val) => {
          updateComponent({
            borderColor: val
          })
        }}
      />
      <SettingsMarginPadding
        marginValue={editingComponent.props.margin}
        paddingValue={editingComponent.props.padding}
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