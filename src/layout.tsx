import React from 'react'
import {ContainerProps, VerticalStack} from './common/layout'
import {Colors} from './style'

export function Layout(props: ContainerProps): JSX.Element {
    const style: React.CSSProperties = {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: Colors.primary.background,
        color: Colors.primary.stroke,
    }
    return <VerticalStack style={style}>
        {props.children}
    </VerticalStack>
}