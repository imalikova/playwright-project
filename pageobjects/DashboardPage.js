const { expect } = require('@playwright/test');

class DashboardPage {
    constructor(page) {
        this.page = page; 
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.page.pause();
    }

    async goTo() {

        await this.page.goto('https://rahulshettyacademy.com/client/dashboard/dash');
    }

    async searchProduct(productName) {
        const titles = await this.productsText.allTextContents();
        await this.products.last().waitFor();
        const count = await this.products.count();

        for (let i = 0; i < count; ++i) {
            await this.products.last().waitFor();
            const productText = await this.products.nth(i).locator("b").textContent();
                       
            if (await productText === productName) {
                await this.products.nth(i).locator("text=' Add To Cart'").click();
                await this.navigateToCart();
              break;                
            }
        }
        
        await this.page.waitForTimeout(5000);
        
    }

    
    async navigateToCart() {
        await this.cart.click(); 
        await this.page.locator("h3:has-text('ZARA COAT 3')").waitFor({ state: 'visible' });
        const bool = await this.page.locator("h3:has-text('ZARA COAT 3')").isVisible();
        expect(bool).toBeTruthy();
    }
}


module.exports = DashboardPage; // Ensure the class is exported