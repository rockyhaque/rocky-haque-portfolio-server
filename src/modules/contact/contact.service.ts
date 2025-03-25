import { IContact } from './contact.interface'
import Contact from './contact.model'

const createContact = async (payload: IContact) => {
  const result = await Contact.create({ ...payload })
  return result
}

const allContacts = async () => {
  const result = await Contact.find()
  return result
}

export const contactService = {
  createContact,
  allContacts,
}
