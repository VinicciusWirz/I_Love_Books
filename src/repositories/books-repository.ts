import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";
import prisma from "../database";

export async function getBooks() {
  const books = prisma.books.findMany();
  return books;
}

export async function getBook(id: number) {
  const book = prisma.books.findUnique({ where: { id } });
  return book;
}

export async function createBook(book: CreateBook) {
  const { title, author, publisher, purchaseDate, cover } = book;
  const creationBook = prisma.books.create({
    data: {
      ...book,
    },
  });
  return creationBook;
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId: id, grade, review } = bookReview;
  const reviewBook = prisma.books.update({
    data: {
      grade,
      review,
    },
    where: {
      id,
    },
  });

  return reviewBook;
}
