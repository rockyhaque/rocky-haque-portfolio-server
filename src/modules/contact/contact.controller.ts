import catchAsync from '../../utils/catchAsync'
import { contactService } from './contact.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

const createContact = catchAsync(async (req, res) => {
  const result = await contactService.createContact(req.body)

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'Message Send Successfully',
    data: result,
  })
})

const allContacts = catchAsync(async (req, res) => {
  const result = await contactService.allContacts()

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'All Messages Getting Successfull',
    data: result,
  })
})

export const ContactControllers = {
  createContact,
  allContacts
}
