import { CLIENT_SECRET } from '$env/static/private'

const target  = 'https://www.googleapis.com/oauth2/v4/token'

export async function load({ url ,fetch ,platform }) {
  const code          = url.searchParams.get('code')
  const client_id     = '1057658084984-oku26m2qmlrhbifmq6t2ocbd2cgda3ll.apps.googleusercontent.com'
  const client_secret = CLIENT_SECRET
  const grant_type    = 'authorization_code'
  const redirect_uri  = import.meta.env.VITE_REDIRECT_URL 

  const data = new URLSearchParams({
    code,
    client_id,
    client_secret,
    grant_type,
    redirect_uri,
  })

  const _url = new URL(target)
  for (const [key, value] of data.entries()) {
    _url.searchParams.set(key, value)
  }

  console.log(_url)

  const response = await fetch(_url,{
    method: "POST",
    Headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(r => r.json())

  console.log(response)

  const info = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${response.access_token}`,
      'Content-Type': 'application/json'
    },
  }).then(r => r.json())

  console.log(info)

  await platform.env.SESSION.put(info.id,JSON.stringify(info))
  const session = await platform.env.SESSION.get(info.id)

  console.log(session)

  return {
    
  };
}
