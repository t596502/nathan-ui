import React,{FC,useState,DragEvent} from "react";
import classNames from 'classnames'

interface DraggerProps {
    onFile:(file:FileList)=>void
}
const Dragger:FC<DraggerProps> =(props)=>{
    const {onFile,children}= props
    const [dragOver,setDragOver] = useState(false)
    const dClass = classNames('viking-uploader-dragger',{
        'is-dragover':dragOver
    })


    const handleDrop=(e:DragEvent<HTMLElement>)=>{
        e.preventDefault()
        setDragOver(false)
        onFile(e.dataTransfer.files)
    }
    const handleDrag = (e:DragEvent<HTMLElement>,over:boolean)=>{
        e.persist()
        e.preventDefault()
        setDragOver(over)
    }
    return(
        <div
            className={dClass}
            onDragOver={e => { handleDrag(e, true)}}
            onDragLeave={e => { handleDrag(e, false)}}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}


export default Dragger
