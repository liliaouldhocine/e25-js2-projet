import JSONArrayDatabase from "../JSONArrayDatabase.js";
const productsDB = new JSONArrayDatabase("products.json");

export default class Product {
  /**
   * Crée un nouveau produit avec validation basique
   */
  static async create(productData) {
    // Validation minimale
    if (!productData.nom || !productData.prix) {
      throw new Error("Le nom et le prix sont obligatoires");
    }

    return productsDB.insert(productData);
  }

  /**
   * Trouve un produit par son ID
   */
  static async findById(id) {
    return productsDB.findById(id);
  }

  /**
   * Trouve tous les produits
   */
  static async findAll() {
    return productsDB.findAll();
  }

  /**
   * Trouve les produits disponibles (en stock)
   */
  static async findAvailable() {
    const products = await productsDB.findAll();
    return products.filter((p) => p.estDisponible && p.stock > 0);
  }

  /**
   * Met à jour un produit
   */
  static async update(id, updates) {
    const existing = await productsDB.findById(id);
    if (!existing) {
      throw new Error("Produit non trouvé");
    }

    const updatedData = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return productsDB.update(id, updatedData);
  }

  /**
   * Supprime un produit
   */
  static async delete(id) {
    return productsDB.delete(id);
  }

  /**
   * Met à jour le stock d'un produit
   */
  static async updateStock(id, quantityChange) {
    const product = await productsDB.findById(id);
    if (!product) {
      throw new Error("Produit non trouvé");
    }

    const newStock = product.stock + quantityChange;
    if (newStock < 0) {
      throw new Error("Stock ne peut pas être négatif");
    }

    return productsDB.update(id, {
      stock: newStock,
      estDisponible: newStock > 0,
      updatedAt: new Date().toISOString(),
    });
  }

  /**
   * Recherche des produits par nom ou maison
   */
  static async search(searchTerm) {
    const products = await productsDB.findAll();
    return products.filter(
      (p) =>
        p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.maison && p.maison.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
}
