// import moment from "moment"; wont work stack trace error
const moment = require.requireActual("moment");

export default (timestamp = 0) => {
	return moment(timestamp);
};
