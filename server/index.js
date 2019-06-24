  const { ApolloServer, gql } = require('apollo-server');
  const collection = require('./collection')
  const typeDefs = gql`
    type Table {
      tableName: String
      planningLevel: String
      FTE_2019: Int
      FTE_2020: Int
      FTE_2021: Int
      FTE_2022: Int
      FTE_2023: Int
    }
  
    type Item {
      planningName: String
      planningDemand: [Table]
      planningSupply: [Table]
    }
  
    type Query {
      items: [Item]
    }
  `;

  const resolvers = {
    Query: {
      items: () => collection,
    },
  };

 const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: process.env.ENGINE_API_KEY && {
      apiKey: process.env.ENGINE_API_KEY,
    },
  });

  server.listen().then(({ url }) => {
    console.log(` Server ${url}`);
  });
