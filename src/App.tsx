import React ,{useState}from 'react';
import Button from './components/Button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubItem from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'


function App() {
    const [showT,setshowT] = useState(true)
    const hadnle = ()=>{
        console.log(333);
        setshowT(!showT)
    }
  return (
    <div className="App">
      <Button btnType='danger'>222</Button>
      <Button btnType='primary' size='lg'>primary</Button>
      <Button btnType='primary' size='sm' onClick={()=>hadnle()}>primary</Button>
      <Button btnType='primary' disabled>disabled</Button>
      <Button btnType='link' href='http://www.baidu.com' disabled>link-disabled</Button>
        <Button btnType='link' href='http://www.baidu.com'>link</Button>
        <Transition in={showT} timeout={300} animation="zoom-in-right" wrapper>
            <p>dasdasdasdasdasd的撒大大</p>
            <p>dasdasdasdasdasd的撒大大</p>
            <p>dasdasdasdasdasd的撒大大</p>
            <p>dasdasdasdasdasd的撒大大</p>
            <p>dasdasdasdasdasd的撒大大</p>
            <Button btnType='primary' size='lg'>primary</Button>
        </Transition>
        <Menu defaultIndex={'0'} mode='vertical' onSelect={(val)=>alert(val)} >
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
