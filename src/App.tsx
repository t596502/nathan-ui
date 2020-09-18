import React, {useState} from 'react';
import Button from './components/Button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubItem from './components/Menu/subMenu'
import Transition from './components/Transition/transition'
import Input from './components/Input/input'
import AutoComplete,{DataSourceType} from './components/AutoComplete/autoComplete'
import Upload from './components/Upload/upload'
import { METHODS } from 'http';
interface LakerPlayerProps {
    value: string;
    number: number;
}
interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}
const ControlledInput = () => {
    const [value, setValue] = useState('')
    return <Input value={value} defaultValue={value} onChange={(e) => {
        setValue(e.target.value)
    }}/>
}

const autoCpmpleteValue = ()=>{
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
    const lakersWithNumber = [
      {value: 'bradley', number: 11},
      {value: 'pope', number: 1},
      {value: 'caruso', number: 4},
      {value: 'cook', number: 2},
      {value: 'cousins', number: 15},
      {value: 'james', number: 23},
      {value: 'AD', number: 3},
      {value: 'green', number: 14},
      {value: 'howard', number: 39},
      {value: 'kuzma', number: 0},
    ]
    // const handleFetch = (query: string) => {
    //     return fetch(`https://api.github.com/search/users?q=${query}`)
    //         .then(res => res.json())
    //         .then(({ items }) => {
    //             if(!items.length) return []
    //             return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
    //         })
    // }
    const handleFetch = (query: string) => {
        return lakersWithNumber.filter(player => player.value.includes(query))
    }
    const handleSelect=(val:any)=>{
        console.log(val);
    }
    // const renderOption = (item:any)=>{
    //     return (
    //         <>
    //             <h2>Name:{item.value}</h2>
    //             <p>number:{item.number}</p>
    //         </>
    //     )
    // }
    const renderOption = (item: DataSourceType) => {
      const itemWithGithub = item as DataSourceType<GithubUserProps>
      return (
        <>
          <h2>Name: {itemWithGithub.value}</h2>
          <p>url: {itemWithGithub.url}</p>
        </>
      )
    }
    return (
        <div style={{width:400}}>
            <AutoComplete
                fetchSuggestions={handleFetch}
                onSelect={handleSelect}
                renderOption={renderOption}
            />
        </div>

    )
}
function App() {
    const [showT, setshowT] = useState(true)
    const hadnle = () => {
        setshowT(!showT)
    }
    const onProgress = (data:any,file:any)=>{
        console.log(data, file);
    }
    const onSuccess = (data:any,file:any)=>{
        console.log(data, file);
    }
    const onError = (data:any,file:any)=>{
        console.log(data, file);
    }
    const onChange = (file:File)=>{
        console.log(file)
    }
    const checkSize = (file:File)=>{
      if(Math.floor(file.size /1024) >50){
        alert('the big size')
        return false
      }
      return true
    }
    const filePromise = (file:File)=>{
      const newFile = new File([file],'new_name',{type:file.type})
      return Promise.resolve(newFile)
    }
    return (
        <div className="App">
            <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={onChange}
                    onError={onError}
            ></Upload>

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
