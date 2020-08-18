import { connect } from 'react-redux';
import { setCampaignsData } from '../actions';
import ManageCampaigns from '../components/ManageCampaigns';

const mapStateToProps = state => ({
    manageCampaigns: state.manageCampaigns
});

const mapDispatchToProps = dispatch => ({
    setCampaignsData: (sortedCampaignsData) => dispatch(setCampaignsData(sortedCampaignsData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageCampaigns);
