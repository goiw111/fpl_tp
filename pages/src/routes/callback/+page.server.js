import { CLIENT_SECRET } from '$env/static/private'

const target  = 'https://oauth2.googleapis.com/token'

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

  console.log(data.toString())

  const body = 'code=4/0AWtgzh7LoB1RfMb1ZV7aH6nRBzAyGyCln5rptuoVGRFFTaIJpf3IHIdB-afs58TkLzNt6A&client_id=1057658084984-oku26m2qmlrhbifmq6t2ocbd2cgda3ll.apps.googleusercontent.com&client_secret=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&grant_type=authorization_code&redirect_uri=https://fpl-tp.pages.dev/callback';
  const response = await fetch(target,{
    method: "POST",
    Headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
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
