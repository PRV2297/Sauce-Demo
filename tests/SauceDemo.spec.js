const { test, expect } = require('@playwright/test')


   test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

   });

test.afterEach(async ({ page }) => {
    const url = await page.url();

    if (url === 'https://www.saucedemo.com/inventory.html') {
        console.log('Navigation to inventory page is correct');
    } else {
        console.log('Navigation to inventory page is incorrect');
    }

    // expect(url).toBe('https://www.saucedemo.com/inventory.html');
});



test('Login With Blank Credentials', async ({ page }) => {

    
    await page.getByRole('button', {name: 'Login'}).click();
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toBe('Epic sadface: Username is required');
    console.log('Error message is correct');

});

test('Login With Invalid Credentials', async ({ page }) => {

    // Login With Invalid Credentials
    await page.locator('#user-name').fill('invalid_user');
    await page.locator('#password').fill('invalid_password');
    await page.getByRole('button', {name: 'Login'}).click();
    const errorMessage2 = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage2).toBe('Epic sadface: Username and password do not match any user in this service');
    console.log('Error message is correct');

});

test('Login with Valid Username and wrong Password', async ({ page }) => {

    // Login with Valid Username and wrong Password
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('wrong_password');
    await page.getByRole('button', {name: 'Login'}).click();
    const errorMessage3 = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage3).toBe('Epic sadface: Username and password do not match any user in this service');
    console.log('Error message is correct');

});

test('Login with Wrong Username and Valid Password', async ({ page }) => {

    // Login with Wrong Username and Valid Password
    await page.locator('#user-name').fill('wrong_user');
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    const errorMessage4 = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage4).toBe('Epic sadface: Username and password do not match any user in this service');
    console.log('Error message is correct');

});

test('Login with Valid Credentials', async ({ page }) => {


    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
 

});


    
