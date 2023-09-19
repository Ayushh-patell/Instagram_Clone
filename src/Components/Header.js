import React from 'react'

function Header(props) {
  return (
    <nav className='main_nav'>
        <div className="nav-items">
            <div className="nav-item"></div>
            <div className="nav-item"><img onClick={props.handleLogout} className='logo' src="/image/logo.png" alt="Instagram Logo | by alicia_mb on Freepik"/></div>
            <div className="nav-item">
                <div className="icon-box">
                <ion-icon name="heart-outline"></ion-icon>
                <div className='chat_icon' onClick={props.chat_toggle}><ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                <div className="badge">9</div></div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Header
