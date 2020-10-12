import { createContext, Dispatch, SetStateAction, ReactNode, default as React } from "react";
import { RouteComponentProps } from "react-router";
import { v4 as uuidv4 } from 'uuid'
import { OnClickTypeType } from "../utils/buttonUtils";

export type BuilderMode = 'simulator' | 'navigation'

export type PageType = 'modal' | 'screen'

export interface CustomPage {
  id: string,
  components: CustomComponent[],
  name: string,
  padding: number[],
  margin: number[],
  page_type: PageType,
  background_color: string,
}

export const DEFAULT_PAGE: CustomPage = {
  id: uuidv4(),
  components: [],
  name: 'Default Page',
  padding: [0, 0, 0, 0],
  margin: [0, 0, 0, 0],
  page_type: 'screen',
  background_color: '#FFFFFF'
}

export type CustomComponentType = 'custom_input'
  | 'custom_generic_button'
  | 'custom_generic_button_rounded'
  | 'custom_text_block'
  | 'custom_image'


interface CustomComponentProps {
  disabled?: boolean;
  rounded?: boolean;
  onClickType?: OnClickTypeType,
  newPageId?: string,
  text?: string,
  imageUrl?: string,
  horizontalAlign?: 'flex-start' | 'flex-end' | 'center',
  width: number,
  height: number,
}

export interface CustomComponent {
  id: string,
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
  props: CustomComponentProps,
  title: string,
  item_type: CustomComponentType;
  children: CustomComponent[],
  data?: {
    value?: string,
  }
}

interface EditCustomComponentForm {
  value: any,

}

export const DEFAULT_EDIT_COMPONENT_FORM = {
  value: ''
}

interface BuilderContextProps {
  mode: BuilderMode,
  setMode: Dispatch<SetStateAction<BuilderMode>>,
  selectedElement: null | string,
  setSelectedElement: Dispatch<SetStateAction<any>>,
  pages: CustomPage[],
  setPages: Dispatch<SetStateAction<CustomPage[]>>,
  openedPage: CustomPage,
  setOpenedPage: Dispatch<SetStateAction<CustomPage>>,
  onAddComponent: (component: CustomComponent, setAsEditing: boolean) => void,
  draggingItemId?: string,
  setDraggingItemId: Dispatch<SetStateAction<string | undefined>>,
  editingComponent?: CustomComponent,
  setEditingComponent: Dispatch<SetStateAction<CustomComponent | undefined>>,
  editComponentForm: EditCustomComponentForm,
  setEditComponentForm: Dispatch<SetStateAction<EditCustomComponentForm>>,
  updateComponent: (newProps?: object) => void,
}

export default createContext<BuilderContextProps>({
  mode: 'simulator',
  setMode: () => {},
  selectedElement: null,
  setSelectedElement: () => {},
  pages: [],
  setPages: () => {},
  openedPage: DEFAULT_PAGE,
  setOpenedPage: () => {},
  onAddComponent: () => {},
  setDraggingItemId: () => {},
  setEditingComponent: () => {},
  editComponentForm: { value: '' },
  setEditComponentForm: () => {},
  updateComponent: () => {},
})