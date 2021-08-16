import React from 'react';
import Item from "./Item";
import Carousel from 'react-elastic-carousel';

export default function Carosello() {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1 },
        { width: 768, itemsToShow: 2, itemsToScroll: 2 },
        { width: 1200, itemsToShow: 3, itemsToScroll: 3 }
    ];

    return (
        <Carousel breakPoints={breakPoints}>
            <Item onClick={() => window.open('https://www.amazon.it/ref=nav_logo', '_blank').focus()}><img src='https://www.italiamac.it/wp-content/uploads/2018/09/italiamac-mojave-night.jpg' /></Item>
            <Item><img src='https://i.pinimg.com/736x/47/2b/b7/472bb77fe6637ee9f03fa2deb0c73f59.jpg' /></Item>
            <Item><img src='https://www.checcobai.com/wp-content/uploads/2020/03/OS-X-10-11-768x480.jpg' /></Item>
            <Item>4</Item>
            <Item>5</Item>
            <Item>6</Item>
            <Item>7</Item>
            <Item>8</Item>
        </Carousel>
    );
}