import { Route, Routes } from 'react-router-dom'
import ProductsTab from '../components/adminPage/ProductsTab'
import SideTabsNavigator from '../components/adminPage/SideTabsNavigator'
import MenuPoint from '../model/MenuPoint'
import ErrorPage from './ErrorPage'
import CategoriesTab from '../components/adminPage/CategoriesTab'
import OrdersTab from '../components/adminPage/OrdersTab'
import GeneralSettingTab from '../components/adminPage/GeneralSettingsTab'

const menuPoints: MenuPoint[] = [
  {
    title: 'General',
    element: <GeneralSettingTab />,
    order: 1,
    path: '',
    forRoles: ['admin']
  },
  {
    title: 'Categories',
    element: <CategoriesTab />,
    order: 2,
    path: 'categories',
    forRoles: ['admin']
  },
  {
    title: 'Products',
    element: <ProductsTab />,
    order: 2,
    path: 'products',
    forRoles: ['admin']
  },
  {
    title: 'Orders',
    element: <OrdersTab />,
    order: 4,
    path: 'orders',
    forRoles: ['admin']
  }
]

function getMenuPoints (role: string | null): JSX.Element[] {
  return menuPoints
    .filter((point) => point.forRoles.includes(role))
    .map((point, index) => (
      <Route
        key={index}
        index={point.path === ''}
        path={point.hasChildren ? point.path + '/*' : point.path}
        element={point.element}
      />
    ))
}

const Admin = () => {
  return (
    <Routes>
      <Route path='/' element={<SideTabsNavigator menuPoints={menuPoints} />}>
        {getMenuPoints('admin')}
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default Admin
