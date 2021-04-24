package com.pwmtp.charitable_foundation.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Locale;

public class FileManager {
    
    enum FileType {
        APPLICATON,
        IDENTITY
    }
    
    static private final String ROOT_DIRECTORY = System.getProperty("user.dir");

    /*-------------- Public --------------*/

    /**
     * Saves the file to directory 'resources/static/images'
     * @param image     - saved image
     * @param productID - id of image product
     * @return          - true if the image was saved, else false
     */
    static public boolean saveImage(MultipartFile image, long userID, long productID) {
        try {
            String dirForTransfer = createImgName(image.getOriginalFilename(), userID, productID);
            image.transferTo(new File(dirForTransfer));
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
     * @param file      - saved file
     * @return          - true if the image was saved, else false
     */
    static public boolean saveFile(MultipartFile file, long userID, FileType type) {
        try {
            String dirForTransfer = createFileName(file.getOriginalFilename(), userID, type);
            file.transferTo(new File(dirForTransfer));
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    /*-------------- Private --------------*/

    static private String createImgName(String fileName, long userID, long productID) {
        String dir = ROOT_DIRECTORY + File.separator +
                "resources" + File.separator +
                "images" + File.separator +
                userID + File.separator + productID;
        directoryValidating(new File(dir));
        return dir + File.separator + fileName;
    }

    static private String createImgDirName(long userID, long productID) {
        return ROOT_DIRECTORY + File.separator +
                "resources" + File.separator +
                "images" + File.separator +
                userID + File.separator + productID;
    }

    static private String createFileName(String fileName, long userID, FileType type) {
        String dir = ROOT_DIRECTORY + File.separator +
                "resources" + File.separator +
                "files" + File.separator
                + userID + File.separator + type.name().toLowerCase(Locale.ROOT);
        directoryValidating(new File(dir));
        return dir + File.separator + fileName;
    }

    static private void directoryValidating(File directory) {
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }


}
