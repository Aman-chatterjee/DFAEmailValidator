function isAlphanumeric(c) {
    return (c >= 'a' && c <= 'z') ||
           (c >= 'A' && c <= 'Z') ||
           (c >= '0' && c <= '9');
}

function isAlpha(c) {
    return (c >= 'a' && c <= 'z') ||
           (c >= 'A' && c <= 'Z');
}

function isDigit(c) {
    return c >= '0' && c <= '9';
}

function isSpecialChar(c) {
    const validSpecialChars = "!#$%&'*+-/=?^_{}|";
    return validSpecialChars.includes(c);
}



function isValidEmail(email) {
    const State = {
        START: 'START',
        LOCAL: 'LOCAL',
        AT: 'AT',
        DOMAIN_NAME: 'DOMAIN_NAME',
        TOP_DOMAIN: 'TOP_DOMAIN',
        FINAL: 'FINAL'
    };
    let state = State.START;

    for (let i = 0; i < email.length; i++) {
        const c = email[i];

        switch (state) {
            case State.START:
                if (isAlphanumeric(c) || isSpecialChar(c)) {
                    state = State.LOCAL;
                } else {
                    return false;
                }
                break;

            case State.LOCAL:
                if (isAlphanumeric(c) || isSpecialChar(c)) {
                    // Self Loop
                } else if (c === '.') {
                    state = State.START;
                } else if (c === '@') {
                    state = State.AT;
                } else {
                    return false;
                }
                break;

            case State.AT:
                if (isAlphanumeric(c)) {
                    state = State.DOMAIN_NAME;
                } else {
                    return false;
                }
                break;

            case State.DOMAIN_NAME:
                if (isAlphanumeric(c) || isSpecialChar(c)) {
                    // Self Loop
                } else if (c === '.') {
                    state = State.TOP_DOMAIN;
                } else {
                    return false;
                }
                break;

            case State.TOP_DOMAIN:
                if (isAlpha(c)) {
                    state = State.FINAL;
                } else if (isDigit(c) || isSpecialChar(c)) {
                    state = State.DOMAIN_NAME;
                } else {
                    return false;
                }
                break;

            case State.FINAL:
                if (isAlpha(c)) {
                    // Self loop
                } else if (c === '.') {
                    state = State.TOP_DOMAIN;
                } else {
                    return false;
                }
                break;

            default:
                return false;
        }
    }

    return state === State.FINAL;
}







function validateEmail() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();
    const validationResult = document.getElementById('validationResult');

    if (isValidEmail(email)) {
        validationResult.textContent = 'Valid email address.';
        validationResult.className = 'result valid';
    } else {
        validationResult.textContent = 'Invalid email address.';
        validationResult.className = 'result invalid';
    }
}

function validateTestCases() {
    const testCases = getEmailTestCases();
    const testCasesResult = document.getElementById('validationResult');
    testCasesResult.innerHTML = `
        <h2>Emails: </h2>
    `;

    testCases.forEach(email => {
        const isValid = isValidEmail(email);
        const resultDiv = document.createElement('div');
        resultDiv.textContent = `${email} - ${isValid ? 'Valid' : 'Invalid'}`;
        resultDiv.className = isValid ? 'result valid' : 'result invalid';
        testCasesResult.appendChild(resultDiv);
    });
}

function getEmailTestCases() {
    const testCases = [
        "Mca10022.23@bitmEsra.ac.in",
        "amanchatterjee121@gmail.com",
        "email@example.com",
        "firstname.lastname@example.com",
        "email@subdomain.example.com",
        "firstname+lastname@example.com",
        "email@123.123.123.123",
        "email@[123.123.123.123]",
        "\"email\"@example.com",
        "1234567890@example.com",
        "email@example-one.com",
        "_______@example.com",
        "email@example.name",
        "email@example.museum",
        "email@example.co.jp",
        "firstname-lastname@example.com",
        "plainaddress",
        "#@%^%#$@#$@#.com",
        "@example.com",
        "Joe Smith <email@example.com>",
        "email.example.com",
        "email@example@example.com",
        ".email@example.com",
        "email.@example.com",
        "email..email@example.com",
        "あいうえお@example.com",
        "email@example.com (Joe Smith)",
        "email@example",
        "email@-example.com",
        "email@111.222.333.44444",
        "email@example..com",
        "Abc..123@example.com"
    ];

    return testCases;
}
