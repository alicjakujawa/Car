/**
 * Sails Seed Settings
 * (sails.config.seeds)
 *
 * Configuration for the data seeding in Sails.
 *
 * For more information on configuration, check out:
 * http://github.com/frostme/sails-seed
 */
module.exports.seeds = {

   car: [
    {
      model: 'AudiR8',
      year:  '1998',
      shortDesc: 'shortDesc',
      longDesc: 'longDesc',
      imageName: 'car1'
    },
    {
      model: 'Audi A3',
      year:  '2003',
      shortDesc: 'shortDesc',
      longDesc: 'longDesc',
      imageName: 'car1'
    }
  ]

}
