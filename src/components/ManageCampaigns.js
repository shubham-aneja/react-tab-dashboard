import React, { Component } from 'react';
import campaignsData from '../json/campaigns-data.json';
import Header from './Header';
import SubHeader from './SubHeader';
import NavigationBar from './NavigationBar';
import DashboardContainer from '../containers/DashboardContainer';
import { englishLanguage, germanLanguage } from '../constants/constants';

class ManageCampaigns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaignFilterType: 'allCampaigns',
            isEnglish: true
        }
    }

    componentDidMount() {
        const sortedCampaignsData = this.transformData(campaignsData);
        this.props.setCampaignsData(sortedCampaignsData);
    }

    transformData = campaignsDataInner => {
        const sortedData = {
            allCampaigns: campaignsDataInner.data,
            upcomingCampaigns: [],
            liveCampaigns: [],
            pastCampaigns: []
        };
        campaignsDataInner.data.forEach(item => {
            const currentDateString = new Date(), currentDate = new Date().getDate(), currentDateMonth = new Date().getMonth(), currentDateYear = new Date().getFullYear(), campaignDateString = new Date(item.createdOn), campaignDate = new Date(item.createdOn).getDate(), campaignDateMonth = new Date(item.createdOn).getMonth(), campaignDateYear = new Date(item.createdOn).getFullYear();
            if (campaignDateYear === currentDateYear && campaignDateMonth === currentDateMonth && campaignDate === currentDate) {
                sortedData.liveCampaigns.push(item);
            } else if (campaignDateString < currentDateString) {
                sortedData.pastCampaigns.push(item);
            } else {
                sortedData.upcomingCampaigns.push(item);
            }
        });
        return sortedData;
    }

    handleNavClick = (event, pathname) => {
        const totalNavs = document.getElementsByClassName('navigation-tab').length;
        for (let count = 0; count < totalNavs; count++) {
            document.getElementsByClassName('navigation-tab')[count].classList.remove('active');
        }
        event.target.parentElement.classList.add('active');
        const campaignFilterType = pathname.slice(0, 1).toLowerCase() + pathname.slice(1);
        this.setState({ campaignFilterType });
    }

    handleLanguageChange = () => {
        this.setState({ isEnglish: !this.state.isEnglish });
    }

    render() {
        const campaignData = this.props.manageCampaigns[this.state.campaignFilterType];
        const language = this.state.isEnglish ? englishLanguage : germanLanguage;
        return (
            <div>
                <Header headerText={language.playBigger} />
                <SubHeader manageCampaigns={language.manageCampaigns} handleLanguageChange={this.handleLanguageChange} isEnglish={this.state.isEnglish} />
                <NavigationBar navLinks={[language.upcomingCampaigns, language.liveCampaigns, language.pastCampaigns]} handleNavClick={this.handleNavClick} />
                <DashboardContainer campaignsData={campaignData} campaignFilterType={this.state.campaignFilterType} language={language} />
            </div>
        );
    }
}

export default ManageCampaigns;