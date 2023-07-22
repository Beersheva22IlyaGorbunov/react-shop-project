import { ReactElement } from 'react'

interface MenuPoint {
  title: string
  path: string
  element: ReactElement
  order?: number
  hasChildren?: boolean
  hiddenInMenu?: boolean
  forRoles: Array<string | null>
}

export default MenuPoint
