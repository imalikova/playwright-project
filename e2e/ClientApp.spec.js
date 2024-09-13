const { test } = require('@playwright/test');
const LoginPage = require('../pageobjects/LoginPage');
const DashboardPage = require('../pageobjects/DashboardPage');
const CheckoutPage = require('../pageobjects/CheckoutPage');
const SuccessPage = require('../pageobjects/SuccessPage');

test('End-to-End Client Checkout Flow', async ({ page }) => {
    await test.step('Client App Login', async () => {
        const username = 'afinabenpalladen@gmail.com';
        const password = "Estoyfeliz1234*";
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.validLogin(username, password);
    });

    await test.step('Add Product to Cart', async () => {
        const productName = 'ZARA COAT 3';
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.searchProduct(productName);
        await page.waitForLoadState('networkidle');
        await dashboardPage.navigateToCart();
    });

    await test.step('Perform Checkout', async () => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.addDeliveryMethod();
        await page.pause(); // Pauses the test for manual inspection
        await checkoutPage.addPaymentInfo();
        await checkoutPage.placeOrder();
    });

    await test.step('Check Success Page', async () => {
        const successPage = new SuccessPage(page);
        await successPage.verifyPageUrl();
    });
});