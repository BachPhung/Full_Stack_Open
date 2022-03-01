import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'
export const Notification = () => {
  const message = useSelector(state => state.noti)
  return (
    <div className='err'>
      {message}
    </div>
  )

}