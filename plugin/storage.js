import Vue from 'vue'

let storage = {
    setStorage(KEY, DATA) { // 存储单个
        uni.setStorageSync(KEY, DATA)
    },
    getStorageSync(KEY) { // 查找单个
        return uni.getStorageSync(KEY)
    },
    infoStorage() { // 获取当前storage的相关信息
        return uni.getStorageSyncInfoSync();
    },
    removeStorage(KEY) { // 删除单个
        uni.removeStorageSync(KEY)
    },
    clearStorage() { // 清空
        uni.clearStorageSync()
    }
}

Vue.prototype.$storage = storage

export default storage