import express from 'express';
const server = express();

import routerPayment from './routes/payment.routes.js';

const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use("/api",routerPayment);

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});