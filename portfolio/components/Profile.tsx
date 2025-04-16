"use client";

import React from 'react';
import Image from 'next/image';
import TronAnimation from './TronAnimation';

const Profile: React.FC = () => {
  return (
    <div className="relative">
      <TronAnimation />
      <div className="profile-container">
        <Image
          src="/images/profile.jpg" // Update with your actual profile image path
          alt="Brandon Yee"
          width={200}
          height={200}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Profile;