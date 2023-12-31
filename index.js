const contacts = require("./contacts");
const program = require("commander");

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
        .then((data) => console.log(data));
      break;

    case "remove":
      await contacts.removeContact(id).then((data) => console.log(data));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
