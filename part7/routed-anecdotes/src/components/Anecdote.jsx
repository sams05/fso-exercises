const Anecdote = ({ anecdote: { content, author, info, votes } }) => {
  return (
    <div>
      <h2>
        {content} by {author}
      </h2>
      <p>has {votes} votes</p>
      <p>
        for more info see <a href={info}>{info}</a>
      </p>
    </div>
  )
}

export default Anecdote
