import { useEffect, useReducer } from "react"
import { API } from "@aws-amplify/api"

import { Note } from './Note/Note'
import { Spinner } from '../Spinner/Spinner'

import { STATUS } from '../../utils'
import { listNotes } from "../../graphql/queries"

const ACTION = {
    SET_NOTES: 'SET_NOTES',
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
      case ACTION.ERROR:
        return { ...state, loading: false, error: true }
      default:
        return state
    } 
}

export const NoteList = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { notes, status, error } = state

    async function fetchNotes() {
        try {
            const notesData = await API.graphql({query: listNotes})
            dispatch({type: ACTION.SET_NOTES, notes: notesData.data.listNotes.items})
        } catch(error) {
            dispatch({type: ACTION.ERROR})
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    if(status === STATUS.PENDING) {
        return <Spinner />
    } else if (status === STATUS.ERROR) {
        return <h1>Error</h1>
    }

    return notes.map((note) => <Note key={note.id} note={note} /> )
}