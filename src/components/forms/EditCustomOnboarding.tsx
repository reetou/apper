import React, { useContext, useEffect, useState } from 'react'
import BuilderContext, {
  CustomOnboardingItem,
} from "../../store/BuilderContext";
import FormTitleCollapsible from "../FormTitleCollapsible";
import SettingsInput from "../SettingsInput";
import update from 'immutability-helper'
import SettingsTitle from "../SettingsTitle";
import { v4 as uuidv4 } from 'uuid'
import { DEFAULT_IMAGE_URL } from "../mobile_components";
import SettingsColorPicker from "../SettingsColorPicker";
import SettingsBlock from "../SettingsBlock";
import Button from "../Button";

interface ItemFormProps {
  index: number;
  item: CustomOnboardingItem;
}

function newItem(): CustomOnboardingItem {
  return {
    id: uuidv4(),
    text: 'Onboarding text...',
    image_url: DEFAULT_IMAGE_URL,
  }
}

function ItemForm(props: ItemFormProps) {
  const { index, item } = props
  const { project, setProject } = useContext(BuilderContext)
  const updateItem = (data: Partial<CustomOnboardingItem>) => {
    setProject(update(project, {
      onboarding: {
        items: {
          [index]: {
            $merge: data
          }
        }
      }
    }))
    console.log(`Onboarding`, project.onboarding, data)
  }
  const deleteItem = () => {
    setProject(update(project, {
      onboarding: {
        items: {
          $splice: [[index, 1]]
        }
      }
    }))
  }
  return (
    <div style={{ marginTop: 12 }}>
      <SettingsTitle text={`Элемент ${index + 1}`} />
      <SettingsInput
        value={item.image_url}
        onChange={(val) => {
          updateItem({
            image_url: val
          })
        }}
        title="Ссылка на картинку"
      />
      <SettingsInput
        value={item.text}
        onChange={(val) => {
          updateItem({
            text: val
          })
        }}
        title="Текст"
      />
      <div style={{ marginTop: 8 }}>
        <Button onClick={deleteItem}>Удалить</Button>
      </div>
    </div>
  )
}

export default function EditCustomOnboarding() {
  const { project, setProject } = useContext(BuilderContext)
  const onAdd = () => {
    setProject(update(project, {
      onboarding: {
        items: {
          $push: [newItem()]
        }
      }
    }))
  }
  return (
    <React.Fragment>
      <FormTitleCollapsible title="Настройки страницы онбординга" />
      <SettingsBlock title="Цвета">
        <SettingsColorPicker
          value={project.onboarding.background_color || '#FFFFFF'}
          title="Цвет фона"
          onChange={(val) => {
            setProject(update(project, {
              onboarding: {
                background_color: {
                  $set: val
                }
              }
            }))
          }}
        />
        <SettingsColorPicker
          value={project.onboarding.text_color || '#FFFFFF'}
          title="Цвет текста"
          onChange={(val) => {
            setProject(update(project, {
              onboarding: {
                text_color: {
                  $set: val
                }
              }
            }))
          }}
        />
      </SettingsBlock>
      <FormTitleCollapsible title="Элементы в онбординге" />
      {
        project.onboarding.items.map((item, index) => (
          <ItemForm item={item} index={index} />
        ))
      }
      {
        project.onboarding.items.length <= 2
          ? (
            <div style={{ marginTop: 12 }}>
              <Button onClick={onAdd}>
                Добавить
              </Button>
            </div>
          )
          : null
      }
    </React.Fragment>
  )
}