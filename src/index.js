import express from "express";
import cors from "cors";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { validate } from "./middleware/validation/validation.js";
import { PokemonSchema } from "./middleware/validation/validationSchema.js";
import { pokemonController } from "./controllers/pokemonController.js";
import verifyJwt from "./middleware/jwt/authMiddleware.js";
import errorHandler from "./middleware/error/errorMiddleware.js";

dotenv.config();

// Lire le fichier JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pokemonsList = JSON.parse(fs.readFileSync(path.join(__dirname, './data/pokemons.json'), 'utf8'));

const app = express();
const PORT = 3000;

// Middleware pour CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

app.use(errorHandler);

// Middleware pour servir des fichiers statiques
// 'app.use' est utilisé pour ajouter un middleware à notre application Express
// '/assets' est le chemin virtuel où les fichiers seront accessibles
// 'express.static' est un middleware qui sert des fichiers statiques
// 'path.join(__dirname, '../assets')' construit le chemin absolu vers le dossier 'assets'
app.use("/assets", express.static(path.join(__dirname, "../assets")));

app.get("/", (req, res, next) => {
  res.send("bienvenue sur l'API Pokémon");
});

// Route GET de base
app.get("/api/pokemons", (req, res, next) => {
  pokemonController.getAllPokemons(req, res, next, pokemonsList);
});

app.get("/api/pokemons/:id", (req, res, next) => {
  pokemonController.getPokemon(req, res, next, pokemonsList);
});

app.post("/api/pokemons", validate(PokemonSchema.addPokemonSchema), (req, res, next) => {
  pokemonController.addPokemon(req, res, next, pokemonsList);
});

app.put("/api/pokemons/:id", validate(PokemonSchema.updatePokemonSchema), (req, res, next) => {
  pokemonController.updatePokemon(req, res, next, pokemonsList);
});

app.delete("/api/pokemons/:id", verifyJwt, (req, res, next) => {
  pokemonController.deletePokemon(req, res, next, pokemonsList);
});

app.get("/api/pokemons/type/:type", (req, res, next) => {
  pokemonController.getPokemonByType(req, res, next, pokemonsList);
});

app.get("/api/pokemons/search/:name", (req, res, next) => {
  pokemonController.searchPokemonByName(req, res, next, pokemonsList);
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
