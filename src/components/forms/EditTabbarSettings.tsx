import React, { useContext, useEffect, useState } from 'react'
import BuilderContext, { TabbarItem } from "../../store/BuilderContext";
import FormTitleCollapsible from "../FormTitleCollapsible";
import SettingsColorPicker from "../SettingsColorPicker";
import SettingsInput from "../SettingsInput";
import update from 'immutability-helper'
import { v4 as uuidv4 } from 'uuid'
import SettingsSelect from "../SettingsSelect";
import isPermanentPage from "../../utils/pageUtils";
import Button from "../Button";

interface ItemFormProps {
  index: number;
  item: TabbarItem;
}

const newItem = (): TabbarItem => ({
  label: 'Label',
  icon: 'user',
  id: uuidv4(),
  page_id: '',
})

function ItemForm(props: ItemFormProps) {
  const { index, item } = props
  const { project, setProject } = useContext(BuilderContext)
  const updateItem = (data: Partial<TabbarItem>) => {
    setProject(update(project, {
      tabbar_settings: {
        items: {
          [index]: {
            $merge: data
          }
        }
      }
    }))
  }
  const deleteItem = () => {
    setProject(update(project, {
      tabbar_settings: {
        items: {
          $splice: [[index, 1]]
        }
      }
    }))
  }
  return (
    <div style={{ marginTop: 12 }}>
      <SettingsSelect
        value={item.page_id}
        onChange={(val) => {
          updateItem({
            page_id: val
          })
        }}
        title="Страница"
        options={project.pages.filter(isPermanentPage).map(p => ({ value: p.id, label: p.name }))}
      />
      <SettingsInput
        value={item.label}
        onChange={(val) => {
          updateItem({
            label: val
          })
        }}
        title="Текст"
      />
      <SettingsInput
        value={item.icon}
        onChange={(val) => {
          updateItem({
            icon: val
          })
        }}
        title="Название иконки FontAwesome"
      />
      <div style={{ marginTop: 8 }}>
        <Button onClick={deleteItem}>Удалить</Button>
      </div>
    </div>
  )
}

export default function EditTabbarSettings() {
  const { project, setProject } = useContext(BuilderContext)
  return (
    <React.Fragment>
      <FormTitleCollapsible title="Элементы таббара" />
      {
        project.tabbar_settings.items.map((item, index) => (
          <ItemForm index={index} item={item} />
        ))
      }
      {
        project.tabbar_settings.items.length <= 3
          ? (
            <div style={{ marginTop: 12 }}>
              <Button
                onClick={() => {
                  setProject(update(project, {
                    tabbar_settings: {
                      items: {
                        $push: [newItem()]
                      }
                    }
                  }))
                }}
              >
                Добавить
              </Button>
            </div>
          )
          : null
      }
      <FormTitleCollapsible title="Настройки таббара" />
      <SettingsColorPicker
        value={project.tabbar_settings.color}
        title="Цвет иконки и текста"
        onChange={(val) => {
          setProject(update(project, {
            tabbar_settings: {
              color: {
                $set: val
              }
            }
          }))
        }}
      />
      <SettingsColorPicker
        value={project.tabbar_settings.selected_color}
        title="Цвет при выборе"
        onChange={(val) => {
          setProject(update(project, {
            tabbar_settings: {
              selected_color: {
                $set: val
              }
            }
          }))
        }}
      />
    </React.Fragment>
  )
}