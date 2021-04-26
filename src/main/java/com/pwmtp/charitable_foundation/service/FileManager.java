package com.pwmtp.charitable_foundation.service;

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

    /*-------------- Public --------------*/

    /**
     * Saves the file to directory 'resources/images/{email}/{productName}'
     * @param image       - saved image
     * @param email       - email of product owner
     * @param productName - name of product
     * @return            - path to image or null (if the image could not be saved)
     */
    static public String saveImage(MultipartFile image, String email, String productName) {
        try {
            String dirForTransfer = createImgName(image.getOriginalFilename(), email, productName);
            image.transferTo(new File(dirForTransfer));
            return dirForTransfer.replace(ROOT_DIR, "");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Deleted the image from directory 'resources/images/{email}/{productName}'
     * @param email       - email of product owner
     * @param productName - name of product
     * @return            - <b>true</b> if the image was deleted, otherwise <b>false</b>
     */
    static public boolean deleteProductImages(String email, String productName) {
        String imageDir = createImgDirName(email, productName);
        return new File(imageDir).delete();
    }

    /**
     * Saves the file to directory 'resources/static/images'
     * @param file  - saved file
     * @param email - email of file owner
     * @param type  - type of file {@link FileType}
     * @return      - path to file or null (if the file could not be saved)
     */
    static public String saveFile(MultipartFile file, String email, FileType type) {
        try {
            String dirForTransfer = createFileName(file.getOriginalFilename(), email, type);
            file.transferTo(new File(dirForTransfer));
            return dirForTransfer.replace(ROOT_DIR, "");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /*-------------- Private --------------*/

    static private String createImgName(String fileName, String email, String productName) {
        String dir = ROOT_DIR + File.separator +
                "resources" + File.separator +
                "images" + File.separator +
                email + File.separator + productName;
        directoryValidating(new File(dir));
        return dir + File.separator + fileName;
    }

    static private String createImgDirName(String email, String productName) {
        return ROOT_DIR + File.separator +
                "resources" + File.separator +
                "images" + File.separator +
                email + File.separator + productName;
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
