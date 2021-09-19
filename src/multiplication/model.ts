import * as React from 'react'

import {check, checkNotNil, isNil, nil, unreachable} from '../common/checks'
import {randRange} from '../common/random'
import {ChangeEvent} from 'react'

export interface MulQuestion {
    op1: number
    op2: number
}

export enum QuizStatus {
    presented = 'presented',
    solving = 'solving',
    solved = 'solved',
    skipped = 'skipped',
}

export interface PresentedQuiz<Q> {
    status: QuizStatus.presented
    question: Q
    presentedAt: Date
}

export interface SolvingQuiz<Q, A> {
    status: QuizStatus.solving
    question: Q
    answer: A
    presentedAt: Date
    startedAnswering: Date
}

export interface SolvedQuiz<Q, A> {
    status: QuizStatus.solved
    question: Q
    answer: A
    startedAnswering: Date
    submittedAnswer: Date
    isCorrect: boolean
}


export enum QuizSkipReason {
    timeout = 'timeout',
    skip = 'skip',
}

export interface SkippedQuiz<Q> {
    status: QuizStatus.skipped
    reason: QuizSkipReason
    question: Q
}

const MAX_TIMED_OUT_QUIZZES = 100

export type Quiz<Q, A> = PresentedQuiz<Q> | SolvingQuiz<Q, A> | SolvedQuiz<Q, A> | SkippedQuiz<Q>

export type FinalizedQuiz<Q, A> = SolvedQuiz<Q, A> | SkippedQuiz<Q>

const QUIZ_TIMEOUT_SECONDS = 20

export class QuizModel {
    public history: FinalizedQuiz<MulQuestion, number>[] = []
    public currentQuiz: Quiz<MulQuestion, number> | nil = null
    private nextAlarm?: number
    private timedOutQuizzes: number = 0

    startAsking() {
        this.ask()
    }

    ask(): void {
        check(
            isNil(this.currentQuiz) || this.currentQuiz.status !== QuizStatus.solving,
            "Already on a quiz",
            this.currentQuiz?.status
        )
        console.log('asking')
        this.currentQuiz = this.genNewQuiz()
        this.scheduleTimeout()
    }

    private genNewQuiz(): PresentedQuiz<MulQuestion> {
        return {
            status: QuizStatus.presented,
            presentedAt: new Date(),
            question: {
                op1: randRange(2, 10),
                op2: randRange(2, 10),
            },
        }
    }

    public onInput = (event: ChangeEvent<HTMLInputElement>): void => {
        const current = checkNotNil(this.currentQuiz)
        const answer = parseInt(event.target.value, 10)
        switch (current.status) {
            case QuizStatus.presented:
                this.startsSolving(current, answer)
                break
            case QuizStatus.solving:
                this.updatesSolution(current, answer)
                break
            default:
                unreachable('Unexpected quiz status', current.status as never)
        }
    }

    public onSubmit = (event: React.FormEvent): void => {
        this.commitSolution(this.currentQuiz as SolvingQuiz<MulQuestion, number>)
        event.preventDefault()
    }

    private updatesSolution(current: SolvingQuiz<MulQuestion, number>, answer: number) {
        current.answer = answer
    }

    private startsSolving(current: PresentedQuiz<MulQuestion>, answer: number) {
        console.log('starts solving')
        this.currentQuiz = {
            status: QuizStatus.solving,
            question: current.question,
            answer,
            presentedAt: current.presentedAt,
            startedAnswering: new Date(),
        }
    }

    private commitSolution(current: SolvingQuiz<MulQuestion, number>): void {
        console.log('commits solution')
        const solved: SolvedQuiz<MulQuestion, number> = {
            status: QuizStatus.solved,
            question: current.question,
            answer: current.answer,
            isCorrect: this.isCorrect(current.question, current.answer),
            startedAnswering: current.startedAnswering,
            submittedAnswer: new Date()
        }
        this.history.push(solved)
        this.currentQuiz = solved
        this.resetSkips()
        this.scheduleNextAsk()
    }

    private isCorrect(question: MulQuestion, answer: number): boolean {
        return question.op1 * question.op2 === answer
    }

    private cancelNextAlarm() {
        if (!isNil(this.nextAlarm)) {
            window.clearTimeout(this.nextAlarm)
        }
    }

    private scheduleNextAsk() {
        this.cancelNextAlarm()
        this.nextAlarm = window.setTimeout(() => this.ask(), 2000)
    }

    private timeoutQuiz() {
        this.skipQuiz(QuizSkipReason.timeout)
        if (this.timedOutQuizzes < MAX_TIMED_OUT_QUIZZES) {
            this.scheduleNextAsk()
        }
    }


    private skipQuiz(reason: QuizSkipReason) {
        if (reason === QuizSkipReason.timeout) {
            this.timedOutQuizzes += 1
        }
        const current = checkNotNil(this.currentQuiz)
        check(current.status === QuizStatus.presented || current.status === QuizStatus.solving,
            'Invalid quiz status for skipping', current.status)
        const skipped: SkippedQuiz<MulQuestion> = {
            status: QuizStatus.skipped,
            reason,
            question: current.question
        }
        this.history.push(skipped)
        this.currentQuiz = skipped
    }

    private resetSkips() {
        this.timedOutQuizzes = 0
    }

    private scheduleTimeout() {
        this.nextAlarm = window.setTimeout(() => this.timeoutQuiz(), QUIZ_TIMEOUT_SECONDS * 1000)
    }

    stats(): Stats {
        let correct: number = 0
        let incorrect: number = 0
        for (const quiz of this.history) {
            if (quiz.status === QuizStatus.solved) {
                if (quiz.isCorrect) {
                    correct += 1
                } else {
                    incorrect += 1
                }
            }
        }
        const total = correct + incorrect
        const correctRatio = total === 0 ? 0 : correct / total
        const incorrectRatio = 1 - correctRatio
        return {
            correct, incorrect, correctRatio, incorrectRatio
        }
    }
}


export interface Stats {
    correct: number,
    incorrect: number,
    correctRatio: number,
    incorrectRatio: number,
}