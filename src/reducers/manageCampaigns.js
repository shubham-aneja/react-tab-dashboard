const initialState = {
    allCampaigns: [],
    upcomingCampaigns: [],
    liveCampaigns: [],
    pastCampaigns: []
};

const manageCampaigns = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CAMPAIGNS_DATA':
            return {
                ...state,
                allCampaigns: action.payload.allCampaigns,
                upcomingCampaigns: action.payload.upcomingCampaigns,
                liveCampaigns: action.payload.liveCampaigns,
                pastCampaigns: action.payload.pastCampaigns
            };
        case 'UPDATE_CAMPAIGNS_DATA':
            const nextState = Object.assign({}, state),
            overallUpdatedObject = nextState['allCampaigns'].find(item => item.name === action.payload.currentCampaignName),
            sourceUpdatedObject = nextState[action.payload.currentCampaignGroup].find(item => item.name === action.payload.currentCampaignName);
            overallUpdatedObject.createdOn = action.payload.updatedDate;
            sourceUpdatedObject.createdOn = action.payload.updatedDate;
            nextState[action.payload.currentCampaignGroup] = nextState[action.payload.currentCampaignGroup].filter(item => item.name !== action.payload.currentCampaignName);
            nextState[action.payload.shiftedToCampaignGroup].push(sourceUpdatedObject);
            return nextState;
        default:
            return state;
    }
};

export default manageCampaigns;