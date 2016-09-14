import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'
import React from 'react'
import ReactDOM from 'react-dom'

const graphqlFetcher = graphqlParams => fetch(window.graphqlEndpoint, {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(graphqlParams),
}).then(response => response.json())

ReactDOM.render(
  <GraphiQL fetcher={graphqlFetcher} />,
  document.getElementById('root') // eslint-disable-line no-undef
)
