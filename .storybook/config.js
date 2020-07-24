import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react';
import '../src/styles/index.scss'

// configure(require.context('../src',true,/\.stories\.tsx$/),module)

const wrapperStyle = {
    padding: '20px 40px'
}
const storyWrapper = (stroyFn) => (
    <div style={wrapperStyle}>
        <h3>组件演示</h3>
        {stroyFn()}
    </div>
)
addDecorator(storyWrapper)

