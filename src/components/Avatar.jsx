import React from "react";

const Avatar = ({ name, online }) => {
    const firstLetter = name ? name[0].toUpperCase() : '?';
  const generateBackgroundColor = (userId) => {
    const hash = userId
      .split('')
      .map((char) => char.charCodeAt(0))
      .reduce((acc, val) => acc + val, 0);
    const hue = hash % 360; 
    return `hsl(${hue}, 70%, 50%)`; 
  };
    console.log(online);
    const avatarStyle = {
        float: "right",
      backgroundColor: generateBackgroundColor(name),
      color: '#fff',
      width: '25px',
      height: '25px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '10px',
      position: 'relative', 
    };
  
    const badgeStyle = {
      position: 'absolute',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: online ? '#FBC02D' : '#ccc', 
      bottom: '-1px',
      right: '0px',
      border: '1px solid #fff',
    };
  
    return (
      <div style={avatarStyle}>
        <div style={badgeStyle} />
        {firstLetter}
      </div>
    );
  };

export default Avatar;