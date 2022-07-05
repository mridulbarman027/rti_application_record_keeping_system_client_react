import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <div className='bg-[#ccc] h-28 w-full flex items-center'>

            <Link to={'/'}>
                <div className='font-bold text-3xl mx-10 '>RTI APPLICATION RECORD KEEPING SYSTEM</div>
            </Link>

        </div>
    )
}

export default NavBar