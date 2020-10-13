import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import SettingsSelect from "../SettingsSelect";
import { NAVIGATION_MOVE_ONCLICK_TYPES, ONCLICK_TYPES } from "../../utils/buttonUtils";
import FormTitleCollapsible from "../FormTitleCollapsible";
import SettingsColorPicker from "../SettingsColorPicker";
import SettingsInput from "../SettingsInput";
import SettingsMarginPadding from "../SettingsMarginPadding";
import { validateNumberValue } from "../../utils/componentUtils";
import { LIST_ITEM_ONCLICK_TYPES } from "../../utils/listViewUtils";

export default function EditCustomListView() {
  const { updateComponent, pages, openedPage, setEditComponentForm, editingComponent } = useContext(BuilderContext)
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
    return [
      { value: LIST_ITEM_ONCLICK_TYPES.noop, label: 'Ничего не делать' },
      { value: LIST_ITEM_ONCLICK_TYPES.navigateToItemPage, label: 'Перейти на страницу предмета' },
    ]
  }
  if (loading || !editingComponent) {
    return null
  }
  return (
    <React.Fragment>
      <FormTitleCollapsible title="Настройки списка" />
      <button>Настроить элементы</button>
      <SettingsSelect
        value={editingComponent?.props?.onClickType}
        onChange={(val) => {
          updateComponent({
            onClickType: val,
          })
        }}
        title="При нажатии на элемент:"
        options={onClickTypeOptions()}
      />
      <SettingsMarginPadding
        marginValue={editingComponent.props.margin}
        paddingValue={editingComponent.props.padding}
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
      <SettingsColorPicker
        value={editingComponent.props.backgroundColor || ''}
        title="Цвет фона списка"
        onChange={(val) => {
          updateComponent({
            backgroundColor: val
          })
        }}
      />
    </React.Fragment>
  )
}