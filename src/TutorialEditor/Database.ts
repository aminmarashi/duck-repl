export class Database {
  public static store(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public static load(key: string, callback: Callback) {
    const value = localStorage.getItem(key);
    if (value) {
      callback(JSON.parse(value));
    }
  }
}

type Callback = (result: any) => void;