// <reference types="Cypress" />

// Title: Test of Website Functions for Quali.Fit Platform
// Author: Matthew Lieberman
// Date Modified: August 9th, 2018


// Load of Webpage before each action
// context('Actions', () => {
//     beforeEach(() => {
//         cy.visit(url)
//     })


// Disable / Enable Specific Tests
var enable_my_demands_page_tests = false
var enable_my_contacts_page_tests = false
var enable_my_experiences_page_tests = false
var enable_my_education_page_tests = false
var enable_new_user_signup_workflow_test = true

var enable_new_user_signup = false


// Helper Functions

function linkCheck (hebrew, checklink) {
    cy.contains(hebrew).click()
    cy.url().should('include', checklink)
}

function dropDownSelection (resultsBoxId, selection1, selection2, inputIndex) {
    cy.wait(250)
    cy.get('input').eq(inputIndex).click()
    cy.get(resultsBoxId).contains(selection1).click()
    cy.get('input').eq(inputIndex).click()
    cy.get(resultsBoxId).contains(selection2).click()
}

function singleDropDownSelection (containerId, resultsId, hebrew) {
    cy.get(containerId).click()
    cy.get(resultsId).contains(hebrew).click()
}

function loginPageLinks (hebrew, checkLink) {
    cy.visit(Cypress.env('url'))
    cy.contains(hebrew).click()
    cy.url().should('include', checkLink)
}

// Runs Before every function
beforeEach(function () {
    Cypress.Cookies.preserveOnce("connect.sid")
})

// Test of Webpage Actions

if (Cypress.env('enable_login_page_tests') == true) {

    describe('Login Page Link Tests', function () {

        it('Test of Link Click Open an Account', function () {
            cy.clearCookies()
            loginPageLinks('פתיחת חשבון', '/candidate/signup')
        })

        it('Test of Link Click Login without Password', function () {
            loginPageLinks('כניסה ללא סיסמה', '/employee/login#/magicLink')
        })

        it('Test of Link Click Reset Password', function () {
            loginPageLinks('איפוס סיסמה', '/employee/login#/sendResetPassword')
        })

        it('Test of Link Click Quali.Fit', function () {
            loginPageLinks('quali.fit', 'http://quali.fit')
        })

    })
}


// Text Insertion on Login Page
describe('Login Text Insertion on Landing Page', function () {

    it('Test of Text Input into Login Form', function () {
        cy.clearCookies()
        cy.visit(Cypress.env('url'))
        
        cy.log(Cypress.env('host'))
        
        cy.get('#email').should('have.attr', 'placeholder', 'דואר אלקטרוני').type(Cypress.env('test_account_user_login'))
        cy.get('#password').should('have.attr', 'placeholder', 'סיסמה').type(Cypress.env('test_account_user_password'))
        cy.get('#LoginBtn').contains('כניסה').click()
    })


})

// Link Clicks on Main Login Dashboard

if (Cypress.env('enable_main_menu_button_tests') == true) {

    describe('Main Menu Buttons Test', function () {

        it('Test of Link Click My Demands', function () {
            linkCheck('הדרישות שלי', '/candidate/panel/demands')
        })

        it('Test of Link Click My Contacts', function () {
            cy.contains('הפרופיל שלי').click()
            linkCheck('פרטים אישיים', '/candidate/panel/contacts')
        })

        it('Test of Link Click My Experiences', function () {
            linkCheck('ניסיון תעסוקתי', '/candidate/panel/experience')
        })

        it('Test of Link Click My Education', function () {
            linkCheck('השכלה', '/candidate/panel/education')
        })

        it('Test of Link Click FAQ', function () {
            linkCheck('שאלות נפוצות', '/candidate/panel/faq')
        })

        it('Test of Link Click Contact Us', function () {
            linkCheck('דברו איתנו', '/candidate/panel/contactUs')
        })
    })
}

// My Demands Page Test of UI elements

if (enable_my_demands_page_tests == true) {

    describe('My Demands Page Test All Elements', function () {

        it('Test of Role Selection Box', function () {
            cy.contains('הדרישות שלי').click()
            dropDownSelection('#select2-roles-results', 'אנליסט/ית', 'בנקאות- פרונטאלית', 0)
        })

        it('Test of Cities Selection Box', function () {
            dropDownSelection('#select2-locations-results', 'תל-אביב', 'רמת-גן, גבעתיים והסביבה', 1)
        })

        it('Test of Job Scope Box', function () {
            dropDownSelection('#select2-jobScope-results', 'משרה מלאה', 'משרת סטודנט', 2)
        })

        it('Test of Mean Salary Input', function () {
            cy.get('#mean_salary').clear().type('11000')
        })

        it('Test of Expected Salary Input', function () {
            cy.get('#salary').clear().type('10000')
        })

        // it('Test of Banded Input Selection', function () {
        //     dropDownSelection ('#select2-banded-results', 'פיננסים', 'מזון', 5)
        // })

        it('Test of Submit Form Button', function () {
            cy.get('#mainBtn').contains('שמירת עדכון').click()
        })
    })
}

// Test of all elements on my contacts page

