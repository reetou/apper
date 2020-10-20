import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Styleguide from "../Styleguide";
import GoogleAnalyticsTracker from "../components/GoogleAnalyticsTracker";
import { listProjects } from "../api/Project";
import { Project } from "../store/BuilderContext";
import Button from '../components/Button';
import { useHistory } from 'react-router-dom';
import ProjectItem from "../components/ProjectItem";


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

export default function Projects() {
  const [loading, setLoading] = useState<boolean>(true)
  const [projects, setProjects] = useState<Project[]>([])
  const history = useHistory()
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await listProjects()
        setProjects(data.projects)
      } catch (e) {
        console.error(`Cannot get projects`, e)
      }
      setLoading(false)
    }
    loadProjects()
  }, [])
  return (
    <Container>
      <GoogleAnalyticsTracker />
      <Title>
        <span>Мои приложения</span>
        <Button
          style={{
            marginLeft: 12
          }}
          onClick={() => {
            history.push('/projects/new')
          }}
        >
          Новое приложение
        </Button>
      </Title>
      { loading ? <div style={{ textAlign: 'center' }}>Loading...</div> : null }
      {
        projects.map(p => (
          <ProjectItem {...p} />
        ))
      }
    </Container>
  )
}