import React from 'react';
import {AiOutlineHeart,AiOutlineCloudDownload,AiOutlineSetting,AiOutlineLike} from 'react-icons/ai';
import {MdOutlineBrowseGallery} from 'react-icons/md';
import {BsBrowserEdge} from 'react-icons/bs';
import {TbLogout} from 'react-icons/tb';

function TopNavigation(){
    return <>
    <h2>EduElimu</h2>
    <ul className='Main'>
        <li><BsBrowserEdge/><a href=''>Browse</a></li>
        <li> <AiOutlineHeart/> <a href=''>WatchList</a></li>
        <li> <MdOutlineBrowseGallery/> <a href=''>Coming Soon</a>   </li>
    </ul>
    <ul className='Social'>
        <li><AiOutlineCloudDownload/><a href=''>Downloads</a> </li>
        <li><AiOutlineLike/><a href=''>Liked Videos</a> </li>
    </ul>
    <ul className='General'>
        <li><AiOutlineSetting/><a href=''>Settings</a> </li>
        <li><TbLogout/><a href=''>Logout</a> </li>
    </ul>
    </>
}
export default TopNavigation;