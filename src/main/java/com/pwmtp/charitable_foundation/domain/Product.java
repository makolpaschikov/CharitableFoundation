package com.pwmtp.charitable_foundation.domain;

import javax.persistence.*;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @CollectionTable(name = "product_category", joinColumns = @JoinColumn(name = "product_id"))
    @Enumerated(EnumType.STRING)
    private ProductCategory category;

    private Long userID;
    private String name;
    private String description;
    private String image;

    /*---------- Constructors ----------*/

    public Product() {
    }

    public Product(String name, String description, ProductCategory category, Long userID) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.userID = userID;
    }

    /*---------- Getters and setters ----------*/

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImage() {
        return image;
    }
}
