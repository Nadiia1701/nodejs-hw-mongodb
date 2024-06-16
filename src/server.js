import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      status: 200,
      message: 'Hello World!',
    });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
        status: 200,
        data: contacts,
        message: "Successfully found contacts!"
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        status: 400,
		    message: 'Student not found'
	  });
      return;
    }

    res.status(200).json({
      status: 200,
      data: contact,
      message: `Successfully found contact with id ${contactId}!`,
    });
  });



  // app.get('/contacts/:contactId', async (req, res, next) => {
  //   const { contactId } = req.params;
  //   try {
  //     const contact = await getContactById(contactId);

  //     if (!contact) {
  //       return res.status(404).json({
  //         message: 'Contact not found',
  //       });
  //     }
  //     res.status(200).json({
  //       data: contact,
  //       message: `Successfully found contact with id ${contactId}!`,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // });


  app.use('*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
    });
  });

  app.use((err, req, res) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
