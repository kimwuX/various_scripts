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

    /**
     * 开始监听 DOM 节点的变化
     * @param {*} target 被监听的 DOM 节点
     */
    observe(target) {
        this.__observer && this.__observer.observe(target, {childList: true, subtree: true});
    }

    /**
     * 取消监听 DOM 节点的变化
     */
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

    /**
     * 获取所有属性名称
     * @returns 属性名称数组
     */
    get_keys() {
        return Object.keys(this.__vault);
    }

    /**
     * 删除数据
     * @param {string} key 属性名称
     */
    delete_data(key) {
        delete this.__vault[key];
    }

    /**
     * 获取数据
     * @param {string} key 属性名称
     * @param {*} [defaultValue] 默认值
     * @returns 属性值
     */
    get_data(key, defaultValue) {
        return this.__vault[key] || defaultValue;
    }

    /**
     * 设置数据
     * @param {string} key 属性名称
     * @param {*} value 属性值
     */
    set_data(key, value) {
        this.__vault[key] = value;
    }

    /**
     * 获取序列化数据
     * @param {string} key 属性名称
     * @param {*} [defaultValue] 默认值
     * @returns 属性值
     */
    get_str_data(key, defaultValue) {
        return this.__vault[key] ? JSON.parse(this.__vault[key]) : defaultValue;
    }

    /**
     * 设置序列化数据
     * @param {string} key 属性名称
     * @param {*} value 属性值
     */
    set_str_data(key, value) {
        this.__vault[key] = JSON.stringify(value);
    }

    /**
     * 保存数据到本地
     */
    save_vault() {
        GM_setValue(location.host, this.__vault);
    }

    /**
     * 打印所有数据
     */
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

    /**
     * 获取菜单数据
     * @returns 菜单数据对象
     */
    get_menu_data() {
        return this.get_str_data('menu', {});
    }

    /**
     * 设置菜单数据
     * @param {object} value 菜单数据对象
     */
    set_menu_data(value) {
        this.set_str_data('menu', value);
    }

    /**
     * 注册菜单
     */
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
                    this.__menu_switch(this.menu_list[i][2], this.menu_list[i][0], this.menu_list[i][1]);
                }, {
                    id : idx
                }
            );
        }
    }

    /**
     * 点击菜单回调函数
     * @param {boolean} state 菜单状态
     * @param {string} name 菜单名称
     * @param {string} title 菜单标题
     */
    __menu_switch(state, name, title) {
        let dic = this.get_menu_data();
        if (state) {
            dic[name] = false;
            GM_notification({ text: `已禁用【${title}】功能`, timeout: 3000 });
        } else {
            dic[name] = true;
            GM_notification({ text: `已启用【${title}】功能`, timeout: 3000 });
        }
        this.set_menu_data(dic);
        this.save_vault();
        this.register_menu(); // 重新注册脚本菜单
    }

    /**
     * 获取菜单状态
     * @param {string} name 菜单名称
     * @returns 
     */
    get_menu_value(name) {
        for (let menu of this.menu_list) {
            if (menu[0] == name) {
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
     * 检查是否空白字符串
     * @param {string} str 
     * @returns {boolean}
     */
    static isEmptyString(str) {
        return !(str != null && str.trim().length > 0);
    }

    /**
     * 检查是否有效日期对象
     * @param {Date} date 
     * @returns {boolean}
     */
    static isValidDate(date) {
        return date instanceof Date && !isNaN(date.getTime());
    }

    /**
     * 检查对象是否包含指定的键
     * @param {object} obj - 要检查的对象
     * @param {string} key - 要查找的键
     * @param {boolean} ignoreCase - 是否忽略大小写（默认false）
     * @returns {boolean} 如果对象包含该键则返回true，否则返回false
     */
    static hasKey(obj, key, ignoreCase = false) {
        // 参数验证
        if (!obj || typeof obj !== 'object' || obj === null) {
            return false;
        }
        if (typeof key !== 'string') {
            return false;
        }
        // 如果不忽略大小写，直接使用原生方法
        if (!ignoreCase) {
            return obj.hasOwnProperty(key);
        }
        // 忽略大小写时，遍历对象的所有键进行比较
        const targetKey = key.toLowerCase();
        for (const k in obj) {
            if (obj.hasOwnProperty(k) && k.toLowerCase() === targetKey) {
                return true;
            }
        }
        return false;
    }

    /**
     * 获取网站 cookie，需要允许使用 [GM_cookie]
     * @param {string} [name] 需要获取的 cookie 名称，如果不传值则获取所有 cookie
     * @returns {Promise<any>} cookie 对象数组
     * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.list
     */
    static getCookie(name) {
        return new Promise((resolve, reject) => {
            GM_cookie.list({ name: name }, (cookies, error) => {
                if (error) {
                    reject(new Error(`Get cookie[${name}] error: ${error}`));
                } else {
                    // console.log(cookies);
                    resolve(cookies);
                }
            });
        });
    }

    /**
     * 发起 HTTP 请求，需要允许使用 [GM_xmlhttpRequest]
     * @param {string} method 请求方式 ('GET', 'POST', 'PUT', 'DELETE')
     * @param {string} url 请求地址
     * @param {string} responseType 响应类型 ('text', 'json', 'arrayBuffer', 'blob')
     * @param {Object} options 加载选项，可以包含 data/headers/cookie/timeout/onProgress 等参数
     * @returns {Promise<any>} 加载完成的数据
     * @see https://www.tampermonkey.net/documentation.php#api:GM_xmlhttpRequest
     */
    static request(method, url, responseType = 'text', options = {}) {
        return new Promise((resolve, reject) => {
            options = options || {};
            let headers = options.headers || {};
            if (!this.hasKey(headers, "User-Agent", true)) {
                headers["User-Agent"] = navigator.userAgent;
            }
            GM_xmlhttpRequest({
                method: method,
                url: url,
                headers: headers,
                data: options.data,
                cookie: options.cookie,
                timeout: options.timeout || 15000,
                responseType: responseType,
                onload: result => {
                    // console.log(result);
                    if (result.status >= 200 && result.status < 300) {
                        resolve(result.response);
                    } else {
                        reject(new Error(`HTTP error while requesting ${url}: ${result.status} ${result.statusText}`));
                    }
                },
                onabort: () => {
                    reject(new Error(`Request to ${url} was aborted`));
                },
                onerror: () => {
                    reject(new Error(`Network error while requesting ${url}`));
                },
                ontimeout: () => {
                    reject(new Error(`Timeout while requesting ${url}`));
                },
                onprogress: result => {
                    // console.log(result);
                    if (result.lengthComputable) {
                        const percentComplete = (result.loaded / result.total) * 100;
                        // console.log(`${Math.ceil(percentComplete)}% loaded`);
                        if (options.onProgress) {
                            options.onProgress(percentComplete, result.loaded, result.total);
                        }
                    }
                }
            });
        });
    }

    /**
     * 发起 HTTP GET 请求，需要允许使用 [GM_xmlhttpRequest]
     * @param {string} url 请求地址
     * @param {string} responseType 响应类型 ('text', 'json', 'arrayBuffer', 'blob')
     * @param {Object} options 加载选项，可以包含 headers/cookie/timeout/onProgress 等参数
     * @returns {Promise<any>} 加载完成的数据
     * @see https://www.tampermonkey.net/documentation.php#api:GM_xmlhttpRequest
     */
    static load(url, responseType = 'text', options = {}) {
        return this.request('GET', url, responseType, options);
    }

    /**
     * 发起 HTTP POST 请求，需要允许使用 [GM_xmlhttpRequest]
     * @param {string} url 请求地址
     * @param {*} data 发送的数据
     * @param {string} responseType 响应类型 ('text', 'json', 'arrayBuffer', 'blob')
     * @param {Object} options 加载选项，可以包含 headers/cookie/timeout/onProgress 等参数
     * @returns {Promise<any>} 加载完成的数据
     * @see https://www.tampermonkey.net/documentation.php#api:GM_xmlhttpRequest
     */
    static post(url, data, responseType = 'json', options = {}) {
        options = options || {};
        options['data'] = data;
        let headers = options.headers || {};
        if (!this.hasKey(headers, "Content-Type", true)) {
            if (typeof data === 'string') {
                headers["Content-Type"] = 'text/plain';
            } else if (data instanceof Blob) {
                // Blob类型通常有自己的类型，不需要额外设置
            } else {
                headers["Content-Type"] = 'application/json';
            }
        }
        options['headers'] = headers;
        return this.request('POST', url, responseType, options);
    }
}
