const contacts = require("./db/contacts");

const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case "get":
      await contacts
        .getContactById(id)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
      break;

    case "add":
      await contacts
        .addContact(name, email, phone)
        .then((data) => console.table(data));
      break;

    case "remove":
      await contacts.removeContact(id).then((data) => console.log(data));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
