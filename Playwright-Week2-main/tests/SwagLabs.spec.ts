import {test, expect} from '@playwright/test';

test('Practice1 - Locater & Login', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.url()).toContain('/inventory.html');
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-description"]').first()).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-description"]').nth(1)).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-description"]').nth(2)).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-description"]').nth(3)).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-description"]').nth(4)).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-description"]').nth(5)).toBeVisible();
});

test('Practice2 - Filter & Cart', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    const backpack = await page.locator('[data-test="inventory-item"]').filter({hasText: 'Sauce Labs Backpack'});
    await backpack.getByRole('button', {name: 'Add to cart'}).click();
    expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    const BikeLight = await page.locator('[data-test="inventory-item"]').filter({hasText: 'Sauce Labs Bike Light'});
    await BikeLight.getByRole('button', {name: 'Add to cart'}).click();
    expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await backpack.getByRole('button', {name: 'Remove'}).click();
    expect(page.locator('.shopping_cart_badge')).toHaveText('1');
})

test('Practice3 - Deep Assertions', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('test');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('test');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    await expect(page.locator('[data-test="username"]')).toHaveCSS('border-bottom-color', 'rgb(226, 35, 26)');
    const errorMessage = await page.locator('[data-test="error"]');
    await errorMessage.locator('[data-test="error-button"]').click();
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    const sorticon = await page.locator('[data-test="product-sort-container"]');
    await sorticon.selectOption('Price (low to high)');
    const firstItem = page.locator('[data-test="inventory-item-price"]').first();
    await expect(firstItem).toHaveText('$7.99');
})