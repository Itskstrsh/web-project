import React from 'react';

interface PlusIconProps {
    color?: string;
    size?: number;
}

const PlusIcon: React.FC<PlusIconProps> = ({ color = '#222222', size = 24 }) => {
    return (
        <svg
            role="presentation"
            focusable="false"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <g stroke="none" strokeWidth="1px" fill="none" fillRule="evenodd" strokeLinecap="square">
                <g transform="translate(1.000000, 1.000000)" stroke={color}>
                    <path d="M0,11 L22,11"></path>
                    <path d="M11,0 L11,22"></path>
                </g>
            </g>
        </svg>
    );
};

export default PlusIcon;