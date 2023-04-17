import React, { ReactNode } from 'react';
import './CommonHeading.scss';

const CommonHeading = ({ heading, centered }: { heading?: string | ReactNode, centered?: boolean }) => {
    return (
        <div className={`common_heading ${centered ? 'text-center' : ''}`}>
            <h2>{heading}</h2>
        </div>
    )
}

export default CommonHeading;