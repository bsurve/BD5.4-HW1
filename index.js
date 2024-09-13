let express = require("express");
let app = express();
let { sequelize } = require("./lib/index");
let { book } = require("./Model/book.model");
let { bookAuthor } = require("./Model/bookAuthor.model");
let { author } = require("./Model/author.model");
app.use(express.json());

let bookData = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
  },
  { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
  { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
];

let authorData = [{ name: "J.K Rowling", birthYear: 1965 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await book.bulkCreate(bookData);
    return res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/seed_db1", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await author.bulkCreate(authorData);
    return res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Create New Author

async function addNewAuthor(newAuthor) {
  let newData = await author.create(newAuthor);
  return { newData };
}

app.post("/authors/new", async (req, res) => {
  try {
    let newAuthor = req.body.newAuthor;
    let response = await addNewAuthor(newAuthor);
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Update Author by ID

async function updateAuthorById(newAuthorData, id) {
  let authorDetails = await author.findOne({ where: { id } });
  if (!authorDetails) {
    return {};
  }
  authorDetails.set(newAuthorData);
  let updatedData = authorDetails.save();
  return { message: "Author updated successfully", updatedData };
}

app.post("/authors/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newAuthorData = req.body;
    let response = await updateAuthorById(newAuthorData, id);
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});