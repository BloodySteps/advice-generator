import React, { useState, useEffect } from 'react'
import './card.css'
import diceDivider from '../../assets/pattern-divider-desktop.svg'
import dice from '../../assets/icon-dice.svg'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { Triangle } from 'react-loader-spinner'

const Card = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [diceRoll, setDiceRoll] = useState(0)

    const fetchAdvice = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('https://api.adviceslip.com/advice')
            const json = await res.json()
            setData(json)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => fetchAdvice(), [diceRoll])
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className={`card ${loading && 'loading_width'}`}>
            {loading || !data ? (
                <div className="card__loading">
                    <Triangle
                        height='50'
                        width='50'
                        color='grey'
                        ariaLabel='loading'
                    />
                </div>
            ) : (
                <>
                    <span className='card__idx'>advice # {data.slip.id}</span>
                    <blockquote className='card__quote'>
                        {data.slip.advice}
                    </blockquote>
                    <img src={diceDivider} alt='dice divider not found' />
                    <div
                        className='card__dice'
                        onClick={() => setDiceRoll(prevRoll => prevRoll + 1)}
                    >
                        <img src={dice} alt='dice not found' />
                    </div>
                </>
            )}
        </div>
    )
}

export default Card
