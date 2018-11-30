import React from "react";
import PropTypes from 'prop-types';
import { Article } from './Article';


class News extends React.Component {
    state = {
        ClickCounter: 0,
        filteredNews: this.props.data,
    }


    static getDerivedStateFromProps(props, state) {
        let nextFilteredNews = [...props.data] // было nextProps - переименовали

        nextFilteredNews.forEach((item, index) => {
            if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
                item.bigText = 'СПАМ'
            }
        })

        return { // возвращаем новое состояние
            filteredNews: nextFilteredNews,
        }
    }

    renderNews = () => {
        const { filteredNews } = this.state
        let newsTemplate = null

        if (filteredNews.length) {
            newsTemplate = filteredNews.map(function(item) {
                return <Article key={item.id} data={item}/>
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return newsTemplate
    }
    handleCounterClck = (e) => { // добавили метод
        e.preventDefault()
        let cc = this.state.ClickCounter
        this.setState({ ClickCounter: ++cc });
    }

    render() {
        const { filteredNews } = this.state
        const { ClickCounter } = this.state

        return (
            <div className="news">
                {this.renderNews()}
                {
                    filteredNews.length ? <strong onClick={this.handleCounterClck} className={'news__count'}>Всего новостей: {filteredNews.length}</strong> : null
                }
                {
                    ClickCounter ? <strong className={'news__count'}>Всего кликов: { ClickCounter }</strong> : null
                }
            </div>
        );
    }
}

News.propTypes = {
    data: PropTypes.array.isRequired // PropTypes (с большой буквы) = библиотека prop-types
}

export { News }