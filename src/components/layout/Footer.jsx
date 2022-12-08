import React from 'react'

const footerYear = new Date().getFullYear

function Footer() {
  return (
    <footer className='footer p-10 text-primary-content footer-center bg-neutral'>
        <div>
            <p className='text-white'>Copyright &copy; {footerYear} All Rights Reserved.</p>
        </div>
    </footer>
  )
}

export default Footer
