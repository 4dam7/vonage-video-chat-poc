import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  
  return <div style={{height: '92vh'}}><Component {...pageProps} /></div>
}

export default MyApp
