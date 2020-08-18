import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ViewPricingModal from './ViewPricingModal';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarVisible: false,
            date: new Date(),
            currentCamapignRow: null,
            currentCamapignName: '',
            showModal: false,
            modalContent: null
        }
    }

    handleCalendarClick = (event) => {
        let calendarPositionTop = window.scrollY + event.target.getBoundingClientRect().top + event.target.offsetHeight, currentElement = event.target.parentElement, currentCampaignRow = null, currentCampaignName = '';
        while(!currentElement.classList.contains('campaign-row')) {
            currentElement = currentElement.parentElement;
        }
        currentCampaignRow = currentElement;
        currentCampaignName = currentCampaignRow.querySelectorAll('.campaign-info p')[0].innerHTML;
        this.setState({
            calendarVisible: !this.state.calendarVisible,
            currentCampaignRow,
            currentCampaignName
        }, () => {
            if(document.getElementsByClassName('react-calendar').length !== 0) {
                document.getElementsByClassName('react-calendar')[0].style.top = calendarPositionTop + 'px';
            }
        });
    }

    onCalendarValueChange = (value) => {
        this.setState({
            calendarVisible: false
        });
        let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        currentCampaignGroup = '', shiftedToCampaignGroup = '', updatedDate = new Date(value), currentDate = new Date(), currentCampaignName = this.state.currentCampaignName, currentCampaignRow = this.state.currentCampaignRow,
        currentCampaignYear = currentCampaignRow.querySelectorAll('.campaign-date p span')[1].innerHTML,
        currentCampaignMonth = monthNames.indexOf(currentCampaignRow.querySelectorAll('.campaign-date p span')[0].innerHTML) + 1,
        currentCampaignDay = currentCampaignRow.querySelectorAll('.campaign-date p span')[2].innerHTML,
        currentCampaignDate = new Date(`${currentCampaignYear}/${currentCampaignMonth}/${currentCampaignDay}`);

        currentCampaignGroup = this.getCampaign(currentCampaignDate, currentDate);
        shiftedToCampaignGroup = this.getCampaign(updatedDate, currentDate);

        let updatedDataObject = { currentCampaignGroup, currentCampaignName, updatedDate: updatedDate.getTime(), shiftedToCampaignGroup };
        if(currentCampaignDate.getTime() !== updatedDate.getTime()) {
            this.props.updateCampaignsData(updatedDataObject);
        }
    }

    getCampaign = (date, currentDate) => {
        let campaignGroup = '';
        if(date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate()) {
            campaignGroup = 'liveCampaigns';
        } else if(date < currentDate) {
            campaignGroup = 'pastCampaigns';
        } else {
            campaignGroup = 'upcomingCampaigns';
        }
        return campaignGroup;
    }

    handleModalClick = (event, item) => {
        this.setState({
            showModal: true,
            modalContent: item
        });
    }

    handleCloseBtnClick = () => {
        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <div>
                <table className="manage-campaigns-data">
                    <thead>
                        <tr>
                            <th className="campaign-date">{this.props.language.date}</th>
                            <th className="campaign-detail">{this.props.language.campaign}</th>
                            <th className="view-campaign-pricing">{this.props.language.view}</th>
                            <th className="campaign-actions">{this.props.language.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.campaignsData.map(item => {
                                const currentDate = new Date(), campaignDate = new Date(item.createdOn),
                                monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; let gapDays = '', campaignDateString = '';
                                if(campaignDate.getFullYear() === currentDate.getFullYear() && campaignDate.getMonth() === currentDate.getMonth() && campaignDate.getDate() === currentDate.getDate()) {
                                    campaignDateString = 'Present Day';
                                } else if(campaignDate < currentDate) {
                                    gapDays = (currentDate.getTime() - campaignDate.getTime())/(24 * 60 * 60 * 1000);
                                    gapDays = Math.round(gapDays);
                                    campaignDateString = `${gapDays} ${this.props.language.daysAgo}`;
                                } else {
                                    gapDays = (campaignDate.getTime() - currentDate.getTime())/(24 * 60 * 60 * 1000);
                                    gapDays = Math.round(gapDays);
                                    campaignDateString = `${gapDays} ${this.props.language.daysAhead}`;
                                }
                                return (
                                    <tr key={item.name} className="campaign-row">
                                        <td className="campaign-date">
                                            <p><span>{monthNames[campaignDate.getMonth()]}</span> <span>{campaignDate.getFullYear()}</span>, <span>{campaignDate.getDate()}</span></p>
                                            <p>{campaignDateString}</p>
                                        </td>
                                        <td className="campaign-detail">
                                            <div className="campaign-image"><i style={{backgroundImage: `url(${item.image_url})`}}></i></div>
                                            <div className="campaign-info">
                                                <p>{item.name}</p>
                                                <p>{item.region}</p>
                                            </div>
                                        </td>
                                        <td className="view-campaign-pricing">
                                            <div className="view-pricing" onClick={(event) => this.handleModalClick(event, item)}><span className="view-pricing-icon"><i></i></span><span className="view-pricing-text">{this.props.language.viewPricing}</span></div>
                                        </td>
                                        <td className="campaign-actions">
                                            <div className="csv"><a href={item.csv}><i></i>CSV</a></div>
                                            <div className="report"><a href={item.report}><i></i>{this.props.language.report}</a></div>
                                            <div className="schedule-again" onClick={this.handleCalendarClick}><i></i>{this.props.language.scheduleAgain}</div>
                                        </td>
                                    </tr>
                                )                        
                            })
                        }
                    </tbody>
                </table>
                {
                    this.state.calendarVisible ?
                    <Calendar
                        onChange={this.onCalendarValueChange}
                        value={this.state.date} 
                    /> : null
                }

                {   this.state.showModal ?
                    <ViewPricingModal 
                        modalContent={this.state.modalContent}
                        language={this.props.language}
                        handleCloseBtnClick={this.handleCloseBtnClick} 
                    /> : null
                }
            </div>
        );
    }
}

export default Dashboard;