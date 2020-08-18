import React from 'react';

const SubHeader = ({ manageCampaigns, handleLanguageChange, isEnglish }) => (
    <div className="manage-campaigns-wrapper">
        <h1 className="manage-campaigns-heading">{manageCampaigns}</h1>
        <div className="change-language-container">
            <button type="button" className="change-language-btn" onClick={handleLanguageChange}>Change Language To {isEnglish ? 'German' : 'English'}</button>
        </div>
    </div>
);

export default SubHeader;