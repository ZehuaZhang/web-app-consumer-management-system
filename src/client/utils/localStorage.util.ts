export function getStorage() {
    if (!window || !window.localStorage) {
        console.log('current browser doesnt support local storage')
        return undefined
    }
    return  window.localStorage
}

export function setItem(key: string, value: string) {
    const storage = getStorage()

    if (!storage) {
        return
    }
    
    storage.setItem(key, value)
}

export function getItem(key: string) {
    const storage = getStorage()

    if (!storage) {
        return undefined
    }
    
    return storage.getItem(key)
}

export function removeItem(key: string) {
    const storage = getStorage()

    if (!storage) {
        return
    }
    
    storage.removeItem(key)
}