const{test , expect} = require('@playwright/test');

test('SD Inventory Test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    const button = await page.getByRole('button', {name: 'Login'})
    await expect(button).toBeVisible();

    if (await button.isEnabled()) {

        console.log('Button is enabled');

    } else {

        console.log('Button is disabled');

    }


    await button.click();

    // Invenrory Page Filtering
    await page
    .locator("div.inventory_item")
    .filter({ hasText: 'Sauce Labs Fleece Jacket' })
    .getByRole('button', { name: 'Add to cart' })
    .click();

     await page
    .locator("div.inventory_item")
    .filter({ hasText: 'Sauce Labs Backpack' })
    .getByRole('button', { name: 'Add to cart' })
    .click();


    // Verify Count Change in Cart icon
    const cartCount = await page.locator('.shopping_cart_badge').textContent();
    expect(cartCount).toBe('2');
    console.log('Cart count is correct' + cartCount);



});