import React from 'react'

// a functional statless component, faltaban los {} en los args
const FetchError = ({errorMessage, onRetry}) =>
  <div>
    <span>{errorMessage}</span>
    <button onClick={onRetry}>Retry</button>
  </div>

export default FetchError
