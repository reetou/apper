import { createContext, Dispatch, SetStateAction, ReactNode, default as React } from "react";
import { v4 as uuidv4 } from 'uuid'
import { OnClickTypeType } from "../utils/buttonUtils";
import { createTabbar } from "../utils/tabbarUtils";
import { DEFAULT_IMAGE_URL } from "../components/mobile_components";

export type BuilderMode = 'simulator' | 'navigation' | 'edit_tabbar' | 'edit_onboarding'

export type PageType = 'modal' | 'screen'

export interface CustomOnboardingItem {
  id: string,
  text: string,
  image_url: string,
}

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
export interface CustomOnboarding {
  id: string,
  items: CustomOnboardingItem[],
  background_color: string,
  text_color: string,
  next_page_id: string,
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
  nav_header_title: 'Header',
}

export function createNewPage(index?: number): CustomPage {
  return {
    id: uuidv4(),
    components: [],
    name: index ? `Screen Page ${index}` : "Default Page",
    padding: [0, 0, 0, 0],
    margin: [0, 0, 0, 0],
    page_type: 'screen',
    background_color: '#FFFFFF',
    nav_header_mode: 'show',
    nav_header_title: 'Header',
  }
}

function createOnboardingItem(): CustomOnboardingItem {
  return {
    id: uuidv4(),
    text: 'Onboarding text...',
    image_url: DEFAULT_IMAGE_URL
  }
}

export function createOnboarding(): CustomOnboarding {
  return {
    id: uuidv4(),
    next_page_id: '',
    items: [
      createOnboardingItem(),
      createOnboardingItem(),
      createOnboardingItem(),
    ],
    background_color: '#FFFFFF',
    text_color: '#000000',
  }
}

export function createProject(): Project {
  return {
    id: uuidv4(),
    project_name: 'Default project',
    first_page_id: '',
    pages: [{...DEFAULT_PAGE}],
    tabbar_enabled: true,
    tabbar_settings: createTabbar(),
    onboarding: createOnboarding(),
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
  | 'custom_onboarding_child'
  | 'custom_text_title'

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
  webPageUrl?: string,
  fontSize?: number,
  fontWeight?: string,
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

export interface TabbarItem {
  icon: string;
  label?: string;
  id: string;
  page_id: string;
}

export interface TabbarSettings {
  items: TabbarItem[],
  show_label: boolean,
  selected_color: string,
  color: string,
}

export interface Project {
  id: string,
  project_name: string,
  tabbar_settings: TabbarSettings,
  onboarding: CustomOnboarding,
  tabbar_enabled: boolean,
  pages: CustomPage[],
  first_page_id: string,
}

interface BuilderContextProps {
  project: Project,
  setProject: Dispatch<SetStateAction<Project>>,
  mode: BuilderMode,
  setMode: Dispatch<SetStateAction<BuilderMode>>,
  selectedElement: null | string,
  setSelectedElement: Dispatch<SetStateAction<any>>,
  openedPage: CustomPage,
  setOpenedPage: Dispatch<SetStateAction<CustomPage>>,
  onAddComponent: (component: CustomComponent, setAsEditing: boolean) => void,
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
  openedPage: DEFAULT_PAGE,
  setOpenedPage: () => {},
  onAddComponent: () => {},
  setEditingComponent: () => {},
  updateComponent: () => {},
  editingListViewItems: [],
  setEditingListViewItems: () => {},
  editingListViewId: undefined,
  setEditingListViewId: () => {},
  toggleEditingListViewItems: () => {},
  project: createProject(),
  setProject: () => {},
})