import * as React from 'react'

export interface ContainerProps {
    children: React.ReactNode

}

export interface StyledContainerProps extends ContainerProps {
    style?: React.CSSProperties,
}

export function Stack(props: StyledContainerProps): JSX.Element {
    const compoundStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        ...props.style,
    }
    return <div style={compoundStyle}>{props.children}</div>
}

export function HorizontalStack(props: StyledContainerProps): JSX.Element {
    const fwdStyle: React.CSSProperties = {
        flexDirection: 'row',
        ...props.style,
    }
    return <Stack style={fwdStyle}>{props.children}</Stack>
}

export function VerticalStack(props: StyledContainerProps): JSX.Element {
    const fwdStyle: React.CSSProperties = {
        flexDirection: 'column',
        ...props.style,
    }
    return <Stack style={fwdStyle}>{props.children}</Stack>
}

export function HorizontalGap(props: { width: number, style?: React.CSSProperties }): JSX.Element {
    const fwdStyle = {
        width: `${props.width}px`,
        ...props.style
    }
    return <div style={fwdStyle}/>
}

export function Stretch(props: {}): JSX.Element {
    const style = {height: '100%'}
    return <div style={style}/>
}