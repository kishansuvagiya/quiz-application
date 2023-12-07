import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Navbarr from '../components/Navbarr';
import { useNavigate } from 'react-router-dom';
import SkeletonCard from '../components/Skeleton';

function Category() {
    let token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [cat, setcat] = useState([])
    const allCategory = async () => {
        try {
            const res = await axios.get('https://quiz-api-y0nx.onrender.com/category', {
                headers: { Authorization: token }
            })
            setcat(res.data.data)
            // console.log(cat);

        } catch (error) {
            toast.error(error.message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(error);
        }
    }
    useEffect(() => {
        allCategory()
    }, [])
    const gotoQuiz = (item) => {
        navigate('/quiz/' + item.name)
    }
    return (
        <div >
            <Navbarr />
            <div className="container mt-5">
                <h1 className='text-2xl md:text-4xl font-semibold text-center mb-8 '>Choose Your <span className='text-3xl md:text-5xl font-bold'>Category</span></h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {
                        cat.length > 0 ?
                            cat.map((item) => {
                                return (
                                    <div onClick={() => gotoQuiz(item)}>
                                        <div className=' h-36 rounded-lg overflow-hidden shadow-xl hover:scale-105  duration-500 cursor-pointer '>
                                            <img src={item.image} alt="" className='w-full h-full' />
                                        </div>
                                        <h2 className='rise text-center'> {item.name}</h2>
                                    </div>
                                )
                            }) :
                            <>
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Category