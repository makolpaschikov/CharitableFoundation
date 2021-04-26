package com.pwmtp.charitable_foundation.repository;

import com.pwmtp.charitable_foundation.domain.Product;
import com.pwmtp.charitable_foundation.domain.ProductCategory;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductDAO extends CrudRepository<Product, Long> {
    Product findProductById(Long id);
    List<Product> findProductByCategory(ProductCategory category);
    List<Product> findProductByUserIDAndCategory(Long id, ProductCategory category);
}
