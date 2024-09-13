const { expect } = require('@playwright/test'); 

class CheckoutPage {
    constructor(page) {
      this.page = page; 
      this.dropdown = this.page.locator(".ta-results");  // Ensure this uses 'this.page'
    }
  
    async addDeliveryMethod() {
      await this.page.locator("text='Checkout'").click();        
      await this.page.locator("[placeholder*='Country']").pressSequentially("ind");
      await this.dropdown.waitFor();
      let optionsCount = await this.dropdown.locator('button').count();
  
      for (let i = 0; i < optionsCount; ++i) {
        let text = await this.dropdown.locator("button").nth(i).textContent();
        this.page.pause();
        if (text === " India") {
          await this.dropdown.locator("button").nth(i).click();
          break;
        }
        await expect(this.page.locator(".user__name label").first()).toHaveText("afinabenpalladen@gmail.com");
      }
    }
  
    async addPaymentInfo() {
      await this.page.locator(".payment__info div input").first().fill("4542993192922293");
      await this.page.locator(".payment__info div select").first().selectOption('02');
      await this.page.locator(".payment__info div select").nth(1).selectOption('27');
      await this.page.locator(".payment__info div input").nth(1).waitFor({ state: 'visible' });
      await this.page.locator(".payment__info div input").nth(1).fill("111");
      await this.page.locator(".form__cc div:nth-child(3) .field input").waitFor({ state: 'visible' });
      await this.page.locator(".form__cc div:nth-child(3) .field input").fill("test test");
      
    }
  
    async placeOrder() {
      await this.page.locator(".action__submit").click();
    }

    
    
  }
  
  module.exports = CheckoutPage;