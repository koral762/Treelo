import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoards, removeBoard } from '../store/actions/board-actions'
import { Link } from "react-router-dom";
import AddBoxIcon from '@material-ui/icons/AddBox';
import { BoardPreview } from '../cmps/BoardPreview';
import { Dialog, IconButton } from '@material-ui/core';
import { AddNewBoard } from './../cmps/AddNewBoard'
import { CloseOutlined } from '@material-ui/icons';

export class _Boards extends Component {

    state = {
        isCreateBoardOpen: false

    }

    async componentDidMount() {
        await this.props.loadBoards()
    }

    onRedirect = (id) => {
        this.onCloseCreateBoard()
        this.props.history.push(`/board/${id}`)
    }

    openNewBoardModal = () => {
        this.setState({ isCreateBoardOpen: true })
    }

    onCloseCreateBoard = () => {
        this.setState({ isCreateBoardOpen: false })
    }


    // this.props.removeBoard()

    fn() { }

    render() {
        const { boards } = this.props

        return (
            <section className="boards-page-bg flex column ">
                <div className="main-boards">
                    <div className="flex justify-space-between align-center">
                        <h3>Your Boards</h3>
                    </div>

                    <section className="select-board-container flex wrap">

                        <div className="create-new-board" onClick={() => { this.openNewBoardModal() }}>
                            <div className="new-board-text flex align-center">
                                <AddBoxIcon />
                                <p>Create new board</p>
                            </div>
                        </div>
                        {this.state.isCreateBoardOpen && <AddNewBoard onCloseModal={this.onCloseCreateBoard} redirectPath={this.onRedirect} />}
                        {boards.map((board) => <BoardPreview key={board._id} board={board} />)}
                    </section>

                    <h3 className="popular-title">Popular templates</h3>

                    <section className="select-board-container flex wrap">

                        <section className="select-board-container flex wrap">
                            {boards.map((board) => <BoardPreview key={board._id} board={board} />)}
                        </section>

                    </section>
                </div >
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
        // loggedInUser: state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    loadBoards,
    removeBoard
}

export const Boards = connect(mapStateToProps, mapDispatchToProps)(_Boards)