if (enable_my_contacts_page_tests == true) {

    describe('My Contacts Page Test All Elements', function () {

        it('Test of First Name Input Box', function () {
            cy.contains('הפרופיל שלי').click()
            cy.contains('פרטים אישיים').click()
            cy.get('input:first').clear().type('FirstName')
        })

        it('Test of Last Name Input Box', function () {
            cy.get('input').eq(1).clear().type('LastName')
        })

        it('Test of City Input Box', function () {
            singleDropDownSelection('#select2-cities-select-container', '#select2-cities-select-results', 'אבו סנאן')
        })

        it('Test of Extra Information Input Box', function () {
            cy.get('#extraInformation').clear().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam gravida dolor ut diam elementum aliquet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.')
        })

        it('Test of Portfolio Link Input Box', function () {
            cy.get('#portfolioLink').clear().type('http://quali.fit')
        })

        it('Test of Phone Number Input Box', function () {
            cy.get('#phoneNumber').clear().type('999-9999999')
        })

        it('Test of Check Boxes', function () {
            cy.get('[type="checkbox"]').uncheck()
            cy.get('[type="checkbox"]').check()
        })

        it('Test of Submit Button', function () {
            cy.contains('שמירת עדכון').click()
        })
    })
}

// Tests all UI elements on the my experiences page

if (enable_my_experiences_page_tests == true) {

    describe('My Experience Page Test All Elements', function () {

        it('Test of Add Exeperience Button', function () {
            cy.contains('ניסיון תעסוקתי').click()
            cy.get('#addTabBtn').contains('הוספת ניסיון תעסוקתי ').click()
        })

        it('Test of Company Name Input', function () {
            cy.get('#companyName').clear().type('Test Company')
        })

        it('Test of Company Field Input', function () {
            singleDropDownSelection('#select2-activity-container', '#select2-activity-results', 'מזון')
        })

        it('Test of Previous roles Input', function () {
            singleDropDownSelection('#select2-previousRoles-container', '#select2-previousRoles-results', 'חשב/ת')
        })

        it('Test of Start Month Input', function () {
            singleDropDownSelection('#select2-startDate-month-container', '#select2-startDate-month-results', 'יוני')
        })

        it('Test of Start Year Input', function () {
            singleDropDownSelection('#select2-startDate-year-container', '#select2-startDate-year-results', '2015')
        })

        it('Test of End Month Input', function () {
            singleDropDownSelection('#select2-endDate-month-container', '#select2-endDate-month-results', 'יוני')
        })

        it('Test of End Year Input', function () {
            singleDropDownSelection('#select2-endDate-year-container', '#select2-endDate-year-results', '2017')
        })

        it('Test of Experience Save Button', function () {
            cy.get('#mainBtn').click()
        })
    })
}

// Tests all UI elements on the my education page

if (enable_my_education_page_tests == true) {

    describe('My Education Page Test All Elements', function () {

        it('Test of Add Education Button', function () {
            cy.contains('השכלה').click()
            cy.get('#addDegreeTabBtn').contains('הוספת תואר').click()
        })

        it('Test of Degree Field Button', function () {
            singleDropDownSelection('#select2-degreeField-container', '#select2-degreeField-results', 'הנדסת תעשייה וניהול')
        })

        it('Test of Add Education Button', function () {
            singleDropDownSelection('#select2-degreeType-container', '#select2-degreeType-results', 'דוקטורט')
        })

        it('Test of School Name Input', function () {
            cy.get('#instituteName').clear().type('Test University')
        })

        it('Test of Education Save Button', function () {
            cy.get('#saveBtnDegrees').click()
        })
    })
}

// Tests for the initial Signup workflow

