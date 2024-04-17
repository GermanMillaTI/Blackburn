import { SensitiveData } from "./questions/SensitiveData";
import { inputmask } from "surveyjs-widgets";
import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css'
import { Survey } from 'survey-react-ui';
import * as SurveyCore from "survey-core";
import { useParams } from "react-router-dom";
import { surveyLocalization } from "survey-core";
import { useState } from "react";
import telus from '../telus.png';
import { themeObj } from '../themes/registrationTheme';


function SensitiveDataConsent() {
    const [showty, setShowTy] = useState(false);
    const pid = useParams();

    const localeSettings = {
        completeText: "Submit",
        requiredError: "This item is required",
        loadingFile: "Loading...",
        chooseFileCaption: "Select a file",
        pageNextText: "Next",
        pagePrevText: "Previous"

    };

    inputmask(SurveyCore);
    surveyLocalization.locales["en"] = localeSettings;

    const survey = new Model(SensitiveData);
    survey.applyTheme(themeObj);

    return (
        <>
            {showty && <div id="ThankyouPage">
                <img className="telus-logo" src={telus} style={{ width: "fit-content", maxWidth: "100%" }} alt="TELUS Logo" />
                <h4>Thank you for your registration.</h4><br />
                <p>We will review your registration and contact you with any further steps.</p>
            </div>}


            <Survey model={survey}></Survey>
        </>
    )

}
export default SensitiveDataConsent;