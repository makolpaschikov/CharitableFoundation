package com.pwmtp.charitable_foundation.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProductController {
    @RequestMapping(value = "add-product", method = RequestMethod.PUT)
    public void addProduct() {
        // TODO: not yet implemented
    }

    @RequestMapping(value = "products", method = RequestMethod.GET)
    public void getProducts() {
        // TODO: not yet implemented
    }

    @RequestMapping(value = "my-products", method = RequestMethod.GET)
    public void getProductsOfUser() {
        // TODO: not yet implemented
    }

    @RequestMapping(value = "remove-products", method = RequestMethod.DELETE)
    public void removeProduct() {
        // TODO: not yet implemented
    }
}