if (enable_new_user_signup_workflow_test == true) {
describe('Signup Workflow Test All Elements', function () {

if (enable_new_user_signup == true) {
    describe('New User Creation of Signup Workflow', function () {

        it('Test of New Account Creation Link', function () {
            cy.get('#navBarUserName').click()
            cy.contains(' התנתקות').click()
            cy.clearCookies()
            cy.visit(Cypress.env('url'))
            loginPageLinks('פתיחת חשבון', '/candidate/signup')
        })

        var random_email = 'Test' + Math.floor(Math.random() * 2000) + '@Test.com'

        it('Test of Email Input Box', function () {
            cy.get('input:first').clear().type(random_email)
        })

        it('Test of Confirm Email Input Box', function () {
            cy.get('input').eq(1).clear().type(random_email)
        })

        it('Test of First Name Input Box', function () {
            cy.get('input').eq(2).clear().type('FirstName')
        })

        it('Test of Last Name Input Box', function () {
            cy.get('input').eq(3).clear().type('LastName')
        })

        it('Test of Password Input Box', function () {
            cy.get('input').eq(4).clear().type('Password123')
        })

        it('Test of Password Confirm Input Box', function () {
            cy.get('input').eq(5).clear().type('Password123')
        })

        it('Test of Phone Number Input Box', function () {
            cy.get('input').eq(6).clear().type('8888888888')
        })

        it('Test of City Selection Dropdown', function () {
            singleDropDownSelection('#select2-cities-select-container', '#select2-cities-select-results', 'אבו גוש')
        })

        it('Test of Check Box', function () {
            cy.get('[type="checkbox"]').check()
        })

        it('Test of Sign Up Button', function () {
            cy.get('#signUpBtn').click()
        })
    })
}

    describe('1st Step of Signup Workflow', function () {

        function signUpMultiDropSelect (resultsId, hebrew1, hebrew2, index) {
            cy.get('input').eq(index).click()
            cy.get(resultsId).contains(hebrew1).click()
            cy.get(resultsId).contains(hebrew2).click()
            cy.get('input').eq(index).click()
        }


        it('Test of Button Click Pop-Up Message', function () {
            cy.wait(5000)
            cy.visit(Cypress.env('sign_up_wizard_url'))
            cy.contains('בואו נתחיל לעבוד!').click()
        })

        it('Test of Ideal Job Type Input Location', function () {
            signUpMultiDropSelect ('#select2-dreamJob-groupRoles-select-results', 'אדמיניסטרציה', 'ביטוח', 0)
        })

        it('Test of Dream Job Roles Input', function () {
            signUpMultiDropSelect ('#select2-dreamJob-roles-select-results', 'מזכירות' , 'ניהול משרד', 1)
        })

        it('Test of Ideal City Input Location', function () {
            signUpMultiDropSelect ('#select2-dreamJob-locations-select-results', 'תל-אביב', 'בת ים / חולון / אזור', 2)
        })

        it('Test of Dream Job Size Input', function () {
            signUpMultiDropSelect ('#select2-dreamJob-jobSize-select-results', 'משרה מלאה' , 'משמרות', 3)
        })

        it('Test of Dream Job Desired Salary Input Box', function () {
            cy.get('#dreamJob-desiredSalary-input').clear().type('20000')
        })

        it('Test of Dream Job Min Salary Input Box', function () {
            cy.get('#dreamJob-minSalary-input').clear().type('8000')
        })

        it('Test of Sign Up Button', function () {
            cy.get('a.legitRipple').contains('הבא').click()
        })
    })

    describe('2nd Step of Signup Workflow', function () {

        it('Test of Add Job Experience Button', function () {
            cy.contains('הוספת מקום עבודה').click()
        })

        it('Test of Company Name Input', function () {
            cy.wait(500)
            cy.get('input[name=companyName0]').type('Test Company')
        })

        it('Test of Company Field Input', function () {
            cy.contains('ניתן לבחור כאן מתוך רשימה').click()
            cy.get('.select2-results__options').contains('בנקאות').click()
        })

        it('Test of Job Area Input', function () {
            cy.get('#select2-jobExp-groupRoles-select-container').click()
            cy.get('#select2-jobExp-groupRoles-select-results').contains('מכירות').click()
        })

        it('Test of Previous Job Title Input', function () {
            cy.get('#select2-jobExp-roles-select-container').click()
            cy.get('#select2-jobExp-roles-select-results').contains('מכירות טלפוני').click()
        })

        // it('Test of End Month Input', function () {
// 			cy.wait(500)
// 			cy.get('.row.padd').eq(8).get('input').click()
//             cy.get('#select2-5dkt-results').contains('מרץ').click()
//         })
// 
//         it('Test of End Year Input', function () {
//             cy.get('#select2-jobYearStarted${id}-container').click()
//             cy.get('#select2-jobYearStarted${id}-results').contains('2014').click()
//         })
// 
//         it('Test of Start Year Input', function () {
//         	cy.get('#select2-NaN-p4-container').click()
//        		cy.get('#select2-NaN-p4-results').contains('מרץ').click()
//         })
//         
//         it('Test of Start Month Input', function () {
//         	cy.get('#select2-NaN-p4-container').click()
//        		cy.get('#select2-NaN-p4-results').contains('מרץ').click()
//         })

        it('Test of Experience Save Button', function () {
            cy.get('a.legitRipple').contains('הבא').click()
        })



    })

	describe('3rd Step of Signup Workflow', function () {
		
		it('Test of Add Education Experience Button', function () {
             cy.get('.btn.btn-primary.brand-main-color.form-group.legitRipple').eq(1).click()
        })
        
        it('Test of Area of Study Input', function () {
            cy.wait(500)
            cy.get('.select2-selection__rendered').eq(11).click()
            cy.get('.select2-results__options').contains('משפטים').click()
        })
        
        it('Test of Type of Degree Input', function () {
            cy.get('.select2-selection__rendered').eq(12).click()
            cy.get('.select2-results__options').contains('הנדסאי').click()
        })

		it('Test of Academic Institution Name Input', function () {
            cy.get('#institutionName').type('Test Test')
        })

		it('Test of Next Page Button', function () {
            cy.get('a.legitRipple').contains('סיום').click()
        })


	})

	describe('4th Step of Signup Workflow', function () {

		it('Test of Extra Information Input', function () {
            cy.get('#additionalInfo').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel ligula vitae lacus luctus porttitor vel id est. Integer imperdiet at sapien eget malesuada.')
        })
        
        it('Test of Next Page Button', function () {
            cy.contains('סיום').click()
        })


	})


    })
    
    
}



