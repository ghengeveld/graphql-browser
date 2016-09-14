import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'
import React from 'react'
import ReactDOM from 'react-dom'

function graphQLFetcher(graphQLParams) {
  console.log(window.graphqlEndpoint)
  return fetch(window.graphqlEndpoint, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json())
}

ReactDOM.render(
  <GraphiQL fetcher={graphQLFetcher} />,
  document.getElementById('root') // eslint-disable-line no-undef
)
