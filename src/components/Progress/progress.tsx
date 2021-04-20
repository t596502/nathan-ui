import React,{FC} from "react";
import {ThemeProps} from '../Icon/icon'

interface ProgressProps {
    /**进度条百分比值，为数值类型，0-100*/
    percent:number;
    /**进度条的高度，单位px*/
    strokeHeight?:number;
    /**进度条的文字*/
    showText?:boolean;
    /**进度条的style*/
    styles?:React.CSSProperties;
    /**进度条的主题*/
    theme?:ThemeProps
}

export const Progress:FC<ProgressProps> = (props)=>{
    const {percent,strokeHeight,showText,styles,theme,...restProps} = props

    return(
        <div className="viking-progress-bar" style={styles} {...restProps}>
            <div className="viking-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
                <div
                    className={`viking-progress-bar-inner color-${theme}`}
                    style={{width: `${percent}%`}}
                >
                    {showText && <span className="inner-text">{`${percent}%`}</span>}
                </div>
            </div>
        </div>
        )
}

Progress.defaultProps={
    strokeHeight:15,
    showText:true,
    theme: "primary",
}
export default Progress;
