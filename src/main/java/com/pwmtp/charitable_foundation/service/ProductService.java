package com.pwmtp.charitable_foundation.service;

import com.pwmtp.charitable_foundation.domain.ProductCategory;
import com.pwmtp.charitable_foundation.domain.Product;
import com.pwmtp.charitable_foundation.domain.User;
import com.pwmtp.charitable_foundation.repository.ProductDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ProductService {

    private final ProductDAO PRODUCT_DAO;

    @Autowired
    public ProductService(ProductDAO productDAO) {
        this.PRODUCT_DAO = productDAO;
    }

    public void update(Product product) {
        PRODUCT_DAO.save(product);
    }

    public boolean addProduct(User user, List<MultipartFile> images, Product product) {
        PRODUCT_DAO.save(product);
        for (MultipartFile image : images) {
            if (!FileManager.saveImage(image, user.getId(), product.getId())) {
                return false;
            }
        }
        return true;
    }

    public List<Product> getAll() {
        return PRODUCT_DAO.findAllOrdered();
    }

    public Product getByID(Long id) {
        return PRODUCT_DAO.findProductById(id);
    }

    public List<Product> getByUserID(Long id) {
        return PRODUCT_DAO.findProductByUserID(id);
    }

    public Product getByName(String name) {
        return PRODUCT_DAO.findProductByName(name);
    }

    public List<Product> getByCategory(ProductCategory category) {
        return PRODUCT_DAO.findProductByCategory(category);
    }

    public boolean deleteByID(Long userID, Long productID) {
        PRODUCT_DAO.deleteById(productID);
        return FileManager.deleteProductImages(userID, productID);
    }

}
