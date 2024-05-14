import exampleimage from './exampleImage.png';
import MST_1 from './mst_swatches/MST_1.png';
import MST_2 from './mst_swatches/MST_2.png';
import MST_3 from './mst_swatches/MST_3.png';
import MST_4 from './mst_swatches/MST_4.png';
import MST_5 from './mst_swatches/MST_5.png';
import MST_6 from './mst_swatches/MST_6.png';
import MST_7 from './mst_swatches/MST_7.png';
import MST_8 from './mst_swatches/MST_8.png';
import MST_9 from './mst_swatches/MST_9.png';
import MST_10 from './mst_swatches/MST_10.png';

export const surveyJson = {
    showQuestionNumbers: false,
    waitForUpload: true,
    completedHtml: "<div style=\"max-width:688px;text-align:center;margin: 16px auto;\">\n\n<div style=\"padding:0 24px;\">\n<h4>Thank you for your registration.</h4>\n<br>\n<p>We will review your registration and contact you with any further steps.</p>\n</div>\n\n</div>\n",
    pages: [
        {
            name: "page1",
            elements: [{
                type: "panel",
                name: "introduction",
                elements: [{
                    name: "introductoryText",
                    type: "html",
                    html: `<div style="text-align: center;">`
                        + `<div style="text-align: left;">`
                        + `<h3 style="text-align: center; color: #49166D"><strong>Onsite Study Blackburn in Los Angeles, CA</strong></h3></br>`
                        + `<p><span><span style="font-weight: 400;">TELUS International is seeking participants for an onsite study just south of Glendale. During your session onsite, you will be photographed and video-recorded while performing basic movements, which may include walking, sitting, standing up, different gestures, or facial expressions. You may be interacting with props and furniture.
                     The study will also collect photos, videos, and audios and measurements of individuals’ head, face, and hands in still and moving poses, under various lighting conditions. Finally, a specialist will make an impression of your outer ear. The tasks can be easily completed by anyone and do not require prior experience or special skills.</span></p>`
                        + `<p>Payments will be made via Hyperwallet, where you can choose PayPal, bank transfer, or Venmo as the payment method.</p>`
                        + `<br/>`
                        + `<b>Task requirements:</b>`
                        + `<ul>`
                        + `<li class="done" aria-level="1"><span><strong>Earn $300 for completing a 3-hour session</strong></span></li>`
                        + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">Be photographed or video recorded following directives from our team for a total duration of 3 hours (including short breaks)</span></li>`
                        + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">Wear form-fitting compression tops and shorts provided on-site</span></li>`
                        + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">Agree to body composition measurements to be taken during the study</span></li>`
                        + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">All ages 13-75 are qualified to participate</span></li>`
                        + `<ul>
                    <li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">13-17-year-olds need a legal guardian to register, provide consent, and need to be accompanied for the session</span></li>
                    </ul>`
                        + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">Must be able to read, speak, and understand instructions provided in English</span></li>`
                        + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">Must be a US citizen, legal permanent resident, or authorized to work in the USA (proof will be required)</span></li>`
                        + `</ul>`
                        + `</div>`
                        + `</div>`
                }, {
                    name: "registeredAs",
                    title: "Please select:",
                    type: "radiogroup",
                    choices: [
                        'I am registering as a participant over the age of 18',
                        'I am a parent or guardian registering a child under 18'
                    ],
                    isRequired: true,
                    defaultValue: 'I am registering as a participant over the age of 18'
                }]
            }, {
                type: "panel",
                name: "contactInfo",
                elements: [
                    {
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Registration Form (1/2)`
                            + `</h4>`,

                    },
                    {
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Personal Information`
                            + `</h4>
                            <hr>`,
                        visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'"

                    },
                    {
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Parent or Guardian Contact Information`
                            + `</h4>
                            <hr>`,
                        visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'"

                    },
                    {
                        name: "guardianFirstName",
                        title: "First name:",
                        type: "text",
                        isRequired: true,
                        visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'"
                    },
                    {
                        name: "guardianLastName",
                        title: "Last name:",
                        type: "text",
                        isRequired: true,
                        startWithNewLine: false,
                        visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'"

                    },
                    {
                        name: "email",
                        type: "text",
                        title: "Email address:",
                        validators: [
                            { type: "email", text: "Value must be a valid email" }
                        ],
                        isRequired: true,
                        visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'"
                    },
                    {
                        name: "phone",
                        type: "text",
                        title: "Phone number:",
                        inputMask: "phone",
                        inputFormat: "+1(999)-999-9999",
                        isRequired: true,
                        startWithNewLine: false,
                        visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'",
                    },
                    {
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Personal Information of the Child or Minor Participant`
                            + `</h4>
                            <hr>`,
                        visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'"

                    },

                    {
                        name: "firstName",
                        title: "First name:",
                        type: "text",
                        isRequired: true
                    },
                    {
                        name: "lastName",
                        title: "Last name:",
                        type: "text",
                        isRequired: true,
                        startWithNewLine: false
                    }, {
                        name: "email",
                        type: "text",
                        title: "Email address:",
                        validators: [
                            { type: "email", text: "Value must be a valid email" },
                        ],
                        isRequired: true,
                        visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'"
                    }, {
                        name: "phone",
                        type: "text",
                        title: "Phone number:",
                        inputMask: "phone",
                        inputFormat: "+1(999)-999-9999",
                        visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'",
                        isRequired: true,
                        startWithNewLine: false
                    }, {
                        name: "gender",
                        title: "Gender at birth:",
                        type: "dropdown",
                        choices: [
                            'Male',
                            'Female',
                            'Non-binary',
                            'Prefer not to say'
                        ],
                        isRequired: true
                    }, {
                        name: "dob",
                        title: "Date of birth:",
                        type: "text",
                        inputType: "date",
                        isRequired: true,
                        startWithNewLine: false
                    }, {
                        name: "country",
                        title: "Country of residence:",
                        type: "dropdown",
                        choices: [
                            { value: 'United States' },
                            { value: 'Other' },

                        ],
                        isRequired: true
                    }, {
                        name: "residenceState",
                        title: "State of residence:",
                        type: "dropdown",
                        choices: [
                            { value: 'Alabama' },
                            { value: 'Alaska' },
                            { value: 'Arizona' },
                            { value: 'Arkansas' },
                            { value: 'California' },
                            { value: 'Colorado' },
                            { value: 'Connecticut' },
                            { value: 'Delaware' },
                            { value: 'Florida' },
                            { value: 'Georgia' },
                            { value: 'Hawaii' },
                            { value: 'Idaho' },
                            { value: 'Illinois' },
                            { value: 'Indiana' },
                            { value: 'Iowa' },
                            { value: 'Kansas' },
                            { value: 'Kentucky' },
                            { value: 'Louisiana' },
                            { value: 'Maine' },
                            { value: 'Maryland' },
                            { value: 'Massachusetts' },
                            { value: 'Michigan' },
                            { value: 'Minnesota' },
                            { value: 'Mississippi' },
                            { value: 'Missouri' },
                            { value: 'Montana' },
                            { value: 'Nebraska' },
                            { value: 'Nevada' },
                            { value: 'New Hampshire' },
                            { value: 'New Jersey' },
                            { value: 'New Mexico' },
                            { value: 'New York' },
                            { value: 'North Carolina' },
                            { value: 'North Dakota' },
                            { value: 'Ohio' },
                            { value: 'Oklahoma' },
                            { value: 'Oregon' },
                            { value: 'Pennsylvania' },
                            { value: 'Rhode Island' },
                            { value: 'South Carolina' },
                            { value: 'South Dakota' },
                            { value: 'Tennessee' },
                            { value: 'Texas' },
                            { value: 'Utah' },
                            { value: 'Vermont' },
                            { value: 'Virginia' },
                            { value: 'Washington' },
                            { value: 'Washington, D.C.' },
                            { value: 'West Virginia' },
                            { value: 'Wisconsin' },
                            { value: 'Wyoming' },
                        ],
                        isRequired: true,
                        visibleIf: "{country} = 'United States'",
                        startWithNewLine: false,
                    }, {
                        name: "countryOther",
                        title: "Country of residence / other:",
                        type: "text",
                        isRequired: true,
                        startWithNewLine: false,
                        placeholder: 'Please specify the country of residence',
                        visibleIf: "{country} = 'Other'"

                    }, {
                        name: "residenceCity",
                        title: "City of residence:",
                        type: "text",
                        isRequired: true,
                        startWithNewLine: false,
                    },
                    {
                        name: "availability",
                        title: "Are you able to come for a three hour study appointment at our onsite location south of Glendale, California?",
                        type: "radiogroup",
                        choices: ["Yes", "No"],
                        isRequired: true,
                    },
                    {
                        name: "noAvailabilityReason",
                        title: "Can you tell us why you are not able to come to the onsite location?",
                        type: "checkbox",
                        choices: [
                            'I am generally not interested in going to an onsite study.',
                            "I am hesitant to join a study when I don't know what it is about but I would like to have more information.",
                            'I am not interested in participating in this study.',
                            'I am worried about sharing personal information.',
                            'I do not have time at the moment.',
                            'I do not want to answer this question.',
                            'Something else - please provide more information in the feedback if you want.',
                            'The compensation is generally not enough for me.',
                            'The compensation is not enough for me to go to Los Angeles. I would go if the place would be nearer.',
                            'The place is too far for me.'
                        ],
                        visibleIf: "{availability} = 'No'",
                        maxSelectedChoices: 10,
                        isRequired: true
                    }
                ]
            }, {
                type: "panel",
                name: "identification",
                elements: [
                    {
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Identification`
                            + `</h4>
                            <hr>`
                    }, {
                        type: "html",
                        html: `<p><span style="font-weight: 400;">Please upload an image of your ID, preferably driver’s license. You need to hide the </span><span style="font-weight: 400;">address, social security number, ID number on the documents you upload.</span></p>
                            <p>We will need to confirm your identity to qualify you for the study.</p>
                            <p><b>Example Image:</b></p>
                            <img style='height:300px' src='${exampleimage}' />`
                    },
                    {
                        type: "file",
                        title: "Driver's license or other form of identification",
                        name: "identificationFile",
                        waitForUpload: true,
                        allowMultiple: false,
                        maxWidth: "40%",
                        height: 10,
                        isRequired: true
                    }, {
                        type: "html",
                        html: `<div><span style="color: #ff0000;"><strong>NB: </strong>you MUST   HIDE the address, social security number, ID number on the documents you upload.</span></div>`
                    }]
            }, {
                type: "panel",
                name: "otherInformation",
                elements: [{
                    type: "html",
                    html: `<h4 style="text-align: center;">`
                        + `Other Information`
                        + `</h4>
                        <hr>`
                }, {
                    name: "source",
                    title: "How did you find out about this research study?",
                    type: "radiogroup",
                    choices: [
                        'TELUS International Website',
                        'Facebook',
                        'LinkedIn',
                        'Flyer',
                        'Newspaper',
                        'I was referred by someone',
                        'Instagram',
                        'Indeed',
                        'FlexJobs',
                        'Work Market platform',
                        'Through my association',
                        'Twitter',
                        'Craiglist',
                        'Google Ad',
                        "I'm a TELUS International employee",
                        'I was contacted by TELUS International directly',
                        'Snapchat',
                        'Reddit',
                        'Retirement Jobs',
                        'TikTok'
                    ],
                    colCount: "4",
                    isRequired: true,
                    maxSelectedChoices: "1",
                    visibleIf: "{source} != 'Respondent'"
                }, {
                    name: "otherCompanies",
                    title: "Do you, or does any member of your immediate family, currently work for any of the below companies?",
                    type: "checkbox",
                    choices: [
                        'Alphabet',
                        'Amazon',
                        'Appen',
                        'Apple',
                        'BOSE',
                        'Google',
                        'HTC',
                        'Huawei',
                        'IBM',
                        'LG',
                        'Magic Leap',
                        'Meta',
                        'Microsoft',
                        'Netflix',
                        'Nuance',
                        'Samsung',
                        'Sony',
                        'Yahoo'

                    ],
                    separateSpecialChoices: true,
                    showNoneItem: true,
                    noneText: "None of these",
                    maxSelectedChoices: 10,
                    colCount: "5",
                    isRequired: true,
                }, {
                    name: "industry",
                    title: "What industry do you work in?",
                    type: "radiogroup",
                    choices: [
                        'Aerospace',
                        'Commercial Services',
                        'Health Care and Medicine',
                        'Public Services',
                        'Agriculture',
                        'Construction',
                        'Hospitality',
                        'Technology',
                        'Advertising',
                        'Education',
                        'Marketing and Media',
                        'Telecommunitacions',
                        'Fashion',
                        'Entertainment',
                        'Manufacturing',
                        'Tourism',
                        'Finance',
                        'Energy Sector',
                        'Mining',
                        'Transportation',
                        'Charity or NGO',
                        'Environmental Sciences',
                        'Pharmaceutics',
                        'I am currently not working',
                    ],
                    colCount: "5",
                    isRequired: true,
                }, {
                    name: "interestedInRecruiting",
                    type: "radiogroup",
                    title: "I'm interested in helping TELUS International find more participants like me: ",
                    choices: ["Yes", "No"]
                }]
            }, {
                type: "panel",
                name: "contributorServiceAgreement",
                elements: [{
                    type: "html",
                    html: `<h4 style="text-align: center;">`
                        + `Contributor Services Agreement`
                        + `</h4>
                        <hr>`
                }, {
                    type: "html",
                    html: `<span style="color:red">Please, kindly read and sign the Contributor Services Agreement below, if you wish to participate in this project (please scroll to view the entire document):</span>`
                }, {
                    type: "html",
                    html: `<div style="width:100%;height:600px;overflow:auto;border:1px solid #555; padding-left:10px">`
                        + `<p style="text-align: center;"><strong>INFORMATION COLLECTION, AGREEMENT, AND RELEASE</strong></p>
                        <p><span style="font-weight: 400;">Thank you for your interest in Project Foraker (the “</span><strong>Project</strong><span style="font-weight: 400;">”). Please read the description below, and if you are interested in participating, review and execute the Contributor Services Agreement and Release.&nbsp;</span></p>
                        <p><strong>Process of Data Collection</strong><strong>:</strong><span style="font-weight: 400;">&nbsp; TIAI is collecting the information that you submit on behalf of a non-affiliated customer in the technology industry (“</span><strong>Customer</strong><span style="font-weight: 400;">”).&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">TIAI is collecting the information below to determine your eligibility to participate in a research study on behalf of our Customer. If you meet the criteria [established by our Customer], then we will provide you with a link in which to submit additional information.</span></p>
                        <p><strong>Data Collected</strong><span style="font-weight: 400;">: </span><em><span style="font-weight: 400;">&nbsp;</span></em><span style="font-weight: 400;">TIAI is collecting the following information directly from participants</span></p>
                        <p><span style="font-weight: 400;">TIAI will collect the following information, which may be classified as personal data or similar term, in the country in which you reside: name, e-mail address, country and city of residence, gender, date, month and year of birth, eye color, height, weight, facial hair.</span></p>
                        <p><strong>Special Categories of Personal Data: </strong></p>
                        <p><span style="font-weight: 400;">- Racial or ethnic origin, hair (color, type, length, density, diameter)</span></p>
                        <p><span style="font-weight: 400;">- Health data:</span></p>
                        <p><span style="font-weight: 400;">&nbsp;- Information on prescription vision correction</span></p>
                        <p><span style="font-weight: 400;">&nbsp;- Information on whether you are pregnant</span></p>
                        <p><span style="font-weight: 400;">&nbsp;- Information on whether you have any of the following conditions: diabetes; high blood pressure; heart condition; hearing loss; known neurological disorders; seizures; migraines or headaches; photosensitizing medical condition or take any photosensitizing medications.</span></p>
                        <p><strong>Data Controller</strong><span style="font-weight: 400;">:</span></p>
                        <p><span style="font-weight: 400;">TELUS International AI Inc.,&nbsp;Norton Rose Fulbright US LLP, 1301 McKinney, Suite 5100, Houston, Texas 77010 </span><span style="font-weight: 400;">is the data controller with regard to the contract data and demographic data that we collect about you (as described more fully in our Community Data Privacy Notice), which may include, for purposes of this Project, your name, contact information, gender, age and ethnicity.</span></p>
                        <p><strong>Use</strong><strong>:&nbsp;</strong></p>
                        <p><span style="font-weight: 400;">TIAI’s</span><span style="font-weight: 400;"> Use of Your Contract Data and Demographic Data</span><span style="font-weight: 400;">: TIAI will use your personal data for the following purposes:</span></p>
                        <ul>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Guardian Data:&nbsp;</span></li>
                        <ul>
                        <li style="font-weight: 400;" aria-level="2"><strong>Administrative Purposes</strong><span style="font-weight: 400;">: to contact you and, where applicable, to compensate you for your participation in the project, in accordance with applicable law;</span></li>
                        <li style="font-weight: 400;" aria-level="2"><strong>Research Purposes</strong><span style="font-weight: 400;">:&nbsp; to determine eligibility to participate in the study;</span></li>
                        <li style="font-weight: 400;" aria-level="2"><strong>Our Own Marketing Purposes</strong><span style="font-weight: 400;">:&nbsp; where permitted by applicable law, if we believe that you may be interested in participating in additional research studies;</span></li>
                        </ul>
                        <ul>
                        <li style="font-weight: 400;" aria-level="2"><strong>Contractual Purposes</strong><span style="font-weight: 400;">:&nbsp; to fulfill our contractual obligation with our customer that has commissioned the Project;</span></li>
                        </ul>
                        <ul>
                        <li style="font-weight: 400;" aria-level="2"><strong>Legal Purposes:</strong><span style="font-weight: 400;">&nbsp; to protect our rights and interests, your rights and interest, and the rights and interests of our customers; and&nbsp;</span></li>
                        <li style="font-weight: 400;" aria-level="2"><strong>Other Purposes: </strong><span style="font-weight: 400;">As permitted by applicable law and as detailed in our </span><a href="https://www.telusinternational.com/privacypolicy/contributors"><span style="font-weight: 400;">Community Data Privacy Notice</span></a><span style="font-weight: 400;">.</span></li>
                        </ul>
                        </ul>
                        <p><span style="font-weight: 400;">Customer Use of Your Data</span><span style="font-weight: 400;">: Customer will use your personal data according to their Privacy Notice which will be provided to you.</span></p>
                        <p><strong>Sharing</strong><strong>:&nbsp;</strong></p>
                        <p><span style="font-weight: 400;">TIAI may share your personal data as follows:</span></p>
                        <ul>
                        <li style="font-weight: 400;" aria-level="1"><strong>Our Customer:</strong><span style="font-weight: 400;"> we will share with our Customer: year, month, and date of birth, state of residence, gender, family’s ancestry (ethnicity), skin color, eye color, height, weight, hair (color, type, length, density, diameter), facial hair, vision correction (no glasses, contact lenses or glasses for nearsightedness). This data will exclude your contact information such as name and email, therefore, our Customer will not be able to identify you. <br /></span>Our Customer will use the Data for its own research purposes as described in its Privacy Notice.&nbsp;</li>
                        </ul>
                        <ul>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">For purposes set forth in any other notice provided to you and as set forth in our </span><a href="https://www.telusinternational.com/privacypolicy/contributors"><span style="font-weight: 400;">Community Data Privacy Notice</span></a><span style="font-weight: 400;">.</span></li>
                        </ul>
                        <p><strong>Data Subject Rights</strong><span style="font-weight: 400;">:&nbsp; In certain countries, you may exercise certain rights with regard to your personal data. Please see our Community Data Privacy Notice for information about your rights.&nbsp;</span></p>
                        <p><strong>Transfer of Data</strong><em><span style="font-weight: 400;">:&nbsp; </span></em><span style="font-weight: 400;">We may transfer your data to a third country that does not have the same level of data protection as your home country. Please see our Community Data Privacy Notice for additional information.&nbsp;</span></p>
                        <p><strong>Consent to the Collection of Personal Data:</strong><span style="font-weight: 400;">&nbsp;</span></p>
                        <p><span style="font-weight: 400;">[ ] Yes, I consent to TIAI’s collection of my personal data “Data Collected”. TIAI will retain my personal data for one year, unless local law requires a shorter period.</span></p>
                        <p><span style="font-weight: 400;">[ ] Yes, I consent to the collection of my personal data “Data Collected” by TIAI’s customer.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">[ ] Yes, I consent to TIAI’s collection of my health information. TIAI will retain my health information for one year, unless local law requires a shorter period.</span></p>
                        <p><span style="font-weight: 400;">[ ] Yes, I consent to the collection of my health information by TIAI’s customer.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">[ ] Yes, I consent to TIAI’s collection of my racial or ethnic origin data. TIAI will retain my racial or ethnic origin data for one year, unless local law requires a shorter period.</span></p>
                        <p><span style="font-weight: 400;">[ ] Yes, I consent to the collection of my racial or ethnic origin data by TIAI’s customer. </span></p>
                        <p style="text-align: center;"><strong>Contributor Services Agreement and Release</strong></p>
                        <p><span style="font-weight: 400;">Hello and welcome to the community of Independent Contractors for TELUS International AI Inc. (the “Company”)!&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">All of the Services (defined below) provided by you (the “</span><strong>Independent Contractor</strong><span style="font-weight: 400;">” or “</span><strong>you</strong><span style="font-weight: 400;">”) to the Company are governed by the terms and conditions set out in this Contributor Services Agreement (the “</span><strong>Agreement</strong><span style="font-weight: 400;">”).&nbsp; Please be sure to review the terms and conditions carefully.&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">By acknowledging this Agreement, you also confirm to have read and understand the terms of the Agreement, which has been provided [and originally drafted] in the English language.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">En cliquant sur Accepter, vous confirmez également avoir lu et compris les termes du Contrat qui a été fourni et rédigé à l'origine en anglais.&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">By acknowledging this Agreement, you consent to signing or acknowledging TELUS International documents electronically, and agree that your electronic signature will have the same legal effect as a hand-written signature. Once accepted, a copy of this Agreement will be made available for download in the “Agreements” section of your profile on the platform.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;Independent Contractor and Company agree as follows:</span></p>
                        <ol>
                        <li style="font-weight: 400;" aria-level="1"><strong>Services.</strong></li>
                        </ol>
                        <p><span style="font-weight: 400;">1.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Services and Deliverables</span><span style="font-weight: 400;">.&nbsp; Company will propose services to be performed by the Independent Contractor (the “</span><strong>Services</strong><span style="font-weight: 400;">”) and for each Service will provide information concerning the required deliverables (the “</span><strong>Deliverables</strong><span style="font-weight: 400;">”), fees payable, due dates and other business terms that apply to the Services.&nbsp; Company may propose Services through the platform or other means as communicated to Independent Contractor by Company. Independent Contractor may accept the opportunity or decline to provide the Services in Independent Contractor’s sole and absolute discretion without any form of detriment to the Independent Contractor.&nbsp; If Independent Contractor accepts the opportunity, Independent Contractor represents and warrants that Independent Contractor:&nbsp;</span></p>
                        <ol>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">will perform the Services and provide the Deliverables in accordance with all of the specifications and other requirements included in the Work Statement that are incorporated herein by reference and form the terms of the Agreement;</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">will perform the Services in a highly skilled and professional manner consistent with the highest professional standards in the industry;&nbsp;&nbsp;</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">has the necessary qualifications and training/expertise required to deliver the Services and the Deliverables, which will be created solely by Independent Contractor;</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">will provide the Services and Deliverables to Company free and clear of any liens or third-party rights, and in so doing, this Agreement will not breach or conflict with any other obligation or agreement to which Independent Contractor is a party or any contractual or confidentiality obligation Independent Contractor owes to a third party; and&nbsp;</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">shall promptly correct any failure of the Services or the Deliverables to conform to the above warranty at Independent Contractor's sole cost and expense.&nbsp;&nbsp;</span></li>
                        </ol>
                        <p><span style="font-weight: 400;">Subject to Independent Contractor meeting the requirements for the Services set out or otherwise communicated by Company, Independent Contractor will have the control and reasonable discretion as to the manner and means of performing the Services including full autonomy as to work schedule and tools, materials and equipment used to complete the Services. Independent Contractor represents and warrants that Services and Deliverables to Company and under this Agreement will not breach or conflict with any agreement to which Independent Contractor is a party or any contractual obligation Independent Contractor owes to a third party.</span></p>
                        <p><span style="font-weight: 400;">&nbsp;1.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Review</span><span style="font-weight: 400;">.&nbsp; Company (or its customer, as applicable) will review each Deliverable and may provide Independent Contractor with requested corrections to align Services and Deliverables with Company’s expectations.&nbsp; Independent Contractor will promptly make all corrections requested by Company that are reasonably within the scope of the Services for no additional fee.&nbsp; If any requested change is outside of the scope of the Services and/or Deliverables, Independent Contractor will promptly notify Company, and Independent Contractor will agree on revised Deliverables and delivery dates thereto.&nbsp; Any modifications must be agreed to in writing by both parties to be effective.&nbsp;&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;1.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Payment</span><span style="font-weight: 400;">.&nbsp; Company will pay Independent Contractor for all Services and Deliverables as described in the Services Request but no later than sixty (60) days from either the issuance of the applicable invoice or, where fees are calculated automatically through the platform based on Services and Deliverables provided and mutually agreed under the Agreement, the end of the Term.&nbsp; Independent Contractor agrees that the fees offered will be full and complete compensation for Independent Contractor’s performance of the Services and provision of the Deliverables and shall be inclusive of any taxes.&nbsp; Independent Contractor will be solely responsible for all costs and expenses associated with the Services.&nbsp; Independent Contractor is also solely responsible for the payment of any taxes, fees, costs or otherwise to the appropriate tax authority in a timely manner and as prescribed by law.</span></p>
                        <p><span style="font-weight: 400;">1.4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Equipment.</span><span style="font-weight: 400;"> Independent Contractor agrees to supply, at its own expense, all tools and materials necessary for Independent Contractor to perform the Services, including, but not limited to, all necessary hardware, software, equipment and supplies. Under exceptional circumstances, the Company may furnish materials and equipment to Independent Contractor. Any materials and equipment furnished by Company to Independent Contractor in connection with this Agreement, unless fully paid for by Independent Contractor, are and will remain the property of Company and will be deemed to be loaned to Independent Contractor. Upon the earlier of Company’s request or the expiry or termination of the Agreement, Independent Contractor shall provide, to Company or to Company’s designate, all Company equipment and materials related to the Services covered under the Agreement in the same condition as they were when furnished by Company. Final payment by Company of the fees for Services and Deliverables will be contingent on the return of such equipment and materials in addition to any other legal remedies the Company may have.</span></p>
                        <p><span style="font-weight: 400;">&nbsp;1.5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Company Requirements</span><span style="font-weight: 400;">.&nbsp; Independent Contractor will comply with all requirements and policies provided to Independent Contractor by Company or the applicable Company customer (collectively, the “Requirements”).&nbsp; In addition to the Requirements, Independent Contractor agrees to comply with&nbsp;Company’s Supplier Code of Conduct found at </span><a href="http://www.telus.com/suppliercodeofconduct"><span style="font-weight: 400;">www.telus.com/suppliercodeofconduct</span></a><span style="font-weight: 400;"> and any and all requirements concerning information security measures in performance of Independent Contractor’s obligations and in all cases, no less than commercially reasonable standards. Independent Contractor shall observe and comply with all applicable laws, regulations, ordinances, and codes of governmental entities relating to the provision of the Services and Deliverables.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
                        <ol start="2">
                        <li><strong>Confidentiality.</strong></li>
                        </ol>
                        <p><span style="font-weight: 400;">&nbsp;2.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Definition</span><span style="font-weight: 400;">.&nbsp; “</span><strong>Confidential Information</strong><span style="font-weight: 400;">” means any non-public information (of Company or Company’s customers) that is provided to Independent Contractor by Company or any of Company’ affiliates, customers, business partners, third parties or independent contractors. Confidential Information includes, but is not limited to, (i) all software, documentation, financial, marketing and customer data (including, Company data, customer information, personal data,&nbsp; retention plans, strategies and other business information, (ii) any rating procedures, rules and guidelines, systems and processes, ratings hub, and the underlying methodologies and processes of the foregoing and all related training and documentation, and (iii) any discoveries, inventions, trade secrets, research and development efforts, know-how and show-how, and all deliverables, derivatives, improvements, and enhancements to any of the above.&nbsp; “Confidential Information” does not include information that: (a) was rightfully known to Independent Contractor, without any obligation of confidentiality, prior to receiving the same information from Company; (b) is or becomes publicly available without breach of any confidentiality obligation; or (c) is rightfully obtained by Independent Contractor from a source other than Company without breach of any confidentiality obligation.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;2.2&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Use of Information</span><span style="font-weight: 400;">.&nbsp; Independent Contractor understands that Confidential Information constitutes a valuable and unique asset to the Company.&nbsp; Independent Contractor will use Confidential Information only for the purpose of providing the Services and Deliverables and will not disclose, distribute, transfer, sell, share, destruction or otherwise use (“Use”) it for Independent Contractor’s own benefit or the benefit of any other party.&nbsp; Independent Contractor will not disclose or distribute Confidential Information to any third party without Company’s prior written consent.&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;2.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Protection of Information</span><span style="font-weight: 400;">.&nbsp; Independent Contractor will protect Confidential Information from any unauthorized use or disclosure, including implementing all reasonable security measures needed to protect the Confidential Information.&nbsp; Independent Contractor will notify Company immediately if Independent Contractor becomes aware of any unauthorized Use of any Confidential Information, including any personal data received by Independent Contractor in the course of performing the Services.&nbsp; Independent Contractor may disclose Confidential Information pursuant to a valid order issued by a court or government agency; provided that, Independent Contractor gives Company at least ten (10) days prior written notice of such obligation and the opportunity to oppose such disclosure or obtain a protective order or the equivalent.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;2.4&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Customer Information</span><span style="font-weight: 400;">.&nbsp;&nbsp; </span><strong>In addition to and without reducing any other obligation set out in this Agreement, Independent Contractor specifically acknowledges that all information related to any Company customer, including</strong><strong><em> any</em></strong><strong> information about a customer’s business, product plans, strategic relationships, etc., is to be held in the </strong><strong><em>strictest confidence</em></strong><strong>.&nbsp; Independent Contractor must not disclose any information about the Services and Deliverables provided by Independent Contractor or the Company’s or customer’s identity or Confidential Information in </strong><strong><em>any</em></strong><strong> materials, including, without limitation, postings in social media or on the Company or Independent Contractor’s website.&nbsp; Independent Contractor must not duplicate any images, text, video, audio, or other content provided to Company by Independent Contractor or from Company to Independent Contractor, other than as strictly needed to perform the Services</strong><span style="font-weight: 400;">.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;2.5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Return of Information</span><span style="font-weight: 400;">.&nbsp; All Confidential Information will remain the property of the Company.&nbsp; Upon Company’ request or upon the termination of this Agreement, or Services Request, Independent Contractor will promptly return or destroy, at Company’s option, all copies of Confidential Information and the Deliverables and certify the completion of Independent Contractor’s obligations under this Section in writing.&nbsp;&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;2.6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Investigations and Audits</span><span style="font-weight: 400;">.&nbsp; Independent Contractor will cooperate fully in any investigation of any unauthorized Use of Confidential Information and will promptly provide requested information and reasonable access to any information or systems (e.g., documents or work systems).&nbsp; Independent Contractor will cooperate in any reasonable audit regarding its obligations under this Agreement, required by law or under Company’s contracts with its customers.&nbsp; Company will provide the Independent Contractor with reasonable notice and an explanation in connection with any audit.&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;2.7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Protection of Business Interests</span><span style="font-weight: 400;">.&nbsp; Independent Contractor will not directly or indirectly solicit any customer of Company for any business or other opportunity based on any information learned in the course of providing the Services or that was otherwise provided by Company.&nbsp;&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;2.8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Court-granted Relief</span><span style="font-weight: 400;">.&nbsp; Independent Contractor acknowledges that any breach of its obligations under this Agreement will result in irreparable harm to the Company.&nbsp; In the event of an actual or threatened breach of this Agreement, Company will be entitled to immediate injunctive relief in addition to any other legal relief available to it.&nbsp;</span></p>
                        <ol start="3">
                        <li><strong>Relationship</strong><span style="font-weight: 400;">. Independent Contractor is engaged as, and shall perform the Services as an independent contractor, and&nbsp;Independent Contractor acknowledges that Independent Contractor will not be considered an employee, agent, joint venture or partner of Company or any of its customers, under the provisions of this Agreement or otherwise.&nbsp; Independent Contractor shall not receive nor be entitled to any employment-related benefit or entitlement such as vacation pay, holiday pay, termination notice, payment in lieu of termination notice, or severance pay, in connection with the performance of its obligations under this Agreement.&nbsp; Independent Contractor does not have and will not have any authority to bind Company or assume or create any obligation on behalf of Company, and Independent Contractor will not represent to any third party that Independent Contractor has any such authority.&nbsp; No part of Independent Contractor’s compensation will be subject to withholding by Company or payment by the Company for the payment of social insurance, pension plan, social security, unemployment insurance, or disability insurance or their equivalents or any other similar tax obligations, unless otherwise required by laws applying to Company.&nbsp;<br /><br /></span></li>
                        <li><strong>Legal Compliance</strong><span style="font-weight: 400;">.</span></li>
                        </ol>
                        <p><span style="font-weight: 400;">&nbsp;4.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Personal Data</span><span style="font-weight: 400;">.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">(a)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Independent Contractor’s Personal Data</span><span style="font-weight: 400;">. Independent Contractor acknowledges and agrees that Company has provided Independent Contractor, where applicable, with a description of personal data that Company will collect, as well as a description of Company’s use and disclosure of such personal data, in connection with Independent Contractor’s performance of the Services and Deliverables. Such data may include contract data, demographic data, or Work Product Data, (collectively, the “</span><strong>data</strong><span style="font-weight: 400;">”), unless otherwise distinguished among types of data. Independent Contractor represents that any data, including any personal data, that it submits in connection with the Services is that of Independent Contractor, or, if Independent Contractor submits any data, including any personal data, from any person under the age of 18, or the age of majority in your jurisdiction, that you are the legal parent or guardian with appropriate legal authority (“</span><strong>Guardian</strong><span style="font-weight: 400;">”) to provide such data, including personal data. Where the participant is under 18 years of age, or the legal age in your country (“</span><strong>Minor Participant</strong><span style="font-weight: 400;">”), Independent Contractor represents that you have full power and authority to grant all rights and licenses related to the participant’s participation. Where applicable, Independent Contractor provides consent for any minor data subject to participate in any data collection activity and agrees that such participation is part of the Services. References to “you” or “your” include any personal data that Independent Contractor provides pertaining to a minor. Guardian gives consent for Minor Participant to participate in this Program. With respect to all Data required to participate in the Project, Guardian acknowledges and agrees that Guardian will submit, or, as applicable, work directly with Company personnel to submit, all such Data to Company.&nbsp; Guardian expressly acknowledges and agrees that Guardian will not cause any Minor Participant to provide, upload or submit any such Data directly to Company. By executing this Agreement, Guardian consents to the Processing of Guardian and Minor Participant data.&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">(b) Company shall use and disclose any personal data that Independent Contractor submits as part of the Services in accordance with any notice provided to you and the Community Data Privacy Notice. In the event of a conflict between this Contributor Services Agreement and Release and the </span><a href="https://www.telusinternational.com/privacypolicy/contributors"><span style="font-weight: 400;">Community Data Privacy Notice</span></a><span style="font-weight: 400;">, the terms of this Agreement will govern. Independent Contractor shall not provide any personal data beyond what is necessary to perform the Services. If Company is collecting your personal data on behalf of a customer, your personal data will be shared with such customer in accordance with this Contributor Services Agreement and any notices provided to you, and Company is not responsible for customer’s use of your personal data. Where permitted by applicable law, and with your consent, as required by law, you acknowledge and agree that Company’s customer may collect and use biometric information from your personal data, including, without limitation, retinal or iris scan, fingerprints, voiceprints, facial geometry or other facial measurements, and other processes that may be deemed as a biometric collection.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">(c) The Community Data Privacy Notice includes information about how to contact Company with any questions or concerns regarding use of personal data as well as any rights you have with regard to your personal data. Except as otherwise prohibited by applicable law, Company is unable to delete, erase, return, or otherwise provide you with access to any personal data that you provide to it in connection with your performance of the Services. By executing this Agreement and providing the Services, you consent to the processing of your data, including your personal data, provided in the course of performing the Services, and to the transfer of your data to Company’s customer. You acknowledge and agree, as required by applicable law, that your personal data may be transferred to and processed in a location, including the United States, other than your place of residence.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">(d) Release. Independent Contractor understands and agrees that any data, including, personal data, except as otherwise prohibited under applicable law, shall become and remain the property of Company and Company’s customer and that Independent Contractor shall have no right, title or interest in data provided in connection with the Services.&nbsp; In the event the foregoing is a violation of applicable law or the transfer is not effective for any reason, You and Guardian hereby irrevocably and unconditionally grant to Company and Company’s customer a royalty-free, worldwide, irrevocable, perpetual, non-exclusive right and license (but not an obligation) to, and to permit others to, collect, use, share, sell, store, copy, create derivative works, and display any participant’s name, voice, likeness, appearance, actions, voice, conversations and characteristics/mannerisms, photographs and video, and any and all information supplied by or about me, including biographical information and/or other materials I may provide, as well as other information Company may have received from other sources (“Appearance”), and disclose, transfer and otherwise process any data in perpetuity (“Process”) in connection with the notice(s) provided to you and to any intellectual property, rights of publicity, and any other legal rights necessary in order for Company, Company’s customer and others to use the data for the purposes as described in any notices provided to you and the Community Data Privacy Notice. To the maximum extent permitted by law, Independent Contractor, including on behalf of Guardian and/or Minor Participant, hereby release Company, its customers, successors, assignees and licensees and each of their respective parents, subsidiaries and affiliated companies (all such individuals and entities collectively referred to as the “Released Parties”) from any claim of any kind or nature whatsoever arising from the use of the Appearance including, without limitation, any and all claims, demands, or liabilities for invasion of privacy, infringement of my right of publicity, defamation (including libel and slander) and any other personal and/or property rights (collectively, the “</span><strong>Released Matters</strong><span style="font-weight: 400;">”).&nbsp; I intend and agree that this Release shall be effective as a full and final accord and satisfaction and general release of and from all Released Matters.&nbsp; In connection with this waiver, I acknowledge that I am aware that I may hereafter discover claims presently unknown or unsuspected, or facts in addition to or different from those which I now know or believe to be true, with respect to the subject matter of this Release.&nbsp; Nevertheless, I intend by this Agreement to release fully, finally and forever all Released Matters under this Release.&nbsp; In furtherance of such intention, the releases set forth in this Agreement shall be and shall remain in effect as full and complete releases notwithstanding the discovery or existence of any such additional or different claims or facts relevant hereto. This study does not pose any known significant physical or psychological risks or benefits. If Independent Contractor feels uncomfortable at any time, please contact Company at [insert].</span></p>
                        <p><span style="font-weight: 400;">(e) </span> <span style="font-weight: 400;">Personal Data</span><span style="font-weight: 400;">.&nbsp; Independent Contractor acknowledges that some of the content that Independent Contractor may receive in connection with the Services or may generate in the course of providing the Services may include personal data, and acknowledges that personal data is and shall remain the exclusive property of the Company.&nbsp; Independent Contractor will treat all such personal data as Confidential Information as described in Section 2 above.&nbsp; In addition, Independent Contractor will Use any such Confidential Information solely as directed by the Company and for no other purpose.&nbsp;&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;4.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Legal Compliance</span><span style="font-weight: 400;">.&nbsp; Independent Contractor will comply with all laws, rules and regulations in connection with Independent Contractor’s performance of the Services, including all registration as an independent contractor, as required, reporting and other obligations related to operating a business in Independent Contractor’s jurisdiction, </span><em><span style="font-weight: 400;">for example</span></em><span style="font-weight: 400;">, regulations prohibiting bribery, money laundering and discrimination.&nbsp; Independent Contractor represents and warrants that Independent Contractor has the legal authority to enter into this Agreement any and that all of the information they provide to Company in any application or any required form is accurate and complete.&nbsp; Additionally, Independent Contractor represents and warrants that Independent Contractor is not subject to any contractual obligations that interfere with or prohibit Independent Contractor’s performance of the Services or provision of the Deliverables.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">For Independent Contractors operating in France, Independent Contractor represents and warrants that Independent Contractor is duly registered with the </span><em><span style="font-weight: 400;">Registre du Commerce et des Sociétés</span></em><span style="font-weight: 400;"> as an independent contractor and shall produce any evidence of Independent Contractor’s compliance with independent contractor’s tax and social security regulations as required by the Company under applicable laws.</span></p>
                        <ol start="5">
                        <li><strong>Proprietary Rights.</strong></li>
                        </ol>
                        <p><span style="font-weight: 400;">&nbsp;5.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Ownership</span><span style="font-weight: 400;">.&nbsp; To the extent permitted by applicable law, Independent Contractor agrees that the Services are provided on a “work-for-hire” basis and that all right, title and interest in any and all intellectual property rights (including, </span><em><span style="font-weight: 400;">for example</span></em><span style="font-weight: 400;">, all copyrights, trademarks, patents, trade secret rights and all contract and licensing rights) developed by Independent Contractor (either individually or in collaboration with others) relating to the Services and Deliverables (collectively, the “Work Product”) will be the sole and exclusive property of Company.&nbsp; Independent Contractor acknowledges that Company’s rights to the Work Product are exclusive to Company and include, </span><em><span style="font-weight: 400;">for example</span></em><span style="font-weight: 400;">, the right to use, adapt, reproduce, distribute, broadcast, display and make derivative works (“Exploit”) of the Work Product in any and all media and all formats now known or later developed.&nbsp; In addition, all files, records, documents, drawings, specifications, equipment and similar items related to Company’s business, whether prepared by Independent Contractor or otherwise coming into Independent Contractor’s possession, will remain the exclusive property of Company.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;5.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Assignment of Rights</span><span style="font-weight: 400;">.&nbsp; To the extent permitted by applicable law, Independent Contractor hereby irrevocably assigns and transfers to Company all right, title and interest in and to the Work Product.&nbsp; Independent Contractor acknowledges that the Company will have the sole and exclusive worldwide right, title and interest in perpetuity to Use and Exploit all or any part of the Work Product.&nbsp; Independent Contractor agrees they will not assert any moral rights in the Work Product and, to the extent permitted by applicable law, hereby waives all such moral rights. In addition, Independent Contractor agrees to execute any documents as the Company may request evidence or otherwise protect Company’s ownership of the Work Product.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;5.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Third Party Rights</span><span style="font-weight: 400;">.&nbsp; Independent Contractor will not Use or Exploit any third party materials or otherwise infringe any third party privacy, publicity, or property right of any kind in the performance of the Services or provision of the Deliverables.&nbsp; Independent Contractor will not disclose any third-party confidential information to Company at any time.</span></p>
                        <ol start="6">
                        <li><strong>Term and Termination.</strong><span style="font-weight: 400;"> Subject to the terms of this Section, this Agreement will become effective when accepted by Independent Contractor and will remain in effect until terminated by either Independent Contractor or Company for a period of twelve (12) months unless terminated earlier by either Independent Contractor or Company as provided below (the “Term”). Thereafter, this Agreement will automatically be extended for consecutive one (1) year term, unless otherwise terminated as provided in this Agreement.&nbsp; The Parties may terminate this Agreement at any time on written notice to Company; provided Independent Contractor completes any Services that Independent Contractor has agreed to provide prior to Independent Contractor’s termination of the Agreement and provided that the Company will pay Independent Contractor for all Services properly performed as of the termination date.&nbsp; After termination of this Agreement, Independent Contractor and Company will continue to comply with the following Sections of this Agreement: Section 2 (Confidentiality), Section 3 (Relationship), Section 4 (Legal Compliance), Section 5 (Proprietary Rights), Section 8 (Company Contracting Party and Governing Law), Section 9 (General) and Section 10 (Arbitration).&nbsp;<br /><br /></span></li>
                        <li><strong>Limitation of Liability and Indemnity.&nbsp;</strong></li>
                        </ol>
                        <p><span style="font-weight: 400;">&nbsp;7.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES WHATSOEVER ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT OR THE PROVISION OF THE SERVICES OR DELIVERABLES, INCLUDING LOST PROFITS, ANTICIPATED OR LOST REVENUE. IN NO EVENT SHALL COMPANY BE LIABLE TO INDEPENDENT CONTRACTOR FOR ANY INJURY, CLAIM, LOSSES, DAMAGES, LIABILITIES, OR COSTS (INCLUDING, WITHOUT LIMITATION, LEGAL FEES) OF ANY NATURE ARISING OUT OF OR RELATED TO THIS A</span><em><span style="font-weight: 400;">G</span></em><span style="font-weight: 400;">REEMENT, THE SERVICES OR THE DELIVERABLES IN EXCESS OF THE AMOUNT WHICH COMPANY PAID FOR THE FEES PAYABLE TO INDEPENDENT CONTRACTOR FOR THE SERVICES AND DELIVERABLES FOR THE THREE (3) PRIOR MONTHS PRECEDING THE FIRST EVENT OR MATTER THAT GAVE RISE TO THE CLAIM, LOSS, DAMAGE OR COST.</span></p>
                        <p><span style="font-weight: 400;">&nbsp;7.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Independent Contractor shall, at its own expense, defend, indemnify, and hold harmless Company, its affiliates and successors, and each of their respective directors, officers and employees (each a “Company Indemnitee”)from and against any and all damages, expenses, liabilities, costs, penalties, losses and claims of whatever nature (including legal fees and expenses)(“Damages”) arising from or attributable to the Independent Contractor in connection with its performance of Services, provision of the Deliverables, any breach of this Agreement by Independent Contractor or any determination by any court, arbitrator, taxing authority, government entity, agency, ministry or adjudicating body that the relationship between the Company and Independent Contractor, is not an independent contractor relationship, including any and all Damages any Company Indemnitee may suffer as a result of enforcing the indemnification provisions set out in this section 7.2.&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;7.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Independent Contractor shall (to the extent permitted by applicable law), at its own expense, indemnify, defend and hold Company, its affiliates and their respective directors, officers and employees harmless each Company Indemnitee from a determination by any court, arbitrator, taxing authority, government entity, agency, ministry or adjudicating body that the relationship between the Company and Independent Contractor, is not an independent contractor relationship, including any and all damages, expenses, liabilities, costs, penalties, losses and claims any Company Indemnitee may suffer as a result of enforcing the indemnification provisions set out in this section 7.3.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">WITHOUT LIMITING ANY INDEMNITY SET FORTH ABOVE, INDEPENDENT CONTRACTOR, ON YOUR OWN OR ON PARTICIPANT’S BEHALF, AS APPLICABLE, AGREE TO DISCHARGE COMPANY AND COMPANY”S CLIENT AND EACH OF THEIR AGENTS, OFFICIALS, EMPLOYEES, OFFICERS, DIRECTORS, AND AFFILIATES (“AGENTS”) OF AND FROM ANY AND ALL CLAIMS, DEMANDS, CAUSES OF ACTION, EXPENSES OR DAMAGES AND LIABILITIES OF EVERY KIND AND NATURE IN LAW OR EQUITY, THAT YOU, AND/OR YOUR&nbsp; MINOR PARTICIPANT HAD OR MAY HAVE, ARISING FROM OR IN ANY WAY RELATED TO THIS STUDY OR THE PROCESSING DATA PROVIDED IN THE SERVICES, PROVIDED THAT THIS WAIVER OF LIABILITY DOES NOT APPLY TO ANY ACTS BY COMPANY OR COMPANY’S CLIENT OR EACH OF THEIR AGENTS OF INTENTIONAL, WILLFUL OR WANTON MISCONDUCT.&nbsp;</span></p>
                        <ol start="8">
                        <li><strong>Company Contracting Party and Governing Law</strong><span style="font-weight: 400;">.</span></li>
                        </ol>
                        <p><span style="font-weight: 400;">&nbsp;8.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This Agreement will be governed exclusively by the laws of the State of Delaware, without reference to any conflict of laws principles that would require the application of the laws of any other jurisdiction.&nbsp; Additionally, the provisions of Section 10 (Arbitration) below will apply to Independent Contractor.&nbsp;</span></p>
                        <ol start="9">
                        <li><strong>General. </strong><span style="font-weight: 400;">This Agreement, the Requirements, and Service Request(s) embody the entire understanding between the parties concerning the subject matter hereof and supersede any and all other negotiations or agreements between the parties.&nbsp; This Agreement cannot be modified except in the form of a writing accepted by both parties.&nbsp; This Agreement has no third party beneficiaries other than Company’s customers, who may enforce the terms of this Agreement or any applicable Requirements directly.&nbsp; No failure of either party to exercise or enforce any of its rights under this Agreement will act as a waiver of any of its rights.&nbsp; Independent Contractor will not subcontract or assign any of Independent Contractor’s rights or obligations under this Agreement or the Requirements without the prior written consent of Company.&nbsp; This Agreement shall benefit and be binding upon the Company’s successors, affiliates and assigns. Should any provision of this Agreement be found unenforceable, such provision will be enforced to the fullest extent permitted by law and the remainder of this Agreement will remain in full force and effect.&nbsp;<br /><br /></span></li>
                        <li><strong>Arbitration (US-based Independent Contractors only)</strong><span style="font-weight: 400;">.</span></li>
                        </ol>
                        <p><span style="font-weight: 400;">10.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Exclusive Use of Arbitration</span><span style="font-weight: 400;">.&nbsp; Independent Contractor and Company mutually agree to resolve any disputes exclusively through final and binding arbitration instead of filing a lawsuit in court.&nbsp; This arbitration provision is governed by the Federal Arbitration Act (9 U.S.C. §§ 1-16) and will apply to any and all claims arising out of or relating to the Services, the Requirements, this Agreement, the nature of the relationship between Independent Contractor and Company (including any Company affiliates or customers) and all other aspects of Independent Contractor’s relationship with Company whether arising under federal, state or local statutory or common law. &nbsp;</span><strong>The arbitrator will have the exclusive authority to resolve any dispute relating to the interpretation, applicability, enforceability, or formation of this arbitration provision, other than Sections 10.2 and 10.3 below relating to the Class Action Waiver or Representative Action Waiver</strong><span style="font-weight: 400;">.&nbsp; </span><strong>Independent Contractor acknowledges this means such disputes will not be resolved by a court or jury trial.&nbsp;&nbsp;</strong></p>
                        <p><span style="font-weight: 400;">&nbsp;10.2 &nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Class Action Waiver</span><span style="font-weight: 400;">.&nbsp; </span><strong>Independent Contractor and Company mutually agree that by agreeing to arbitrate any dispute, each waives its right to have any dispute or claim brought, heard or arbitrated as a class action or collective action and that the arbitrator will not have any authority to hear or arbitrate any class or collective action</strong><span style="font-weight: 400;"> (“</span><strong>Class Action Waiver</strong><span style="font-weight: 400;">”).</span></p>
                        <p><span style="font-weight: 400;">&nbsp;10.3 &nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Representative Action Waiver</span><span style="font-weight: 400;">.&nbsp; </span><strong>Independent Contractor and Company mutually agree that by agreeing to arbitrate, each waives its right to have any dispute or claim brought, heard or arbitrated as a representative action and that the arbitrator will not have any authority to arbitrate a representative action</strong><span style="font-weight: 400;"> ("</span><strong>Representative Action Waiver</strong><span style="font-weight: 400;">").</span></p>
                        <p><span style="font-weight: 400;">&nbsp;10.4 &nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Process</span><span style="font-weight: 400;">.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (i) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Notice</span><span style="font-weight: 400;">.&nbsp; If either party wishes to initiate arbitration, the initiating party must notify the other party in writing delivered by courier or other verifiable delivery method.&nbsp; The notice must include (a) the name and address of the party seeking arbitration, (b) a statement of the legal and factual basis of the claim, and (c) a description of the remedy sought.&nbsp;</span></p>
                        <p><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (ii)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Procedural Requirements</span><span style="font-weight: 400;">.&nbsp; The arbitration will be governed by the terms of this Section and, except as otherwise provided in this Section 10, by the Judicial Arbitration and Mediation Services (“JAMs Rules”).&nbsp; The arbitration will be heard by one arbitrator selected in accordance with the JAMs Rules.&nbsp; The arbitrator will apply the state or federal substantive law, as applicable.&nbsp; The arbitrator may issue orders (including subpoenas to third parties) allowing the parties to conduct discovery sufficient to allow each party to prepare that party’s claims and defenses, taking into consideration that arbitration is designed to be a speedy and efficient method for resolving disputes.&nbsp; The arbitrator may hear motions and will apply the standards of the Federal Rules of Civil Procedure governing such motions.&nbsp; Except as provided in the Class Action Waiver and Representative Action Waiver, the arbitrator may award only remedies that would otherwise be available in a court of law.&nbsp; The arbitrator’s decision or award will be in writing with findings of fact and conclusions of law and will be final and binding on the parties.&nbsp; Notwithstanding the foregoing, either party may apply to a court of competent jurisdiction for temporary or preliminary injunctive relief as needed to protect such party’s rights.&nbsp;</span></p>
                        <ol start="11">
                        <li><strong>Advice of Counsel</strong><span style="font-weight: 400;">. Independent Contractor has the right to consult with private counsel of Independent Contractor’s choice with respect to any aspect of, or any claim that may be subject to, this Agreement, including this arbitration provision, at Independent Contractor’s sole expense.<br /><br /></span></li>
                        <li><strong>Enforceability</strong><span style="font-weight: 400;">. In the event any portion of the arbitration provision and/or the Agreement is deemed unenforceable, the remainder of the arbitration provision and/or the Agreement will remain in full force and effect.<br /><br /></span></li>
                        <li><strong>Prevailing Language.</strong><span style="font-weight: 400;"> The parties have expressly requested that this contract be drafted in the English language. </span><em><span style="font-weight: 400;">Les parties ont expressément requis que ce contrat soit rédigée en anglais. </span></em><span style="font-weight: 400;">If this Agreement is translated into a language other than English for any purpose, the English version shall prevail in the event of any differences, questions or disputes concerning the meaning, form, validity or interpretation of this Agreement.<br /></span></li>
                        </ol>`
                        + `</div>`
                }, {
                    type: "html",
                    html: `<div><strong>Consent to the Collection of Personal Data:</strong></div>
                        <ul>
                        <li>I consent to TIAI’s collection of my personal data "Data Collected". TIAI will retain my personal data for one year, unless local law requires a shorter period.</li>
                        <li>I consent to the collection of my personal data "Data Collected" by TIAI’s customer.</li>
                        <li>I consent to TIAI’s collection of my health information. TIAI will retain my health information for one year, unless local law requires a shorter period.</li>
                        <li>I consent to the collection of my health information by TIAI’s customer.</li>
                        <li>I consent to TIAI’s collection of my racial or ethnic origin data. TIAI will retain my racial or ethnic origin data for one year, unless local law requires a shorter period.</li>
                        <li>I consent to the collection of my racial or ethnic origin data by TIAI’s customer.</li>
                        </ul>`
                }, {
                    name: "agreementConfirmation",
                    title: "\n",
                    type: "checkbox",
                    choices: [
                        'I confirm and agree with all of the above',
                    ],
                    isRequired: true
                }, {
                    type: "html",
                    html: `<span style="color:red">If you are a parent or guardian registering a minor, please enter your first and last name and sign the document</span>`,
                    visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'"
                }, {
                    name: "signatureFirstName",
                    title: "First name:",
                    type: "text",
                    isRequired: true,
                    defaultValueExpression: "{firstName}",
                    visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'",
                    readOnly: true
                }, {
                    name: "signatureLastName",
                    title: "Last name:",
                    type: "text",
                    isRequired: true,
                    visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'",
                    defaultValueExpression: "{lastName}",
                    readOnly: true,
                    startWithNewLine: false,
                }, {
                    name: "grd_signatureFirstName",
                    title: "First name:",
                    type: "text",
                    isRequired: true,
                    defaultValueExpression: "{guardianFirstName}",
                    visibleIf: "{registeredAs} = 'I am a parent or guardian registering a child under 18'",
                    readOnly: true
                }, {
                    name: "grd_signatureLastName",
                    title: "Last name:",
                    type: "text",
                    isRequired: true,
                    startWithNewLine: false,
                    defaultValueExpression: "{guardianLastName}",
                    visibleIf: "{registeredAs} = 'I am a parent or guardian registering a child under 18'",
                    readOnly: true
                }, {
                    name: "date",
                    title: "Signature Date",
                    type: "text",
                    inputType: "date",
                    defaultValueExpression: "today()",
                    minValueExpression: "today()",
                    isRequired: true,
                    startWithNewLine: false,
                    readOnly: true

                }, {
                    type: "signaturepad",
                    name: "signature",
                    title: "Signature",
                    signatureWidth: 700,
                    signatureHeight: 400,
                    penColor: "black",
                    isRequired: true,
                }]
            },//]
            //}, {
            //name: "page2",
            //elements: [
            {
                type: "panel",
                name: "personalInfo",
                elements: [{
                    type: "html",
                    html: `<h4 style="text-align: center;">`
                        + `Registration Form (2/2) `
                        + `</h4>
                            <hr>`,

                }, {
                    name: "isMultipleEthnicities",
                    title: "Do you identify with more than 1 ethnicity?",
                    type: "radiogroup",
                    choices: ["Yes", "No"],
                    isRequired: true,
                    defaultValue: "No"
                }, {
                    type: "radiogroup",
                    name: "ethnicities",
                    title: "Which ethnicity do you identify with?",
                    choices: [
                        "Aboriginal Australians/Papuans",
                        "African/African-American/Black",
                        "Alaskan Native",
                        "East Asian",
                        "Hispanic/Latin American/Spanish",
                        "Native American",
                        "Native Hawaiian/Pacific Islander/Indigenous people of Oceania",
                        "Middle Eastern/North African",
                        "South Asian",
                        "Southeast Asian",
                        "White - Northern European",
                        "White - Southern European",
                        "Prefer not to state",
                    ],
                    visibleIf: '{isMultipleEthnicities} = "No"',
                    showOtherItem: true,
                    otherText: "Other",
                    isRequired: true
                }, {
                    type: "checkbox",
                    name: "ethnicities",
                    title: "Which ethnicities do you identify with?",
                    choices: [
                        "Aboriginal Australians/Papuans",
                        "African/African-American/Black",
                        "Alaskan Native",
                        "East Asian",
                        "Hispanic/Latin American/Spanish",
                        "Native American",
                        "Native Hawaiian/Pacific Islander/Indigenous people of Oceania",
                        "Middle Eastern/North African",
                        "South Asian",
                        "Southeast Asian",
                        "White - Northern European",
                        "White - Southern European",
                        "Prefer not to state",
                    ],
                    visibleIf: '{isMultipleEthnicities} = "Yes"',
                    showOtherItem: true,
                    otherText: "Other",
                    isRequired: true
                }, {
                    type: "html",
                    html: `<style>
                            td {
                                border: 1px solid black;
                                border-radius: 50%;
                                width: 4em;
                                height: 4em;
                                font-size: 5em
                              }</style>
                            <strong>Monk skin type</strong>
                            <p>The Monk Skin Tone Scale is the work of Harvard professor and sociologist Dr Ellis Monk. The 10-point scale helps machines better understand and, therefore, better represent more varied skin tones</p>`
                }, {
                    "type": "imagepicker",
                    "name": "skintone",
                    title: 'Select your skin tone:',
                    isRequired: true,
                    "choices": [
                        {
                            value: 1,
                            imageLink: MST_1
                        },
                        {
                            value: 2,
                            imageLink: MST_2
                        },
                        {
                            value: 3,
                            imageLink: MST_3
                        },
                        {
                            value: 4,
                            imageLink: MST_4
                        },
                        {
                            value: 5,
                            imageLink: MST_5
                        },
                        {
                            value: 6,
                            imageLink: MST_6
                        },
                        {
                            value: 7,
                            imageLink: MST_7
                        },
                        {
                            value: 8,
                            imageLink: MST_8
                        },
                        {
                            value: 9,
                            imageLink: MST_9
                        },
                        {
                            value: 10,
                            imageLink: MST_10
                        }
                    ],
                    imageHeight: 75,
                    imageWidth: 75,
                    imageFit: "fill",
                }, {
                    name: "weightLbs",
                    title: "Your weight (lbs):",
                    description: "In pounds",
                    type: "text",
                    inputType: "number",
                    min: 1,
                    isRequired: true,
                }, {
                    name: "heightFt",
                    title: "Your height (feet):",
                    description: "between 1-8 feet",
                    type: "text",
                    inputType: "number",
                    min: 1,
                    max: 8,
                    isRequired: true,
                    startWithNewLine: false,
                }, {
                    name: "heightIn",
                    title: "Your height (inches):",
                    description: "between 0-11 inches",
                    type: "text",
                    inputType: "number",
                    min: 0,
                    max: 11,
                    isRequired: true,
                    startWithNewLine: false,
                }, {
                    name: "hairType",
                    title: "Hair type:",
                    type: "dropdown",
                    description: "Select one of the available options",
                    choices: [
                        'Curly',
                        'Coily',
                        'Straight',
                        'Wavy'
                    ],
                    isRequired: true,

                }, {
                    name: "hairLength",
                    title: "Hair length:",
                    type: "dropdown",
                    description: "between Bald - Long",
                    choices: [
                        'Bald',
                        'Short',
                        'Medium',
                        'Long'
                    ],
                    isRequired: true,
                    startWithNewLine: false,
                }, {
                    name: "hairColor",
                    title: "Hair color:",
                    type: "dropdown",
                    description: "Select one of the available options",
                    choices: [
                        'Black',
                        'Blonde',
                        'Brown',
                        'Grey',
                        'Red',
                        'White',
                        'Colorful'
                    ],
                    isRequired: true,

                }, {
                    name: "facialHair",
                    title: "Facial hair:",
                    type: "dropdown",
                    description: "Select one of the available options",
                    choices: [
                        'Full beard',
                        'Stubble',
                        'Mustache',
                        'Goatee',
                        'None'
                    ],
                    isRequired: true,
                    startWithNewLine: false,

                }, {
                    name: "tattoos",
                    title: "Tattoos:",
                    type: "checkbox",
                    description: "Select all of the available options",
                    choices: [
                        'Face, neck or head',
                        'Arms',
                        'Upper body or torso',
                        'Legs',
                    ],
                    isRequired: true,
                    showNoneItem: true,
                    noneText: "None",

                }, {
                    name: "piercings",
                    title: "Piercings:",
                    type: "checkbox",
                    description: "Select all of the available options",
                    choices: [
                        'Face, neck or head',
                        'Arms',
                        'Upper body or torso',
                        'Legs',
                    ],
                    isRequired: true,
                    startWithNewLine: false,
                    showNoneItem: true,
                    noneText: "None",

                }, {
                    name: "isPregnant",
                    title: "Are you pregnant?",
                    type: "radiogroup",
                    choices: ["Yes", "No"],
                    isRequired: true,
                }, {
                    type: "checkbox",
                    name: "healthConditions",
                    title: "Have you experienced or do you have any of the following conditions? Select all that apply:",
                    choices: [
                        "Currently taking photosensitizing medications or have any known photosensitizing medical conditions",
                        "Diabetes",
                        "Diagnosis of photo-induced seizures or epilepsy",
                        "Hearing loss",
                        "Heart condition",
                        "High blood pressure",
                        "Known neurological disorder",
                        "Medical eye condition (other than prescriptive lenses or LASIK surgery)",
                        "Migraines/Headaches",
                        "Need assistance climbing a flight of stairs",
                        "Need assistance standing or have difficulty remaining standing for 10-20 minutes (for example, you feel unsteady on your feet)",
                        "Seizures"
                    ]
                    ,
                    showNoneItem: true,
                    noneText: "None of the above",
                    isRequired: true,
                }, {
                    type: "html",
                    html: `<span style="color:red">Please, kindly read and sign the Consent Form for Sensitive Category Data Processing below, if you wish to participate in this project (please scroll to view the entire document):</span>`
                }, {
                    type: "html",
                    html: `<div style="width:100%;height:600px;overflow:auto;border:1px solid #555; padding-left:10px">`
                        + `<p style="text-align: center;"><strong>INFORMATION COLLECTION, AGREEMENT, AND RELEASE</strong></p>
                            <p><span style="font-weight: 400;">Thank you for your interest in Project Foraker (the “</span><strong>Project</strong><span style="font-weight: 400;">”). Please read the description below, and if you are interested in participating, review and execute the Contributor Services Agreement and Release.&nbsp;</span></p>
                            <p><strong>Process of Data Collection</strong><strong>:</strong><span style="font-weight: 400;">&nbsp; TIAI is collecting the information that you submit on behalf of a non-affiliated customer in the technology industry (“</span><strong>Customer</strong><span style="font-weight: 400;">”).&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">TIAI is collecting the information below to determine your eligibility to participate in a research study on behalf of our Customer. If you meet the criteria [established by our Customer], then we will provide you with a link in which to submit additional information.</span></p>
                            <p><strong>Data Collected</strong><span style="font-weight: 400;">: </span><em><span style="font-weight: 400;">&nbsp;</span></em><span style="font-weight: 400;">TIAI is collecting the following information directly from participants</span></p>
                            <p><span style="font-weight: 400;">TIAI will collect the following information, which may be classified as personal data or similar term, in the country in which you reside: name, e-mail address, country and city of residence, gender, date, month and year of birth, eye color, height, weight, facial hair.</span></p>
                            <p><strong>Special Categories of Personal Data: </strong></p>
                            <p><span style="font-weight: 400;">- Racial or ethnic origin, hair (color, type, length, density, diameter)</span></p>
                            <p><span style="font-weight: 400;">- Health data:</span></p>
                            <p><span style="font-weight: 400;">&nbsp;- Information on prescription vision correction</span></p>
                            <p><span style="font-weight: 400;">&nbsp;- Information on whether you are pregnant</span></p>
                            <p><span style="font-weight: 400;">&nbsp;- Information on whether you have any of the following conditions: diabetes; high blood pressure; heart condition; hearing loss; known neurological disorders; seizures; migraines or headaches; photosensitizing medical condition or take any photosensitizing medications.</span></p>
                            <p><strong>Data Controller</strong><span style="font-weight: 400;">:</span></p>
                            <p><span style="font-weight: 400;">TELUS International AI Inc.,&nbsp;Norton Rose Fulbright US LLP, 1301 McKinney, Suite 5100, Houston, Texas 77010 </span><span style="font-weight: 400;">is the data controller with regard to the contract data and demographic data that we collect about you (as described more fully in our Community Data Privacy Notice), which may include, for purposes of this Project, your name, contact information, gender, age and ethnicity.</span></p>
                            <p><strong>Use</strong><strong>:&nbsp;</strong></p>
                            <p><span style="font-weight: 400;">TIAI’s</span><span style="font-weight: 400;"> Use of Your Contract Data and Demographic Data</span><span style="font-weight: 400;">: TIAI will use your personal data for the following purposes:</span></p>
                            <ul>
                            <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Guardian Data:&nbsp;</span></li>
                            <ul>
                            <li style="font-weight: 400;" aria-level="2"><strong>Administrative Purposes</strong><span style="font-weight: 400;">: to contact you and, where applicable, to compensate you for your participation in the project, in accordance with applicable law;</span></li>
                            <li style="font-weight: 400;" aria-level="2"><strong>Research Purposes</strong><span style="font-weight: 400;">:&nbsp; to determine eligibility to participate in the study;</span></li>
                            <li style="font-weight: 400;" aria-level="2"><strong>Our Own Marketing Purposes</strong><span style="font-weight: 400;">:&nbsp; where permitted by applicable law, if we believe that you may be interested in participating in additional research studies;</span></li>
                            </ul>
                            <ul>
                            <li style="font-weight: 400;" aria-level="2"><strong>Contractual Purposes</strong><span style="font-weight: 400;">:&nbsp; to fulfill our contractual obligation with our customer that has commissioned the Project;</span></li>
                            </ul>
                            <ul>
                            <li style="font-weight: 400;" aria-level="2"><strong>Legal Purposes:</strong><span style="font-weight: 400;">&nbsp; to protect our rights and interests, your rights and interest, and the rights and interests of our customers; and&nbsp;</span></li>
                            <li style="font-weight: 400;" aria-level="2"><strong>Other Purposes: </strong><span style="font-weight: 400;">As permitted by applicable law and as detailed in our </span><a href="https://www.telusinternational.com/privacypolicy/contributors"><span style="font-weight: 400;">Community Data Privacy Notice</span></a><span style="font-weight: 400;">.</span></li>
                            </ul>
                            </ul>
                            <p><span style="font-weight: 400;">Customer Use of Your Data</span><span style="font-weight: 400;">: Customer will use your personal data according to their Privacy Notice which will be provided to you.</span></p>
                            <p><strong>Sharing</strong><strong>:&nbsp;</strong></p>
                            <p><span style="font-weight: 400;">TIAI may share your personal data as follows:</span></p>
                            <ul>
                            <li style="font-weight: 400;" aria-level="1"><strong>Our Customer:</strong><span style="font-weight: 400;"> we will share with our Customer: year, month, and date of birth, state of residence, gender, family’s ancestry (ethnicity), skin color, eye color, height, weight, hair (color, type, length, density, diameter), facial hair, vision correction (no glasses, contact lenses or glasses for nearsightedness). This data will exclude your contact information such as name and email, therefore, our Customer will not be able to identify you. <br /></span>Our Customer will use the Data for its own research purposes as described in its Privacy Notice.&nbsp;</li>
                            </ul>
                            <ul>
                            <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">For purposes set forth in any other notice provided to you and as set forth in our </span><a href="https://www.telusinternational.com/privacypolicy/contributors"><span style="font-weight: 400;">Community Data Privacy Notice</span></a><span style="font-weight: 400;">.</span></li>
                            </ul>
                            <p><strong>Data Subject Rights</strong><span style="font-weight: 400;">:&nbsp; In certain countries, you may exercise certain rights with regard to your personal data. Please see our Community Data Privacy Notice for information about your rights.&nbsp;</span></p>
                            <p><strong>Transfer of Data</strong><em><span style="font-weight: 400;">:&nbsp; </span></em><span style="font-weight: 400;">We may transfer your data to a third country that does not have the same level of data protection as your home country. Please see our Community Data Privacy Notice for additional information.&nbsp;</span></p>
                            <p><strong>Consent to the Collection of Personal Data:</strong><span style="font-weight: 400;">&nbsp;</span></p>
                            <p><span style="font-weight: 400;">[ ] Yes, I consent to TIAI’s collection of my personal data “Data Collected”. TIAI will retain my personal data for one year, unless local law requires a shorter period.</span></p>
                            <p><span style="font-weight: 400;">[ ] Yes, I consent to the collection of my personal data “Data Collected” by TIAI’s customer.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">[ ] Yes, I consent to TIAI’s collection of my health information. TIAI will retain my health information for one year, unless local law requires a shorter period.</span></p>
                            <p><span style="font-weight: 400;">[ ] Yes, I consent to the collection of my health information by TIAI’s customer.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">[ ] Yes, I consent to TIAI’s collection of my racial or ethnic origin data. TIAI will retain my racial or ethnic origin data for one year, unless local law requires a shorter period.</span></p>
                            <p><span style="font-weight: 400;">[ ] Yes, I consent to the collection of my racial or ethnic origin data by TIAI’s customer. </span></p>
                            <p style="text-align: center;"><strong>Contributor Services Agreement and Release</strong></p>
                            <p><span style="font-weight: 400;">Hello and welcome to the community of Independent Contractors for TELUS International AI Inc. (the “Company”)!&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">All of the Services (defined below) provided by you (the “</span><strong>Independent Contractor</strong><span style="font-weight: 400;">” or “</span><strong>you</strong><span style="font-weight: 400;">”) to the Company are governed by the terms and conditions set out in this Contributor Services Agreement (the “</span><strong>Agreement</strong><span style="font-weight: 400;">”).&nbsp; Please be sure to review the terms and conditions carefully.&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">By acknowledging this Agreement, you also confirm to have read and understand the terms of the Agreement, which has been provided [and originally drafted] in the English language.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">En cliquant sur Accepter, vous confirmez également avoir lu et compris les termes du Contrat qui a été fourni et rédigé à l'origine en anglais.&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">By acknowledging this Agreement, you consent to signing or acknowledging TELUS International documents electronically, and agree that your electronic signature will have the same legal effect as a hand-written signature. Once accepted, a copy of this Agreement will be made available for download in the “Agreements” section of your profile on the platform.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;Independent Contractor and Company agree as follows:</span></p>
                            <ol>
                            <li style="font-weight: 400;" aria-level="1"><strong>Services.</strong></li>
                            </ol>
                            <p><span style="font-weight: 400;">1.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Services and Deliverables</span><span style="font-weight: 400;">.&nbsp; Company will propose services to be performed by the Independent Contractor (the “</span><strong>Services</strong><span style="font-weight: 400;">”) and for each Service will provide information concerning the required deliverables (the “</span><strong>Deliverables</strong><span style="font-weight: 400;">”), fees payable, due dates and other business terms that apply to the Services.&nbsp; Company may propose Services through the platform or other means as communicated to Independent Contractor by Company. Independent Contractor may accept the opportunity or decline to provide the Services in Independent Contractor’s sole and absolute discretion without any form of detriment to the Independent Contractor.&nbsp; If Independent Contractor accepts the opportunity, Independent Contractor represents and warrants that Independent Contractor:&nbsp;</span></p>
                            <ol>
                            <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">will perform the Services and provide the Deliverables in accordance with all of the specifications and other requirements included in the Work Statement that are incorporated herein by reference and form the terms of the Agreement;</span></li>
                            <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">will perform the Services in a highly skilled and professional manner consistent with the highest professional standards in the industry;&nbsp;&nbsp;</span></li>
                            <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">has the necessary qualifications and training/expertise required to deliver the Services and the Deliverables, which will be created solely by Independent Contractor;</span></li>
                            <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">will provide the Services and Deliverables to Company free and clear of any liens or third-party rights, and in so doing, this Agreement will not breach or conflict with any other obligation or agreement to which Independent Contractor is a party or any contractual or confidentiality obligation Independent Contractor owes to a third party; and&nbsp;</span></li>
                            <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">shall promptly correct any failure of the Services or the Deliverables to conform to the above warranty at Independent Contractor's sole cost and expense.&nbsp;&nbsp;</span></li>
                            </ol>
                            <p><span style="font-weight: 400;">Subject to Independent Contractor meeting the requirements for the Services set out or otherwise communicated by Company, Independent Contractor will have the control and reasonable discretion as to the manner and means of performing the Services including full autonomy as to work schedule and tools, materials and equipment used to complete the Services. Independent Contractor represents and warrants that Services and Deliverables to Company and under this Agreement will not breach or conflict with any agreement to which Independent Contractor is a party or any contractual obligation Independent Contractor owes to a third party.</span></p>
                            <p><span style="font-weight: 400;">&nbsp;1.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Review</span><span style="font-weight: 400;">.&nbsp; Company (or its customer, as applicable) will review each Deliverable and may provide Independent Contractor with requested corrections to align Services and Deliverables with Company’s expectations.&nbsp; Independent Contractor will promptly make all corrections requested by Company that are reasonably within the scope of the Services for no additional fee.&nbsp; If any requested change is outside of the scope of the Services and/or Deliverables, Independent Contractor will promptly notify Company, and Independent Contractor will agree on revised Deliverables and delivery dates thereto.&nbsp; Any modifications must be agreed to in writing by both parties to be effective.&nbsp;&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;1.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Payment</span><span style="font-weight: 400;">.&nbsp; Company will pay Independent Contractor for all Services and Deliverables as described in the Services Request but no later than sixty (60) days from either the issuance of the applicable invoice or, where fees are calculated automatically through the platform based on Services and Deliverables provided and mutually agreed under the Agreement, the end of the Term.&nbsp; Independent Contractor agrees that the fees offered will be full and complete compensation for Independent Contractor’s performance of the Services and provision of the Deliverables and shall be inclusive of any taxes.&nbsp; Independent Contractor will be solely responsible for all costs and expenses associated with the Services.&nbsp; Independent Contractor is also solely responsible for the payment of any taxes, fees, costs or otherwise to the appropriate tax authority in a timely manner and as prescribed by law.</span></p>
                            <p><span style="font-weight: 400;">1.4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Equipment.</span><span style="font-weight: 400;"> Independent Contractor agrees to supply, at its own expense, all tools and materials necessary for Independent Contractor to perform the Services, including, but not limited to, all necessary hardware, software, equipment and supplies. Under exceptional circumstances, the Company may furnish materials and equipment to Independent Contractor. Any materials and equipment furnished by Company to Independent Contractor in connection with this Agreement, unless fully paid for by Independent Contractor, are and will remain the property of Company and will be deemed to be loaned to Independent Contractor. Upon the earlier of Company’s request or the expiry or termination of the Agreement, Independent Contractor shall provide, to Company or to Company’s designate, all Company equipment and materials related to the Services covered under the Agreement in the same condition as they were when furnished by Company. Final payment by Company of the fees for Services and Deliverables will be contingent on the return of such equipment and materials in addition to any other legal remedies the Company may have.</span></p>
                            <p><span style="font-weight: 400;">&nbsp;1.5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Company Requirements</span><span style="font-weight: 400;">.&nbsp; Independent Contractor will comply with all requirements and policies provided to Independent Contractor by Company or the applicable Company customer (collectively, the “Requirements”).&nbsp; In addition to the Requirements, Independent Contractor agrees to comply with&nbsp;Company’s Supplier Code of Conduct found at </span><a href="http://www.telus.com/suppliercodeofconduct"><span style="font-weight: 400;">www.telus.com/suppliercodeofconduct</span></a><span style="font-weight: 400;"> and any and all requirements concerning information security measures in performance of Independent Contractor’s obligations and in all cases, no less than commercially reasonable standards. Independent Contractor shall observe and comply with all applicable laws, regulations, ordinances, and codes of governmental entities relating to the provision of the Services and Deliverables.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
                            <ol start="2">
                            <li><strong>Confidentiality.</strong></li>
                            </ol>
                            <p><span style="font-weight: 400;">&nbsp;2.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Definition</span><span style="font-weight: 400;">.&nbsp; “</span><strong>Confidential Information</strong><span style="font-weight: 400;">” means any non-public information (of Company or Company’s customers) that is provided to Independent Contractor by Company or any of Company’ affiliates, customers, business partners, third parties or independent contractors. Confidential Information includes, but is not limited to, (i) all software, documentation, financial, marketing and customer data (including, Company data, customer information, personal data,&nbsp; retention plans, strategies and other business information, (ii) any rating procedures, rules and guidelines, systems and processes, ratings hub, and the underlying methodologies and processes of the foregoing and all related training and documentation, and (iii) any discoveries, inventions, trade secrets, research and development efforts, know-how and show-how, and all deliverables, derivatives, improvements, and enhancements to any of the above.&nbsp; “Confidential Information” does not include information that: (a) was rightfully known to Independent Contractor, without any obligation of confidentiality, prior to receiving the same information from Company; (b) is or becomes publicly available without breach of any confidentiality obligation; or (c) is rightfully obtained by Independent Contractor from a source other than Company without breach of any confidentiality obligation.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;2.2&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Use of Information</span><span style="font-weight: 400;">.&nbsp; Independent Contractor understands that Confidential Information constitutes a valuable and unique asset to the Company.&nbsp; Independent Contractor will use Confidential Information only for the purpose of providing the Services and Deliverables and will not disclose, distribute, transfer, sell, share, destruction or otherwise use (“Use”) it for Independent Contractor’s own benefit or the benefit of any other party.&nbsp; Independent Contractor will not disclose or distribute Confidential Information to any third party without Company’s prior written consent.&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;2.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Protection of Information</span><span style="font-weight: 400;">.&nbsp; Independent Contractor will protect Confidential Information from any unauthorized use or disclosure, including implementing all reasonable security measures needed to protect the Confidential Information.&nbsp; Independent Contractor will notify Company immediately if Independent Contractor becomes aware of any unauthorized Use of any Confidential Information, including any personal data received by Independent Contractor in the course of performing the Services.&nbsp; Independent Contractor may disclose Confidential Information pursuant to a valid order issued by a court or government agency; provided that, Independent Contractor gives Company at least ten (10) days prior written notice of such obligation and the opportunity to oppose such disclosure or obtain a protective order or the equivalent.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;2.4&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Customer Information</span><span style="font-weight: 400;">.&nbsp;&nbsp; </span><strong>In addition to and without reducing any other obligation set out in this Agreement, Independent Contractor specifically acknowledges that all information related to any Company customer, including</strong><strong><em> any</em></strong><strong> information about a customer’s business, product plans, strategic relationships, etc., is to be held in the </strong><strong><em>strictest confidence</em></strong><strong>.&nbsp; Independent Contractor must not disclose any information about the Services and Deliverables provided by Independent Contractor or the Company’s or customer’s identity or Confidential Information in </strong><strong><em>any</em></strong><strong> materials, including, without limitation, postings in social media or on the Company or Independent Contractor’s website.&nbsp; Independent Contractor must not duplicate any images, text, video, audio, or other content provided to Company by Independent Contractor or from Company to Independent Contractor, other than as strictly needed to perform the Services</strong><span style="font-weight: 400;">.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;2.5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Return of Information</span><span style="font-weight: 400;">.&nbsp; All Confidential Information will remain the property of the Company.&nbsp; Upon Company’ request or upon the termination of this Agreement, or Services Request, Independent Contractor will promptly return or destroy, at Company’s option, all copies of Confidential Information and the Deliverables and certify the completion of Independent Contractor’s obligations under this Section in writing.&nbsp;&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;2.6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Investigations and Audits</span><span style="font-weight: 400;">.&nbsp; Independent Contractor will cooperate fully in any investigation of any unauthorized Use of Confidential Information and will promptly provide requested information and reasonable access to any information or systems (e.g., documents or work systems).&nbsp; Independent Contractor will cooperate in any reasonable audit regarding its obligations under this Agreement, required by law or under Company’s contracts with its customers.&nbsp; Company will provide the Independent Contractor with reasonable notice and an explanation in connection with any audit.&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;2.7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Protection of Business Interests</span><span style="font-weight: 400;">.&nbsp; Independent Contractor will not directly or indirectly solicit any customer of Company for any business or other opportunity based on any information learned in the course of providing the Services or that was otherwise provided by Company.&nbsp;&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;2.8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Court-granted Relief</span><span style="font-weight: 400;">.&nbsp; Independent Contractor acknowledges that any breach of its obligations under this Agreement will result in irreparable harm to the Company.&nbsp; In the event of an actual or threatened breach of this Agreement, Company will be entitled to immediate injunctive relief in addition to any other legal relief available to it.&nbsp;</span></p>
                            <ol start="3">
                            <li><strong>Relationship</strong><span style="font-weight: 400;">. Independent Contractor is engaged as, and shall perform the Services as an independent contractor, and&nbsp;Independent Contractor acknowledges that Independent Contractor will not be considered an employee, agent, joint venture or partner of Company or any of its customers, under the provisions of this Agreement or otherwise.&nbsp; Independent Contractor shall not receive nor be entitled to any employment-related benefit or entitlement such as vacation pay, holiday pay, termination notice, payment in lieu of termination notice, or severance pay, in connection with the performance of its obligations under this Agreement.&nbsp; Independent Contractor does not have and will not have any authority to bind Company or assume or create any obligation on behalf of Company, and Independent Contractor will not represent to any third party that Independent Contractor has any such authority.&nbsp; No part of Independent Contractor’s compensation will be subject to withholding by Company or payment by the Company for the payment of social insurance, pension plan, social security, unemployment insurance, or disability insurance or their equivalents or any other similar tax obligations, unless otherwise required by laws applying to Company.&nbsp;<br /><br /></span></li>
                            <li><strong>Legal Compliance</strong><span style="font-weight: 400;">.</span></li>
                            </ol>
                            <p><span style="font-weight: 400;">&nbsp;4.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Personal Data</span><span style="font-weight: 400;">.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">(a)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Independent Contractor’s Personal Data</span><span style="font-weight: 400;">. Independent Contractor acknowledges and agrees that Company has provided Independent Contractor, where applicable, with a description of personal data that Company will collect, as well as a description of Company’s use and disclosure of such personal data, in connection with Independent Contractor’s performance of the Services and Deliverables. Such data may include contract data, demographic data, or Work Product Data, (collectively, the “</span><strong>data</strong><span style="font-weight: 400;">”), unless otherwise distinguished among types of data. Independent Contractor represents that any data, including any personal data, that it submits in connection with the Services is that of Independent Contractor, or, if Independent Contractor submits any data, including any personal data, from any person under the age of 18, or the age of majority in your jurisdiction, that you are the legal parent or guardian with appropriate legal authority (“</span><strong>Guardian</strong><span style="font-weight: 400;">”) to provide such data, including personal data. Where the participant is under 18 years of age, or the legal age in your country (“</span><strong>Minor Participant</strong><span style="font-weight: 400;">”), Independent Contractor represents that you have full power and authority to grant all rights and licenses related to the participant’s participation. Where applicable, Independent Contractor provides consent for any minor data subject to participate in any data collection activity and agrees that such participation is part of the Services. References to “you” or “your” include any personal data that Independent Contractor provides pertaining to a minor. Guardian gives consent for Minor Participant to participate in this Program. With respect to all Data required to participate in the Project, Guardian acknowledges and agrees that Guardian will submit, or, as applicable, work directly with Company personnel to submit, all such Data to Company.&nbsp; Guardian expressly acknowledges and agrees that Guardian will not cause any Minor Participant to provide, upload or submit any such Data directly to Company. By executing this Agreement, Guardian consents to the Processing of Guardian and Minor Participant data.&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">(b) Company shall use and disclose any personal data that Independent Contractor submits as part of the Services in accordance with any notice provided to you and the Community Data Privacy Notice. In the event of a conflict between this Contributor Services Agreement and Release and the </span><a href="https://www.telusinternational.com/privacypolicy/contributors"><span style="font-weight: 400;">Community Data Privacy Notice</span></a><span style="font-weight: 400;">, the terms of this Agreement will govern. Independent Contractor shall not provide any personal data beyond what is necessary to perform the Services. If Company is collecting your personal data on behalf of a customer, your personal data will be shared with such customer in accordance with this Contributor Services Agreement and any notices provided to you, and Company is not responsible for customer’s use of your personal data. Where permitted by applicable law, and with your consent, as required by law, you acknowledge and agree that Company’s customer may collect and use biometric information from your personal data, including, without limitation, retinal or iris scan, fingerprints, voiceprints, facial geometry or other facial measurements, and other processes that may be deemed as a biometric collection.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">(c) The Community Data Privacy Notice includes information about how to contact Company with any questions or concerns regarding use of personal data as well as any rights you have with regard to your personal data. Except as otherwise prohibited by applicable law, Company is unable to delete, erase, return, or otherwise provide you with access to any personal data that you provide to it in connection with your performance of the Services. By executing this Agreement and providing the Services, you consent to the processing of your data, including your personal data, provided in the course of performing the Services, and to the transfer of your data to Company’s customer. You acknowledge and agree, as required by applicable law, that your personal data may be transferred to and processed in a location, including the United States, other than your place of residence.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">(d) Release. Independent Contractor understands and agrees that any data, including, personal data, except as otherwise prohibited under applicable law, shall become and remain the property of Company and Company’s customer and that Independent Contractor shall have no right, title or interest in data provided in connection with the Services.&nbsp; In the event the foregoing is a violation of applicable law or the transfer is not effective for any reason, You and Guardian hereby irrevocably and unconditionally grant to Company and Company’s customer a royalty-free, worldwide, irrevocable, perpetual, non-exclusive right and license (but not an obligation) to, and to permit others to, collect, use, share, sell, store, copy, create derivative works, and display any participant’s name, voice, likeness, appearance, actions, voice, conversations and characteristics/mannerisms, photographs and video, and any and all information supplied by or about me, including biographical information and/or other materials I may provide, as well as other information Company may have received from other sources (“Appearance”), and disclose, transfer and otherwise process any data in perpetuity (“Process”) in connection with the notice(s) provided to you and to any intellectual property, rights of publicity, and any other legal rights necessary in order for Company, Company’s customer and others to use the data for the purposes as described in any notices provided to you and the Community Data Privacy Notice. To the maximum extent permitted by law, Independent Contractor, including on behalf of Guardian and/or Minor Participant, hereby release Company, its customers, successors, assignees and licensees and each of their respective parents, subsidiaries and affiliated companies (all such individuals and entities collectively referred to as the “Released Parties”) from any claim of any kind or nature whatsoever arising from the use of the Appearance including, without limitation, any and all claims, demands, or liabilities for invasion of privacy, infringement of my right of publicity, defamation (including libel and slander) and any other personal and/or property rights (collectively, the “</span><strong>Released Matters</strong><span style="font-weight: 400;">”).&nbsp; I intend and agree that this Release shall be effective as a full and final accord and satisfaction and general release of and from all Released Matters.&nbsp; In connection with this waiver, I acknowledge that I am aware that I may hereafter discover claims presently unknown or unsuspected, or facts in addition to or different from those which I now know or believe to be true, with respect to the subject matter of this Release.&nbsp; Nevertheless, I intend by this Agreement to release fully, finally and forever all Released Matters under this Release.&nbsp; In furtherance of such intention, the releases set forth in this Agreement shall be and shall remain in effect as full and complete releases notwithstanding the discovery or existence of any such additional or different claims or facts relevant hereto. This study does not pose any known significant physical or psychological risks or benefits. If Independent Contractor feels uncomfortable at any time, please contact Company at [insert].</span></p>
                            <p><span style="font-weight: 400;">(e) </span> <span style="font-weight: 400;">Personal Data</span><span style="font-weight: 400;">.&nbsp; Independent Contractor acknowledges that some of the content that Independent Contractor may receive in connection with the Services or may generate in the course of providing the Services may include personal data, and acknowledges that personal data is and shall remain the exclusive property of the Company.&nbsp; Independent Contractor will treat all such personal data as Confidential Information as described in Section 2 above.&nbsp; In addition, Independent Contractor will Use any such Confidential Information solely as directed by the Company and for no other purpose.&nbsp;&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;4.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Legal Compliance</span><span style="font-weight: 400;">.&nbsp; Independent Contractor will comply with all laws, rules and regulations in connection with Independent Contractor’s performance of the Services, including all registration as an independent contractor, as required, reporting and other obligations related to operating a business in Independent Contractor’s jurisdiction, </span><em><span style="font-weight: 400;">for example</span></em><span style="font-weight: 400;">, regulations prohibiting bribery, money laundering and discrimination.&nbsp; Independent Contractor represents and warrants that Independent Contractor has the legal authority to enter into this Agreement any and that all of the information they provide to Company in any application or any required form is accurate and complete.&nbsp; Additionally, Independent Contractor represents and warrants that Independent Contractor is not subject to any contractual obligations that interfere with or prohibit Independent Contractor’s performance of the Services or provision of the Deliverables.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">For Independent Contractors operating in France, Independent Contractor represents and warrants that Independent Contractor is duly registered with the </span><em><span style="font-weight: 400;">Registre du Commerce et des Sociétés</span></em><span style="font-weight: 400;"> as an independent contractor and shall produce any evidence of Independent Contractor’s compliance with independent contractor’s tax and social security regulations as required by the Company under applicable laws.</span></p>
                            <ol start="5">
                            <li><strong>Proprietary Rights.</strong></li>
                            </ol>
                            <p><span style="font-weight: 400;">&nbsp;5.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Ownership</span><span style="font-weight: 400;">.&nbsp; To the extent permitted by applicable law, Independent Contractor agrees that the Services are provided on a “work-for-hire” basis and that all right, title and interest in any and all intellectual property rights (including, </span><em><span style="font-weight: 400;">for example</span></em><span style="font-weight: 400;">, all copyrights, trademarks, patents, trade secret rights and all contract and licensing rights) developed by Independent Contractor (either individually or in collaboration with others) relating to the Services and Deliverables (collectively, the “Work Product”) will be the sole and exclusive property of Company.&nbsp; Independent Contractor acknowledges that Company’s rights to the Work Product are exclusive to Company and include, </span><em><span style="font-weight: 400;">for example</span></em><span style="font-weight: 400;">, the right to use, adapt, reproduce, distribute, broadcast, display and make derivative works (“Exploit”) of the Work Product in any and all media and all formats now known or later developed.&nbsp; In addition, all files, records, documents, drawings, specifications, equipment and similar items related to Company’s business, whether prepared by Independent Contractor or otherwise coming into Independent Contractor’s possession, will remain the exclusive property of Company.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;5.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Assignment of Rights</span><span style="font-weight: 400;">.&nbsp; To the extent permitted by applicable law, Independent Contractor hereby irrevocably assigns and transfers to Company all right, title and interest in and to the Work Product.&nbsp; Independent Contractor acknowledges that the Company will have the sole and exclusive worldwide right, title and interest in perpetuity to Use and Exploit all or any part of the Work Product.&nbsp; Independent Contractor agrees they will not assert any moral rights in the Work Product and, to the extent permitted by applicable law, hereby waives all such moral rights. In addition, Independent Contractor agrees to execute any documents as the Company may request evidence or otherwise protect Company’s ownership of the Work Product.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;5.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Third Party Rights</span><span style="font-weight: 400;">.&nbsp; Independent Contractor will not Use or Exploit any third party materials or otherwise infringe any third party privacy, publicity, or property right of any kind in the performance of the Services or provision of the Deliverables.&nbsp; Independent Contractor will not disclose any third-party confidential information to Company at any time.</span></p>
                            <ol start="6">
                            <li><strong>Term and Termination.</strong><span style="font-weight: 400;"> Subject to the terms of this Section, this Agreement will become effective when accepted by Independent Contractor and will remain in effect until terminated by either Independent Contractor or Company for a period of twelve (12) months unless terminated earlier by either Independent Contractor or Company as provided below (the “Term”). Thereafter, this Agreement will automatically be extended for consecutive one (1) year term, unless otherwise terminated as provided in this Agreement.&nbsp; The Parties may terminate this Agreement at any time on written notice to Company; provided Independent Contractor completes any Services that Independent Contractor has agreed to provide prior to Independent Contractor’s termination of the Agreement and provided that the Company will pay Independent Contractor for all Services properly performed as of the termination date.&nbsp; After termination of this Agreement, Independent Contractor and Company will continue to comply with the following Sections of this Agreement: Section 2 (Confidentiality), Section 3 (Relationship), Section 4 (Legal Compliance), Section 5 (Proprietary Rights), Section 8 (Company Contracting Party and Governing Law), Section 9 (General) and Section 10 (Arbitration).&nbsp;<br /><br /></span></li>
                            <li><strong>Limitation of Liability and Indemnity.&nbsp;</strong></li>
                            </ol>
                            <p><span style="font-weight: 400;">&nbsp;7.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES WHATSOEVER ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT OR THE PROVISION OF THE SERVICES OR DELIVERABLES, INCLUDING LOST PROFITS, ANTICIPATED OR LOST REVENUE. IN NO EVENT SHALL COMPANY BE LIABLE TO INDEPENDENT CONTRACTOR FOR ANY INJURY, CLAIM, LOSSES, DAMAGES, LIABILITIES, OR COSTS (INCLUDING, WITHOUT LIMITATION, LEGAL FEES) OF ANY NATURE ARISING OUT OF OR RELATED TO THIS A</span><em><span style="font-weight: 400;">G</span></em><span style="font-weight: 400;">REEMENT, THE SERVICES OR THE DELIVERABLES IN EXCESS OF THE AMOUNT WHICH COMPANY PAID FOR THE FEES PAYABLE TO INDEPENDENT CONTRACTOR FOR THE SERVICES AND DELIVERABLES FOR THE THREE (3) PRIOR MONTHS PRECEDING THE FIRST EVENT OR MATTER THAT GAVE RISE TO THE CLAIM, LOSS, DAMAGE OR COST.</span></p>
                            <p><span style="font-weight: 400;">&nbsp;7.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Independent Contractor shall, at its own expense, defend, indemnify, and hold harmless Company, its affiliates and successors, and each of their respective directors, officers and employees (each a “Company Indemnitee”)from and against any and all damages, expenses, liabilities, costs, penalties, losses and claims of whatever nature (including legal fees and expenses)(“Damages”) arising from or attributable to the Independent Contractor in connection with its performance of Services, provision of the Deliverables, any breach of this Agreement by Independent Contractor or any determination by any court, arbitrator, taxing authority, government entity, agency, ministry or adjudicating body that the relationship between the Company and Independent Contractor, is not an independent contractor relationship, including any and all Damages any Company Indemnitee may suffer as a result of enforcing the indemnification provisions set out in this section 7.2.&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;7.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Independent Contractor shall (to the extent permitted by applicable law), at its own expense, indemnify, defend and hold Company, its affiliates and their respective directors, officers and employees harmless each Company Indemnitee from a determination by any court, arbitrator, taxing authority, government entity, agency, ministry or adjudicating body that the relationship between the Company and Independent Contractor, is not an independent contractor relationship, including any and all damages, expenses, liabilities, costs, penalties, losses and claims any Company Indemnitee may suffer as a result of enforcing the indemnification provisions set out in this section 7.3.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">WITHOUT LIMITING ANY INDEMNITY SET FORTH ABOVE, INDEPENDENT CONTRACTOR, ON YOUR OWN OR ON PARTICIPANT’S BEHALF, AS APPLICABLE, AGREE TO DISCHARGE COMPANY AND COMPANY”S CLIENT AND EACH OF THEIR AGENTS, OFFICIALS, EMPLOYEES, OFFICERS, DIRECTORS, AND AFFILIATES (“AGENTS”) OF AND FROM ANY AND ALL CLAIMS, DEMANDS, CAUSES OF ACTION, EXPENSES OR DAMAGES AND LIABILITIES OF EVERY KIND AND NATURE IN LAW OR EQUITY, THAT YOU, AND/OR YOUR&nbsp; MINOR PARTICIPANT HAD OR MAY HAVE, ARISING FROM OR IN ANY WAY RELATED TO THIS STUDY OR THE PROCESSING DATA PROVIDED IN THE SERVICES, PROVIDED THAT THIS WAIVER OF LIABILITY DOES NOT APPLY TO ANY ACTS BY COMPANY OR COMPANY’S CLIENT OR EACH OF THEIR AGENTS OF INTENTIONAL, WILLFUL OR WANTON MISCONDUCT.&nbsp;</span></p>
                            <ol start="8">
                            <li><strong>Company Contracting Party and Governing Law</strong><span style="font-weight: 400;">.</span></li>
                            </ol>
                            <p><span style="font-weight: 400;">&nbsp;8.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This Agreement will be governed exclusively by the laws of the State of Delaware, without reference to any conflict of laws principles that would require the application of the laws of any other jurisdiction.&nbsp; Additionally, the provisions of Section 10 (Arbitration) below will apply to Independent Contractor.&nbsp;</span></p>
                            <ol start="9">
                            <li><strong>General. </strong><span style="font-weight: 400;">This Agreement, the Requirements, and Service Request(s) embody the entire understanding between the parties concerning the subject matter hereof and supersede any and all other negotiations or agreements between the parties.&nbsp; This Agreement cannot be modified except in the form of a writing accepted by both parties.&nbsp; This Agreement has no third party beneficiaries other than Company’s customers, who may enforce the terms of this Agreement or any applicable Requirements directly.&nbsp; No failure of either party to exercise or enforce any of its rights under this Agreement will act as a waiver of any of its rights.&nbsp; Independent Contractor will not subcontract or assign any of Independent Contractor’s rights or obligations under this Agreement or the Requirements without the prior written consent of Company.&nbsp; This Agreement shall benefit and be binding upon the Company’s successors, affiliates and assigns. Should any provision of this Agreement be found unenforceable, such provision will be enforced to the fullest extent permitted by law and the remainder of this Agreement will remain in full force and effect.&nbsp;<br /><br /></span></li>
                            <li><strong>Arbitration (US-based Independent Contractors only)</strong><span style="font-weight: 400;">.</span></li>
                            </ol>
                            <p><span style="font-weight: 400;">10.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Exclusive Use of Arbitration</span><span style="font-weight: 400;">.&nbsp; Independent Contractor and Company mutually agree to resolve any disputes exclusively through final and binding arbitration instead of filing a lawsuit in court.&nbsp; This arbitration provision is governed by the Federal Arbitration Act (9 U.S.C. §§ 1-16) and will apply to any and all claims arising out of or relating to the Services, the Requirements, this Agreement, the nature of the relationship between Independent Contractor and Company (including any Company affiliates or customers) and all other aspects of Independent Contractor’s relationship with Company whether arising under federal, state or local statutory or common law. &nbsp;</span><strong>The arbitrator will have the exclusive authority to resolve any dispute relating to the interpretation, applicability, enforceability, or formation of this arbitration provision, other than Sections 10.2 and 10.3 below relating to the Class Action Waiver or Representative Action Waiver</strong><span style="font-weight: 400;">.&nbsp; </span><strong>Independent Contractor acknowledges this means such disputes will not be resolved by a court or jury trial.&nbsp;&nbsp;</strong></p>
                            <p><span style="font-weight: 400;">&nbsp;10.2 &nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Class Action Waiver</span><span style="font-weight: 400;">.&nbsp; </span><strong>Independent Contractor and Company mutually agree that by agreeing to arbitrate any dispute, each waives its right to have any dispute or claim brought, heard or arbitrated as a class action or collective action and that the arbitrator will not have any authority to hear or arbitrate any class or collective action</strong><span style="font-weight: 400;"> (“</span><strong>Class Action Waiver</strong><span style="font-weight: 400;">”).</span></p>
                            <p><span style="font-weight: 400;">&nbsp;10.3 &nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Representative Action Waiver</span><span style="font-weight: 400;">.&nbsp; </span><strong>Independent Contractor and Company mutually agree that by agreeing to arbitrate, each waives its right to have any dispute or claim brought, heard or arbitrated as a representative action and that the arbitrator will not have any authority to arbitrate a representative action</strong><span style="font-weight: 400;"> ("</span><strong>Representative Action Waiver</strong><span style="font-weight: 400;">").</span></p>
                            <p><span style="font-weight: 400;">&nbsp;10.4 &nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Process</span><span style="font-weight: 400;">.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (i) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Notice</span><span style="font-weight: 400;">.&nbsp; If either party wishes to initiate arbitration, the initiating party must notify the other party in writing delivered by courier or other verifiable delivery method.&nbsp; The notice must include (a) the name and address of the party seeking arbitration, (b) a statement of the legal and factual basis of the claim, and (c) a description of the remedy sought.&nbsp;</span></p>
                            <p><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (ii)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-weight: 400;">Procedural Requirements</span><span style="font-weight: 400;">.&nbsp; The arbitration will be governed by the terms of this Section and, except as otherwise provided in this Section 10, by the Judicial Arbitration and Mediation Services (“JAMs Rules”).&nbsp; The arbitration will be heard by one arbitrator selected in accordance with the JAMs Rules.&nbsp; The arbitrator will apply the state or federal substantive law, as applicable.&nbsp; The arbitrator may issue orders (including subpoenas to third parties) allowing the parties to conduct discovery sufficient to allow each party to prepare that party’s claims and defenses, taking into consideration that arbitration is designed to be a speedy and efficient method for resolving disputes.&nbsp; The arbitrator may hear motions and will apply the standards of the Federal Rules of Civil Procedure governing such motions.&nbsp; Except as provided in the Class Action Waiver and Representative Action Waiver, the arbitrator may award only remedies that would otherwise be available in a court of law.&nbsp; The arbitrator’s decision or award will be in writing with findings of fact and conclusions of law and will be final and binding on the parties.&nbsp; Notwithstanding the foregoing, either party may apply to a court of competent jurisdiction for temporary or preliminary injunctive relief as needed to protect such party’s rights.&nbsp;</span></p>
                            <ol start="11">
                            <li><strong>Advice of Counsel</strong><span style="font-weight: 400;">. Independent Contractor has the right to consult with private counsel of Independent Contractor’s choice with respect to any aspect of, or any claim that may be subject to, this Agreement, including this arbitration provision, at Independent Contractor’s sole expense.<br /><br /></span></li>
                            <li><strong>Enforceability</strong><span style="font-weight: 400;">. In the event any portion of the arbitration provision and/or the Agreement is deemed unenforceable, the remainder of the arbitration provision and/or the Agreement will remain in full force and effect.<br /><br /></span></li>
                            <li><strong>Prevailing Language.</strong><span style="font-weight: 400;"> The parties have expressly requested that this contract be drafted in the English language. </span><em><span style="font-weight: 400;">Les parties ont expressément requis que ce contrat soit rédigée en anglais. </span></em><span style="font-weight: 400;">If this Agreement is translated into a language other than English for any purpose, the English version shall prevail in the event of any differences, questions or disputes concerning the meaning, form, validity or interpretation of this Agreement.<br /></span></li>
                            </ol>`
                        + `</div>`
                }, {
                    name: "sdc_fname",
                    title: "First name:",
                    type: "text",
                    isRequired: true,
                    defaultValueExpression: "{firstName}",
                    visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'",
                    readOnly: true
                },
                {
                    name: "grd_sdc_fname",
                    title: "First name:",
                    type: "text",
                    isRequired: true,
                    defaultValueExpression: "{guardianFirstName}",
                    startWithNewLine: false,
                    visibleIf: "{registeredAs} = 'I am a parent or guardian registering a child under 18'",
                    readOnly: true
                }, {
                    name: "sdc_lname",
                    title: "Last name:",
                    type: "text",
                    isRequired: true,
                    startWithNewLine: false,
                    defaultValueExpression: "{lastName}",
                    readOnly: true,
                    visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'"
                }, {
                    name: "grd_sdc_lname",
                    title: "Last name:",
                    type: "text",
                    isRequired: true,
                    startWithNewLine: false,
                    defaultValueExpression: "{guardianLastName}",
                    visibleIf: "{registeredAs} = 'I am a parent or guardian registering a child under 18'",
                    readOnly: true,
                }, {
                    name: "csadate",
                    title: "Agreement Date",
                    type: "text",
                    inputType: "date",
                    defaultValueExpression: "today()",
                    minValueExpression: "today()",
                    isRequired: true,
                    startWithNewLine: false,
                    readOnly: true

                }, {
                    type: "signaturepad",
                    name: "sdcSignature",
                    title: "Signature",
                    signatureWidth: 700,
                    signatureHeight: 400,
                    penColor: "black",
                    isRequired: true,
                }
                ]
            }
            ]
        }
    ],


};
