class MySingleton {
    constructor() {
      this.myBoolean1 = true;
      this.myBoolean2 = false;
      this.listeners = new Set();
    }
  
    setMyBoolean1(value) {
      this.myBoolean1 = value;
      this.notifyListeners();
    }
  
    getMyBoolean1() {
      return this.myBoolean1;
    }
  
    setMyBoolean2(value) {
      this.myBoolean2 = value;
      this.notifyListeners();
    }
  
    getMyBoolean2() {
      return this.myBoolean2;
    }
  
    subscribe(listener) {
      this.listeners.add(listener);
    }
  
    unsubscribe(listener) {
      this.listeners.delete(listener);
    }
  
    notifyListeners() {
      for (const listener of this.listeners) {
        listener();
      }
    }
  }
  
  const instance = new MySingleton();
  export default instance;