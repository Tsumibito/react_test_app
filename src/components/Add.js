import React from "react";


class Add extends React.Component {
    state = {
        name: '',
        text: '',
        bigText: '',
        agree: false,
    }
    validate = () => {
        const { name, text, agree, bigText } = this.state
        let res = false
        if (agree && name.trim() && text.trim() && bigText.trim() ) {
            res = true
        }
        return res
    }

    onBtnClickHandler = (e) => {
        e.preventDefault()
        const { name, text, bigText } = this.state // вытащили так же и bigText
        this.props.onAddNews({
            id: +new Date(), // в id сохраняется количество миллисекунд прошедших с 1 января 1970 года в часовом поясе UTC
            author: name, // name сохраняем в поле author
            text,
            bigText,
        })
    }

    handleChange = (e) => {
        const { id, value } = e.currentTarget
        this.setState({ [id]: value })
    }

    handleCheckboxChange = (e) => {
        this.setState({ agree: e.currentTarget.checked })
    }

    render() {
        const { name, text, bigText } = this.state

        return (
            <form className='add'>
                <input
                    id='name'
                    type='text'
                    onChange={this.handleChange}
                    className='add__author'
                    placeholder='Ваше имя'
                    value={name}
                />
                <textarea
                    id='text'
                    onChange={this.handleChange}
                    className='add__text'
                    placeholder='Текст новости'
                    value={text}
                >
                </textarea>
                <textarea
                    id='bigText'
                    onChange={this.handleChange}
                    className='add__text'
                    placeholder='Текст новости подробно'
                    value={bigText}
                >
                </textarea>
                <label className='add__checkrule'>
                    <input type='checkbox'
                           onChange={this.handleCheckboxChange}
                    />
                    Я согласен с правилами
                </label>
                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    disabled={!this.validate()}>
                    Добаить новость
                </button>
            </form>
        )
    }
}

export { Add }