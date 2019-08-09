import express from 'express';

export default class Server {

    public app: express.Application;
    public port: number = System.getenv("PORT");

    constructor() {
        this.app = express();
    }

    start( callback: Function ){
        this.app.listen( this.port, callback() );
    }

}