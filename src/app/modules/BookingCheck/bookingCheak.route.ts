import express from 'express';
import { BookingCheckerController } from './bookingCheck.controller';

const router = express.Router();

router.get('/',BookingCheckerController.bookingChecker);

export const BookingCheckerRoutes = router;