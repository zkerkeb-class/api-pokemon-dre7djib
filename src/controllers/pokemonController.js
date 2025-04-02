import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE } from "../utils/constants.js";

export const pokemonController = {

    // Get all pokemons
    getAllPokemons : async (req, res, next, pokemonsList) => {
        try {
            const { page_number = 1, page_size = 10 } = req.query;

            const page = parseInt(page_number);
            const limit = parseInt(page_size);
          
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
          
            const paginatedPokemons = pokemonsList.slice(startIndex, endIndex);
          
            res.status(HTTP_RESPONSE_CODE.SUCCESS).send({
              types: req.query.types ? req.query.types.split(",") : [
                "fire",
                "water",
                "grass",
                "electric",
                "ice",
                "fighting",
                "poison",
                "ground",
                "flying",
                "psychic",
                "bug",
                "rock",
                "ghost",
                "dragon",
                "dark",
                "steel",
                "fairy",
              ],
              pokemons: paginatedPokemons,
              currentPage: page,
              totalPages: Math.ceil(pokemonsList.length / limit),
            });
        } catch (error) {
            next(error);
        }
    },

    // Get pokemon by Id
    getPokemon : async (req, res, next, pokemonsList) => {
        try {
            const id = req.params.id;
            const pokemon = pokemonsList.find((p) => p.id === parseInt(id));
            if (!pokemon) {
                return res.status(HTTP_RESPONSE_CODE.NOT_FOUND).send({ error: APP_ERROR_MESSAGE.NOT_FOUND });
            }
            res.status(HTTP_RESPONSE_CODE.SUCCESS).send(pokemon);
        } catch {
            next(error);
        }
    },

    // Add new pokemon
    addPokemon : async (req, res, next, pokemonsList) => {
        try {
            const newPokemon = req.body;

            const existingPokemon = pokemonsList.find((p) => p.id === newPokemon.id);
            if (existingPokemon) {
              return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).send({ error: APP_ERROR_MESSAGE.BAD_REQUEST });
            }
          
            pokemonsList.push(newPokemon);
          
            res.status(HTTP_RESPONSE_CODE.CREATED).send(newPokemon);
        }
        catch (error) {
            next(error);
        }
    },

    // Update pokemon with id
    updatePokemon : async (req, res, next, pokemonsList) => {
        try {
            const id = req.params.id;
            const pokemonIndex = pokemonsList.findIndex((p) => p.id === parseInt(id));
          
            if (pokemonIndex === -1) {
              return res.status(HTTP_RESPONSE_CODE.NOT_FOUND).send({ error: APP_ERROR_MESSAGE.NOT_FOUND });
            }
          
            const updatedPokemon = { ...pokemonsList[pokemonIndex], ...req.body };
            pokemonsList[pokemonIndex] = updatedPokemon;
          
            res.status(HTTP_RESPONSE_CODE.SUCCESS).send(updatedPokemon);
        }
        catch{
            next(error);
        }
    },

    // Delete 1 pokemon
    deletePokemon : async (req, res, next, pokemonsList) => {
        try {
            const id = req.params.id;
            const pokemonIndex = pokemonsList.findIndex((p) => p.id === parseInt(id));
          
            if (pokemonIndex === -1) {
              return res.status(HTTP_RESPONSE_CODE.NOT_FOUND).send({ error: APP_ERROR_MESSAGE.NOT_FOUND });
            }
          
            pokemonsList.splice(pokemonIndex, 1);
          
            res.status(HTTP_RESPONSE_CODE.DELETED).send();
        } catch {
            next(error);
        }
    }, 

    // Get pokemon with type
    getPokemonByType : async (req, res, next, pokemonsList) => {
        try {
            const type = req.params.type;
            const filteredPokemons = pokemonsList.filter((p) => p.type.includes(type));
          
            if (filteredPokemons.length === 0) {
              return res.status(HTTP_RESPONSE_CODE.NOT_FOUND).send({ error: APP_ERROR_MESSAGE.NOT_FOUND });
            }
          
            res.status(HTTP_RESPONSE_CODE.SUCCESS).send(filteredPokemons);
        } catch {
            next(error);
        }
    },

    // Search pokemon with name 
    searchPokemonByName : async (req, res, next, pokemonsList) => {
        try {
            const name = req.params.name.toLowerCase();
            const filteredPokemons = pokemonsList.filter((p) =>
              Object.values(p.name).some((n) => n.toLowerCase().includes(name))
            );
          
            if (filteredPokemons.length === 0) {
              return res.status(HTTP_RESPONSE_CODE.NOT_FOUND).send({ error: APP_ERROR_MESSAGE.NOT_FOUND });
            }
          
            res.status(HTTP_RESPONSE_CODE.SUCCESS).send(filteredPokemons);
        } catch {
            next(error);
        }
    }

};
