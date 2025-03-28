/**
 * 储存类
 * @author kim.wu <https://github.com/kimwuX>
 * @class
 */
class Vault {
    // 构造方法
    constructor() {
        this.__vault = GM_getValue(location.host) || {};
    }

    get_data(key, defaultValue) {
        return this.__vault[key] || defaultValue;
    }

    set_data(key, value) {
        this.__vault[key] = value;
    }

    get_str_data(key, defaultValue) {
        return this.__vault[key] ? JSON.parse(this.__vault[key]) : defaultValue;
    }

    set_str_data(key, value) {
        this.__vault[key] = JSON.stringify(value);
    }

    save_vault() {
        GM_setValue(location.host, this.__vault);
    }

    print_vault() {
        console.log(this.__vault);
    }
}

/**
 * 菜单类
 * @author kim.wu <https://github.com/kimwuX>
 * @class
 */
class Menu extends Vault {
    // 构造方法
    constructor(menu_list) {
        super();
        this.menu_list = menu_list;
        this.menu_ID = [];

        this.register_menu();
    }

    get_menu_data() {
        return this.get_str_data('menu', {});
    }

    set_menu_data(value) {
        this.set_str_data('menu', value);
    }

    // 注册脚本菜单
    register_menu() {
        for (let i = 0; i < this.menu_ID.length; i++) {
            GM_unregisterMenuCommand(this.menu_ID[i]);
        }

        //this.print_vault();
        let dic = this.get_menu_data();
        for (const arr of this.menu_list) {
            if (dic.hasOwnProperty(arr[0])) {
                arr[2] = dic[arr[0]];
            }
        }
        //console.log(this.menu_list);

        for (let i = 0; i < this.menu_list.length; i++) { // 循环注册脚本菜单
            this.menu_ID[i] = GM_registerMenuCommand(
                `${this.menu_list[i][2] ? '✅' : '❌'} ${this.menu_list[i][1]}`, () => {
                    this.menu_switch(this.menu_list[i][2], this.menu_list[i][0], this.menu_list[i][1]);
                }
            );
        }
    }

    // 菜单开关
    menu_switch(menuStatus, key, tips) {
        let dic = this.get_menu_data();
        if (menuStatus) {
            dic[key] = false;
            GM_notification({ text: `已禁用【${tips}】功能`, timeout: 3000 });
        } else {
            dic[key] = true;
            GM_notification({ text: `已启用【${tips}】功能`, timeout: 3000 });
        }
        this.set_menu_data(dic);
        this.save_vault();
        this.register_menu(); // 重新注册脚本菜单
    }

    // 返回菜单值
    get_menu_value(menuName) {
        for (let menu of this.menu_list) {
            if (menu[0] == menuName) {
                return menu[2];
            }
        }
    }
}

