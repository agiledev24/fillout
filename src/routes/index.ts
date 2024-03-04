import { Router } from 'express';
import FormRoutes from './form-routes';

const router: Router = Router();

router.use('/', FormRoutes);

export default router;