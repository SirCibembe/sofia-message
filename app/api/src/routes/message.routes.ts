import { Router } from "express";
import MessageController from "../controllers/message.controller";
import AuthController from "../controllers/auth.controller";
// import authenticateToken from "src/middlewares/authenticateToken";

const router = Router();


router.route('/api/chats/:senderId/:receiverId')
   .get(MessageController.listTalk);
   
router.route('/api/messages')
   .get([AuthController.requireSignin, MessageController.list])
   .post([AuthController.requireSignin, MessageController.create]);

router.route('/api/messages/:messageId')
   .get([AuthController.requireSignin, MessageController.read])
   .put([AuthController.requireSignin, MessageController.update])
   .delete([AuthController.requireSignin, MessageController.remove]);

   // AuthController.hasAuthorization,

router.param('messageId', MessageController.messageById);

export default router;