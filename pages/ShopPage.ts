import { expect, Locator, Page } from "@playwright/test";

export class ShopPage {
    private page: Page;
    private addToCartButton: Locator;
    private cartIcon: Locator;
    private checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.checkoutButton = page.locator('button[data-test="checkout"]');
    }

    async addItemToCart() {
        await this.addToCartButton.click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    assertShoppingCartIconVisible() {
        return this.cartIcon.isVisible();
    }
}