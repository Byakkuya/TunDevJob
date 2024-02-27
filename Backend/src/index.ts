import express,{Application} from "express";

class App {
    public app: Application;
    constructor() {
        this.app = express();
    }
    protected routes(): void {
        this.app.route("/").get((req, res) => {
            res.status(200).send("Hello World");
        }
        );
    }
}

const port:number = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});