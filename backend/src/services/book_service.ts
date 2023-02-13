import { tagged } from "inversify";
import { inject, injectable } from "inversify";
import { IBookService } from "../interfaces/ibook_service";
@injectable()
export default class BookService implements IBookService {
  constructor() {}
  getParams(): void {
    throw new Error("Method not implemented.");
  }
}
