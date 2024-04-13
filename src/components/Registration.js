import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { surveyLocalization } from "survey-core";
import { inputmask } from "surveyjs-widgets";
import * as SurveyCore from "survey-core";
import { useNavigate, useParams } from 'react-router-dom';
import { surveyJson } from './questions/RegistrationQuestions';
import 'survey-core/defaultV2.min.css'
import { themeObj } from './themes/registrationTheme';
import telus from '../telus.png';
import { useState } from 'react';


const localeSettings = {
    completeText: "Submit",
    requiredError: "This item is required",
    loadingFile: "Loading...",
    chooseFileCaption: "Select a file",
    pageNextText: "Next"

}

inputmask(SurveyCore);
surveyLocalization.locales["en"] = localeSettings;

function Registration() {
    const [showtymsg, setShowtymsg] = useState(false);

    const survey = new Model(surveyJson);
    survey.applyTheme(themeObj);


    return (
        <div>
            <div id='loading'></div>
            {showtymsg && <div id="ThankyouPage">
                <img className="telus-logo" src={telus} style={{ width: "fit-content", maxWidth: "100%" }} alt="TELUS Logo" />
                <h4>Thank you for your registration.</h4><br />
                <p>We will review your registration and contact you with any further steps.</p>
            </div>}
            <img className="telus-logo" src={telus} style={{ width: "fit-content", maxWidth: "100%" }} alt="" />
            <Survey model={survey}></Survey>
        </div>
    );
}

export default Registration;