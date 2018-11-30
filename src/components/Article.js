import React from "react";
import PropTypes from 'prop-types';


class Article extends React.Component {
    state = {
        visible: false, // определили начальное состояние
    }
    handleReadMoreClck = (e) => { // добавили метод
        e.preventDefault()
        this.setState({ visible: true })
    }
    handleCloseClck = (e) => { // добавили метод
        e.preventDefault()
        this.setState({ visible: false })
    }

    render() {
        const { author, text, bigText } = this.props.data // вытащили bigText из даты
        const { visible } = this.state // вытащили visible из this.state

        return (
            <div className='article'>
                <p className='news__author'>{author}:</p>
                <p className='news__text'>{text}</p>
                {
                    /* если не visible, то показывай */
                    !visible && <a onClick={this.handleReadMoreClck} href="#readmore'" className='news__readmore'>Подробнее</a>
                }
                {
                    /* если visible, то показывай */
                    visible && <p onClick={this.handleCloseClck} className='news__big-text'>{bigText}</p>
                }
            </div>
        )
    }
}

Article.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired, // добавили id, это число, обязательно
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        bigText: PropTypes.string.isRequired
    })
}

export { Article }