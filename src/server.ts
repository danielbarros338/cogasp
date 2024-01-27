import express from "./config/express";

express.listen(process.env.PORT || 3030, () => console.log(`Server online on port ${process.env.PORT || 3030}`))