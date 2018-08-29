module.exports = {
    normaliseErrors: function (errors) {
        let normaliseErrors = [];

        for (let property in errors) {
            if (errors.hasOwnProperty(property)) {
                normaliseErrors.push({ title: property, message: errors[property].message })
            }
        }
        return normaliseErrors;
    }
}