const { expect } = require('@playwright/test');

class SuccessPage {
    constructor(page) {
        this.page = page;
    }

    async verifyPageUrl() {
        const currentUrl = await this.page.url();
        expect(currentUrl).toContain('thanks');
    }
}

module.exports = SuccessPage;