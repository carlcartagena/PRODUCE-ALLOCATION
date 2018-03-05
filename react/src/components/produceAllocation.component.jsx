import React from 'react'
import produceAllocationService from '../services/produceAllocation.service'
import { Button } from 'react-bootstrap'
import { FormattedDate } from 'react-intl'
import '../css/style.css'

class ProduceAllocation extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            inputValues: {
                listItem: '',
                updateBox: ''
            },
            selectToUpdate: "-",
            checkBox: false,
            width: 0,
            height: 0,
            show: false,
            submitButton: 'primary'
        }

        this.createNewNote = this.createNewNote.bind(this)
        this.inputValues = this.inputValues.bind(this)
        this.inputUpdateBox = this.inputUpdateBox.bind(this)

        this.deleteNote = this.deleteNote.bind(this)
        this.updateNote = this.updateNote.bind(this)

        this.updateWindow = this.updateWindow.bind(this)
    }

    componentDidMount() {
        this.updateWindow()
        window.addEventListener('resize', this.updateWindow)
        this.readAllData()

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindow)
    }

    updateWindow() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    handleFocus(e) {
        e.target.select()
    }

    readAllData() {
        produceAllocationService.readAll()
            .then((data) => {
                this.setState({
                    items: data,
                    inputValues: {
                        listItem: [],
                        selectToUpdate: "-"
                    }
                })
            })
            .catch((err) => {
                console.log(err)
                console.log(`fail 😞`)
            })
    }

    inputValues(event) {
        this.setState({
            inputValues: {
                ...this.state.inputValues,
                listItem: event.target.value
            }
        })
    }

    inputUpdateBox(event) {
        this.setState({
            inputValues: {
                ...this.state.inputValues,
                updateBox: event.target.value
            }
        })
    }

    createNewNote() {
        let note = {}
        note.listItem = this.state.inputValues.listItem
        note.checkBox = false
        produceAllocationService.create(note)
            .then((data) => {
                this.readAllData()
                this.setState({
                    selectToUpdate: "-",
                    show: false,
                    submitButton: 'primary'
                })
            })
            .catch((err) => {
                console.log(err)
                console.log(`fail 😞`)
                this.setState({
                    show: true,
                    submitButton: 'danger'
                })
            })
    }

    deleteNote(id) {
        produceAllocationService.delete(id)
            .then((data) => {
                this.readAllData()
                this.setState({
                    selectToUpdate: "-",
                    show: false
                })
            })
            .catch((err) => {
                console.log(err)
                console.log(`fail 😞`)
                this.setState({
                    show: true
                })
            })
    }

    updateNote(id, noteData) {
        let note = {}
        note.listItem = noteData.listItem
        note.checkBox = noteData.checkBox
        produceAllocationService.update(id, note)
            .then((data) => {
                this.setState({
                    selectToUpdate: "-",
                    show: false
                })
                this.readAllData()
            })
            .catch((err) => {
                console.log(err)
                console.log(`fail 😞`)
                this.setState({
                    show: true,
                    submitButton: 'danger'
                })
            })
    }

    render() {

        let submitButtonStyle = this.state.submitButton
        let deleteButtonSize = 'xsmall'
        let deleteButtonStyle = 'danger'
        let selectToUpdate = this.state.selectToUpdate
        let breakOrSpace = (
            <React.Fragment>
                <br />
            </React.Fragment>
        )
        if (this.state.width > 550) {
            breakOrSpace = (
                <React.Fragment>
                    &nbsp;
                    </React.Fragment>
            )
        }

        let errorFail = (
            <span>
            </span>
        )
        if (this.state.show) {
            errorFail = (
                <span
                    role="img"
                    aria-labelledby="jsx-a11y/accessible-emoji"
                >
                    😢
                    </span>
            )
        }
        let dataItems = this.state.items ? this.state.items.map(
            (data, index) => {
                let crossedOutItemStyle = {
                    textAlign: 'left'
                }
                if (data.checkBox) {
                    crossedOutItemStyle = {
                        textDecorationLine: 'line-through',
                        textAlign: 'left'
                    }
                }
                let itemBox = (
                    <React.Fragment>
                        <td
                            style={{ width: '25px' }}
                        >
                            <input
                                type="checkbox"
                                checked={data.checkBox}
                                onChange={() => {
                                    if (!data.checkBox) {
                                        data.checkBox = true
                                    }
                                    else {
                                        data.checkBox = false
                                    }
                                    let noteData = {}
                                    noteData.checkBox = data.checkBox
                                    noteData.listItem = data.listItem
                                    this.updateNote(data._id, noteData)
                                }}
                            />
                        </td>
                        <td
                            id={index}
                            style={crossedOutItemStyle}
                            onClick={() => {
                                this.setState({
                                    selectToUpdate: index,
                                    inputValues: {
                                        updateBox: data.listItem,
                                        listItem: ""
                                    }
                                })
                            }}
                        >
                            {data.emoji}
                            &nbsp;
                            {data.listItem}
                        </td>
                    </React.Fragment>
                )
                if (index === selectToUpdate) {
                    itemBox = (
                        <React.Fragment>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={data.checkBox}
                                    onChange={() => {
                                        if (!data.checkBox) {
                                            data.checkBox = true
                                        }
                                        else {
                                            data.checkBox = false
                                        }
                                        let noteData = {}
                                        noteData.checkBox = data.checkBox
                                        noteData.listItem = data.listItem
                                        this.updateNote(data._id, noteData)
                                    }}
                                />
                            </td>
                            <td
                                id={index}
                                style={crossedOutItemStyle}
                            >
                                <input
                                    type="text"
                                    maxLength="20"
                                    style={{
                                        width: '100px',
                                        height: '20px'
                                    }}
                                    onFocus={this.handleFocus}
                                    value={this.state.inputValues.updateBox}
                                    onChange={this.inputUpdateBox}
                                    onKeyPress={(e) => {
                                        if (e.which === 13) {
                                            let updateItem = {}
                                            updateItem.listItem = this.state.inputValues.updateBox
                                            updateItem.checkBox = false
                                            this.updateNote(data._id, updateItem)
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.which === 27) {
                                            this.setState({
                                                selectToUpdate: "-"
                                            })
                                        }
                                    }}
                                />
                                {breakOrSpace}
                                <Button
                                    bsStyle="info"
                                    bsSize={deleteButtonSize}
                                    onClick={() => {
                                        this.setState({
                                            selectToUpdate: "-"
                                        })
                                    }}
                                >
                                    esc
                        </Button>
                                &nbsp;
                                <Button
                                    bsStyle="warning"
                                    bsSize={deleteButtonSize}
                                    onClick={() => {
                                        let updateItem = this.state.inputValues.updateBox
                                        this.updateNote(data._id, updateItem)
                                    }}
                                >
                                    update
                        </Button>
                                &nbsp;
                            <Button
                                    bsStyle={deleteButtonStyle}
                                    bsSize={deleteButtonSize}
                                    onClick={() => {
                                        this.deleteNote(data._id)
                                    }}
                                >
                                    x
                        </Button>

                            </td>
                        </React.Fragment>
                    )
                }
                let dateItems = (
                    <React.Fragment>
                        <td
                            style={{ width: '140px' }}
                        >
                            <span
                                className="pull-right"
                            >
                                <FormattedDate
                                    value={data.createDate}
                                />
                                &nbsp;
                                <FormattedDate
                                    value={data.createDate}
                                    hour='numeric'
                                    minute='numeric'
                                />
                            </span>
                        </td>
                    </React.Fragment>
                )

                if (this.state.width > 500) {
                    dateItems = (
                        <React.Fragment>
                            <td
                                style={{ width: '100px' }}
                            >
                                <span
                                    className="pull-right"
                                >
                                    <FormattedDate
                                        value={data.createDate}
                                        year='numeric'
                                        month='short'
                                        day='numeric'
                                    />
                                </span>
                            </td>
                            <td
                                style={{ width: '50px' }}
                            >
                                <span>
                                    <FormattedDate
                                        value={data.createDate}
                                        weekday='long'
                                    />
                                </span>
                            </td>
                            <td
                                style={{ width: '80px' }}
                            >
                                <span
                                    className="pull-right"
                                >
                                    <FormattedDate
                                        value={data.createDate}
                                        hour='numeric'
                                        minute='numeric'
                                    />
                                </span>
                            </td>
                        </React.Fragment>
                    )
                }
                return (
                    <tr
                        key={data._id}
                    >
                        {dateItems}

                        {itemBox}
                    </tr>
                )
            }
        ) : <tr></tr>
        let initialRequestDateRow = 1

        if (this.state.width > 500) {
            initialRequestDateRow = 3
        }
        return (
            <div
                className="container"
                style={{
                    maxWidth: '600px',
                    backgroundColor: 'gray',
                    borderRadius: '10px'
                }}
            >
                <div
                    className="container well"
                    style={{
                        textAlign: 'center',
                        maxWidth: '570px',
                        borderRadius: '10px'
                    }}
                >
                    PRODUCE ALLOCATION REQUEST
                    &nbsp;
                        <input
                        type="text"
                        maxLength="20"
                        onClick={() => {
                            this.setState({
                                selectToUpdate: "-"
                            })
                        }}
                        value={this.state.inputValues.listItem}
                        onChange={this.inputValues}
                        onKeyPress={(e) => {
                            if (e.which === 13) {
                                this.createNewNote()
                            }
                        }}
                    />
                    &nbsp;
                    <Button
                        bsStyle={submitButtonStyle}
                        bsSize="xsmall"
                        onClick={this.createNewNote}
                    >
                        request {errorFail}
                    </Button>
                </div>
                <table
                    className="table"
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '10px'
                    }} 
                >
                    <thead
                    >
                        <tr>
                            <th
                                colSpan={initialRequestDateRow}
                            >
                                &nbsp;
                                    initial request
                            </th>

                            <th
                                colSpan="2"
                            >
                                items
                            </th>
                        </tr>
                    </thead>
                    <tbody
                    >
                        {dataItems}
                    </tbody>

                </table>
            </div >
        )
    }
}

export default ProduceAllocation




