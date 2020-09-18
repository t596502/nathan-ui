import React from 'react';
import {storiesOf} from "@storybook/react";
import { action } from '@storybook/addon-actions';
import Upload,{UploadFile} from './upload'

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]


const defaultButton = ()=>(
    <Upload
        defaultFileList={defaultFileList}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
)
storiesOf('Upload',module)
    .add('默认 Upload',defaultButton)
