const rootTypeToType = {
}

export const typeDef = `
type Fact {
  a: String
}
`;

export const resolver = {
  Fact: {
    // __resolveType: (obj, context, info) => {
    //   if ( !rootTypeToType.hasOwnProperty(obj.root_type) ) {
    //     return null;
    //   }

    //   return rootTypeToType[obj.root_type];
    // }
  }
};


