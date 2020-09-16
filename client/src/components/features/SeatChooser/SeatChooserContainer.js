import { connect } from 'react-redux';
import { getSeats, getRequests, loadSeatsRequest, loadSeats, getUnbookedSeats } from '../../../redux/seatsRedux';
import SeatChooser from './SeatChooser';

const mapStateToProps = (state, props) => ({
  seats: getSeats(state),
  requests: getRequests(state),
  unbookedSeats: getUnbookedSeats(state, props.chosenDay),
});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
  loadSeatsData: seats => dispatch(loadSeats(seats)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SeatChooser);