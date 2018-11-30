import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Comments } from './components/Comments';
import { Add } from './components/Add';
import { News } from './components/News';


class App extends Component {
    state = {
        news: null,
        isLoading: false,
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        fetch('http://localhost:3000/data/newsData.json')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setTimeout(() => { // добавили задержку
                    this.setState({ isLoading: false, news: data })
                }, 3000)
            })

    }

    handleAddNews = (data) => {
        const nextNews = [data, ...this.state.news]
        this.setState({ news: nextNews })
    }

    render() {
        const { news, isLoading } = this.state

        return (
            <React.Fragment>
                <h1>My APP</h1>
                <Add onAddNews={this.handleAddNews} />
                <h3>Новости</h3>
                {isLoading && <p>Загружаю...</p>}
                {Array.isArray(news) && <News data={news} />}
                <Comments />
            </React.Fragment>
        );
    }
}

Add.propTypes = {
    onAddNews: PropTypes.func.isRequired, // func используется для проверки передачи function
}

export default App;


