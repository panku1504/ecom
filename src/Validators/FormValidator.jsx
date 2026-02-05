import PasswordValidator from "password-validator"

// Create a schema
var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have at least 1 uppercase letters
    .has().lowercase(1)                             // Must have at least 1 lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().symbols(1)                               // Must have at least 1 special character
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export default function FormValidator(e) {
    let { name, value } = e.target

    switch (name) {
        case "name":
        case "email":
        case "username":
        case "subject":
            if (!value || value.length === 0)
                return name + " feild is mandatory"
            else if (value.length < 3 || value.length > 100)
                return name + " feild length must be 3-100 characters"
            else
                return ""

        case "message":
            if (!value || value.length === 0)
                return name + " feild is mandatory"
            else if (value.length < 50)
                return name + " feild length must be greater then or equal to 50 characters"
            else
                return ""

        case "phone":
            if (!value || value.length === 0)
                return name + " feild is mandatory"
            else if (value.length < 10 || value.length > 10)
                return name + " feild length must be 10 Digits"
            else if (!(value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9")))
                return name + " feild Must Start With 6,7,8, or 9"

            else
                return ""

        case "password":
            if (!value || value.length === 0)
                return name + " feild is mandatory"
            else if (!schema.validate(value)) {
                let error = schema.validate(value, { details: true })
                return error.map(x => x.message).join("")
            }
            else
                return ""

        case "basePrice":
            if (!value || value.length === 0)
                return name + " feild is mandatory"
            else if (parseInt(value) < 1)
                return name + " Value must be greater then 0"
            else
                return ""

        case "stockQuantity":
            if (!value || value.length === 0)
                return name + " feild is mandatory"
            else if (parseInt(value) < 0)
                return name + " Value must be greater then or equal to 0"
            else
                return ""

        case "discount":
            if (!value || value.length === 0)
                return name + " feild is mandatory"
            else if (parseInt(value) < 0 || parseInt(value) > 100)
                return name + " must be 0-100"
            else
                return ""


        case "icon":
        case "shortDescription":
        case "question":
        case "answer":
            if (!value || value.length === 0)
                return name + " feild is mandatory"
            else if (value.length < 10)
                return name + " feild length must greater than of equal to 10"
            else
                return ""



        default:
            return ""
    }
}
