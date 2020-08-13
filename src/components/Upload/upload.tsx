import React, {ChangeEvent, FC, useRef} from 'react'
import axios from 'axios'
import Button from '../Button/button'

export interface UploadProps {
  action:string;
  beforeUpload?:(file:File) => boolean | Promise<File>;
  onChange?:(file:File)=> void;
  onProgress?:(percentage:number,file:File) => void;
  onSuccess?:(data:any,file:File) =>void;
  onError?:(err:any,file:File) => void;
}

const Upload:FC<UploadProps> = (props) =>{
  const {action,onProgress,onSuccess,onError,onChange,beforeUpload} = props
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = ()=>{
    if(fileInput.current){
      fileInput.current.click()
    }
  }
  const handleFileChange = (e:ChangeEvent<HTMLInputElement>)=>{
      const file = e.target.files;
      if(!file) return
    uploadFile(file)
    if(fileInput.current){
      fileInput.current.value = ''
    }
  }

  const uploadFile = (files:FileList)=>{
    const postFiles = Array.from(files)

    postFiles.forEach(file =>{
       if(!beforeUpload){
         post(file)
       }else{
         const result = beforeUpload(file);
         if(result && result instanceof Promise){
           result.then(processedFile=>{
             post(processedFile)
           })
         }else if(result !== false){
             post(file)
             
         }
       }
    })
  }
  const post = (file:File)=>{
    const formData = new FormData()
      formData.append(file.name,file)
        axios.post(action,formData,{
          headers:{
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress:(e)=>{
            let percentage = Math.round((e.loaded * 100) / e.total) || 0;
            if(percentage < 100){
              if(onProgress) {
                onProgress(percentage,file)
              }
            }
          }
        }).then(resp=>{
          if(onSuccess){
            onSuccess(resp.data,file)
          }
          if(onChange){
            onChange(file)
          }
        }).catch(err=>{
          if(onError){
            onError(err,file)
          }
          if(onChange){
            onChange(file)
          }
        })
  }
  return (
    <div
      className="viking-upload-component"
    >
      <Button btnType="primary" onClick={handleClick}>upload file</Button>
      <input ref={fileInput} onChange={handleFileChange} className="viking-file-input" style={{display:'none'}} type="file"/>
    </div>
  )
}

export default Upload
