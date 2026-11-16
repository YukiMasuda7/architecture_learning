import { Request, Response } from "express";
import { AddBookUseCaseInterface } from "../../application/usecases/book/addBookUseCaseInterface";
import { AddBookRequestDto } from "../../application/dtos/book/addBookRequestDto";

export class BookController {

    constructor(private readonly addBookUseCase: AddBookUseCaseInterface) {}

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

    // async findById(req: Request, res: Response): Promise<void> {
    //     try {
    //         const id = req.params.id as string;
    //         const book = await this.bookService.findById(id);
    //         if (book) {
    //             res.status(200).json(book);
    //         } else {
    //             res.status(404).json({ error: "Book not found" });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ error: "Failed to retrieve book" });
    //     }
    // }
}