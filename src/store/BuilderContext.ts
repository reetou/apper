import { createContext, Dispatch, SetStateAction, ReactNode, default as React } from "react";
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
  nav_header_mode: 'show' | 'hide',
  nav_header_title: string,
}

export const DEFAULT_PAGE: CustomPage = {
  id: uuidv4(),
  components: [],
  name: 'Default Page',
  padding: [0, 0, 0, 0],
  margin: [0, 0, 0, 0],
  page_type: 'screen',
  background_color: '#FFFFFF',
  nav_header_mode: 'show',
  nav_header_title: 'Header'
}

export function createNewPage(): CustomPage {
  return {
    id: uuidv4(),
    components: [],
    name: 'Default Page',
    padding: [0, 0, 0, 0],
    margin: [0, 0, 0, 0],
    page_type: 'screen',
    background_color: '#FFFFFF',
    nav_header_mode: 'show',
    nav_header_title: 'Header'
  }
}

export type CustomComponentType = 'custom_input'
  | 'custom_generic_button'
  | 'custom_generic_button_rounded'
  | 'custom_text_block'
  | 'custom_image'
  | 'custom_list_view'
  | 'custom_text_list_view'
  | 'custom_floating_button'

export interface ICustomListViewItem {
  id: string;
  image_url?: string;
  title: string;
  subtitle?: string;
  itemTargetId?: string;
}

export interface CustomComponentProps {
  disabled?: boolean;
  rounded?: boolean;
  onClickType?: OnClickTypeType,
  newPageId?: string,
  text?: string,
  imageUrl?: string,
  horizontalAlign?: 'flex-start' | 'flex-end' | 'center',
  width?: number,
  height?: number,
  newPageName?: string,
  backgroundColor?: string,
  textColor?: string,
  borderColor?: string,
  inputPlaceholder?: string,
  borderWidth?: number,
  margin?: number,
  padding?: number,
  noImage?: boolean,
  noSubtitle?: boolean,
  listItemPrepend?: 'circle',
}

export interface CustomComponentData {
  value?: string,
  childComponents?: ICustomListViewItem[],
}

export interface CustomComponent {
  id: string,
  component: React.ComponentType<any>,
  props: CustomComponentProps,
  title: string,
  item_type: CustomComponentType;
  children: CustomComponent[],
  data?: CustomComponentData,
}

interface EditCustomComponentForm {
  value: any,
  childComponents?: ICustomListViewItem[],
}

export const DEFAULT_EDIT_COMPONENT_FORM = {
  value: ''
}

interface BuilderContextProps {
  tabbarEnabled: boolean,
  setTabbarEnabled: (val: boolean) => void,
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
  updateComponent: (newProps?: CustomComponentProps, newData?: CustomComponentData) => void,
  editingListViewId?: string,
  setEditingListViewId: Dispatch<SetStateAction<string | undefined>>,
  editingListViewItems: ICustomListViewItem[],
  setEditingListViewItems: Dispatch<SetStateAction<ICustomListViewItem[]>>,
  toggleEditingListViewItems: () => void,
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
  updateComponent: () => {},
  editingListViewItems: [],
  setEditingListViewItems: () => {},
  editingListViewId: undefined,
  setEditingListViewId: () => {},
  toggleEditingListViewItems: () => {},
  tabbarEnabled: false,
  setTabbarEnabled: () => {},
})