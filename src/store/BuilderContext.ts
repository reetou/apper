import { createContext, Dispatch, SetStateAction, ReactNode, default as React } from "react";
import { RouteComponentProps } from "react-router";

export type BuilderMode = 'simulator' | 'navigation'

export type PageType = 'modal' | 'screen'

export interface CustomPage {
  components: CustomComponent[],
  name: string,
  padding: number[],
  margin: number[],
  pageType: PageType,
  backgroundColor: string,
}

export interface CustomComponent {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
  props: any,
  title: string,
  children: CustomComponent[],
}

interface BuilderContextProps {
  mode: BuilderMode,
  setMode: Dispatch<SetStateAction<BuilderMode>>,
  selectedElement: null | string,
  setSelectedElement: Dispatch<SetStateAction<any>>,
  pages: CustomPage[],
  setPages: Dispatch<SetStateAction<CustomPage[]>>,
  openedPage: CustomPage | null,
  setOpenedPage: Dispatch<SetStateAction<CustomPage | null>>,
}

export default createContext<BuilderContextProps>({
  mode: 'simulator',
  setMode: () => {},
  selectedElement: null,
  setSelectedElement: () => {},
  pages: [],
  setPages: () => {},
  openedPage: null,
  setOpenedPage: () => {},
})