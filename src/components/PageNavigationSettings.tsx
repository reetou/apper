import React, { useContext, useEffect, useState } from 'react'
import BuilderContext, { CustomPage } from "../store/BuilderContext";
import SettingsSelect from './SettingsSelect';
import { useDebounce } from "react-use";
import update from "immutability-helper";
import SettingsInput from "./SettingsInput";

interface Props {
  editPage: (page: CustomPage) => void;
}

export default function PageNavigationSettings(props: Props) {
  const {
    openedPage,
    tabbarEnabled,
    setTabbarEnabled,
    setOpenedPage,
  } = useContext(BuilderContext)
  if (!openedPage) {
    return null
  }
  return (
    <React.Fragment>
      <h3>{`${openedPage.name}: Настройки навигации`}</h3>
      <h3>Таббар</h3>
      <SettingsSelect
        value={tabbarEnabled ? '1' : '0'}
        onChange={(val) => {
          setTabbarEnabled(Boolean(Number(val)))
        }}
        title="Наличие таббара в приложении"
        options={[
          { value: '1', label: 'Есть' },
          { value: '0', label: 'Нет' },
        ]}
      />
      <button
        style={{
          marginTop: 12
        }}
      >
        Настроить кнопки в таббаре
      </button>
      <SettingsSelect
        value={openedPage.nav_header_mode}
        onChange={(val) => {
          setOpenedPage({
            ...openedPage,
            nav_header_mode: val,
          })
        }}
        title="Показывать верхний блок навигации"
        options={[
          { value: 'show', label: 'Да' },
          { value: 'hide', label: 'Нет' },
        ]}
      />
      <SettingsInput
        hidden={openedPage.nav_header_mode === 'hide'}
        value={openedPage.nav_header_title}
        onChange={(val) => {
          setOpenedPage({
            ...openedPage,
            nav_header_title: val,
          })
        }}
        title="Текст верхнего блока"
      />
    </React.Fragment>
  )
}