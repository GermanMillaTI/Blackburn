const Constants = {
    tobeExcluded: [
        "signature",
        "signatureFirstName",
        "signatureLastName",
        "termsAgreement",
        "futureProjectsInterest",
        "identificationFile",
        "agreementConfirmation",
        "scd_fname",
        "scd_lname",
        "scd_signature",
        "noAvailabilityReason",
        "registeredAs",
        "gender",
        "agreementConfirmation"
    ],
    savedIfYesOnly: [
        "interestedInRecruiting",
        "isMultipleEthnicities",
        "isPregnant",
        "onsiteAvailability"
    ],
    registeredAs: {
        0: 'I am registering as a participant over the age of 18',
        1: 'I am a parent or guardian registering a child under 18'
    },
    genders: {
        // Do no modify these in any case !!
        0: "Male",
        1: "Female",
        2: "Non-binary",
        3: "Prefer not to say'"
    },

    getKeyByValue: function (obj, value) {
        return Object.keys(obj).find(key => obj[key] === value);
    }

}

export default Constants;