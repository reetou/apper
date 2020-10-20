import React, { useContext, useState } from 'react'
import BuilderContext, { createNewPage, CustomPage } from "../../store/BuilderContext";
import styled from 'styled-components';
import update from "immutability-helper";
import Styleguide from "../../Styleguide";
import { trackAnalyticsEvent } from "../../utils/googleAnalyticsUtils";
import { useParams } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import { createProjectPage } from "../../api/Page";

const Item = styled.div<{ navbar: boolean, tabbar: boolean }>`
  height: ${({ tabbar, navbar }) => 180 - (tabbar ? 0 : 30) - (navbar ? 0 : 30)}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Styleguide.primaryColor};
  color: ${Styleguide.infoColor};
  font-weight: bold;
  border-top-right-radius: ${({ navbar }) => navbar ? '16px' : '0'};
  border-top-left-radius: ${({ navbar }) => navbar ? '16px' : '0'};
  border-bottom-left-radius: ${({ tabbar }) => tabbar ? '16px' : '0'};
  border-bottom-right-radius: ${({ tabbar }) => tabbar ? '16px' : '0'};
`

const Container = styled.div`
  margin: 0 12px;
  width: 120px;
  padding: 34px 4px 4px 4px;
  border-radius: 24px;
  cursor: pointer;
  border: 4px solid transparent;
`

export default function AddPageItem() {
  const { setProject, project, openedPage, setOpenedPage } = useContext(BuilderContext)
  const [loading, setLoading] = useState<boolean>(false)
  const { authenticated } = useContext(AuthContext)
  const routeParams = useParams<{ id: string }>()
  const isFromParams = routeParams.id
  const createPage = async () => {
    try {
      setLoading(true)
      const page = createNewPage(project.pages.length)
      const data = await createProjectPage(project.id, page)
      setProject(data.project)
      const { pages } = data.project
      setOpenedPage(update(openedPage, {
        $set: pages[pages.length - 1]
      }))
    } catch (e) {
      console.error(`Cannot send create page`, e)
    }
    setLoading(false)
  }
  return (
    <Container
      onClick={() => {
        if (loading) {
          return
        }
        if (authenticated && isFromParams) {
          trackAnalyticsEvent({
            category: 'Builder',
            action: 'AddPageFromApi',
          })
          createPage()
        } else {
          trackAnalyticsEvent({
            category: 'Builder',
            action: 'AddPage',
          })
          const page = createNewPage(project.pages.length)
          setProject(update(project, {
            pages: {
              $push: [page]
            }
          }))
          setOpenedPage(page)
        }
      }}
    >
      <div>
        <Item tabbar navbar>
          {
            loading
              ? (
                <div>Adding...</div>
              )
              : (
                <div>Add</div>
              )
          }
        </Item>
      </div>
    </Container>
  )
}