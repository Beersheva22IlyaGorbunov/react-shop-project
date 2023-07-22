import React, { useState } from 'react'
import MenuPoint from '../../model/MenuPoint'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  SxProps,
  Tab,
  Tabs,
  Theme,
  Typography
} from '@mui/material'
import { ChevronLeft, Menu } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import UserMenu from './UserMenu'

interface Props {
  menuPoints: MenuPoint[]
  authUserPoints: MenuPoint[]
  selectedTab: number | false
  tabChangeFn: (tabIndex: number) => void
}

const headerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, .5)',
  backdropFilter: 'blur(3px)',
  mt: 1,
  px: 2,
  mx: 'auto',
  width: '100%'
}

const NavigatorPortrait: React.FC<Props> = ({
  menuPoints,
  selectedTab,
  authUserPoints,
  tabChangeFn
}) => {
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  function handleMenuClick (index: number): void {
    handleDrawerClose()
    tabChangeFn(index)
  }

  function getTabs (): JSX.Element[] {
    return menuPoints.map((elem) => (
      <Tab
        sx={{ '&:hover': { color: 'lightcoral' } }}
        key={elem.title}
        label={elem.title}
        component={Link}
        onClick={handleDrawerClose}
        to={elem.path}
      />
    ))
  }

  return (
    <>
      <AppBar color='inherit' sx={headerStyle} position='sticky'>
        <IconButton
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          color='primary'
        >
          <Menu />
        </IconButton>
        <Typography
          sx={{ ml: 'auto', mr: 'auto', pr: 3, py: 1.5, color: 'white' }}
          variant='h6'
        >
          {selectedTab !== false && (menuPoints[selectedTab]?.title ?? '')}
        </Typography>
      </AppBar>
      <Drawer
        sx={{
          flexShrink: 0
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <Box minWidth='200px' height='100%' position='relative'>
          <IconButton
            sx={{ marginInlineStart: 'auto', display: 'block', width: '40px', height: '40px' }}
            onClick={handleDrawerClose}
          >
            <ChevronLeft />
          </IconButton>
          <Divider />
          <Tabs
            value={
              selectedTab !== false && selectedTab < menuPoints.length
                ? selectedTab
                : 0
            }
            orientation='vertical'
            onChange={(e, index) => handleMenuClick(index)}
            aria-label='basic tabs example'
          >
            {getTabs()}
          </Tabs>
          <UserMenu rawPoints menuPoints={authUserPoints} />
        </Box>
      </Drawer>
    </>
  )
}

export default NavigatorPortrait
