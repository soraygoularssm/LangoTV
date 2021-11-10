const {Text,Checkbox,Relationship} = require('@keystonejs/fields');

const vocabularyFields = {
    fields: {
        word: {type: Text, isRequired: true},
        definition: {type: Text, isRequired: true},
        example: {type: Text, isRequired: true},
        isExpression: {type: Checkbox, isRequired: true},
        videos: {type: Relationship, ref: 'Video', many: true},
    }
}

module.exports = vocabularyFields;