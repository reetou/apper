import React, { useContext, useEffect, useState } from 'react'
import BuilderContext, { ICustomListViewItem } from "../../store/BuilderContext";
import FormTitleCollapsible from "../FormTitleCollapsible";
import SettingsInput from "../SettingsInput";
import update from 'immutability-helper'
import { v4 as uuidv4 } from 'uuid'
import { useDebounce } from 'react-use';
import { COMPONENTS_WITH_LIST_ITEMS, CUSTOM_COMPONENT_TYPES } from "../mobile_components";
import Button from "../Button";

interface ItemProps {
  data: ICustomListViewItem;
  index: number;
  updateItem: (data: ICustomListViewItem) => void;
  noImage?: boolean;
  noSubtitle?: boolean;
}

function ItemForm(props: ItemProps) {
  const {
    data,
    updateItem,
    index,
    noImage,
    noSubtitle,
  } = props
  const [item, setItem] = useState<ICustomListViewItem>(data)

  const [, cancel] = useDebounce(
    () => {
      updateItem(item);
    },
    120,
    [item]
  );
  return (
    <div style={{ margin: '10px 0' }}>
      <div>Элемент {String(index + 1)}:</div>
      <SettingsInput
        value={item.title}
        onChange={(val) => {
          setItem(prevItem => ({
            ...prevItem,
            title: val,
          }))
        }}
        title="Заголовок"
      />
      <SettingsInput
        hidden={noSubtitle}
        value={item.subtitle}
        onChange={(val) => {
          setItem(prevItem => ({
            ...prevItem,
            subtitle: val,
          }))
        }}
        title="Подзаголовок"
      />
      <SettingsInput
        hidden={noImage}
        value={item.image_url}
        onChange={(val) => {
          setItem(prevItem => ({
            ...prevItem,
            image_url: val,
          }))
        }}
        title="Ссылка на картинку"
      />
    </div>
  )
}

const newItem = (): ICustomListViewItem => {
  return {
    id: uuidv4(),
    title: 'Sample title',
    subtitle: 'Sample subtitle',
    itemTargetId: '',
    image_url: '',
  }
}

export default function EditCustomListViewItems() {
  const {
    editingComponent,
    setEditingListViewId,
    editingListViewItems,
    setEditingListViewItems,
    updateComponent,
    openedPage,
  } = useContext(BuilderContext)
  const [currentId, setCurrentId] = useState<string | undefined>(editingComponent?.id)
  const [currentPageId, setCurrentPageId] = useState<string>(openedPage.id)
  const [, cancel] = useDebounce(
    () => {
      updateComponent({}, {
        childComponents: editingListViewItems
      })
    },
    200,
    [editingListViewItems]
  );
  useEffect(() => {
    const componentChanged = editingComponent && !COMPONENTS_WITH_LIST_ITEMS.includes(editingComponent.item_type)
    const pageChanged = openedPage.id !== currentPageId
    if (pageChanged) {
      setEditingListViewId(undefined)
      return
    }
    if (componentChanged) {
      setEditingListViewId(undefined)
      return
    }
    if (currentId !== editingComponent) {
      console.log(`Changing because editing component changed editing list view items`)
      setEditingListViewItems(editingComponent?.data?.childComponents || [])
    }
  }, [editingComponent, openedPage])
  if (!editingComponent || !setEditingListViewId) {
    return null
  }
  return (
    <React.Fragment>
      <Button onClick={() => setEditingListViewId(undefined)}>Закрыть</Button>
      <FormTitleCollapsible title="Настройки элементов в списке" />
      <div>
        {
          editingListViewItems.map((item, i) => (
            <ItemForm
              key={item.id}
              noSubtitle={editingComponent?.props.noSubtitle}
              noImage={editingComponent?.props.noImage}
              index={i}
              data={item}
              updateItem={(data) => {
                setEditingListViewItems((prevItems: ICustomListViewItem[]) => {
                  return update(prevItems, {
                    [i]: {
                      $set: data
                    }
                  })
                })
              }}
            />
          ))
        }
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginTop: 12 }}>
          <Button
            onClick={() => {
              setEditingListViewItems(update(editingListViewItems, { $push: [newItem()] }))
            }}
          >
            Добавить элемент
          </Button>
        </div>
      </div>
    </React.Fragment>
  )
}