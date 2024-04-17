#include <iostream>
#include <string>
#include <cctype>
#include <vector>

using namespace std;


bool isSpecialChar(char c) {
    const string validSpecialChars = "!#$%&'*+-/=?^_{}|";
    return validSpecialChars.find(c) != string::npos;
}


bool isValidEmail(const string& email) {
    enum State { START, LOCAL, AT, DOMAIN_NAME, TOP_DOMAIN, FINAL };
    State state = START;

    for (char c : email) {

        switch (state) {

            case START:
                if (isalnum(c) || isSpecialChar(c)) {
                    state = LOCAL;
                } else {
                    return false;
                }
                break;

            case LOCAL:
                if (isalnum(c) || isSpecialChar(c)) {
                    // Self Loop
                }
                else if( c == '.'){
                    state = START;
                } else if (c == '@') {
                    state = AT;
                } else {
                    return false;
                }
                break;

            case AT:
                if (isalnum(c)) {
                    state = DOMAIN_NAME;
                } else {
                    return false;
                }
                break;

            case DOMAIN_NAME:
                if (isalnum(c) || isSpecialChar(c)) {
                    //Self Loop
                } else if (c == '.') {
                    state = TOP_DOMAIN;
                } else {
                    return false;
                }
                break;


            case TOP_DOMAIN: //Top level domain like com,in,org

                if(isalpha(c)){
                    state = FINAL;
                }
                else if (isdigit(c) || isSpecialChar(c)) {
                    state = DOMAIN_NAME;
                } else {
                    return false;
                }
                break;


            case FINAL:

                if(isalpha(c)){
                    //Self loop
                }else if(c == '.'){
                    state = TOP_DOMAIN;
                }
                else{
                    return false;
                }
                break;

            default:
                return false;
        }

    }

    return state == FINAL;
}



vector<string> getEmailTestCases() {
    vector<string> testCases = {
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
    };

    return testCases;
}



int main() {
    // string email;
    // cout << "Enter an email address: ";
    // cin >> email;

    // if (isValidEmail(email)) {
    //     cout << "Valid email address." << endl;
    // } else {
    //     cout << "Invalid email address." << endl;
    // }

    vector<string> testCases = getEmailTestCases();

    for (const string& email : testCases) {
        cout << "Email: " << email << " - ";
        if (isValidEmail(email)) {
            cout << "Valid" << endl;
        } else {
            cout << "Invalid" << endl;
        }
    }

    return 0;
}
