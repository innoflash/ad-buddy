import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

export class AdBuddyDatabase {
    static dbname: string = 'adBuddyX1.db';
    static id: string = "_id";
    static facebook_id: string = 'facebook_id';
    static fname: string = '_name';
    static icon: string = '_icon';
    static groups: string = 'fcbk_groups_adb';
    static pages: string = 'fcbk_pages_adb';
    static group_posts: string = 'group_posts_adb';
    static page_posts: string = 'page_posts_adb';
    static activated: string = 'activated';
    static post: string = '_post';
    static time: string = '_time';
    static sender: string = '_sender';
    static page_id: string = 'page_id';
    static group_id: string = 'group_id';

    static wireDatabase(sqlite: SQLite): void {
        sqlite.create({
            name: this.dbname,
            location: 'default'
        }).then((db: SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS fcbk_groups_adb (_id INTEGER PRIMARY KEY, facebook_id VARCHAR(150) UNIQUE, _name VARCHAR(255), _icon VARCHAR(255), activated BOOLEAN)', {})
                .then(res => {
                    console.log('groups', res);
                }).catch(error => console.log(error));
            db.executeSql('CREATE TABLE IF NOT EXISTS fcbk_pages_adb (_id INTEGER PRIMARY KEY, facebook_id VARCHAR(150) UNIQUE, _name VARCHAR(255), _icon VARCHAR(255), activated BOOLEAN)', {})
                .then(res => {
                    console.log('pages', res);
                }).catch(error => console.log(error));
            db.executeSql('CREATE TABLE IF NOT EXISTS group_posts_adb (_id INTEGER PRIMARY KEY, facebook_id VARCHAR(150) UNIQUE, group_id VARCHAR(150), _post TEXT, _time VARCHAR(40), _sender VARCHAR(150), FOREIGN KEY(group_id) REFERENCES fcbk_groups_adb(facebook_id))', {})
                .then(res => {
                    console.log('grp posts', res);
                }).catch(error => console.log(error));
            db.executeSql('CREATE TABLE IF NOT EXISTS page_posts_adb (_id INTEGER PRIMARY KEY, facebook_id VARCHAR(150) UNIQUE, page_id VARCHAR(150), _post TEXT, _time VARCHAR(40), _sender VARCHAR(150), FOREIGN KEY(page_id) REFERENCES fcbk_pages_adb(facebook_id))', {})
                .then(res => {
                    console.log('pages posts', res);
                }).catch(error => console.log(error));
        }).catch(e => console.log(e));
    }

    static deleteDatabase(sqlite: SQLite): void {
        sqlite.deleteDatabase({
            name: this.dbname,
            location: 'default'
        }).then(res => console.log(res))
            .catch(error => console.log(error));
    }
}