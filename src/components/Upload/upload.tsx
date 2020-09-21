import React, {ChangeEvent, FC, useRef, useState} from 'react'
import axios from 'axios'
import Button from '../Button/button'
import UploadList from './uploadList'
import Dragger from "./dragger";
export type UploadFileStatus = 'ready' | 'success' | 'error' | 'uploading'

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File,
    error?: any;
    response?: any;
}

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onChange?: (file: File) => void;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: { [key: string]: any };
    data?: { [key: string]: any };
    name?: string;
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean,
    drag?:boolean
}

const Upload: FC<UploadProps> = (props) => {
    const {action, onProgress, onSuccess, onError, onChange, beforeUpload, defaultFileList, onRemove,data,headers, name, withCredentials, accept, multiple,drag,children} = props
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const handleClick = () => {
        if (fileInput.current) {
            console.log(333,fileInput);
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (!file) return
        uploadFile(file)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }

    const uploadFile = (files: FileList) => {
        const postFiles = Array.from(files)

        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }
    // Partial 代表更新任何几项都可以
    const updateFileList = (uploadFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            console.log(prevList);
            return prevList.map((file) => {
                if (file.uid === uploadFile.uid) {
                    return {...file, ...updateObj}
                } else {
                    return file
                }
            })
        })
    }

    const handleRemove = (file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }

    const post = (file: File) => {
        const _file: UploadFile = {
            uid: Date.now() + 'file_name',
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file
        }
        setFileList(prevList => {
            return [_file, ...prevList]
        })
        const formData = new FormData()
        formData.append(name || file.name,file)
        if(data){
            Object.keys(data).forEach(key=>{
                formData.append(key, data[key])
            })
        }

        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    console.log(percentage);
                    updateFileList(_file, {percent: percentage, status: 'uploading'})
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(resp => {
            updateFileList(_file, {status: 'success', response: resp.data})
            if (onSuccess) {
                onSuccess(resp.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(err => {
            updateFileList(_file, {status: 'error', error: err})
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }
    return (
        <div
            className="viking-upload-component"
        >
            <div
                className="viking-upload-input"
                style={{display: 'inline-block'}}
                onClick={handleClick}
            >
                {drag ?
                    <Dragger onFile={(files)=>{uploadFile(files)}}>
                        {children}
                    </Dragger>:
                    children
                }
                <input
                    className="viking-file-input"
                    style={{display: 'none'}}
                    ref={fileInput}
                    onChange={handleFileChange}
                    multiple={multiple}
                    accept={accept}
                    type="file"
                />
            </div>
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}
Upload.defaultProps = {
    name: 'file'
}
export default Upload


