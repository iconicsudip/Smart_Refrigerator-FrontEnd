import React, { useEffect, useState,useRef } from 'react'

export default function Timer(props) {
    const [timerMinute,setTimerMinute] = useState(0)
    const [timerSecond,setTimerSecond] = useState(0)
    let [totalTime, setTotalTime] = useState(null)
    const [alarm,setAlarm] = useState(null);
    const timerInterval = useRef();

    useEffect(()=>{
        if(alarm!==null){
            alarm.play()
            setTimeout(() => {
                alarm.pause();
                setTotalTime(props.time*60)
            }, 10000);
            alert("Recipe timer is completed")
        }
    },[alarm])
    const playAudio = ()=>{
        setAlarm(new Audio("http://soundbible.com/grab.php?id=1252&type=mp3"))
    }
    useEffect(()=>{
        if(totalTime!==null){
            let minutes = Math.floor(totalTime/60)
            let seconds = Math.floor(totalTime%60)
            if(minutes<=0 && seconds<=0){
                playAudio()
                
            }
            setTimerMinute(minutes<=0 ? '00' :minutes < 10 ? '0'+minutes :minutes)
            setTimerSecond(seconds<=0 ? '00' :seconds < 10 ? '0'+seconds :seconds)
        }
    },[totalTime])
    useEffect(()=>{
        let time = props.time * 60
        setTotalTime(time)
    },[props.time])
    const playTimer = ()=>{
        timerInterval.current = setInterval(() => {
            setTotalTime(totalTime -1 )
            totalTime = totalTime -1
        }, 1000);
    }
    const pauseTimer = ()=>{
        clearInterval(timerInterval.current)
    }
    const restartTimer = ()=>{
        clearInterval(timerInterval.current)
        timerInterval.current = null
        setTotalTime(props.time * 60)
        setTimerMinute(0)
        setTimerSecond(0)
        // playTimer()
    }
    return (
        <>
            <div className='timer d-flex gap-2 my-2' id={`timer ${props.id}`}>
                <div class="digit minute">{timerMinute ===0 ? '00' : timerMinute}</div>m
                <div class="seprator mx-2">:</div>
                <div class="digit second">{timerSecond ===0 ? '00' : timerSecond}</div>s
            </div>
            <section id="options">
                <div id={`play ${props.id}`} class="box play" onClick={playTimer}>Play</div>
                <div id={`pause ${props.id}`} class="box pause" onClick={pauseTimer}>Pause</div>
                <div id={`restart ${props.id}`} class="box restart" onClick={restartTimer}>Restart</div>
            </section>
        </>
    )
}
