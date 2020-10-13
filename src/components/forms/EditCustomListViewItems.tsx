import React, { useContext, useEffect, useState } from 'react'
import BuilderContext, { ICustomListViewItem } from "../../store/BuilderContext";
import FormTitleCollapsible from "../FormTitleCollapsible";
import SettingsInput from "../SettingsInput";
import update from 'immutability-helper'
import { v4 as uuidv4 } from 'uuid'
import { useDebounce } from 'react-use';

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
    setEditComponentForm,
    editingComponent,
    setEditingListViewId,
    editingListViewItems,
    setEditingListViewItems,
    updateComponent,
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
  const [, cancel] = useDebounce(
    () => {
      updateComponent({
        childComponents: editingListViewItems
      })
    },
    200,
    [editingListViewItems]
  );
  if (loading || !editingComponent) {
    return null
  }
  return (
    <React.Fragment>
      <button onClick={() => setEditingListViewId(undefined)}>Закрыть</button>
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
          <button
            onClick={() => {
              setEditingListViewItems(update(editingListViewItems, { $push: [newItem()] }))
            }}
          >
            Добавить элемент
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}