import React, { useContext, useEffect, useState } from 'react'
import BuilderContext from "../../store/BuilderContext";
import SettingsSelect from "../SettingsSelect";
import FormTitleCollapsible from "../FormTitleCollapsible";
import SettingsColorPicker from "../SettingsColorPicker";
import SettingsMarginPadding from "../SettingsMarginPadding";
import { validateNumberValue } from "../../utils/componentUtils";
import { LIST_ITEM_ONCLICK_TYPES } from "../../utils/listViewUtils";

export default function EditCustomListView() {
  const {
    updateComponent,
    setEditingListViewId,
    setEditingListViewItems,
    editingListViewId,
    setEditComponentForm,
    editingComponent,
  } = useContext(BuilderContext)
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
      <button
        onClick={() => {
          if (editingListViewId === editingComponent?.id) {
            setEditingListViewId(undefined)
          } else {
            setEditingListViewId(editingComponent?.id)
          }
        }}
      >
        Настроить элементы
      </button>
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