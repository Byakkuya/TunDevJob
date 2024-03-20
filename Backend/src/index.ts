import express , {Express, Request, Response} from "express";
import { PORT } from "./secrets";

import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import passport from "passport";

const app: Express = express();
app.use(express.json());
app.use(passport.initialize());


app.use("/api",rootRouter)

export const prismaclient = new PrismaClient({
    log: ["query"],
  
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}
);