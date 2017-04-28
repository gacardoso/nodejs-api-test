const defaultResponse = (data, statusCode = 200) => ({
    data,
    statusCode
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
    erro: message
}, statusCode);

class BooksController {
    constructor(Books) {
        this.Books = Books;
    };

    getAll() {
        return this.Books.findAll({})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    getById(params) {
        return this.Books.findOne({ where: params })
            .then(result => defaultResponse(result))
            .catch((error) => errorResponse(error.message));
    }

    create(data) {
        return this.Books.create(data)
            .then(result => defaultResponse(result, 201))
            .catch((error) => errorResponse(error.message, 402));
    }

    update(data, params) {
        return this.Books.update(data, {
            where: params
        })
            .then(result => defaultResponse(result))
            .catch((error) => errorResponse(error.message, 422));
    }

    delete(params) {
        return this.Books.destroy({
            where: params
        })
            .then(result => defaultResponse(result, 204))
            .catch((error) => errorResponse(error.message, 422));
    }

}

export default BooksController;