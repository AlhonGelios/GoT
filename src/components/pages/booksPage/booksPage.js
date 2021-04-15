import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../ItemDetails';
import ErrorMessage from '../../error';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BooksPage extends Component {

    gotService = new GotService();

    state = {
        selectedBook: 1,
        error: false 
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks} 
                renderItem={(item) => `${item.name} (${item.numberOfPages})`}
            />
        )

        const bookDetails = (
            <ItemDetails 
                itemId={this.state.selectedBook}
                getData={this.gotService.getBook}>
                    <Field field='numberOfPages' label='Number Of Pages' />
                    <Field field='publisher' label='Publisher' />
                    <Field field='released' label='Released' />
            </ItemDetails>
        )

        return(
            <RowBlock left = {itemList} right = {bookDetails}/>
        )
    }
}