import React,{useState,createContext} from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex:string)=>void;
export interface MenuProps {
    defaultIndex? :string;
    className?:string
    mode?:MenuMode
    style?:React.CSSProperties
    onSelect?:SelectCallback

}
interface IMenuContext {
    index:string;
    onSelect?:SelectCallback,
    mode?:MenuMode
}

export const MenuContext = createContext<IMenuContext>({index:'0'})

const Menu:React.FC<MenuProps> = (props)=>{
    const {className,mode,style,children,defaultIndex,onSelect} = props;
    const [currentActive,setActive] = useState(defaultIndex)
    const classes = classNames('viking-menu',className,{
        'menu-vertical':mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })
    const handleClick = (index:string) =>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }

    const passedContext:IMenuContext={
        index:currentActive || '0',
        onSelect:handleClick,
        mode
    }

    const renderChildren = ()=>{

        return React.Children.map(children,(child,index)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            console.log(childElement);
            const {displayName=''} = childElement.type || {}
            if(displayName === 'MenuItem' || displayName === 'SubMenu'){
                return React.cloneElement(childElement,{
                    index:index.toString()
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

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
}

export default Menu
