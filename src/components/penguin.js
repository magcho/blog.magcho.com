import React from 'react';


import black from '../assets/penguin-black.svg'
import cyan from '../assets/penguin-cyan.svg'
import green from '../assets/penguin-green.svg'
import pink from '../assets/penguin-pink.svg'
import orange from '../assets/penguin-orange.svg'


class Penguin extends React.Component{

  render(){
    let src;
    switch (this.props.category) {
      case '舞台技術':
        src = cyan
        break;
        
      case '日記':
        src = green
        break;

      case '電子工作':
        src = pink
        break;

      case 'プログラミング':
        src = orange
        break;
      
      default:
        src = black
        break;
    }
    return(
      <div className='date'>
        <img src={src} className='penguin-shadow' />
        <p>
          <time detatime={this.props.date}>
            {this.props.date}
          </time>
        </p>
      </div>
    )
  }
}

export default Penguin