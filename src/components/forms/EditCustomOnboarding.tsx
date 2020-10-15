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
import SettingsMarginPadding from "../SettingsMarginPadding";
import SettingsColorPicker from "../SettingsColorPicker";
import SettingsBlock from "../SettingsBlock";

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
  const { onboarding, setOnboarding } = useContext(BuilderContext)
  const updateItem = (data: Partial<CustomOnboardingItem>) => {
    setOnboarding(update(onboarding, {
      items: {
        [index]: {
          $merge: data
        }
      }
    }))
    console.log(`Onboarding`, onboarding, data)
  }
  const deleteItem = () => {
    setOnboarding(update(onboarding, {
      items: {
        $splice: [[index, 1]]
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
        <button onClick={deleteItem}>Удалить</button>
      </div>
    </div>
  )
}

export default function EditCustomOnboarding() {
  const { onboarding, setOnboarding } = useContext(BuilderContext)
  const onAdd = () => {
    setOnboarding(update(onboarding, {
      items: {
        $push: [newItem()]
      }
    }))
  }
  return (
    <React.Fragment>
      <FormTitleCollapsible title="Настройки страницы онбординга" />
      <SettingsBlock title="Цвета">
        <SettingsColorPicker
          value={onboarding.background_color || '#FFFFFF'}
          title="Цвет фона"
          onChange={(val) => {
            setOnboarding(update(onboarding, {
              background_color: {
                $set: val
              }
            }))
          }}
        />
        <SettingsColorPicker
          value={onboarding.text_color || '#FFFFFF'}
          title="Цвет текста"
          onChange={(val) => {
            setOnboarding(update(onboarding, {
              text_color: {
                $set: val
              }
            }))
          }}
        />
      </SettingsBlock>
      <FormTitleCollapsible title="Элементы в онбординге" />
      {
        onboarding.items.map((item, index) => (
          <ItemForm item={item} index={index} />
        ))
      }
      {
        onboarding.items.length <= 2
          ? (
            <div style={{ marginTop: 12 }}>
              <button onClick={onAdd}>
                Добавить
              </button>
            </div>
          )
          : null
      }
    </React.Fragment>
  )
}