import React,{useState,useContext} from 'react'
import classNames from 'classnames'
import {MenuContext} from './menu'
import {MenuItemProps} from './menuItem'

export interface SubMenuProps {
    index?:string;
    title:string;
    className?:string;
}

const SubMenu:React.FC<SubMenuProps> = ({index,title,className,children})=>{
    const context = useContext(MenuContext)

    const [showSub,setShowSub] = useState(false)

    const classes = classNames('submenu-item menu-item',className,{
        'is-active':context.index === index,
        'is-opened': showSub,
        'is-vertical':context.mode === 'vertical',
    })
    const handleClick = (e:React.MouseEvent)=>{
        e.preventDefault()
        setShowSub(!showSub)
    }
    let timer:any
    const handleHover = (e:React.MouseEvent,toggle:boolean)=>{
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(()=>{
            setShowSub(toggle)
        },300)
    }

    const clickEvents = context.mode  === "vertical" ? {onClick:handleClick} :{}
    const hoverEvent = context.mode  !== "vertical" ? {
        onMouseEnter:(e:React.MouseEvent)=>{handleHover(e,true)},
        onMouseLeave:(e:React.MouseEvent)=>{handleHover(e,false)},
    } : {}

    const renderChildren = ()=>{
        const subMenuClasses = classNames('viking-submenu',{
            'menu-opened':showSub
        })
        const element = React.Children.map(children,(child,i)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem'){
                return React.cloneElement(childElement,{
                    index:`${index}-${i}`
                })
            }else {
                console.error('place write down MenuItem')
            }
        })
        return <ul className={subMenuClasses}>
            {element}
        </ul>
    }
    return(
        <li key={index} className={classes} {...hoverEvent}>
            <div className="submenu-title"  {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu'

export default SubMenu
