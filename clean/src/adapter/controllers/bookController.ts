import { Request, Response } from "express";
import { AddBookUseCaseInterface } from "../../application/usecases/book/addBookUseCaseInterface";
import { AddBookRequestDto } from "../../application/dtos/book/addBookRequestDto";
import { FindBookByIdUsecaseInterface } from "../../application/usecases/book/findBookByIdUsecaseInterface";
import { FindBookByIdRequestDto } from "../../application/dtos/book/findBookByIdRequestDto";


export class BookController {

    constructor(
        private readonly addBookUseCase: AddBookUseCaseInterface,
        private readonly findBookByIdUseCase: FindBookByIdUsecaseInterface
    ) {}

    async add(req: Request, res: Response): Promise<void> {
        try {
            const requestDto: AddBookRequestDto = {
                title: req.body.title
            };
            const book = await this.addBookUseCase.execute(requestDto);
            res.status(201).json(book);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to add book" });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (typeof id !== "string") {
                res.status(400).json({ error: "Invalid book id" });
                return;
            }
            const requestDto: FindBookByIdRequestDto = {
                id
            };
            const book = await this.findBookByIdUseCase.execute(requestDto);
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ error: "Book not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to retrieve book" });
        }
    }
}