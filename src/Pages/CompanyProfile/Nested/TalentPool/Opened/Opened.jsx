import React from 'react'
import './Opened.scss'
// Component
import { Deactivated } from "../../../../../Widgets/Deactivated/Deactivated";

export const Opened = () => {
  return (
    <div className="opened">
      <div className="container">
        <Deactivated />
      </div>
    </div>
  )
}
