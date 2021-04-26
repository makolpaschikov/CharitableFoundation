package com.pwmtp.charitable_foundation.service;

import com.pwmtp.charitable_foundation.controller.ProductController;
import com.pwmtp.charitable_foundation.domain.Product;
import com.pwmtp.charitable_foundation.domain.ProductCategory;
import com.pwmtp.charitable_foundation.domain.User;
import com.pwmtp.charitable_foundation.repository.ProductDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {
    private final ProductDAO PRODUCT_DAO;
    private final UserService USER_SERVICE;

    @Autowired
    public ProductService(ProductDAO productDAO, UserService userService) {
        this.PRODUCT_DAO = productDAO;
        this.USER_SERVICE = userService;
    }

    /**
     * Adds a product to the database
     * @param user    - {@link ProductController#addProduct}
     * @param images  - {@link ProductController#addProduct}
     * @param product - product object without id and files
     * @return        - <b>true</b> if the product is saved, otherwise <b>false</b>
     */
    public boolean addProduct(User user, List<MultipartFile> images, Product product) {
        product.setImage(FileManager.saveImage(images.get(0), user.getEmail(), product.getName()));
        if (product.getImage() == null || product.getImage().isEmpty()) return false;
        PRODUCT_DAO.save(product);
        return true;
    }

    /**
     * Returns all products from the database
     * @return - {@link ProductController#getProducts()}
     */
    public Map<ProductCategory, List<Product>> getAll() {
        Map<ProductCategory, List<Product>> products = new HashMap<>();
        products.put(ProductCategory.MEDICINES, PRODUCT_DAO.findProductByCategory(ProductCategory.MEDICINES));
        products.put(ProductCategory.TECHNICS, PRODUCT_DAO.findProductByCategory(ProductCategory.TECHNICS));
        products.put(ProductCategory.INTERIOR, PRODUCT_DAO.findProductByCategory(ProductCategory.INTERIOR));
        products.put(ProductCategory.OTHER, PRODUCT_DAO.findProductByCategory(ProductCategory.OTHER));
        return products;
    }

    /**
     * Returns all products of user from the database
     * @return - {@link ProductController#getProductsOfUser}
     */
    public Map<ProductCategory, List<Product>> getByUserID(Long id) {
        Map<ProductCategory, List<Product>> products = new HashMap<>();
        products.put(ProductCategory.MEDICINES, PRODUCT_DAO.findProductByUserIDAndCategory(id, ProductCategory.MEDICINES));
        products.put(ProductCategory.TECHNICS, PRODUCT_DAO.findProductByUserIDAndCategory(id, ProductCategory.TECHNICS));
        products.put(ProductCategory.INTERIOR, PRODUCT_DAO.findProductByUserIDAndCategory(id, ProductCategory.INTERIOR));
        products.put(ProductCategory.OTHER, PRODUCT_DAO.findProductByUserIDAndCategory(id, ProductCategory.OTHER));
        return products;
    }

    /**
     * Removes a user from the database
     * @param userID    - id of the product owner
     * @param productID - id of the product
     * @return          - <b>true</b> if the product is deleted, otherwise <b>false</b>
     */
    public boolean deleteByID(Long userID, Long productID) {
        PRODUCT_DAO.deleteById(productID);
        return FileManager.deleteProductImages(USER_SERVICE.getByID(userID).getEmail(), PRODUCT_DAO.findProductById(productID).getName());
    }

}
