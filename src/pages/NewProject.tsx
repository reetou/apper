import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Styleguide from "../Styleguide";
import GoogleAnalyticsTracker from "../components/GoogleAnalyticsTracker";
import { createProject, listProjects } from "../api/Project";
import Button from '../components/Button';
import { useHistory } from 'react-router-dom';
import PageContainer from "../components/PageContainer";
import SettingsInput from "../components/SettingsInput";
import { DEFAULT_PAGE } from "../store/BuilderContext";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  color: ${Styleguide.primaryColor};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`

export default function NewProject() {
  const history = useHistory()
  const [projectName, setProjectName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const submit = async () => {
    try {
      setLoading(true)
      const data = await createProject({
        project_name: projectName,
        pages: [
          {...DEFAULT_PAGE}
        ]
      })
      history.push(`/projects/${data.project.id}/preview`)
    } catch (e) {
      console.error(`Cannot create project`, e)
    }
  }
  return (
    <Container>
      <GoogleAnalyticsTracker />
      <Title>
        <span>Новое приложение</span>
      </Title>
      <PageContainer>
        <SettingsInput
          disabled={loading}
          value={projectName}
          onChange={setProjectName}
          title="Название приложения"
        />
        <div style={{ marginTop: 12 }}>
          <Button
            onClick={submit}
            disabled={loading || !projectName}
          >
            Создать
          </Button>
        </div>
      </PageContainer>
    </Container>
  )
}