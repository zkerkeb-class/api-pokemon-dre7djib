export const pokemonController = {

    getAllPokemons : async (req, res, pokemonsList) => {
        try {
            const { page_number = 1, page_size = 10 } = req.query;

            const page = parseInt(page_number);
            const limit = parseInt(page_size);
          
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
          
            const paginatedPokemons = pokemonsList.slice(startIndex, endIndex);
          
            res.status(200).send({
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
            res.status(500).send({ error: "Erreur serveur" });
        }
    },

    getPokemon : async (req, res, pokemonsList) => {
        try {
            const id = req.params.id;
            const pokemon = pokemonsList.find((p) => p.id === parseInt(id));
            if (!pokemon) {
                return res.status(404).send({ error: "Pokemon non trouvé" });
            }
            res.status(200).send(pokemon);
        } catch {
            res.status(404).send({ error: "Pokemon non trouvé" });
        }
    },

    addPokemon : async (req, res, pokemonsList) => {
        try {
            const newPokemon = req.body;

            const existingPokemon = pokemonsList.find((p) => p.id === newPokemon.id);
            if (existingPokemon) {
              return res.status(400).send({ error: "Un Pokémon avec cet ID existe déjà" });
            }
          
            pokemonsList.push(newPokemon);
          
            res.status(201).send(newPokemon);
        }
        catch (error) {
            res.status(500).send({ error: "Erreur serveur" });
        }
    },

    updatePokemon : async (req, res, pokemonsList) => {
        try {
            const id = req.params.id;
            const pokemonIndex = pokemonsList.findIndex((p) => p.id === parseInt(id));
          
            if (pokemonIndex === -1) {
              return res.status(404).send({ error: "Pokemon non trouvé" });
            }
          
            const updatedPokemon = { ...pokemonsList[pokemonIndex], ...req.body };
            pokemonsList[pokemonIndex] = updatedPokemon;
          
            res.status(200).send(updatedPokemon);
        }
        catch{
            res.status(500).send({ error: "Erreur serveur" });
        }
    },

    deletePokemon : async (req, res, pokemonsList) => {
        try {
            const id = req.params.id;
            const pokemonIndex = pokemonsList.findIndex((p) => p.id === parseInt(id));
          
            if (pokemonIndex === -1) {
              return res.status(404).send({ error: "Pokemon non trouvé" });
            }
          
            pokemonsList.splice(pokemonIndex, 1);
          
            res.status(204).send();
        } catch {
            res.status(500).send({ error: "Erreur serveur" });
        }
    }, 

    getPokemonByType : async (req, res, pokemonsList) => {
        try {
            const type = req.params.type;
            const filteredPokemons = pokemonsList.filter((p) => p.type.includes(type));
          
            if (filteredPokemons.length === 0) {
              return res.status(404).send({ error: "Aucun Pokémon trouvé avec ce type" });
            }
          
            res.status(200).send(filteredPokemons);
        } catch {
            res.status(500).send({ error: "Erreur serveur" });
        }
    },

    searchPokemonByName : async (req, res, pokemonsList) => {
        try {
            const name = req.params.name.toLowerCase();
            const filteredPokemons = pokemonsList.filter((p) =>
              Object.values(p.name).some((n) => n.toLowerCase().includes(name))
            );
          
            if (filteredPokemons.length === 0) {
              return res.status(404).send({ error: "Aucun Pokémon trouvé avec ce nom" });
            }
          
            res.status(200).send(filteredPokemons);
        } catch {
            res.status(500).send({ error: "Erreur serveur" });
        }
    }

};
