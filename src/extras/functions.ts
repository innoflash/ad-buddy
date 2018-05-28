import { User } from "./user";
import { Storage } from "@ionic/storage";
import { Stats } from "./stats";

export class Functions{

    static getUser(user:any = null) :User{
        var currentUser = new User();
        currentUser.first_name = user.additionalUserInfo.profile.first_name;
        currentUser.last_name = user.additionalUserInfo.profile.last_name;
        currentUser.email = user.additionalUserInfo.profile.email;
        currentUser.id = user.additionalUserInfo.profile.id;
        currentUser.displayName = user.additionalUserInfo.profile.name;
        currentUser.phoneNumber = user.user.phoneNumber;
        currentUser.picture = user.additionalUserInfo.profile.picture.data.url;
        console.log(currentUser)
        return currentUser;
    }

    static defaultSettings(storage: Storage){
        storage.set(Stats.adCheckFrequency, 10);
        storage.set(Stats.pageGroupNum, 10);
    }
}