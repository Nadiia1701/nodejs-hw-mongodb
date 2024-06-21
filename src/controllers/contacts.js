import createHttpError from 'http-errors';

import { getAllContacts, getContactById } from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
	try {
	  const contacts = await getAllContacts();
	  res.status(200).json({
        status: 200,
        data: contacts,
        message: "Successfully found contacts!"
	  });
	} catch(err) {
		next(err);
	}
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(200).json({
      status: 200,
      data: contact,
      message: `Successfully found contact with id ${contactId}!`,
    });
};
