// Copyright (c) 2020-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react'

import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import {TestBlockFactory} from '../test/testBlockFactory'
import {wrapIntl} from '../testUtils'
import {Utils} from '../utils'

import TaskId from './taskId'

describe('components/taskId', () => {
    const board = TestBlockFactory.createBoard()
    const card = TestBlockFactory.createCard(board)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should render the derived short task ID', () => {
        render(wrapIntl(<TaskId card={card}/>))
        expect(screen.getByText(Utils.getCardShortId(card.id))).toBeInTheDocument()
    })

    test('should copy the task ID to the clipboard on click', () => {
        const spy = jest.spyOn(Utils, 'copyTextToClipboard').mockReturnValue(true)
        render(wrapIntl(<TaskId card={card}/>))

        fireEvent.click(screen.getByRole('button'))

        expect(spy).toHaveBeenCalledWith(Utils.getCardShortId(card.id))
    })
})
