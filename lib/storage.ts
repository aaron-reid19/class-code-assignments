import AsyncStorage from "@react-native-async-storage/async-storage";

//typed key name to prevent types

export const STORAGE_KEY = {
    PROFILE: "profile",
    NOTIFICATIONS: "notifications",
    THEME: "themes"
} as const;

// get a value from storage (auto-parses JSON)

export const get = async<T>(key:string): Promise <T | null> => {
const value = await AsyncStorage.getItem(key);
if(value === null) return null;
return JSON.parse(value) as T;
}

// SET VALUE IN STORAGE 
export const set = async<T>(key:string, value:unknown): Promise<void> => {
    await AsyncStorage.setItem(key, JSON.stringify(value))
}
export const remove = async (key:string): Promise<void> => (
    await AsyncStorage.removeItem(key)
)