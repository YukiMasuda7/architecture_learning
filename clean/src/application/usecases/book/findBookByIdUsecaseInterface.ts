import { FindBookByIdRequestDto } from "../../dtos/book/findBookByIdRequestDto";
import { FindBookByIdResponseDto } from "../../dtos/book/findBookByIdResponseDto";

export interface FindBookByIdUsecaseInterface {
    execute(requestDto: FindBookByIdRequestDto): Promise<FindBookByIdResponseDto | null>;
}