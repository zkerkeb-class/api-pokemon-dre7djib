/**
 * @swagger
 * components:
 *   schemas:
 *     Pokemon:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: object
 *           properties:
 *             english:
 *               type: string
 *             japanese:
 *               type: string
 *             chinese:
 *               type: string
 *             french:
 *               type: string
 *         type:
 *           type: array
 *           items:
 *             type: string
 *         base:
 *           type: object
 *           properties:
 *             HP:
 *               type: integer
 *             Attack:
 *               type: integer
 *             Defense:
 *               type: integer
 *             Sp. Attack:
 *               type: integer
 *             Sp. Defense:
 *               type: integer
 *             Speed:
 *               type: integer
 *         image:
 *           type: string
 *           example: "${process.env.API_URL}/assets/pokemons/1.png"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */



/**
 * @swagger
 * /api/pokemons:
 *   get:
 *     summary: Get all pokemons
 *     tags:
 *       - Pokemons
 *     responses:
 *       200:
 *         description: Returns a list of all pokemons.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pokemon'
 */

/**
 * @swagger
 * /api/pokemons/{id}:
 *   get:
 *     summary: Get pokemon by id
 *     tags:
 *       - Pokemons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pokemon to retrieve
 *     responses:
 *       200:
 *         description: Returns a pokemon by ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ressource non trouvée"
 */

/**
 * @swagger
 * /api/pokemons/type/{type}:
 *   get:
 *     summary: Get pokemon by type
 *     tags: 
 *      - Pokemons
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: The type of the pokemon to retrieve
 *     responses:
 *       200:
 *         description: Returns a list of pokemons by type.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: Pokemons not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ressource non trouvée"
 */

/**
 * @swagger
 * /api/pokemons/search/{name}:
 *   get:
 *     summary: Search pokemon by name
 *     tags: 
 *      - Pokemons
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The type of the pokemon to retrieve
 *     responses:
 *       200:
 *         description: Return Pokemon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: Pokemons not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ressource non trouvée"
 */

/**
 * @swagger
 * /api/pokemons:
 *   post:
 *     summary: Add pokemon
 *     tags: 
 *      - Pokemons
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pokemon'
 *     responses:
 *       201:
 *         description: Returns the created pokemon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Requête invalide"
 */


/**
 * @swagger
 * /api/pokemons/{id}:
 *   put:
 *     summary: Update pokemon
 *     tags:
 *       - Pokemons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pokemon to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pokemon'
 *     responses:
 *       200:
 *         description: Returns the updated pokemon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Requête invalide"
 *       404:
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ressource non trouvée"
 */

/**
 * @swagger
 * /api/pokemons/{id}:
 *   delete:
 *     summary: Delete a pokemon by ID
 *     tags:
 *       - Pokemons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pokemon to delete
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Pokemon successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pokemon deleted successfully."
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Access denied. No token provided."
 *       404:
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ressource non trouvée"
 */
