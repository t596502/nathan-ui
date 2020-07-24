import React, {FC, useState,ChangeEvent,ReactElement} from 'react'
import classNames from 'classnames'
import Input, {InputProps} from '../Input/input'


interface AutoCompleteProps extends Omit<InputProps,'onSelect'> {
    fetchSuggestions: (str: string) => string[];
    onSelect?: (item: string) => void
}


export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {fetchSuggestions, onSelect, value,...restProps} = props

    const [inputValue,setInputValue] = useState(value)
    const [ suggestions, setSugestions ] = useState<string[]>([])


    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value.trim()
        setInputValue(value)
        if(value){
            const result = fetchSuggestions(value)
            setSugestions(result)
        }else {
            setSugestions([])
        }
    }
    const handleSelect = (item:string)=>{
        console.log(item);
        setSugestions([])
        setInputValue(item)
        if(onSelect){
            onSelect(item)
        }
    }
    const generateDropdown = ()=>{
        return <ul className="viking-suggestion-list">
            {suggestions.map((item,index)=>{
            return (
                <li key={index} onClick={()=>handleSelect(item)}>{item}</li>
            )
        })}
        </ul>
    }
    return <div className="viking-auto-complete">
        <Input
            value={inputValue}
            onChange={handleChange}
            {...restProps}
        />
        {generateDropdown()}
    </div>
}

export default AutoComplete

