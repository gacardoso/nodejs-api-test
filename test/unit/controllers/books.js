import BooksController from '../../../controllers/books';

describe('Controllers: Books', () => {
    describe('Get all Books: getAll()', () => {
        it('should retun a list of books', () => {

            const Books = {
                findAll: td.function()
            };

            const expectedResponse = [{
                id: 1,
                name: 'Test Book',
                created_at: '2016-08-06T23:55:36.692Z',
                updated_at: '2016-08-06T23:55:36.692Z',
            }];

            td.when(Books.findAll({})).thenResolve(expectedResponse);

            const booksController = new BooksController(Books);

            return booksController.getAll()
                .then(response => expect(response.data).to.be.eql(expectedResponse));

        });
    });
});