import { Router } from 'express';
import { getPolicies, getPolicyById, createPolicy, updatePolicy, deletePolicy } from '../controllers/policyController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/policies/public', getPolicies);
router.get('/policies', authMiddleware, getPolicies);
router.get('/policies/:id', authMiddleware, getPolicyById);
router.post('/policies', authMiddleware, createPolicy);
router.put('/policies/:id', authMiddleware, updatePolicy);
router.delete('/policies/:id', authMiddleware, deletePolicy);

export default router;
