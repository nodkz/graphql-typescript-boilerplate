// const Watchpack = require("watchpack");
// const minimatch = require("minimatch");
// const { transformDocument } = require("graphql-code-generator");

// const DOCUMENTS_MASK = "src/**/*.{ts,tsx}";

// const wp = new Watchpack({ aggregateTimeout: 1000, poll: true });

// // Watchpack.prototype.watch(files: string[], directories: string[], startTime?: number)
// // starts watching these files and directories
// // calling this again will override the files and directories
// wp.watch([], ["./src"], Date.now() - 10000);

// wp.on("change", function(filePath, mtime) {
//   if (minimatch(filePath, DOCUMENTS_MASK)) {
// TODO: проблема как выдергивать и типизировать фрагменты, и нужно ли их типизировать
//   }
// });

// // wp.close();

// function () {
//   transformDocument(
//     schema: GraphQLSchema,
//     documentNode: DocumentNode,
//     originalFilePath: string | null = null
//   )
// }
