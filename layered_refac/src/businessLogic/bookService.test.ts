import {BookRepositoryInterface} from "../dataAccess/bookRepositoryInterface";
import {BookService} from "../businessLogic/bookService";

const mockBookRepository: jest.Mocked<BookRepositoryInterface> = {
    create: jest.fn(),
  findById: jest.fn(),
};

describe("BookService", () => {
    let bookService: BookService;

    beforeEach(() => {
        bookService = new BookService(mockBookRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a book and return the created book", async () => {
        const title = "Test Book";
        const mockBook = {
            id: "1",
            title,
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        mockBookRepository.create.mockResolvedValue(mockBook);
        const result = await bookService.add(title);

        expect(mockBookRepository.create).toHaveBeenCalledWith(title);
        expect(result).toEqual(mockBook);
    });
});