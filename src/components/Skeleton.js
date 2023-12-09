import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function SkeletonCard() {
    return (
        <div>
            <div className='h-36 rounded-lg'>
                <Skeleton height={140}/>
            </div>
            <h2 className='mt-2'><Skeleton /></h2>
        </div>
    )
}

export default SkeletonCard