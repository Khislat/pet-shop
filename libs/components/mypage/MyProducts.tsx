

import React, { useState } from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MyProduct = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const properties = [
    {
      image: '/property.jpg',
      title: 'Dream Villa',
      location: 'Seoul Trading Center',
      price: '$150,000',
      date: '18 May, 2024',
      status: 'ACTIVE',
      view: 2,
    },
  ];

  return (
    <div className={"tabsContainer"}>
      <Tabs value={activeTab} onChange={handleChange} className={"tabHeader"}>
        <Tab className={`${"tab"} ${activeTab === 0 ? "active" : ''}`} label="On Sale" />
        <Tab className={`${"tab"} ${activeTab === 1 ? "active" : ''}`} label="On Sold" />
      </Tabs>

      <Box className={"propertyTable"}>
        <div className={"header"}>
          <div>Listing title</div>
          <div>Date Published</div>
          <div>Status</div>
          <div>View</div>
          <div>Action</div>
        </div>

        {activeTab === 0 && properties.map((item, index) => (
          <div className={"item"} key={index}>
            <div className={"image"}>
              <Image src={item.image} alt={item.title} width={70} height={70} />
            </div>
            <div className={"titleSection"}>
              <div>{item.title}</div>
              <div className={"subtitle"}>{item.location}</div>
              <div className={"price"}>{item.price}</div>
            </div>
            <div className={"date"}>{item.date}</div>
            <div className={"status"}>{item.status}</div>
            <div className={"view"}>{item.view}</div>
            <div className={"actions"}>
              <Button><EditIcon /></Button>
              <Button><DeleteIcon /></Button>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className={"pagination"}>
          <span className={"arrow"}>&lt;</span>
          <span className={"page"}>0 property available</span>
          <span className={"arrow"}>&gt;</span>
        </div>
      </Box>
    </div>
  );
};

export default MyProduct;
