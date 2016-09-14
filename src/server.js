import babelify from 'babelify'
import browserify from 'browserify'
import fs from 'fs'
import path from 'path'
import express from 'express'
import React from 'react'

import { renderDocument, renderAppHtml } from './utils/rendering'

const app = express()
const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on port ${server.address().port}`) // eslint-disable-line no-console
})

app.get('/app.js', (req, res) => {
  browserify(path.join(__dirname, 'client.js'), { debug: true })
    .transform(babelify)
    .bundle()
    .pipe(res)
})

app.get('/graphiql.css', (req, res) => {
  fs.readFile(path.join(__dirname, '../node_modules/graphiql/graphiql.css'), (err, data) => {
    if (err) res.status(500).send('Internal server error')
    else res.type('css').send(data.toString())
  })
})

app.use((req, res) => {
  if (req.query.endpoint) {
    res.send(renderDocument(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/graphiql.css" type="text/css" />
          <style dangerouslySetInnerHTML={{ __html: `
            html, body, #root {
              height: 100%;
              margin: 0;
            }
          ` }}></style>
          <title>GraphiQL</title>
        </head>
        <body>
          <div id="root" />
          <script dangerouslySetInnerHTML={{__html: `window.graphqlEndpoint = '${req.query.endpoint}'`}}></script>
          <script src="/app.js" />
        </body>
      </html>
    ))
  } else {
    res.send(renderDocument(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style dangerouslySetInnerHTML={{ __html: `
            body {
              margin: 50px;
              font-family: Helvetica, Arial, sans-serif;
              font-size: 16px;
            }
            label, input {
              display: block;
              margin-bottom: 10px;
            }
            input {
              width: 400px;
              padding: 5px;
              font-size: 16px;
            }
            button {
              padding: 6px 12px;
              font-size: 16px;
            }
          ` }}></style>
          <title>GraphiQL</title>
        </head>
        <body style={{ margin: 30 }}>
          <h1>GraphiQL</h1>
          <form action="/">
            <label>GraphQL endpoint URL:</label>
            <input type="url" name="endpoint" placeholder="http://example.com/graphql" />
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    ))
  }
})
