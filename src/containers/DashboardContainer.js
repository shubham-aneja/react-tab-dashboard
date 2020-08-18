import { connect } from 'react-redux';
import { updateCampaignsData } from '../actions';
import Dashboard from '../components/Dashboard';

const mapDispatchToProps = (dispatch) => ({
    updateCampaignsData: (updatedDataObject) => dispatch(updateCampaignsData(updatedDataObject))
});

export default connect(null, mapDispatchToProps)(Dashboard);