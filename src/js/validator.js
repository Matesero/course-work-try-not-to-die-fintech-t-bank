export function validate(value, type) {
    switch (type) {
        case "phone":
            return checkPhone(value);
    }
}

function checkPhone(value) {
    const regex = new RegExp('^\\+7 \\([0-9]{3}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}$')
    return value.match(regex);
}

function checkEmail(value) {
    const regex = new RegExp('^[a-zA-Z]+@[a-zA-Z.]+$')
    return value.match(regex);
}