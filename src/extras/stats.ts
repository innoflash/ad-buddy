import {User} from "./user";

export class Stats {
    static server_response: string = 'Server Response!';
    static authed: string = 'authenticated';
    static user: string = 'adbuddy_user';
    static adCheckFrequency: string = 'adcheck_frequency';
    static appNotification: string = 'AD Buddy!';
    static pageGroupNum: string = 'page_group_numbers';
    static access_token: string = 'access_token_ting'

    //  private currentUser:User;

    constructor() {

    }

    static getUser(user: any = null): User {
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

    static getLikedPages(userid: string, access_token: string, results: number = 10): string {
        return 'https://graph.facebook.com/v3.0/' + userid + '?fields=likes.limit(' + results + '){name,created_time,picture{url}}&access_token=' + access_token;
    }

    static getLongLivedAccessToken(short_lived: string,
                                   app_id: string = '183166799169843',
                                   app_secret: string = 'a395928d8aa16ae264e88a6c0408d3ad'): string {
        return 'https://graph.facebook.com/v3.0/oauth/access_token?grant_type=fb_exchange_token&client_id=' + app_id + '&client_secret=' + app_secret + '&fb_exchange_token=' + short_lived;
    }
}