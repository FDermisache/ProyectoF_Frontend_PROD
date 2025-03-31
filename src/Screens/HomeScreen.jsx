import React from 'react'
import { Link } from 'react-router-dom'

import '../Styles/stylesWorkspaces.css'
const HomeScreen = () => {
  return (
    <div className='ContenedorPadre1'>
          {/* Botón para abrir el formulario */}
          <header className='header'>
            <div className='ContenedorImagenSlack'>
              <img
                className='imgSlack'
                src="../public/logoSlack.png"
                alt="Imagen Slack"
              />
            </div>
            <div className='ContenedorNav'>
              <nav>
                <span className='NavBar'>Funciones <i className="bi bi-chevron-compact-down"></i></span>
                <span className='NavBar'>Soluciones <i className="bi bi-chevron-compact-down"></i></span>
                <span className='NavBar'>Empresa</span>
                <span className='NavBar'>Recursos <i className="bi bi-chevron-compact-down"></i></span>
                <span className='NavBar'>Precios</span>
              </nav>
            </div>
            <div className='ContenedorBotonIniciar'>
              <Link to={'/login'}><button className='botonIniciar'>Iniciar Sesion</button></Link>
            </div>
            <div className='ContenedorBotonRegistrarse'>
              <Link to={'/register'}><button className='botonRegistrarse'>Registrarse</button></Link>
            </div>
          </header>
          <div className='contenedorHome'>
            
            <div className='contenedorVideoTrabajo'>
            <video width="800" autoPlay loop muted>
              <source src="https://a.slack-edge.com/d43efea/marketing/img/homepage/revamped-24/headline/hp-headline.es-ES@2x.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
            </div>
            <div className='contenedorBotonComenezar'>
            <button className='botonIniciar'>Comenzar</button>
            <button className='botonNew'>Encontra tu Plan</button>
            </div>
            <div className='contenedorTexto_gratuita'>
              <span className='spanTexto_gratuita'><span className='negrita'>Slack puede probarse de forma gratuita</span> durante el tiempo que quieras.</span>
            </div>
            <div className='Logos'>
              <ul className='ulLogos'>
              <li className='spanLogo'><img  className='imgLogo' src="https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-airbnb-small@2x.png" alt="" /></li>
              <li className='spanLogo'><img  className='imgLogo' src="https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-nasa-small@2x.png" alt="" /></li>
              <li className='spanLogo'><img  className='imgLogo' src="https://a.slack-edge.com/9df734f/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-uber-small@2x.png" alt="" /></li>
              <li className='spanLogo'><img  className='imgLogo' src="https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-target-small@2x.png" alt="" /></li>
              <li className='spanLogo'><img  className='imgLogo1' src="https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-nyt-small@2x.png" alt="" /></li>
              <li className='spanLogo'><img  className='imgLogo' src="https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-etsy-small@2x.png" alt="" /></li>

              </ul>
            </div>
            <div>
            <video width="900" autoPlay loop muted>
              <source src="https://a.slack-edge.com/0cedc3b/marketing/img/homepage/true-prospects/hero-revamp/animation/hero@2x.es-ES.webm" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
            </div>
          </div>
        </div>
  )
}

export default HomeScreen