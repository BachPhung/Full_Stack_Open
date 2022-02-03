import React, { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td><td>{value} {text === 'positive' ? '%' : ''}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={Math.round((good - bad) / all * 100) / 100} />
        <StatisticLine text='positive' value={Math.round((good) / all * 10000) / 100} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  return (
    <div>
      <h1>give feedback</h1>
      <div className='btn-container' style={{ display: "flex" }}>
        <Button text='good' handleClick={handleGood} />
        <Button text='neutral' handleClick={handleNeutral} />
        <Button text='bad' handleClick={handleBad} />
      </div>
      <h1>statistics</h1>
      {all === 0 ? <div>No feedback given</div> : <Statistics good={good} neutral={neutral} bad={bad} all={all} />}
    </div>
  )
}

export default App