import React from 'react';
import Collapsible from './collapsible';
import './index.scss';

class Container extends React.Component {

  render() {
    const arrayOne = ['Item Name', 'Item Name', 'Item Name', 'Item Name', 'Item Name', 'Item Name', 'Item Name', 'Item Name', 'Item Name', 'Item Name'];
    const arrayTwo = ['Item Name', 'Item Name', 'Item Name', 'Item Name'];
    return  (
      <div className='grid'>
        <div className='container-wrapper top'>
          <Collapsible 
            title='Header Text'
            listSize={arrayOne}
            wrapperClass='list-one'></Collapsible>
        </div>
        <div className='container-wrapper bottom'>
          <Collapsible
            title='This is Long Header Text'
            listSize={arrayTwo}
            wrapperClass='list-two'></Collapsible>
        </div>
      </div>
    )
  }
}

export default Container;
