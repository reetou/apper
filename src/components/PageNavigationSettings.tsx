import React, { useContext, useEffect, useState } from 'react'
import BuilderContext, { CustomPage, PageType } from "../store/BuilderContext";
import SettingsSelect from './SettingsSelect';
import update from "immutability-helper";
import SettingsInput from "./SettingsInput";
import isPermanentPage from "../utils/pageUtils";
import Button from './Button';
import { useHistory } from 'react-router-dom';
import { trackAnalyticsEvent } from "../utils/googleAnalyticsUtils";
import AuthContext from "../store/AuthContext";

interface Props {
  editPage: (page: CustomPage) => void;
}

export default function PageNavigationSettings(props: Props) {
  const {
    openedPage,
    setOpenedPage,
    project,
    setProject,
    setMode,
  } = useContext(BuilderContext)
  const {
    authenticated,
  } = useContext(AuthContext)
  const history = useHistory()
  const { editPage } = props
  const publishProject = () => {
    if (authenticated) {
      trackAnalyticsEvent({
        category: 'Builder',
        action: 'PublishProject',
      })
    } else {
      trackAnalyticsEvent({
        category: 'Builder',
        action: 'PublishProjectNoAuth',
      })
    }
    console.log(`Gonna publish`)
  }
  const onBuildApp = () => {
    if (authenticated) {
      trackAnalyticsEvent({
        category: 'Builder',
        action: 'GoToBuild',
      })
      history.push(`/projects/${project.id}/build`)
    } else {
      trackAnalyticsEvent({
        category: 'Builder',
        action: 'GoToBuildNoAuth',
      })
      history.push(`/register`)
    }
  }
  if (!openedPage) {
    return null
  }
  return (
    <React.Fragment>
      <h3>{`${openedPage.name}: Настройки навигации`}</h3>
      <h3>Приложение</h3>
      <div style={{ margin: '1rem 0' }}>
        <Button
          onClick={publishProject}
        >
          Опубликовать изменения
        </Button>
        <Button
          style={{
            marginTop: 12
          }}
          onClick={onBuildApp}
        >
          Сборка приложения
        </Button>
      </div>
      <h3>Запуск</h3>
      <SettingsSelect
        value={project.first_page_id}
        onChange={(val) => {
          setProject(update(project, {
            first_page_id: {
              $set: val
            }
          }))
        }}
        title="Первая страница при запуске или после онбординга"
        options={project.pages.filter(isPermanentPage).map(p => ({ value: p.id, label: p.name }))}
      />
      <h3>Таббар</h3>
      <SettingsSelect
        value={project.tabbar_enabled ? '1' : '0'}
        onChange={(val) => {
          setProject(update(project, {
            tabbar_enabled: {
              $set: Boolean(Number(val))
            }
          }))
        }}
        title="Наличие таббара в приложении"
        options={[
          { value: '1', label: 'Есть' },
          { value: '0', label: 'Нет' },
        ]}
      />
      <Button
        style={{
          marginTop: 12
        }}
        onClick={() => {
          trackAnalyticsEvent({
            category: 'Builder',
            action: 'ModeEditTabbarFromNavigation',
          })
          setMode('edit_tabbar')
        }}
      >
        Настроить кнопки в таббаре
      </Button>
      <SettingsSelect
        value={openedPage.page_type}
        onChange={(value) => {
          editPage({
            ...openedPage as CustomPage,
            page_type: value as PageType,
          })
          console.log(`New value is`, value)
        }}
        title="Тип страницы"
        options={[
          { value: 'modal', label: 'Модальное окно' },
          { value: 'screen', label: 'Экран' },
        ]}
      />
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