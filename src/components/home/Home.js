import React from 'react'
import Dropdown from '../dropdown/Dropdown'
import {colors,components} from '../../data/data';
import './home.css'

function Home() {
  return (
    <div className='home-cont'>
    <Dropdown searchable = {false} multiSelect = {false} data={colors}/>
    <Dropdown searchable = {true} multiSelect = {true} data={components}/>
    </div>
  )
}

export default Home