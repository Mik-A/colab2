import querystring from 'querystring'
import axios from 'axios'

export async function handler(event, context) {
  try {
    const params = querystring.parse(event.body)
    const name = params.name || 'World'
    console.log('params', params)
    const response = await axios.get('https://icanhazdadjoke.com', {
      headers: { Accept: 'application/json' }
    })
    const data = response.data
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data, name, body: event })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
