class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo() {

        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.password.type(password);
        await this.page.waitForLoadState('networkidle');
        await this.signInButton.isVisible();
        await this.signInButton.click();
        
    }
}

module.exports = LoginPage;