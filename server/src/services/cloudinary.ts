import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export class CloudinaryService {

    /**
     * Upload a local file to Cloudinary
     * @param filePath Local path to the file
     * @param folder Folder in Cloudinary (optional)
     * @returns Cloudinary upload result
     */
    async uploadFile(filePath: string, folder: string = 'viralcuts/raw'): Promise<any> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(filePath, {
                resource_type: 'video',
                folder: folder,
            }, (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Delete a file from Cloudinary
     * @param publicId Cloudinary Public ID
     * @returns Cloudinary deletion result
     */
    async deleteFile(publicId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, {
                resource_type: 'video'
            }, (error, result) => {
                if (error) {
                    console.error('Cloudinary delete error:', error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Get a secure URL for a resource
     * @param publicId Cloudinary Public ID
     */
    /**
     * Get a secure URL for a resource
     * @param publicId Cloudinary Public ID
     */
    getResourceUrl(publicId: string): string {
        return cloudinary.url(publicId, {
            resource_type: 'video',
            secure: true
        });
    }

    /**
     * Generate signature for client-side uploads
     */
    generateSignature(timestamp: number): string {
        return cloudinary.utils.api_sign_request(
            { timestamp, folder: 'viralcuts/raw' }, // Must match the params sent by client
            process.env.CLOUDINARY_API_SECRET!
        );
    }
}

export const cloudinaryService = new CloudinaryService();
