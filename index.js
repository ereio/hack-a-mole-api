
const server = require('./libs/apollo');

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
