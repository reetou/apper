import React from 'react'
import { Project } from "../store/BuilderContext";
import styled from "styled-components";
import Styleguide from "../Styleguide";
import { useHistory } from 'react-router-dom';
import Button from './Button';

interface Props extends Project {

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${Styleguide.primaryColor};
`

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`

const ScreensCount = styled.div`
  font-weight: 400;
`

const Row = styled.div`
  display: flex;
  margin-top: 8px;
`

const ButtonContainer = styled.div`
  margin-right: 8px;
`

export default function ProjectItem(props: Props) {
  const history = useHistory()
  const editProject = () => {
    history.push(`/projects/${props.id}/preview`)
  }
  const buildProject = () => {
    history.push(`/projects/${props.id}/build`)
  }
  return (
    <Container>
      <Name>{props.project_name}</Name>
      <ScreensCount>{props.pages.length} экранов</ScreensCount>
      <Row>
        <ButtonContainer>
          <Button onClick={editProject}>Редактировать</Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button onClick={buildProject}>Собрать</Button>
        </ButtonContainer>
      </Row>
    </Container>
  )
}