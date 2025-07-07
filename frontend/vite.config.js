import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    root: env.VITE_ROOT_DIR || "./src",
    build: {
      outDir: env.VITE_BUILD_DIR || "dist",
      emptyOutDir: env.VITE_CLEAN_BUILD === "true",
      rollupOptions: {
        input: {
          index: resolve(__dirname, "src/index.html"),
          ajoutProduit: resolve(__dirname, "src/produit/form/index.html"),
          produit: resolve(__dirname, "src/produit/index.html"),
          utilisateur: resolve(__dirname, "src/utilisateur/index.html"),
          connexion: resolve(__dirname, "src/utilisateur/connexion/index.html"),
          inscription: resolve(
            __dirname,
            "src/utilisateur/inscription/index.html"
          ),
        },
      },
    },
  };
});
