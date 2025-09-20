import React from 'react'

const Loading = ({ height = '100vh'}) => {
  return (
    <div className='flex items-center justify-center h-full' style={{height}}>
      <div className='animate-spin rounded-full h-10 w-10 border-3 border-purple-500 border-t-transparent'></div>
    </div>
  )
}

export default Loading