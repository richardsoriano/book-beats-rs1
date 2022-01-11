import './globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className='container mx-auto'>
      <header>headsd</header>
      <Component {...pageProps} />
      <footer>foot</footer>
    </div>
  )
}
