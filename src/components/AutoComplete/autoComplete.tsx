import React, {FC, useState,useEffect,useRef,ChangeEvent,ReactElement,KeyboardEvent} from 'react'
import classNames from 'classnames'
import Input, {InputProps} from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
    value:string
}
export type DataSourceType<T = {}> = T & DataSourceObject
interface AutoCompleteProps extends Omit<InputProps,'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    /**渲染配置*/
    renderOption?:(item:DataSourceType) => ReactElement
}


export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {fetchSuggestions, onSelect, value,renderOption,...restProps} = props
    const [inputValue,setInputValue] = useState(value as string)
    const [ suggestions, setSugestions ] = useState<DataSourceType[]>([])
    const [ loading, setLoading ] = useState(false)
    const [ showDropdown, setShowDropdown] = useState(false)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const [ highlightIndex, setHighlightIndex] = useState(-1)
    const debouncedValue = useDebounce(inputValue,1000)
    useClickOutside(componentRef, () => { setSugestions([])})
    useEffect(()=>{
        if(debouncedValue && triggerSearch.current){
            const result = fetchSuggestions(debouncedValue)
            if(result instanceof Promise){
                setLoading(true)
                result.then(data => {
                    setLoading(false)
                    setSugestions(data)
                    if (data.length > 0) {
                        setShowDropdown(true)
                    }
                }).catch(err=>{
                    setLoading(false)
                })
            }else {
                setSugestions(result)
                if (result.length > 0) {
                    setShowDropdown(true)
                }
            }
        }else {
            setShowDropdown(false)
        }
    },[debouncedValue,fetchSuggestions])

    const highlight = (index:number)=>{
        if(index <0) index = 0
        if(index > suggestions.length){
            index = suggestions.length -1
        }
        setHighlightIndex(index)
    }
    const handleKeyDown=(e:KeyboardEvent<HTMLInputElement>)=>{
        switch (e.keyCode) {
            case 13:
                if(suggestions[highlightIndex]){
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 38:
                highlight(highlightIndex-1)
                break
            case 40:
                highlight(highlightIndex+1)
                break
            case 27:
                setShowDropdown(false)
                break
            default:
                break
        }
    }
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    const handleSelect = (item:DataSourceType)=>{
        setShowDropdown(false)
        setInputValue(item.value)
        if(onSelect){
            onSelect(item)
        }
        triggerSearch.current = false
    }
    const renderTemplate = (item:DataSourceType)=>{
        return renderOption ? renderOption(item) : item.value
    }
    const generateDropdown = ()=>{
        return<Transition
            in={showDropdown || loading}
            animation="zoom-in-top"
            timeout={300}
            onExited={() => {setSugestions([])}}
        >
            <ul className="viking-suggestion-list">

                {loading &&
                <div className="suggstions-loading-icon">
                    <Icon icon="spinner" spin/>
                </div>
                }{
                    suggestions.map((item,index)=>{
                        const cnames = classNames('suggestion-item', {
                            'is-active':highlightIndex === index
                        })
                        return (
                            <li key={index} className={cnames} onClick={()=>handleSelect(item)}>
                                {renderTemplate(item)}
                            </li>
                        )
                    })}
            </ul>
        </Transition>

    }
    return <div className="viking-auto-complete" ref={componentRef}>
        <Input
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...restProps}
        />
        {generateDropdown()}
    </div>
}

export default AutoComplete

