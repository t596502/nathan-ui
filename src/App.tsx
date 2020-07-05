import React from 'react';
import Button from './components/Button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubItem from './components/Menu/subMenu'
function App() {
  return (
    <div className="App">
      <Button btnType='danger'>222</Button>
      <Button btnType='primary' size='lg'>primary</Button>
      <Button btnType='primary' size='sm'>primary</Button>
      <Button btnType='primary' disabled>disabled</Button>
      <Button btnType='link' href='http://www.baidu.com' disabled>link-disabled</Button>
      <Button btnType='link' href='http://www.baidu.com'>link</Button>

        <Menu defaultIndex={'0'} mode='horizontal' onSelect={(val)=>alert(val)}>
            <MenuItem>dasasda</MenuItem>
            <SubItem title={'text'}>
                <MenuItem>2222</MenuItem>
                <MenuItem>dasdas</MenuItem>
                <MenuItem>dasdas大的</MenuItem>
                <MenuItem>的撒大撒大苏打</MenuItem>
            </SubItem>
            <MenuItem>dasasda2</MenuItem>
        </Menu>
    </div>
  );
}

export default App;