package com.pwmtp.charitable_foundation.service;

import com.pwmtp.charitable_foundation.domain.Product;
import com.pwmtp.charitable_foundation.domain.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Locale;

public class FileManager {
    
    enum FileType {
        APPLICATION,
        IDENTITY
    }
    
    static private final String ROOT_DIR = System.getProperty("user.dir");
    static private final String IMAGES_DIR = "/resources/images";

    /*-------------- Public --------------*/

    /**
     * Saves the file to directory 'resources/static/images'
     * @param image   - saved image
     * @param product - the product
     * @return        - true if the image was saved, else false
     */
    static public boolean saveImage(MultipartFile image, long userID, Product product) {
        try {
            String dirForTransfer = createImgName(image.getOriginalFilename(), userID, product.getId());
            image.transferTo(new File(dirForTransfer));
            product.getImages().add(IMAGES_DIR + dirForTransfer.replaceAll(ROOT_DIR, ""));
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Deleted the file from directory 'resources/static/images'
     * @param productID - name of image (id of image product)
     * @return          - true if the image was deleted, else false
     */
    static public boolean deleteProductImages(long userID, long productID) {
        String imageDir = createImgDirName(userID, productID);
        return new File(imageDir).delete();
    }

    /**
     * Saves the file to directory 'resources/static/images'
     * @param file - saved file
     * @return     - true if the image was saved, else false
     */
    static public String saveFile(MultipartFile file, User user, FileType type) {
        try {
            String dirForTransfer = createFileName(file.getOriginalFilename(), user.getEmail(), type);
            file.transferTo(new File(dirForTransfer));
            return dirForTransfer.replace(ROOT_DIR, "");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /*-------------- Private --------------*/

    static private String createImgName(String fileName, long userID, long productID) {
        String dir = ROOT_DIR + File.separator +
                "resources" + File.separator +
                "images" + File.separator +
                userID + File.separator + productID;
        directoryValidating(new File(dir));
        return dir + File.separator + fileName;
    }

    static private String createImgDirName(long userID, long productID) {
        return ROOT_DIR + File.separator +
                "resources" + File.separator +
                "images" + File.separator +
                userID + File.separator + productID;
    }

    static private String createFileName(String fileName, String email, FileType type) {
        String dir = ROOT_DIR + File.separator +
                "resources" + File.separator +
                "files" + File.separator
                + email + File.separator + type.name().toLowerCase(Locale.ROOT);
        directoryValidating(new File(dir));
        return dir + File.separator + fileName;
    }

    static private void directoryValidating(File directory) {
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }


}
