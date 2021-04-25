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
    private final UserService USER_SERVICE;

    @Autowired
    public ProductService(ProductDAO productDAO, UserService userService) {
        this.PRODUCT_DAO = productDAO;
        this.USER_SERVICE = userService;
    }

    public void update(Product product) {
        PRODUCT_DAO.save(product);
    }

    public boolean addProduct(User user, List<MultipartFile> images, Product product) {
        product.setImage(FileManager.saveImage(images.get(0), user.getEmail(), product.getName()));
        PRODUCT_DAO.save(product);
        return true;
    }

    public List<Product> getAll() {
        return PRODUCT_DAO.findAllOrdered();
    }

    public List<Product> getByUserID(Long id) {
        return PRODUCT_DAO.findProductByUserID(id);
    }

    public List<Product> getByCategory(ProductCategory category) {
        return PRODUCT_DAO.findProductByCategory(category);
    }

    public boolean deleteByID(Long userID, Long productID) {
        PRODUCT_DAO.deleteById(productID);
        return FileManager.deleteProductImages(USER_SERVICE.getByID(userID).getEmail(), productID);
    }

}
