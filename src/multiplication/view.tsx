import * as React from 'react'
import {MulQuestion, QuizModel, QuizStatus} from './model'
import {isNil} from '../common/checks'
import {HorizontalGap, HorizontalStack, Stretch, VerticalStack} from '../common/layout'
import {BigText, Icon} from '../common/text'
import {Colors} from '../style'
import {Layout} from '../layout'
import {observer} from 'mobx-react'


export function MainView(props: { model: QuizModel }): JSX.Element {
    return <Layout>
        <QuizView model={props.model}/>
        <Status model={props.model}/>
    </Layout>
}

@observer
export class Status extends React.Component<{ model: QuizModel }> {

    render(): JSX.Element {
        const model = this.props.model
        const stats = model.stats()
        const containerStyle: React.CSSProperties = {
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '400px',
            bottom: '50px',
            alignItems: 'center',
            justifyItems: 'center',

        }
        const badStyle: React.CSSProperties = {
            backgroundColor: Colors.light.bad,
            borderRadius: '4px 0 0 4px',
            flex: `${stats.incorrectRatio} 1 auto`,
            textAlign: 'right',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '20px',
            height: '30px',
            color: Colors.primary.background
        }
        const goodStyle: React.CSSProperties = {
            backgroundColor: Colors.light.good,
            borderRadius: '0 4px 4px 0',
            flex: `${stats.correctRatio} 1 auto`,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: '20px',
            height: '30px',
            color: Colors.primary.background
        }
        const barStyle = {
            width: '100%',
        }
        const percentageStyle: React.CSSProperties = {
            fontSize: '24px',
            fontWeight: 700,
            color: stats.correctRatio > 0.5 ? Colors.light.good : Colors.light.bad,
        }

        return <VerticalStack style={containerStyle}>
            <div style={percentageStyle}>{(stats.correctRatio * 100).toFixed(0)}%</div>
                <HorizontalStack style={barStyle}>
                <HorizontalStack style={badStyle}>{stats.incorrect}</HorizontalStack>
                <HorizontalStack style={goodStyle}>{stats.correct}</HorizontalStack>
            </HorizontalStack>
        </VerticalStack>

    }
}

export interface QuizViewProps {
    model: QuizModel
}

@observer
export class QuizView extends React.Component<QuizViewProps> {
    render(): JSX.Element {
        const inputStyle: React.CSSProperties = {
            fontSize: '64px',
            border: 'none',
            outlineWidth: 0,
            width: '200px',
            background: Colors.primary.background,
            color: Colors.primary.info,
        }
        const model = this.props.model
        const current = model.currentQuiz
        if (isNil(current)) {
            return <div>Start!</div>
        }
        switch (current.status) {
            case QuizStatus.solving:
            case QuizStatus.presented:
                return <form onSubmit={model.onSubmit}>
                    <QuestionContainer question={current.question}>
                        <input autoFocus style={inputStyle} type="text" onInput={model.onInput}/>
                    </QuestionContainer>
                </form>
            case QuizStatus.solved: {
                const style: React.CSSProperties = {
                    color: current.isCorrect ? Colors.primary.good : Colors.primary.bad,
                    width: '200px',
                    textAlign: 'left',
                }
                return <QuestionContainer question={current.question}>
                    <BigText style={style}> {current.answer}</BigText>
                </QuestionContainer>
            }
            case QuizStatus.skipped: {
                const style: React.CSSProperties = {
                    color: Colors.primary.bad,
                    width: '200px',
                    textAlign: 'left',
                }
                return <QuestionContainer question={current.question}>
                    <Icon icon="alarm" size={64}/>
                </QuestionContainer>
            }
            default:
                return <div>don't know what to do</div>
        }
    }
}

export function QuestionContainer(props: { question: MulQuestion, children: React.ReactNode }): JSX.Element {
    const answerStyle: React.CSSProperties = {
        width: '200px',
        display: 'flex',
        alignItems: 'stretch',
    }
    return <HorizontalStack>
        <QuestionDisplay question={props.question}/>
        <HorizontalGap width={20}/>
        <HorizontalStack style={answerStyle}>
            {props.children}
        </HorizontalStack>
    </HorizontalStack>
}

export function QuestionDisplay(props: { question: MulQuestion }): JSX.Element {
    return <HorizontalStack>
        <BigText>{props.question.op1}</BigText>
        <HorizontalGap width={20}/>
        <BigText>x</BigText>
        <HorizontalGap width={20}/>
        <BigText>{props.question.op2}</BigText>
        <HorizontalGap width={20}/>
        <BigText> = </BigText>
    </HorizontalStack>
}