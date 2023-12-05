class MySingleton {
  constructor() {
    this.myBoolean1 = true;
    this.myBoolean2 = false;
    this.role = ""; // Nouvelle propriété pour stocker le rôle
    this.photoPath = "";
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

  // Nouvelle méthode pour définir le rôle
  setRole(role) {
    this.role = role;
    this.notifyListeners();
  }

  // Nouvelle méthode pour obtenir le rôle
  getRole() {
    return this.role;
  }

  setPhotoPath(photoPath) {
    this.photoPath = photoPath;
    this.notifyListeners();
  }

  // Nouvelle méthode pour obtenir le rôle
  getPhotoPath() {
    return this.photoPath;
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