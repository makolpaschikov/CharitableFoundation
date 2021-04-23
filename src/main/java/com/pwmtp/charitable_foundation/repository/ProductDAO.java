package com.pwmtp.charitable_foundation.repository;

import com.pwmtp.charitable_foundation.domain.ProductCategory;
import com.pwmtp.charitable_foundation.domain.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductDAO extends CrudRepository<Product, Long> {
    Product findProductById(Long id);
    Product findProductByName(String name);
    List<Product> findProductByUserID(Long id);
    List<Product> findProductByCategory(ProductCategory category);
}
