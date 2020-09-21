import React from 'react';
import {storiesOf} from "@storybook/react";
import { action } from '@storybook/addon-actions';
import Upload,{UploadFile} from './upload'
import Button from "../Button";

// const defaultFileList: UploadFile[] = [
//   { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
//   { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
//   { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
// ]


const defaultButton = ()=>(
    <Upload
        name={'_file_name'}
        data={{nathan:'test'}}
        headers={{'UI-TYPE':'Nathan-UI'}}
        multiple
        accept={'.png'}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76" >
        <Button btnType="primary">upload file</Button>
    </Upload>
)

const dragButton = ()=>(
    <Upload
        name={'_file_name'}
        data={{nathan:'test'}}
        headers={{'UI-TYPE':'Nathan-UI'}}
        multiple
        accept={'.png'}
        drag
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76" >
    </Upload>
)

storiesOf('Upload',module)
    .add('默认 Upload',defaultButton)
    .add('拖拽上传 Upload',dragButton)
