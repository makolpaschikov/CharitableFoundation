package com.pwmtp.charitable_foundation.repository;

import com.pwmtp.charitable_foundation.domain.Category;
import com.pwmtp.charitable_foundation.domain.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductDAO extends CrudRepository<Product, Long> {
    Product findProductById(Long id);
    Product findProductByUserId(Long id);
    Product findProductByName(String name);
    Product findProductByCategory(Category category);
}
