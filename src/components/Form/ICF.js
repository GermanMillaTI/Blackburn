import 'survey-core/defaultV2.min.css'
import { Model, surveyLocalization } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { icfQuestions } from './questions/ICFQuestions';
import { inputmask } from "surveyjs-widgets";
import { getDownloadURL } from 'firebase/storage';
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../firebase/config';
import telus from "../telus.png";
import * as SurveyCore from "survey-core";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { themeObj } from '../themes/registrationTheme';

const localeSettings = {
    completeText: "Submit",
    requiredError: "This item is required",
    loadingFile: "Loading...",
    chooseFileCaption: "Select a file",
    pageNextText: "Next"
}
inputmask(SurveyCore);
surveyLocalization.locales["en"] = localeSettings;



function ICF() {
    const [showICFty, setShowICFty] = useState(false);
    const survey = new Model(icfQuestions);
    const pid = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    survey.setValue("referenceId", pid['participantId'])
    survey.setValue("email", searchParams.get('email'));
    survey.applyTheme(themeObj);

    useEffect(() => {

        const completeFunction = async (sender, options) => {
            //options.allow = false;
            setShowICFty(true);
        }

        survey.onCompleting.add(completeFunction);

        return () => {
            survey.onCompleting.remove(completeFunction);
        }


    }, [survey.onCompleting])


    return (
        <>
            {showICFty && <div id="ThankyouPage">
                <img className="telus-logo" src={telus} style={{ width: "fit-content", maxWidth: "100%" }} alt="TELUS Logo" />
                <h4>Thank you for your registration.</h4><br />
                <p>We will review your registration and contact you with any further steps.</p>
            </div>}


            <Survey model={survey}></Survey>
        </>
    )
};

export default ICF;