
'use strict';

const GraphQL           = require('graphql'),
      GraphQLString     = GraphQL.GraphQLString,
      GraphQLInt        = GraphQL.GraphQLInt,
      GraphQLObjectType = GraphQL.GraphQLObjectType,
      GraphQLList       = GraphQL.GraphQLList,
      GraphQLNonNull    = GraphQL.GraphQLNonNull,
      GraphQLSchema     = GraphQL.GraphQLSchema,
      getCountryStats   = require('../get-country-stats').byId;



const skillType = new GraphQLObjectType({

  name: 'Skill',
  description: 'Some programming skill, I guess',

  fields () {
    return {
      name: {
        type: GraphQLString,
        description: 'The name of the skill'
      },

      count: {
        type: GraphQLInt,
        description: 'The count of that skill'
      }
    };
  }

});

const contractType = new GraphQLObjectType({

  name: 'Contract',

  fields () {
    return {
      contract: {
        type: GraphQLInt,
        description: 'The count of fixed term contracts'
      },
      either: {
        type: GraphQLInt,
        description: 'The count of either type of contracts'
      },
      permanent: {
        type: GraphQLInt,
        description: 'The count of permanent contracts'
      }
    };
  }
});


const resultsType = new GraphQLObjectType({

  name: 'Results',
  description: 'Results that give the stats for a country',

  fields () {
    return {
      contract_type: {
        type: contractType,
        description: 'The breakdown of contractors/permies'
      },

      location: {
        type: GraphQLString,
        description: 'The location for the results you got'
      },

      skills: {
        type: new GraphQLList(skillType),
        description: 'A list of skills'
      }
    };
  }

});


const snapshotType = new GraphQLObjectType({

  name: 'Snapshot',
  description: 'A snapshot of results as some time point',

  fields () {
    return {
      count: {
        type: GraphQLInt,
        description: 'The count'
      },

      id: {
        type: GraphQLString,
        description: 'The id'
      },

      results: {
        type: resultsType,
        description: 'Results'
      }
    };
  }

});


const countryStatsType = new GraphQLObjectType({

  name: 'CountryStats',
  description: 'Results that give the stats for a country',

  fields () {
    return {
      id: {
        type: GraphQLString,
        description: 'The id of that country'
      },

      name: {
        type: GraphQLString,
        description: 'Name of country ( or US state )'
      },

      code: {
        type: GraphQLString,
        description: 'The location for the results you got'
      },

      snapshots: {
        type: new GraphQLList(snapshotType),
        description: 'A list of snapshots'
      }
    };
  }

});


/**
 * ( taken from https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsSchema.js )
 * This is the type that will be the root of our query, and the
 * entry point into our schema. It gives us the ability to fetch
 * countryStats objects by their IDs.
 *
 * This implements the following type system shorthand:
 *   type Query {
 *     hero(episode: Episode): Character
 *     human(id: String!): Human
 *     droid(id: String!): Droid
 *   }
 *
 */
var queryType = new GraphQLObjectType({

  name: 'Query',

  fields () {
    return {

      countryStats: {
        type: countryStatsType,
        args: {
          id: {
            description: 'id of the country you need stats for',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, args) => {
          return getCountryStats(args.id);
        }
      }

    };
  }
});



module.exports = new GraphQLSchema({ query: queryType });
