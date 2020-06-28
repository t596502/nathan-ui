import React,{useState,createContext} from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex:number)=>void;
export interface Menuprops {
    defaultIndex? :number;
    className?:string
    mode?:MenuMode
    style?:React.CSSProperties,
    onSelect?:SelectCallback

}
interface IMenuContext {
    index:number;
    onSelect?:SelectCallback
}

export const MenuContext = createContext<IMenuContext>({index:0})

const Menu:React.FC<Menuprops> = (props)=>{
    const {className,mode,style,children,defaultIndex,onSelect} = props;
    const [currentActive,setActive] = useState(defaultIndex)
    const classes = classNames('viking-menu',className,{
        'menu-vertical':mode === 'vertical'
    })
    const handleClick = (index:number) =>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }

    const passedContext:IMenuContext={
        index:currentActive || 0,
        onSelect:handleClick
    }

    const renderChildren = ()=>{
        return React.Children.map(children,(child,index)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            console.log(childElement);
            const {displayName,name} = childElement.type
            console.log(displayName,childElement.type.name);
            if(name === 'MenuItem'){
                return React.cloneElement(childElement,{
                    index
                })
            }else {
                console.error('renderChildren is not menuItem')
            }
        })
    }

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

export default Menu
