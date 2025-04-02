import {body} from 'express-validator';

export const PokemonSchema = {
    addPokemonSchema : [
        body('id').isInt().notEmpty(),
        body('name.english').isString().notEmpty(),
        body('name.japanese').isString().notEmpty(),
        body('name.chinese').isString().notEmpty(),
        body('name.french').isString().notEmpty(),
        body('type').isArray().notEmpty(),
        body('type.*').isString().notEmpty(),
        body('base.HP').isInt(),
        body('base.Attack').isInt(),
        body('base.Defense').isInt(),
        body('base["Sp. Attack"]').isInt(),
        body('base["Sp. Defense"]').isInt(),
        body('base.Speed').isInt(),
        body('image').isString()
    ],

    updatePokemonSchema : [
        body('name.english').optional().isString().notEmpty(),
        body('name.japanese').optional().isString().notEmpty(),
        body('name.chinese').optional().isString().notEmpty(),
        body('name.french').optional().isString().notEmpty(),
        body('type').optional().isArray().notEmpty(),
        body('type.*').optional().isString().notEmpty(),
        body('base.HP').optional().isInt(),
        body('base.Attack').optional().isInt(),
        body('base.Defense').optional().isInt(),
        body('base["Sp. Attack"]').optional().isInt(),
        body('base["Sp. Defense"]').optional().isInt(),
        body('base.Speed').optional().isInt(),
        body('image').optional().isString()
    ]
}
