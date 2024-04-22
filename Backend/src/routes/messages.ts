import { Router } from "express";
import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';
import { getMessages, sendMessage ,deleteMessage} from "../controllers/messages";

const MessagesRoutes = Router();

MessagesRoutes.get('/', authenticate, restrictTo('ADMIN') ,getMessages);
MessagesRoutes.post('/',sendMessage );


MessagesRoutes.delete('/:id', authenticate, restrictTo('ADMIN'),deleteMessage);
export default MessagesRoutes;