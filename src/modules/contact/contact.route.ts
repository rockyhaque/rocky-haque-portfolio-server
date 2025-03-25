import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ContactValidation } from './contact.validation'
import { ContactControllers } from './contact.controller'

const contactRouter = express.Router()

contactRouter.post(
  '/create-contact',
  validateRequest(ContactValidation.createContactValidationSchema),
  ContactControllers.createContact
)

contactRouter.get('/all-contacts', ContactControllers.allContacts)

export default contactRouter
