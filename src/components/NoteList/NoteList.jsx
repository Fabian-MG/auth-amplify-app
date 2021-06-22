import { useEffect, useReducer } from "react"
import { API } from "@aws-amplify/api"
import { v4 as uuid } from 'uuid'
import { Note } from './Note/Note'
import { Spinner } from '../Spinner/Spinner'

import { STATUS } from '../../utils'
import { listNotes as LIST_NOTES} from "../../graphql/queries"
import { createNote as CREATE_NOTE } from "../../graphql/mutations"

const CLIENT_ID = uuid()

const ACTION = {
    RESET_FORM: 'RESET_FORM',
    SET_NOTES: 'SET_NOTES',
    ADD_NOTES: 'ADD_NOTES',
    SET_INPUT: 'SET_INPUT',
    FETCH: 'FETCH',
    ERROR: 'ERROR'
}

const initialState = {
    notes: [],
    loading: true,
    error: false,
    form: { name: '', description: '' }
}

function reducer(state, action) {
    switch(action.type) {
      case ACTION.FETCH: 
        return { ...state, status: STATUS.PENDING}  
      case ACTION.SET_NOTES:
        return { ...state, notes: action.notes, status: STATUS.FULFILLED }
      case ACTION.ADD_NOTES:
        return { ...state, notes: [action.note, ...state.notes]}
      case ACTION.RESET_FORM:
        return { ...state, form: initialState.form }
      case ACTION.SET_INPUT:
        return { ...state, form: { ...state.form, [action.name]: action.value } }
      case ACTION.ERROR:
        return { ...state, loading: false, error: true }
      default:
        return state
    } 
}

export const NoteList = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { notes, status, form, error } = state

    async function fetchNotes() {
        try {
            const notesData = await API.graphql({query: LIST_NOTES})
            dispatch({type: ACTION.SET_NOTES, notes: notesData.data.listNotes.items})
        } catch(error) {
            dispatch({type: ACTION.ERROR})
        }
    }

    async function createNote() {
        const { name, description } = form
        if(!name || !description) {
            return alert('Please enter a name and description')
        }
        const note = {...form, clientId: CLIENT_ID, completed: false, id: uuid()}
        dispatch({type: ACTION.ADD_NOTES, note})
        dispatch({ type: 'RESET_FORM' })

        try {
            await API.graphql({
                query: CREATE_NOTE,
                variables: { input: note }
            })
            console.log('successfully created note!')
        } catch (err) {
            console.log("error: ", err)
        }
    }

    function onChange(e) {
        dispatch({ type: 'SET_INPUT', name: e.target.name, value: e.target.value })
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    if(status === STATUS.PENDING) {
        return <Spinner />
    } else if (status === STATUS.ERROR) {
        console.log(status)
        return <h1>Error</h1>
    }

    return (
        <>
             <input
                onChange={onChange}
                value={state.form.name}
                placeholder="Note Name"
                name='name'
            /> <input
                onChange={onChange}
                value={state.form.description}
                placeholder="Note description"
                name='description'
            /> <button
                onClick={createNote}
                type="primary"
                >Create Note</button>

            {notes.map((note) => <Note key={note.id} note={note} /> )}
        </>
    )
}