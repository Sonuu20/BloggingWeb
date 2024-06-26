import { Client, Account, ID } from "appwrite";
import config from "../config/config.js"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.bloggingwebUrl)
            .setProject(config.ProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
           const userAccount =  await this.account.create(ID.unique(), email, password, name);

           if (userAccount) {
            //call another method

            return this.login({email, password});
           } else {
            return userAccount;
           }

        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

    async forgotPassword(email){
        try {
            return this.account.createRecovery(email, 'https://bloggingvista.netlify.app/resetPassword');
        } catch (error) {
            console.log("Appwrite service :: forgotPassword :: error", error);
            alert('Cannot send the mail. Try after sometime! ');
        }
    }

    async resetPassword(userid, secret, newPassword){
        try {
            return this.account.updateRecovery(userid, secret, newPassword, newPassword);
        } catch (error) {
            console.log("Appwrite service :: updatePassword :: error", error);
            alert('Cannot send the mail. Try after sometime! ');
        }
    }

    async createOAccount() {
        try {
            return this.account.createOAuth2Session('google' , "https://bloggingvista.netlify.app", "https://bloggingvista.netlify.app/signup")
        }
        catch (error) {
            console.log(error);
        }
    }
    // async updateName(name) {
    //     try {
    //         return await this.account.updateName(name);
    //     } catch (error) {
    //         console.log("Appwrite service :: logout :: error", error);
    //     }
    // }
}

const authService = new AuthService();

export default authService
