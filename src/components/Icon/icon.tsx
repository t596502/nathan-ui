import React ,{FC}from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library} from '@fortawesome/fontawesome-svg-core'
library.add(fas)
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
interface IconProps extends FontAwesomeIconProps{
    theme?:ThemeProps
}

const Icon:React.FC<IconProps> = (props)=>{
    const {theme,className,...restProps} = props
    const classes = classNames('viking-icon',className,{
        [`icon-${theme}`]:theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}


export default Icon
