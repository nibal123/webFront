import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import * as FiIcons from 'react-icons/fi';
import * as CgIcons from 'react-icons/cg';
 const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Underground Pipes',
    path: '/undergroundpipes',
    icon: <GiIcons.GiWarpPipe />,
    cName: 'nav-text'
  },
  {
    title: 'Roads',
    path: '/roads',
    icon: <GiIcons.GiRoad/>,
    cName: 'nav-text'
  },
  {
    title: 'Add Camera',
    path: '/addcamera',
    icon:   <IoIcons.IoMdAddCircle/>,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <CgIcons.CgProfile/>,
    cName: 'nav-text'
  },
  {
    title: 'Log Out',
    path: '/login',
    icon: <FiIcons.FiLogOut/>,
    cName: 'nav-text'
  },

];
export default SidebarData;