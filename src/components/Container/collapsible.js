import React from 'react';
class Collapsible extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          open: true
      }
      this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(e){
    this.setState({open: !this.state.open})
  }

  renderList(listSize) {
      if (!listSize || listSize.length === 0) {
          return;
      }
      return (
        listSize.map((item, index) => (
            <li key={index} className={`list-${index}`}>Item name</li>
        ))
      )
  }

  render() {

    return (
        <div className={`collapsible-list ${this.props.wrapperClass}`}>
            <div className={`arrow-element ${this.state.open === true ? 'up' : 'down'}`} onClick={(e)=>this.togglePanel(e)}>
                <h1 className='list-header'>{this.props.title ? this.props.title : ''}</h1>
                <div className='arrow-button'>^</div>
            </div>
            {this.state.open ? (
                <>
                    <h2 className='list-title'>Package Includes</h2>
                        <ul className='list'>
                            {this.renderList(this.props.listSize)}
                        </ul>
                    <div className='container-button'>Button</div>
                </>
            ) : null}
         </div>);
  }
}

export default Collapsible;
