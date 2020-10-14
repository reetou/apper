import React, { useContext, useEffect, useState } from 'react'
import BuilderContext, { CustomPage } from "../store/BuilderContext";
import SettingsSelect from './SettingsSelect';
import { useDebounce } from "react-use";
import update from "immutability-helper";
import SettingsInput from "./SettingsInput";
import isPermanentPage from "../utils/pageUtils";

interface Props {
  editPage: (page: CustomPage) => void;
}

export default function PageNavigationSettings(props: Props) {
  const {
    openedPage,
    tabbarEnabled,
    setTabbarEnabled,
    setOpenedPage,
    pages,
  } = useContext(BuilderContext)
  if (!openedPage) {
    return null
  }
  return (
    <React.Fragment>
      <h3>{`${openedPage.name}: Настройки навигации`}</h3>
      <h3>Запуск</h3>
      <SettingsSelect
        value={openedPage.first_page_id}
        onChange={(val) => {
          setOpenedPage({
            ...openedPage,
            first_page_id: val,
          })
        }}
        title="Первая страница при запуске"
        options={pages.filter(isPermanentPage).map(p => ({ value: p.id, label: p.name }))}
      />
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
      <SettingsInput
        value={openedPage.name}
        onChange={(val) => {
          setOpenedPage({
            ...openedPage,
            name: val,
          })
        }}
        title="Название страницы"
      />
      <SettingsSelect
        value={openedPage.nav_header_mode}
        onChange={(val) => {
          setOpenedPage({
            ...openedPage,
            nav_header_mode: val,
          })
        }}
        hidden={openedPage.page_type === 'modal'}
        title="Верхний блок навигации"
        options={[
          { value: 'show', label: 'Показывать' },
          { value: 'hide', label: 'Скрыть' },
        ]}
      />
      <SettingsInput
        hidden={openedPage.nav_header_mode === 'hide' || openedPage.page_type === 'modal'}
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