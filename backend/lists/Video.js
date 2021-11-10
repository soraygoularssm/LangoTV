const {Text,Url} = require('@keystonejs/fields');

const videoFields = {
    fields: {
        label: {type: Text , isRequired: true},
        url: {type: Url, isRequired: true},
    },
    labelField: "label",
}

module.exports = videoFields;