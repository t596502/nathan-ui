import React ,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes}from 'react'
import classNames from 'classnames'
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    className?:string;
    /**设置 Button 的禁用 */
    disabled?:boolean;
    /**设置 Button 的尺寸 */
    size?:ButtonSize;
    /**设置 Button 的类型 */
    btnType?:ButtonType;
    children:React.ReactNode;
    href?:string,
    onClick?:Function
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
* 这是我们得第一个Button 组件
* ## button header
* ```js
* import {Button} from 'nathan-ui';
* ```
*/
export const Button:FC<ButtonProps> = (props)=> {
    const {className,disabled,size,btnType,children,href,...restProps} = props;

    const classes= classNames('btn',className,{
        [`btn-${size}`]:size,
        [`btn-${btnType}`]:btnType,
        'disabled':btnType === 'link' && disabled
    });

        if(btnType === 'link' && href){
            return (
                <a className={classes}
                   href={href}
                   {...restProps}
            >{children}</a>
            )
        }else{
            return (
                <button disabled={disabled}
                        className={classes}
                        {...restProps}
                >
                    {children}
                </button>
            )
        }
}

Button.defaultProps={
    btnType:'default',
    disabled:false
}
export default Button;
