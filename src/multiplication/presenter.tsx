import * as React from 'react'
import {QuizModel} from './model'
import {MainView} from './view'
import {observer} from 'mobx-react'
import {makeAutoObservable} from 'mobx'

export class QuizPresenter extends React.Component {
    private model: QuizModel
    private view: typeof MainView

    constructor(props: {}) {
        super(props)
        this.model = makeAutoObservable(new QuizModel())
        this.view = observer(MainView)
    }

    componentDidMount() {
        console.log('mounted!')
        this.model.startAsking()
    }

    render() {
        return React.createElement(this.view, {model: this.model})
    }
}