import React from 'react'
import { useNavigate } from 'react-router-dom'

function AllPages() {
    const navigate = useNavigate()
  return (
    <div>
        <div>
            <ol>
                <li onClick={()=>navigate('/clock')}>Clock</li>
                <li onClick={()=>navigate('/bingo')}>Bingo</li>
            </ol>
        </div>
    </div>
  )
}

export default AllPages