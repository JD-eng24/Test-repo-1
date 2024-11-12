import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#username');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }
    get errorMessage() {
        return $('h3[data-test="error"]');
    }

  
    /**
     * Method to log in with the provided username and password
     * @param {string} username - The username for login
     * @param {string} password - The password for login
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * Method to open the login page
     * Assume baseURL is configured in WebDriverIO config
     */
    open() {
        return super.open('login'); //Navigates to /login page
    }

   /** 
    * Method to check if login failed by detecting error messages
   */
    async isLoginError() {
        try {
            await this.errorMessage.waitForDisplayed({ timeout:5000 });
            return await this.errorMessage.isDisplayed();
        } catch (error) {
            return false ; //if error message isn't displayed, return false
        }
    }
}

export default new LoginPage();
