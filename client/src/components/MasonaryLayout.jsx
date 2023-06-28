import React from 'react';
import Masonry from 'react-masonry-css';
import { Feed } from '../components';

const breakPointsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
}

const MasonaryLayout = ({ feeds }) => {
    return (
        <Masonry className='flex' breakpointCols={breakPointsObj}>
            {feeds?.map((feed, i) => (
                <Feed key={i} data={feed} />
            ))}
        </Masonry>
    );
};

export default MasonaryLayout;
