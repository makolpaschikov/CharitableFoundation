package com.pwmtp.charitable_foundation.controller;

import com.pwmtp.charitable_foundation.domain.Product;
import com.pwmtp.charitable_foundation.domain.ProductCategory;
import com.pwmtp.charitable_foundation.domain.User;
import com.pwmtp.charitable_foundation.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProductController {
    private final ProductService PRODUCT_SERVICE;

    @Autowired
    public ProductController(ProductService PRODUCT_SERVICE) {
        this.PRODUCT_SERVICE = PRODUCT_SERVICE;
    }

    /**
     * Controller that saves the product to the database
     * @param user        - user adding a product
     * @param name        - product name
     * @param description - product description
     * @param category    - product category {@link ProductCategory}
     * @param photos      - product photo
     * @return            - <b>200</b> if the product is saved, otherwise <b>500</b>
     */
    @PreAuthorize("hasAuthority('DISTRIBUTOR')")
    @RequestMapping(value = "/add-product", method = RequestMethod.PUT)
    public ResponseEntity<String> addProduct(
            @AuthenticationPrincipal User user,
            @RequestParam String name, @RequestParam String description, @RequestParam String category,
            @RequestParam List<MultipartFile> photos
    ) {
        return PRODUCT_SERVICE.addProduct(user, photos,
                new Product(name, description, ProductCategory.valueOf(category), user.getId()))
                ? new ResponseEntity<>("the product has been saved", HttpStatus.OK)
                : new ResponseEntity<>("the product could not be saved", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Controller that returns all products
     * @return - json file as 'type:[products], ...' and code <b>200</b>
     */
    @RequestMapping(value = "/products", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<Map<ProductCategory, List<Product>>> getProducts() {
        return new ResponseEntity<>(PRODUCT_SERVICE.getAll(), HttpStatus.OK);
    }

    /**
     * Controller that returns products of authorized user
     * @param user - authorized user
     * @return     - json file as 'type:[products], ...' and code <b>200</b>
     */
    @PreAuthorize("hasAuthority('DISTRIBUTOR')")
    @RequestMapping(value = "/my-products", method = RequestMethod.GET)
    public ResponseEntity<Map<ProductCategory, List<Product>>> getProductsOfUser(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(PRODUCT_SERVICE.getByUserID(user.getId()), HttpStatus.OK);
    }

    /**
     * Controller that removes the product from the database
     * @param user      - authorized user
     * @param productID - if of deleted product
     * @return          - <b>200</b> if the product is deleted, otherwise <b>500</b>
     */
    @PreAuthorize("hasAuthority('DISTRIBUTOR')")
    @RequestMapping(value = "/remove-product", method = RequestMethod.DELETE)
    public ResponseEntity<String> removeProduct(@AuthenticationPrincipal User user, @RequestParam Long productID) {
        return PRODUCT_SERVICE.deleteByID(user.getId(), productID)
                ? new ResponseEntity<>("product has been successfully uninstalled", HttpStatus.OK)
                : new ResponseEntity<>("product could not be removed", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
