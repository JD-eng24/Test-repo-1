import LoginPage from '../pageobjects/login.page';

describe('Sauce Demo Login Tests', () => {

    // Define users and their expected login behavior
    const users = [
        { username: 'standard_user', password: 'secret_sauce', shouldLogin: true, expectedError: '' },
        { username: 'locked_out_user', password: 'secret_sauce', shouldLogin: false, expectedError: 'Epic sadface: Sorry, this user has been locked out.' },
        { username: 'problem_user', password: 'secret_sauce', shouldLogin: true, expectedError: '' },
        { username: 'performance_glitch_user', password: 'secret_sauce', shouldLogin: true, expectedError: '' },
        { username: 'invalid_user', password: 'wrong_password', shouldLogin: false, expectedError: 'Epic sadface: Username and password do not match any user in this service' },
    ];

    users.forEach((user) => {
        it(`should ${user.shouldLogin ? 'successfully' : 'unsuccessfully'} log in with username: ${user.username}`, async () => {
            // Open the login page
            await LoginPage.open();

        // Perform the login with the username and password
            await LoginPage.login(user.username, user.password);

        // Wait for the page to load (to simulate page load time)
            await browser.pause(2000);

            if (user.shouldLogin) {
                // Positive Test: Check if login is successful by confirming presence of the product page (e.g., a page element such as the product title)
                const productTitle = await $('.title'); // The product page has a title element with class "title"
                await expect(productTitle).toHaveTextContaining('Products');
            } else {
                // Negative Test: Check if the login error message is displayed
                const errorMessage = await LoginPage.isLoginError();
                await expect(errorMessage).toBe(true);
                await expect(LoginPage.errorMessage).toHaveTextContaining(user.expectedError);
            }
        });
    });
});

