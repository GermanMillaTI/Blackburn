import './index.css';
import telus from '../../telus.png';

export default ({ participantInfo }) => {
    return <div id="header">
        <img id="telusLogo" src={telus} />
        <div id="topHeader">Blackburn - Onsite Study</div>
        <div id="subHeader">Participant: {participantInfo['firstName']} {participantInfo['lastName'].toString().substring(0, 1)}.</div>
        <div id='attention'>Attention: due to our tight schedule, please book a session only when fully available</div>
    </div>
}