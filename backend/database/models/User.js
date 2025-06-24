import JSONArrayDatabase from "../JSONArrayDatabase.js";

const usersDB = new JSONArrayDatabase("users.json");

export default class User {
  static async create(userData) {
    // Vérifier si l'email existe déjà
    const existingUser = await usersDB.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    return usersDB.insert(userData);
  }

  static async findByEmail(email) {
    return usersDB.findByEmail(email);
  }

  static async update(id, updates) {
    // Si on veut changer l'email, vérifier qu'il n'existe pas déjà
    if (updates.email) {
      const existingUser = await usersDB.findByEmail(updates.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email already in use");
      }
    }
    return usersDB.update(id, updates);
  }

  static async delete(id) {
    return usersDB.delete(id);
  }

  static async findById(id) {
    return usersDB.findById(id);
  }

  static async findAll() {
    return usersDB.findAll();
  }
}
