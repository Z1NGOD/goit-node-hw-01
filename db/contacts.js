const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const { nanoid } = require("nanoid");

const listContacts = async () => {
  const all = await fs.readFile(contactsPath);
  return JSON.parse(all);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === contactId);
  return contact || null;
};

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const contact = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact));
  return contact;
}

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
