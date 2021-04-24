package com.pwmtp.charitable_foundation.controller;

import com.pwmtp.charitable_foundation.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProductController {
    private final ProductService USER_SERVICE;
    private final ProductService PRODUCT_SERVICE;

    @Autowired
    public ProductController(ProductService USER_SERVICE, ProductService PRODUCT_SERVICE) {
        this.USER_SERVICE = USER_SERVICE;
        this.PRODUCT_SERVICE = PRODUCT_SERVICE;
    }

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
