import React, { ReactElement } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigatorDispatcher from './components/navigator/NavigatorDispatcher';
import Home from './pages/Home';
import Catalog from './pages/Catalog';

export interface MenuPoint {
  title: string
  path: string
  element: ReactElement
  order?: number
  forRoles: Array<string | null>
}

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
    order: 2,
    path: 'catalog',
    forRoles: ['admin', 'user', null]
  },
]

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<NavigatorDispatcher menuPoints={menuPoints} />}
          >
            {menuPoints.map((point, index) => (
              <Route
                key={index}
                index={point.path === ''}
                path={point.path}
                element={point.element}
              />
            ))}
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
  );
}

export default App;
