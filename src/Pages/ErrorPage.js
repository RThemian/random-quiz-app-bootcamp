import React from 'react'
import {Link } from 'react-router-dom';


function ErrorPage() {
  return (
    <div>
      <h2>Error! Page not found!</h2>
    <Link to = '/'>Home</Link>
    </div>
  )
}

export default ErrorPage