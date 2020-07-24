import React, {useState} from 'react';
import Button from './components/Button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubItem from './components/Menu/subMenu'
import Transition from './components/Transition/transition'
import Input from './components/Input/input'
import AutoComplete from './components/AutoComplete/autoComplete'

const ControlledInput = () => {
    const [value, setValue] = useState('')
    return <Input value={value} defaultValue={value} onChange={(e) => {
        setValue(e.target.value)
    }}/>
}

const autoCpmpleteValue = ()=>{
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
    const handleFetch = (query: string) => {
        return lakers.filter(player => player.includes(query))
    }
    const handleSelect=(val:any)=>{
        console.log(val);
    }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={handleSelect}
        />
    )
}
function App() {
    const [showT, setshowT] = useState(true)
    const hadnle = () => {
        setshowT(!showT)
    }

    return (
        <div className="App">

            {autoCpmpleteValue()}

            <Button btnType='danger'>222</Button>
            <Button btnType='primary' size='lg' onClick={() => alert(11)}>primary</Button>
            <Button btnType='primary' size='sm'>primary</Button>
            <Button btnType='primary' disabled>disabled</Button>
            <Button btnType='link' href='http://www.baidu.com' disabled>link-disabled</Button>
            <Button btnType='link' href='http://www.baidu.com'>link</Button>

            <Input style={{width: '300px'}}
                   placeholder="input with icon"
                   value='this is value'
                   defaultValue={'2222'}
                   onChange={(e) => console.log(e.target.value)}
                   icon="search"/>
            <Input
                style={{width: '300px'}}
                defaultValue="prepend text"
                prepend="https://"
            />
            <Input
                style={{width: '300px'}}
                defaultValue="google"
                append=".com"
            />
            <ControlledInput/>
            <Menu defaultIndex={'0'} mode='vertical' onSelect={(val) => alert(val)}>
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
