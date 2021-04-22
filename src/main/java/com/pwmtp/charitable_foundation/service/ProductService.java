package com.pwmtp.charitable_foundation.service;

import com.pwmtp.charitable_foundation.domain.ProductCategory;
import com.pwmtp.charitable_foundation.domain.Product;
import com.pwmtp.charitable_foundation.repository.ProductDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void addProduct(Product product) {
        PRODUCT_DAO.save(product);
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


    public void deleteByID(Long id) {
        PRODUCT_DAO.deleteById(id);
    }

    public void deleteByObject(Product product) {
        PRODUCT_DAO.delete(product);
    }

    public void deleteAll() {
        PRODUCT_DAO.deleteAll();
    }
}
