import React, { useState } from 'react'
import Form from '../Users/Form'

const Home = () => {

  const [form,setForm]=useState(false)
  return (
    <div className='body'>
       {!form?
       <button className='btn'onClick={()=>setForm(true)} >Create Docket</button> 
       :
        <div><Form fo/></div>
       
       }
      
    </div>
  )
}

export default Home
