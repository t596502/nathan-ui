import React from 'react';
import Button from './components/Button'
function App() {
  return (
    <div className="App">
      <Button btnType='danger'>222</Button>
      <Button btnType='primary' size='lg'>primary</Button>
      <Button btnType='primary' size='sm'>primary</Button>
      <Button btnType='primary' disabled>disabled</Button>
      <Button btnType='link' href='http://www.baidu.com' disabled>link-disabled</Button>
      <Button btnType='link' href='http://www.baidu.com'>link</Button>
    </div>
  );
}

export default App;
