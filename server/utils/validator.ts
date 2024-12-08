import { body, param, ValidationChain } from 'express-validator';

export const userValidation = {
  register: [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  login: [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ]
};

export const packageValidation = {
  create: [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 day'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid package ID'),
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number')
  ]
};

export const bookingValidation = {
  create: [
    body('packageId').isMongoId().withMessage('Invalid package ID'),
    body('startDate').isISO8601().withMessage('Invalid start date'),
    body('numberOfPeople').isInt({ min: 1 }).withMessage('Number of people must be at least 1')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid booking ID'),
    body('status')
      .optional()
      .isIn(['pending', 'confirmed', 'cancelled', 'completed'])
      .withMessage('Invalid status')
  ]
};

export const hotelValidation = {
  create: [
    body('name').trim().notEmpty().withMessage('Hotel name is required'),
    body('location.address').trim().notEmpty().withMessage('Address is required'),
    body('location.city').trim().notEmpty().withMessage('City is required')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid hotel ID'),
    body('name').optional().trim().notEmpty().withMessage('Hotel name cannot be empty')
  ]
};

export const reviewValidation = {
  create: [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid review ID'),
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5')
  ]
};