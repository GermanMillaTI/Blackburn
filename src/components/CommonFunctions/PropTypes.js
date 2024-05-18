import PropTypes from 'prop-types';

const alltypes = {
    ParticipantComponent: {
        participants: PropTypes.objectOf(
            PropTypes.shape({
                availability: PropTypes.string,
                country: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                dob: PropTypes.string.isRequired,
                docs: PropTypes.object.isRequired,
                email: PropTypes.string.isRequired,
                ethnicities: PropTypes.string.isRequired,
                facialHair: PropTypes.number.isRequired, //pending
                firstName: PropTypes.string.isRequired,
                gender: PropTypes.number.isRequired,
                hairColor: PropTypes.number.isRequired, //pending
                hairLength: PropTypes.number.isRequired,
                hairType: PropTypes.number.isRequired,
                healthConditions: PropTypes.array.isRequired, //pending
                heightFt: PropTypes.number.isRequired,
                heightIn: PropTypes.number.isRequired,
                industry: PropTypes.number.isRequired,
                interestedInRecruiting: PropTypes.bool,
                lastName: PropTypes.string.isRequired,
                otherCompanies: PropTypes.string.isRequired, //pending
                phone: PropTypes.string.isRequired,
                registeredAs: PropTypes.number.isRequired,
                residenceCity: PropTypes.string.isRequired,
                residenceState: PropTypes.number.isRequired,
            })).isRequired,
        setShownParticipants: PropTypes.func.isRequired
    }

};

export default alltypes;