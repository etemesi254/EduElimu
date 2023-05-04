import React from 'react';
import {BiMessageRoundedDots,BiBell} from 'react-icons/bi';
import './top_navigation.css';

function TopNavigation(){
    return <div className='top-nav'>
        <div>
            <input id='search'
                type="text"
                placeholder="&#x1F50D; Search..."
            />
        </div>
        <div id='right'>
            <BiBell className='top-icons'/>
            <BiMessageRoundedDots  className='top-icons'/>

            <div className='profile-container'>
                <div className='img'>
                    <img src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg" alt='name' />
                </div>
                <div className='profile-info'>
                    <h5>Venessa N.</h5>
                    <p>Nairobi,Kenya</p>
                </div>
            </div>
        </div>
    </div>
}
export default TopNavigation;