import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../components/Button/button.tsx';

import '../styles/index.scss'
export default {
  title: 'Button',
  component: Button,
};

export const Text = () => <Button btnType='primary' onClick={action('clicked')}>Hello Button</Button>;

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
