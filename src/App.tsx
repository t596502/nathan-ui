import React from 'react';
import Button from './components/Button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
function App() {
  return (
    <div className="App">
      <Button btnType='danger'>222</Button>
      <Button btnType='primary' size='lg'>primary</Button>
      <Button btnType='primary' size='sm'>primary</Button>
      <Button btnType='primary' disabled>disabled</Button>
      <Button btnType='link' href='http://www.baidu.com' disabled>link-disabled</Button>
      <Button btnType='link' href='http://www.baidu.com'>link</Button>

        <Menu onSelect={(val) => alert(val)} mode={"vertical"}>
            <MenuItem  disabled>dasasda</MenuItem>
            <MenuItem>2222</MenuItem>
            <MenuItem>dasasda2</MenuItem>
        </Menu>
    </div>
  );
}

export default App;
