/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Describes the schema for contact details
 *
 * @description
 *
 * @file        : models/contact.js
 * @overview    : Provides schema for database and performs CRUD operations
 * @module      : Contact
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : 1.0.0
 * @since       : 13-08-2021
 *********************************************************************/

const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
  },
  {
    //Applying time stamp for the data
    timestamps: true,
    versionKey: false,
  }
);

const contactDetail = mongoose.model("Contact", contactSchema);

class Contact {
  /**
   * @description funnction to create new contact in the database
   * @param {*} newContact
   * @returns saves data or if error returns error
   */
  async createContact(newContact) {
    try {
      const contact = new contactDetail({
        firstName: newContact.firstName,
        lastName: newContact.lastName,
        address: newContact.address,
        city: newContact.city,
        state: newContact.state,
        zip: newContact.zip,
        phone: newContact.phone,
        email: newContact.email,
      });

      //to save the new data
      const contactSaved = await contact.save({});
      return contactSaved;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description function to get all contacts from database
   * @returns retrieved contacts or if error returns error
   */
  findAll = () => {
    return new Promise((resolve, reject) => {
		contactDetail
        .find({})
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * @description function written to get contacts by Id into database
   * @param {*} contactId
   * @returns contact of particular Id or if any error return error
   */
   async getContactById(contactId) {
    try {
      return await contactDetail.findById(contactId);
    } catch (err) {
      return error;
    }
  }

  /**
   * @description function written to update contacts by Id into database
   * @param {*} contactId
   * @param {*} contactData
   * @returns contact of particular Id or if any error return error
   */
   async updateContactById(contactId, contactData) {
    try {
      return await contactDetail.findByIdAndUpdate(
        contactId.contactId,
        {
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          address: contactData.address,
          city: contactData.city,
          state: contactData.state,
          zip: contactData.zip,
          phone: contactData.phone,
          email: contactData.email,
        },
        { new: true }
      );
    } catch (error) {
      return error;
    }
  }

  /**
   * @description function to delete contact by id
   * @param {*} contactId
   * @returns data else if error returns error
   */
   deleteById = (contactId, callback) => {
    contactDetail.findByIdAndRemove(contactId, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };
}

//exporting class
module.exports = new Contact();
