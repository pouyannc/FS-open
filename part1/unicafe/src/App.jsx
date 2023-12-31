import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Stat = ({ rating, count }) => {
  return (
    <tr>
      <td>{rating}</td>
      <td>{count}</td>
    </tr>
    
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  return (
    <>
      <h1>Statistics</h1>
      {all > 0 
        ? <table>
            <tbody>
              <Stat rating="good" count={good} />
              <Stat rating="neutral" count={neutral} />
              <Stat rating="bad" count={bad} />
              <Stat rating="all" count={all} />
              <Stat rating="average" count={(good - bad) / all} />
              <Stat rating="positive" count={good / all * 100 + "%"} />
            </tbody>
          </table>
        : <div>No feedback given</div>}
    </>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (setRating, rating) => {
    setRating(rating + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <span>
        <Button handleClick={() => handleClick(setGood, good)} text="good" />
        <Button handleClick={() => handleClick(setNeutral, neutral)} text="neutral" />
        <Button handleClick={() => handleClick(setBad, bad)} text="bad" />
      </span>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
