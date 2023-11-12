import React from 'react'
import Trash from '../../assets/Trashbanner2.jpg'
import './donate.css'

const donate = () => {
  return (
    <section>
      <img className='trash_banner' src={Trash} alt="Trash Banner" />
      <button className='donate_button'>Donate</button>
      <div className='donate_text'>
        <p>
          <span className="brand-name">Green to Clean</span> is a non-profit organization dedicated to improving the environment by providing sustainable waste management solutions. We are committed to creating a cleaner, greener future for generations to come. Your generous donation will help us continue our mission to revolutionize the way we approach waste.
        </p>
        <p>
          <span className="brand-name">Green to Clean</span> is a registered 501(c)(3) non-profit organization. All donations are tax-deductible.
        </p>
    </div>
    </section>
  )
}

export default donate