import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../ItemDetails';
import ErrorMessage from '../../error';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class HousesPage extends Component {

    gotService = new GotService();

    state = {
        selectedHouse: 1,
        error: false 
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses} 
                renderItem={(item) => `${item.name}`}
            />
        )

        const houseDetails = (
            <ItemDetails 
                itemId={this.state.selectedHouse}
                getData={this.gotService.getHouse}>
                    <Field field='region' label='Region' />
                    <Field field='words' label='Words' />
                    <Field field='titles' label='Titles' />
                    <Field field='ancestralWeapons' label='Ancestral Weapons' />
            </ItemDetails>
        )

        return(
            <RowBlock left = {itemList} right = {houseDetails}/>
        )
    }
}