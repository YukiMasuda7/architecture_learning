import express from 'express';
import { BookController } from './presentation/bookController';
import { PrismaBookRepository } from './dataAccess/prismaBookRepository';
import { BookService } from './businessLogic/bookService';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const bookrepository = new PrismaBookRepository();
const bookservice = new BookService(bookrepository);
const bookController = new BookController(bookservice);

app.post('/books', bookController.add.bind(bookController));
app.get('/books/:id', bookController.findById.bind(bookController));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});