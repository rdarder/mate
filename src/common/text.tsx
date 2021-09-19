import {StyledContainerProps} from './layout'

export function BigText(props: StyledContainerProps): JSX.Element {
    const fwdStyle: React.CSSProperties = {
        fontSize: '64px',
        ...props.style
    }
    return <div style={fwdStyle}>{props.children}</div>
}

export function MediumText(props: StyledContainerProps): JSX.Element {
    const fwdStyle: React.CSSProperties = {
        fontSize: '32px',
        ...props.style
    }
    return <div style={fwdStyle}>{props.children}</div>
}

export function Label(props: StyledContainerProps): JSX.Element {
    const fwdStyle: React.CSSProperties = {
        fontSize: '10px',
        ...props.style
    }
    return <div style={fwdStyle}>{props.children}</div>
}

export function Icon(props: { icon: string, size: number }): JSX.Element {
    const style: React.CSSProperties = {
        fontSize: `${props.size}px`
    }
    return <span className="material-icons" style={style}>{props.icon}</span>
}