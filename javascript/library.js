/**
 * 基类
 * @author kim.wu <https://github.com/kimwuX>
 * @class
 */
class AppBase {
    // 构造方法
    constructor(name) {
        this.name = name || 'app_base';
        this.log('inited.');
    }

    /**
     * 打印控制台日志
     * @param data 输出内容
     * @param level 1-警告级别，2-错误级别，默认普通级别
     */
    log(data, level = 0) {
        let func;
        if (level == 2) {
            func = console.error;
        } else if (level == 1) {
            func = console.warn;
        } else {
            func = console.log;
        }
        if (data instanceof Object) {
            func(data);
        } else {
            func(`---${this.name}---\n[${new Date().toLocaleTimeString()}] ${data}`);
        }
    }
}

/**
 * 观察者类
 * @author kim.wu <https://github.com/kimwuX>
 * @class
 */
class Observer {
    // 构造方法
    constructor(callback) {
        this.__mutation_observer(callback);
    }

    observe(target) {
        this.__observer && this.__observer.observe(target, {childList: true, subtree: true});
    }

    disconnect() {
        this.__observer && this.__observer.disconnect();
    }

    __mutation_observer(callback) {
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        this.__observer = new MutationObserver(mutationList =>
            mutationList.filter(m => m.type === 'childList').forEach(m => {
                // console.log(m);
                try{
                    callback(m.addedNodes, m.removedNodes);
                } catch (err) {}
            }
        ));
    }
}

/**
 * 储存类，需要允许使用 [GM_getValue, GM_setValue]
 * @author kim.wu <https://github.com/kimwuX>
 * @class
 */
class Vault {
    // 构造方法
    constructor() {
        this.__vault = GM_getValue(location.host) || {};
    }

    get_keys() {
        return Object.keys(this.__vault);
    }

    delete_data(key) {
        delete this.__vault[key];
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
 * 菜单类，需要允许使用 [GM_registerMenuCommand, GM_notification]
 * @author kim.wu <https://github.com/kimwuX>
 * @class
 */
class Menu extends Vault {
    // 构造方法
    constructor(menu_list) {
        super();

        this.menu_list = menu_list;
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
        // this.print_vault();
        let dic = this.get_menu_data();
        for (const arr of this.menu_list) {
            if (dic.hasOwnProperty(arr[0])) {
                arr[2] = dic[arr[0]];
            }
        }
        // console.log(this.menu_list);

        for (let i = 0; i < this.menu_list.length; i++) { // 循环注册脚本菜单
            let idx = i + 1;
            GM_registerMenuCommand(
                `${this.menu_list[i][2] ? '✔️' : '❌'} ${idx}.${this.menu_list[i][1]}`, () => {
                    // console.log(i, this.menu_list[i]);
                    this.menu_switch(this.menu_list[i][2], this.menu_list[i][0], this.menu_list[i][1]);
                }, {
                    id : idx
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

/**
 * 工具类
 * @author kim.wu <https://github.com/kimwuX>
 * @class
 */
class Utils {
    /**
     * 判断是否空白字符串
     * @param {string} str 
     * @returns 
     */
    static isEmptyString(str) {
        return !(str != null && str.trim().length > 0);
    }

    /**
     * 判断是否有效日期对象
     * @param {Date} date 
     * @returns 
     */
    static isValidDate(date) {
        return date instanceof Date && !isNaN(date.getTime());
    }

    /**
     * 获取网站 cookie，需要允许使用 [GM.cookie]
     * @param key 指定 cookie 键
     * @returns 指定 cookie 值
     */
    static async getCookie(key) {
        let res = null;
        const cookies = await GM.cookie.list();
        // console.log(cookies);
        for (const element of cookies) {
            // console.log(element);
            if (element.name == key) {
                res = element.value;
            }
        }
        // console.log(res);
        if (!res) {
            return Promise.reject(`get cookie[${key}] failed!`);
        }
        return res;
    }

    /**
     * 发起HTTP GET请求，需要允许使用 [GM.xmlHttpRequest]
     * @param url 请求地址
     * @param headers 请求头
     * @param responseType 响应数据类型
     * @param cookie 请求 cookie
     * @param timeout 超时时间
     * @returns 响应内容
     */
    static async httpGet(url, headers, responseType, cookie, timeout) {
        if (!headers) {
            headers = {};
        }
        if (!headers.hasOwnProperty("User-Agent")) {
            headers["User-Agent"] = navigator.userAgent;
        }
        const r = await GM.xmlHttpRequest({
            method: 'GET',
            url: url,
            headers: headers,
            cookie: cookie,
            timeout: timeout || 15000,
            responseType: responseType
        });
        // console.log(r);
        if (!r.response) {
            return Promise.reject(`get "${url}" ${r.status} ${r.statusText}!`);
        }
        return r.response;
    }
}

