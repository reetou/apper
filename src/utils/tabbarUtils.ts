import { TabbarSettings } from "../store/BuilderContext";
import { v4 as uuidv4 } from 'uuid'

export function createTabbar(): TabbarSettings {
  return {
    items: [
      {
        id: uuidv4(),
        label: 'Page',
        icon: 'user',
        page_id: '',
      }
    ],
    selected_color: '#000000',
    show_label: true,
    color: '#F8CCCC',
  }
}