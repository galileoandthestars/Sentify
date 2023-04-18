import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import {HiOutlineMenu} from 'react-icons/hi';
import {SiMusicbrainz} from 'react-icons/si';
import {HiHeart} from 'react-icons/hi';
import {RiPlayListFill} from 'react-icons/ri';
import {MdRecommend} from 'react-icons/md';
import {FiLogOut} from 'react-icons/fi';
import {MdDashboard} from 'react-icons/md';
import {CgProfile} from 'react-icons/cg';
import { PredictionLayout } from './PredictionLayout';

export const DashBoardLayout = ()=> {
  const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: 'flex', height: '100vh', color: '#000000', fontFamily: 'monospace', border: 'none'}}>
      <Sidebar style={{ height: "100vh", transition:'700', boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.2)'}}>
        <Menu >
          <MenuItem 
            icon={< HiOutlineMenu/>}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center"}}
          >
            {" "}
            
            <h2 style={{marginTop:"10px"}}><SiMusicbrainz style={{marginRight:"5px", marginBottom:'4px'}}/>Sentify</h2>
          </MenuItem>

          <MenuItem icon={<MdDashboard />}>Dashboard</MenuItem>
          <MenuItem icon={<HiHeart />}>Liked Songs</MenuItem>
          <MenuItem icon={<RiPlayListFill/>}>Playlist</MenuItem>
          <MenuItem icon={<MdRecommend />}>Recommendations</MenuItem>
          <MenuItem icon={<CgProfile />}>Profile</MenuItem>
          <MenuItem icon={<FiLogOut />} style={{marginBottom:'-10px'}}>Logout</MenuItem>

        </Menu>
        
      </Sidebar>
      <main>
        <h1 style={{ color: '#000000', marginLeft: "2rem", marginTop: "20px"}}>
          Sentify Dashboard
        </h1>
        <div style={{width: '300px', height: '400px'}}>
        <PredictionLayout/>
        
        </div>
      </main>
    </div>
  );
}