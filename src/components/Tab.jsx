import React from 'react';

const Tab = ({ label, active, onClick }) => {
    return (
        <button 
            className={`p-2 font-bold text-3xl text-white ${active ? 'text-opacity-100' : 'text-opacity-50'}`} 
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Tab;
