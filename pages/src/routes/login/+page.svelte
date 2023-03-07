<script>
	import {onDestroy} from 'svelte'
  
  const target      = 'https://accounts.google.com/o/oauth2/v2/auth'
  const client_id   = '?client_id=1057658084984-oku26m2qmlrhbifmq6t2ocbd2cgda3ll.apps.googleusercontent.com'
  const scopes      = [
      'https://www.googleapis.com/auth/spreadsheets.readonly',
      'https://www.googleapis.com/auth/userinfo.profile'
  ]
  const scope       = '&scope=' + scopes.join(' ')
  const redirect    = '&redirect_uri=' + import.meta.env.REDIRECT_URL
  const access      = '&access_type=offline'
  const include     = '&include_granted_scopes=true'
  const rest        = '&response_type=code&state=1111'
  
  const url = target + client_id + scope + redirect + access + include + rest
  console.log(url)

  var win

  const destroy = () => {
    if (win) {
				win.close()
			}
  }

  onDestroy(destroy)

  const popup = () => {
    destroy()
    win = window.open(url,
    '',
    'width=390,height=470,resizable,scrollbars=yes,status=1')
  }
</script>

<div>
  <button on:click={popup}>
    google login
  </button>
</div>
