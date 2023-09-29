import React, { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import axios from "axios";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UsersProfile.css";
import { getDeviceType, getBrowserName, getOsName } from './UserDetails'
import SimpleMap from './SimpleMap'

const UserProfile = ({ slideIn, handleSlideIn }) => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);

  const deviceName = getDeviceType();

  const browserName = getBrowserName();

  const osName = getOsName();

  const [ipAddress, setIpAddress] = useState('');


  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIpAddress(response.data.ip);
        localStorage.setItem("ip" , ipAddress)
      } catch (error) {
        console.error('Error fetching IP address:', error);
        setIpAddress('Error fetching IP');
        localStorage.setItem("ip" , "Error Occured")
      }
    };

    fetchIpAddress();
  }, []);

  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?.result._id === id && (
              <button
                type="button"
                onClick={() => setSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
          <div>
            <div className='home-container-info-1'>
            <div className="home-container-info-2">
              <div className="home-container-info-item">
                <h3 className='item-1'>Device Name</h3>
                <p className='item-output-1'>{deviceName}</p>
              </div>

              <div className="home-container-info-item">
                <h3 className='item-2'>Browser Name</h3>
                <p className='item-output-2'>{browserName}</p>
              </div>

              <div className="home-container-info-item">
                <h3 className='item-3'>OS Used</h3>
                <p className='item-output-3'>{osName}</p>
              </div>

              <div className="home-container-info-item">
                <h3 className='item-4'>IP Address</h3>
                <button className='item-output-4'>{ipAddress}</button>

              </div>

            </div>

            <div className="mapscontainer">
              <SimpleMap />
            </div>
          </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
