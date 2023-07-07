import React from 'react'
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import cluelist from '../cluelist.png'

function Header(): JSX.Element {
    const navigate = useNavigate()

    const handleGoPage = (field: string) => {
        if (field === 'git') {
            window.open('https://github.com/dasbeerboot', '_blank')
        } else if (field === 'email') {
            window.open('mailto:juwonchun@gmail.com')
        } else {
            navigate('/')
        }
    }
    return (
        <header className="portfolio-header">
            <div className="header-title">
                <div className="home">
                    <img
                        className="home"
                        src={cluelist}
                        onClick={() => handleGoPage('/')}
                    />
                </div>
                <div className="icons">
                    <FontAwesomeIcon
                        className="git"
                        icon={faGithub}
                        onClick={() => handleGoPage('git')}
                    />
                    <FontAwesomeIcon
                        className="email"
                        icon={faEnvelope}
                        onClick={() => handleGoPage('email')}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header
