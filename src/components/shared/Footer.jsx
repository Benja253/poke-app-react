import './styles/Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <h3 className='footer__msg'>Creador por Benjamin Flores</h3>
      <a href="https://www.linkedin.com/in/benjamin-flores-48541182/" target='_blank' className='footer__p'>
        <i className='bx bxl-linkedin footer__linkedin' ></i>
        <span className='footer__user'>@Benjamin Flores</span>
      </a>
    </footer>
  )
}

export default Footer