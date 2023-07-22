import { AppBar, Container, SxProps, Tab, Tabs } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import UserMenu from './UserMenu'
import { Theme } from '@emotion/react'
import MenuPoint from '../../model/MenuPoint'

interface Props {
  menuPoints: MenuPoint[]
  selectedTab: number | false
  authUserPoints: MenuPoint[]
  tabChangeFn: (tabIndex: number) => void
}

const headerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, .5)',
  backdropFilter: 'blur(3px)',
  px: 2,
  borderRadius: 4,
  mx: 'auto',
  boxShadow: 3
}

const Navigator: React.FC<Props> = ({
  menuPoints,
  selectedTab,
  authUserPoints,
  tabChangeFn
}) => {
  return (
    <AppBar sx={{ mt: 2, background: 'none', boxShadow: 'none' }} position='sticky'>
      <Container maxWidth='lg' sx={headerStyle}>
        <Tabs
          value={selectedTab}
          onChange={(__, newValue) => tabChangeFn(newValue)}
          aria-label='basic tabs example'
        >
          {menuPoints.map((point: MenuPoint) => (
            <Tab
              key={point.title}
              sx={{ '&:hover': { color: 'lightcoral' }, color: 'whitesmoke' }}
              label={point.title}
              component={Link}
              to={point.path}
            />
          ))}
        </Tabs>
        <UserMenu menuPoints={authUserPoints} />
      </Container>
    </AppBar>
  )
}

export default Navigator
