// Copyright (c) 2020-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useCallback} from 'react'
import {useIntl} from 'react-intl'

import {Card} from '../blocks/card'
import {Utils} from '../utils'
import Tooltip from '../widgets/tooltip'

import {sendFlashMessage} from './flashMessages'

import './taskId.scss'

type Props = {
    card: Card
    className?: string
}

// TaskId renders a short, copyable task identifier derived from the card's
// unique ID. The code is safe to use for branch naming and task tracing, and
// clicking it copies the code to the clipboard.
const TaskId = (props: Props): JSX.Element => {
    const {card} = props
    const intl = useIntl()

    const shortId = Utils.getCardShortId(card.id)

    const handleClick = useCallback((e: React.MouseEvent) => {
        // Avoid triggering the card open/select handlers when copying.
        e.stopPropagation()
        e.preventDefault()

        Utils.copyTextToClipboard(shortId)
        sendFlashMessage({
            content: intl.formatMessage({id: 'TaskId.copied', defaultMessage: 'Copied task ID!'}),
            severity: 'high',
        })
    }, [shortId, intl])

    let className = 'TaskId'
    if (props.className) {
        className += ` ${props.className}`
    }

    return (
        <Tooltip title={intl.formatMessage({id: 'TaskId.tooltip', defaultMessage: 'Click to copy task ID'})}>
            <button
                type='button'
                className={className}
                onClick={handleClick}
                title={shortId}
            >
                <span className='TaskId__code'>{shortId}</span>
            </button>
        </Tooltip>
    )
}

export default React.memo(TaskId)
