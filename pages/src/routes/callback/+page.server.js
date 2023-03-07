import { CLIENT_SECRET } from '$env/static/private'
import { VITE_REDIRECT_URL } from '$env/static/private'


const target  = 'https://oauth2.googleapis.com/token'

export async function load({ url ,fetch ,platform }) {
  const code          = url.searchParams.get('code')
  const client_id     = '1057658084984-oku26m2qmlrhbifmq6t2ocbd2cgda3ll.apps.googleusercontent.com'
  const client_secret = CLIENT_SECRET
  const grant_type    = 'authorization_code'
  const redirect_uri  = VITE_REDIRECT_URL  
  const body = new URLSearchParams({
    code,
    client_id,
    client_secret,
    grant_type,
    redirect_uri,
  })

  const response = await fetch(target,{
    method: "POST",
    Headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  }).then(r => r.json())

  const info = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${response.access_token}`,
      'Content-Type': 'application/json'
    },
  }).then(r => r.json())

  await platform.env.SESSION.put(info.id,JSON.stringify(info))
  const session = await platform.env.SESSION.get(info.id)

  console.log(session)

  return {
    
  };
}
