package com.pwmtp.charitable_foundation.controller;

import com.pwmtp.charitable_foundation.domain.Product;
import com.pwmtp.charitable_foundation.domain.ProductCategory;
import com.pwmtp.charitable_foundation.domain.User;
import com.pwmtp.charitable_foundation.service.ProductService;
import com.pwmtp.charitable_foundation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {
    private final ProductService PRODUCT_SERVICE;

    @Autowired
    public ProductController(ProductService PRODUCT_SERVICE) {
        this.PRODUCT_SERVICE = PRODUCT_SERVICE;
    }

    @PreAuthorize("hasAuthority('DISTRIBUTOR')")
    @RequestMapping(value = "/add-product", method = RequestMethod.PUT)
    public ResponseEntity<String> addProduct(
            @AuthenticationPrincipal User user,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String category,
            @RequestParam List<MultipartFile> images
    ) {
        PRODUCT_SERVICE.addProduct(new Product(name, description, ProductCategory.valueOf(category), user.getId()));
        return new ResponseEntity<>("the product has been saved", HttpStatus.OK);
    }

    @RequestMapping(value = "/products", method = RequestMethod.GET)
    public ResponseEntity<List<Product>> getProducts() {
        return new ResponseEntity<>(PRODUCT_SERVICE.getAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('DISTRIBUTOR')")
    @RequestMapping(value = "/my-products", method = RequestMethod.GET)
    public ResponseEntity<List<Product>> getProductsOfUser(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(PRODUCT_SERVICE.getByUserID(user.getId()), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('DISTRIBUTOR')")
    @RequestMapping(value = "/remove-product", method = RequestMethod.DELETE)
    public ResponseEntity<String> removeProduct(@RequestParam Long productID) {
        PRODUCT_SERVICE.deleteByID(productID);
        return new ResponseEntity<>("product has been successfully uninstalled", HttpStatus.OK);
    }
}
