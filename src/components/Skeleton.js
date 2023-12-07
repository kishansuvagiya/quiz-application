import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function SkeletonCard() {
    return (
        <div>
            <div className='h-36 rounded-lg'>
                <Skeleton height={140}/>
            </div>
            <h2 className='text-center mt-2'><Skeleton width={135}/></h2>
        </div>
    )
}

export default SkeletonCard