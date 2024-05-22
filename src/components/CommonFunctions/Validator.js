import Constants from "../Constants";

const Validator = {

    rejectionValidator: function (formObj) {
        const isPregnant = formObj['isPregnant'] === "Yes";
        const healthConditions = formObj['healthConditions'].split(";")

        const healthRejectionConditions = healthConditions.map(el => {
            return Constants['rejectedHealthConditions'].includes(parseInt(el))
        })

        const isHealthRejected = healthRejectionConditions.includes(true);
        const earConditions = formObj['earConditions'].split(";").map(ear => parseInt(ear));
        const isEarRejected = !earConditions.includes(7)

        return (isPregnant || isHealthRejected || isEarRejected);
    }

};

export default Validator;