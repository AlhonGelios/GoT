import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import CharacterPage from '../pages/characterPage';
import BooksPage from '../pages/booksPage/booksPage';
import HousesPage from '../pages/housesPage/housesPage';
import GotService from '../../services/gotService';

import './app.css';




export default class App extends Component {

    gotService = new GotService();

    state = {
        showRandomChar: true,
        error: false,
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });

    }

    render () {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.showRandomChar? <RandomChar/> : null;
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <Button color="primary" className="toggle-btn" onClick={this.toggleRandomChar}>toggle view random char</Button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <BooksPage/>
                    <HousesPage/>
                   
                </Container>
            </>
        );
    }
};
