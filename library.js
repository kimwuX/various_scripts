/**
 * 菜单逻辑类
 * @author kim.wu <https://github.com/kimwuX>
 * @class
 */
class Menu {
    // 构造方法
    constructor(menu_list) {
      this.menu_list = menu_list;
      this.menu_ID = [];
      this.vault = GM_getValue(location.host) || {};

      this.registerMenu();
    }

    // 注册脚本菜单
    registerMenu() {
        for (let i = 0; i < this.menu_ID.length; i++) {
            GM_unregisterMenuCommand(this.menu_ID[i]);
        }

        //console.log(this.vault);
        let dic = this.vault.menu ? JSON.parse(this.vault.menu) : {};
        for (const arr of this.menu_list) {
            if (dic.hasOwnProperty(arr[0])) {
                arr[2] = dic[arr[0]];
            }
        }
        //console.log(this.menu_list);

        for (let i = 0; i < this.menu_list.length; i++) { // 循环注册脚本菜单
            this.menu_ID[i] = GM_registerMenuCommand(
                `${this.menu_list[i][2] ? '✅' : '❌'} ${this.menu_list[i][1]}`, () => {
                    this.menuSwitch(this.menu_list[i][2], this.menu_list[i][0], this.menu_list[i][1]);
                }
            );
        }
    }

    // 菜单开关
    menuSwitch(menuStatus, key, tips) {
        let dic = this.vault.menu ? JSON.parse(this.vault.menu) : {};
        if (menuStatus) {
            dic[key] = false;
            GM_notification({ text: `已禁用【${tips}】功能`, timeout: 3000 });
        } else {
            dic[key] = true;
            GM_notification({ text: `已启用【${tips}】功能`, timeout: 3000 });
        }
        this.vault.menu = JSON.stringify(dic);
        this.saveVault();
        this.registerMenu(); // 重新注册脚本菜单
    }

    // 返回菜单值
    getMenuValue(menuName) {
        for (let menu of this.menu_list) {
            if (menu[0] == menuName) {
                return menu[2];
            }
        }
    }

    getVault() {
        return this.vault;
    }

    saveVault() {
        GM_setValue(location.host, this.vault);
    }
}
