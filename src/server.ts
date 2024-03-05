import express from "./config/express";

console.log('VARIAVEIS DE AMBIENTE',process.env);

express.listen(process.env.PORT || 3030, () => console.log(`Server online on port ${process.env.PORT || 3030}`))