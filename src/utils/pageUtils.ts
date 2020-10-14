import { CustomPage, PageType } from "../store/BuilderContext";

export const PERMANENT_PAGES: PageType[] = ['screen']

/**
 * Возвращает true если страничка может быть использована в навигации как первая для запуска или как онбординг
 * @param page
 */
export default function isPermanentPage(page: CustomPage) {
  return PERMANENT_PAGES.includes(page.page_type)
}

