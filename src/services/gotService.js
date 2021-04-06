export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Cloud not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter.bind(this));
    }

    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllHauses() {
        return this.getResource('/houses/');
    }

    getHauses(id) {
        return this.getResource(`/houses/${id}`);
    }

    getAllBooks() {
        return this.getResource('/books/');
    }

    getBooks(id) {
        return this.getResource(`/books/${id}`);
    }

    setChar = (date) => {
        if (date) {
            return date
        } else return 'no date'
    }

    _transformCharacter(char) {
        return {
            name: this.setChar(char.name),
            gender: this.setChar(char.gender),
            born: this.setChar(char.born),
            died: this.setChar(char.died),
            culture: this.setChar(char.culture)
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }

    
}
