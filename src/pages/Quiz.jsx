import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbarr from '../components/Navbarr';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import Lottie from "lottie-react";
import sandClock from '../components/other/sandClock_animation.json'

function Quiz() {
    const [data, setData] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(90);
    const params = useParams();
    let token = localStorage.getItem('token')
    const navigate = useNavigate()
    const allData = async () => {
        try {
            const res = await axios.get('https://quiz-api-y0nx.onrender.com/quiz', {
                headers: { Authorization: token }
            })
            setData(res.data.data)
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        allData()
    }, [])

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const filterData = data.filter((item) => {
        return item.category.name === params.name
    })
    // .sort(() => Math.random() - 0.5)

    const tenQuestions = filterData.slice(0, 10)

    const nextQue = () => {
        if (currentIndex < tenQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption('')
            if (tenQuestions[currentIndex].answer === selectedOption) {
                setScore(score + 1)
            }
        }
    }
    const finishQuiz = () => {
        setResult(true)
    }
    const startTimer = () => {
        setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(prevTime => prevTime - 1);
            } else {
                // Time is up, you can handle the end of the quiz here
                setResult(true)
                console.log('Time is up!');
            }
        }, 1000); // Update every 1000 milliseconds (1 second)
    };
    useEffect(() => {
        startTimer();
    }, [timeLeft]);

    return (
        <>
            <Navbarr />
            <div className='quiz-bg '>
                <div className="container relative text-white">
                    <h2 className='text-3xl md:text-4xl lg:text-5xl  font-semibold text-center py-2 md:py-3 lg:py-4 text-white'>Choose correct answer</h2>

                    {result ? // quiz result page or questions page
                        <div className="result-container">
                            <h2 className="result-title">Quiz Result</h2>
                            <p className="result-score">
                                Your Score: {score} / 10
                            </p>
                            <Button variant="contained" className='bg-slate-300 text-black' onClick={() => navigate('/category')} endIcon={<ReplayOutlinedIcon />}>play again</Button>
                        </div> :
                        tenQuestions.length > 0 ?
                            <>
                                <div className='w-4/5 mx-auto'>
                                    <div className='flex md:justify-end items-center -mt-2 md:mt-0 justify-center'>
                                        <div className='w-12'>
                                            <Lottie animationData={sandClock} loop={true} />
                                        </div>
                                        <span className='text-sm md:text-base'>Time left: {timeLeft} seconds</span>
                                    </div>
                                    <div className='mt-2'>
                                        <span className='text-base md:text-lg p-1.5 bg-slate-300 text-black rounded '>{currentIndex + 1} out of 10.</span>
                                    </div>
                                    <h1 className='text-xl md:text-2xl lg:text-3xl font-medium mt-4 mb-5'> {tenQuestions[currentIndex].question}</h1>
                                    <FormControl>
                                        <RadioGroup className='ml-4' name="radio-buttons-group" value={selectedOption} onChange={handleOptionChange}>
                                            {tenQuestions[currentIndex].options.map((option, index) => (
                                                <FormControlLabel key={index} value={option} className='border-2 rounded-md p-1 options-css'
                                                    control={<Radio className='text-white' />}
                                                    label={option} />
                                            ))
                                            }
                                        </RadioGroup>
                                    </FormControl>

                                    {currentIndex < 9 ? //next button or finish button
                                        <div className='text-right'>
                                            <Button variant="contained" className='bg-slate-300 -mr-14 text-black' onClick={nextQue} endIcon={<SkipNextOutlinedIcon />}>Next</Button>
                                        </div> :
                                        <div className='text-right'>
                                            <Button variant="contained" className='bg-slate-300 -mr-14 text-black' onClick={finishQuiz} endIcon={<CheckCircleOutlinedIcon />}>finish</Button>
                                        </div>
                                    }
                                </div>
                            </> : <span className="loader"></span>
                    }
                </div>
            </div >
        </>
    )
}

export default Quiz