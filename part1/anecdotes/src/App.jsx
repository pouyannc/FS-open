import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0);

  const handleNextClick = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length);
    while(randomIndex === selected) {
      randomIndex = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(randomIndex);
  }

  const handleVoteClick = () => {
    const pointsCopy = [...points];
    pointsCopy[selected]++;
    if (pointsCopy[selected] > pointsCopy[mostVoted]) setMostVoted(selected);
    setPoints(pointsCopy);
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <span>
        <Button text="vote" handleClick={handleVoteClick} />
        <Button text="next anecdote" handleClick={handleNextClick} />
      </span>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVoted]}</div>
      <div>has {points[mostVoted]} votes</div>
    </>
  )
}

export default App
