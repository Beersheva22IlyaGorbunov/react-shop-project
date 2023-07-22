import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavigatorDispatcher from './components/navigator/NavigatorDispatcher'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import {
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material'
import Admin from './pages/Admin'
import {
  useAuthSelector,
  useCodeTypeSelector
} from './redux/store'
import MenuPoint from './model/MenuPoint'
import SignOut from './pages/SignOut'
import Orders from './pages/Orders'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import { useDispatch } from 'react-redux'
import { authService, cartService } from './config/servicesConfig'
import { useEffect, useMemo } from 'react'
import { setCart } from './redux/slices/CartSlice'
import { AnyAction } from '@reduxjs/toolkit'
import useSettings from './hooks/useSettings'
import SnackbarAlert from './components/common/SnackbarAlert'
import { codeActions } from './redux/slices/CodeSlice'
import CodeType from './model/CodeType'
import { signOut } from './redux/slices/AuthSlice'
import StatusType from './model/StatusType'
import { settingsActions } from './redux/slices/SettingsSlice'

const menuPoints: MenuPoint[] = [
  {
    title: 'Home',
    element: <Home />,
    order: 1,
    path: '',
    forRoles: ['admin', 'user', null]
  },
  {
    title: 'Catalog',
    element: <Catalog />,
    hasChildren: true,
    order: 2,
    path: 'catalog',
    forRoles: ['admin', 'user', null]
  },
  {
    title: 'Admin',
    element: <Admin />,
    hasChildren: true,
    order: 3,
    path: 'admin',
    forRoles: ['admin']
  }
]

const authMenuPoints: MenuPoint[] = [
  {
    title: 'Orders',
    element: <Orders />,
    order: 1,
    path: 'orders',
    forRoles: ['admin', 'user']
  },
  {
    title: 'Cart',
    element: <Cart />,
    order: 2,
    path: 'cart',
    hiddenInMenu: true,
    forRoles: ['admin', 'user']
  },
  {
    title: 'Signout',
    element: <SignOut />,
    hasChildren: true,
    order: 3,
    path: 'signout',
    forRoles: ['admin', 'user']
  }
]

const anonimMenuPoints: MenuPoint[] = [
  {
    title: 'Sign In',
    element: <SignIn />,
    order: 1,
    path: 'signin',
    forRoles: [null]
  },
  {
    title: 'Sign Up',
    element: <SignUp />,
    hasChildren: true,
    order: 3,
    path: 'signup',
    forRoles: [null]
  }
]

function routesFromPoints (points: MenuPoint[]): JSX.Element[] {
  return points.map((point, index) => (
    <Route
      key={index}
      index={point.path === ''}
      path={point.hasChildren ? point.path + '/*' : point.path}
      element={point.element}
    />
  ))
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#ef9a83'
    },
    secondary: {
      main: '#83d8ef'
    }
  }
})

function getMenuPoints (role: string | null): MenuPoint[] {
  return menuPoints
    .filter((point) => point.forRoles.includes(role))
    .sort((a, b) => {
      let res = 0
      if (a.order && b.order) {
        res = a.order - b.order
      }
      return res
    })
}

async function initializeCart (
  uid: string,
  dispatchFn: (action: AnyAction) => void
) {
  cartService.getCartRx(uid).subscribe({
    next: (cart) => {
      if (typeof cart !== 'string') {
        dispatchFn(setCart(cart))
      }
    }
  })
}

function App () {
  const user = useAuthSelector()
  const code = useCodeTypeSelector()
  const dispatch = useDispatch()
  const [settingsIsLoading, error, settings] = useSettings();

  useEffect(() => {
    settings && dispatch(settingsActions.set(settings))
  }, [settings])

  function codeProcessing (codeMsg: { code: CodeType, message: string }) {
    const res: [string, StatusType] = [codeMsg.message, 'error']
    switch (codeMsg.code) {
      case CodeType.OK: {
        res[1] = 'success'
        break
      }
      case CodeType.AUTH_ERROR: {
        dispatch(signOut())
        authService.logout()
        break
      }
    }
    return res
  }

  const [alertMessage, severity] = useMemo(() => codeProcessing(code), [code])

  useEffect(() => {
    if (user?.uid) {
      initializeCart(user.uid, dispatch)
    }
  }, [user])

  const currentPoints: MenuPoint[] = getMenuPoints(
    user != null ? user.role : null
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <NavigatorDispatcher
                menuPoints={currentPoints}
                authMenuPoints={(user != null) ? authMenuPoints : anonimMenuPoints}
              />
            }
          >
            {routesFromPoints(currentPoints)}
            {routesFromPoints((user != null) ? authMenuPoints : anonimMenuPoints)}
            <Route
              path='*'
              element={
                <div>
                  <h2>404 Page not found</h2>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      {alertMessage && (
        <SnackbarAlert
          onClose={() => dispatch(codeActions.reset())}
          message={{ message: alertMessage, status: severity }}
        />
      )}
    </ThemeProvider>
  )
}

export default App
