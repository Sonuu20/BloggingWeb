import { Client, Databases, Storage, ID, Query } from "appwrite";
import config from "../config/config";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.bloggingwebUrl)
            .setProject(config.ProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, Image, status, userid}) {
        try {
            return await this.databases.createDocument(
                config.DatabaseId,
                config.CollectionId,
                slug,
                {
                    title,
                    content,
                    Image,
                    status,
                    userid
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, Image, status}) {
        try {
            return await this.databases.updateDocument(
                config.DatabaseId,
                config.CollectionId,
                slug,
                {
                    title,
                    content,
                    Image,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug ) {
        try {
            await this.databases.deleteDocument(
                config.DatabaseId,
                config.CollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return  await this.databases.getDocument(
                config.DatabaseId,
                config.CollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
        }
    }

    async getPosts(quries = [Query.equal("status","active")]) {
        try {
             return await this.databases.listDocuments(
                config.DatabaseId,
                config.CollectionId,
                quries
            )
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    //file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.BucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

     //file delete service
     async deleteFile(fileId) {
         try {
            return await this.bucket.deleteFile(
                 config.BucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.BucketId,
            fileId
        )
    }

}



const service = new Service()

export default service