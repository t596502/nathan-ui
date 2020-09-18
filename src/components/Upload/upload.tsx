import React, {ChangeEvent, FC, useRef,useState} from 'react'
import axios from 'axios'
import Button from '../Button/button'
import UploadList from './uploadList'
export type UploadFileStatus = 'ready' | 'success' | 'error' |'uploading'
export interface UploadFile{
  uid:string;
  size: number;
  name:string;
  status?:UploadFileStatus;
  percent?:number;
  raw?:File,
  error?:any;
  response?:any;
}

export interface UploadProps {
  action:string;
  defaultFileList?:UploadFile[];
  beforeUpload?:(file:File) => boolean | Promise<File>;
  onChange?:(file:File)=> void;
  onProgress?:(percentage:number,file:File) => void;
  onSuccess?:(data:any,file:File) =>void;
  onError?:(err:any,file:File) => void;
  onRemove?:(file:UploadFile)=>void
}

const Upload:FC<UploadProps> = (props) =>{
  const {action,onProgress,onSuccess,onError,onChange,beforeUpload,defaultFileList,onRemove} = props
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList,setFileList] = useState<UploadFile[]>(defaultFileList || [])
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
  // Partial 代表更新任何几项都可以
  const updateFileList = (uploadFile:UploadFile,updateObj:Partial<UploadFile>)=>{
    setFileList(prevList =>{
      console.log(prevList);
      return prevList.map((file)=>{
        if(file.uid === uploadFile.uid){
          return {...file,...updateObj}
        }else{
          return file
        }
      })
    })
  }

  const handleRemove=(file:UploadFile)=>{
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if(onRemove){
      onRemove(file)
    }
  }

  const post = (file:File)=>{
    const _file:UploadFile = {
        uid:Date.now() + 'file_name',
        size:file.size,
        name:file.name,
        status:'ready',
        percent:0,
        raw:file
    }
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
      formData.append(file.name,file)
        axios.post(action,formData,{
          headers:{
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress:(e)=>{
            let percentage = Math.round((e.loaded * 100) / e.total) || 0;
            updateFileList(_file,{percent:percentage,status:'uploading'})
            if(percentage < 100){
              if(onProgress) {
                onProgress(percentage,file)
              }
            }
          }
        }).then(resp=>{
          updateFileList(_file,{status:'success',response:resp.data})
          if(onSuccess){
            onSuccess(resp.data,file)
          }
          if(onChange){
            onChange(file)
          }
        }).catch(err=>{
          updateFileList(_file,{status:'error',error:err})
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
      <UploadList
          fileList={fileList}
          onRemove={handleRemove}
      />
    </div>
  )
}

export default Upload
