import React from 'react';
import Lupa  from '../img/1400397-200.png';


function NoPage() {
  return (
    <div className='nopage'>
        <div className='nop-text'>
            ERROR 404
        </div>
        <div className='imag-no'>
        <img src= {Lupa} alt="" />
        </div>
        <div className='nop-title'>
            <h1>La pagina que tratas de buscar, no sé encuentra en la pagina...</h1>
        </div>
    </div>
  )
}

export default NoPage;