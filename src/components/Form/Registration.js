import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { surveyLocalization } from "survey-core";
import { inputmask } from "surveyjs-widgets";
import * as SurveyCore from "survey-core";
import { useNavigate, useParams } from 'react-router-dom';
import { surveyJson } from './questions/RegistrationQuestions';
import 'survey-core/defaultV2.min.css'
import { themeObj } from '../themes/registrationTheme';
import telus from '../telus.png';
import { useEffect, useState, useCallback } from 'react';
import { realtimeDb, onValue, ref, get, updateValue } from '../../firebase/config';
import { runTransaction } from 'firebase/database';

const localeSettings = {
    completeText: "Submit",
    requiredError: "This item is required",
    loadingFile: "Loading...",
    chooseFileCaption: "Select a file",
    pageNextText: "Next"

}

inputmask(SurveyCore);
surveyLocalization.locales["en"] = localeSettings;

const survey = new Model(surveyJson);
survey.applyTheme(themeObj);


survey.onCompleting.add(function (sender, options) {
    options.allow = false;

    let senderObj = {};

    Object.keys(sender.data).forEach(element => {

        if (!["signature", "signatureFirstName", "signatureLastName", "termsAgreement", "futureProjectsInterest", "identificationFile", "agreementConfirmation"].includes(element)) {
            senderObj[element] = sender.data[element];
        }

    })

    const dbref = ref(realtimeDb, "/nextParticipantId");
    runTransaction(dbref, (currentValue) => {

        let pptId = currentValue + 1;
        const firebasePath = `/participants/${pptId}/`;

        updateValue(firebasePath, senderObj);

        return pptId;


    })

    console.log(senderObj);


})

function Registration() {
    const [showtymsg, setShowtymsg] = useState(false);

    return (
        <div>
            <div id='loading'></div>
            {showtymsg && <div id="ThankyouPage">
                <img className="telus-logo" src={telus} style={{ width: "20%", maxWidth: "100%" }} alt="TELUS Logo" />
                <h4>Thank you for your registration.</h4><br />
                <p>We will review your registration and contact you with any further steps.</p>            </div>}
            <img className="telus-logo" src={telus} style={{ width: "20%", maxWidth: "100%" }} alt="" />
            <Survey model={survey}></Survey>
        </div>
    );
}

export default Registration;