import { useEffect, useReducer } from "react"
import { API } from "@aws-amplify/api"
import { v4 as uuid } from 'uuid'
import { Note } from './Note/Note'
import { Spinner } from '../Spinner/Spinner'

import { STATUS } from '../../utils'
import { ACTION  } from './utils'
import { listNotes as LIST_NOTES} from "../../graphql/queries"
import { onCreateNote } from "../../graphql/subscriptions"
import { 
    createNote as CREATE_NOTE,
    deleteNote as DELETE_NOTE,
    updateNote as UPDATE_NOTE
} from "../../graphql/mutations"

const CLIENT_ID = uuid()

const initialState = {
    notes: [],
    loading: true,
    error: false,
    status: STATUS.PENDING,
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
        return { ...state, status: STATUS.REJECTED}
      default:
        return state
    } 
}

export const NoteList = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { notes, status, form } = state

    async function fetchNotes() {
        try {
            dispatch({type: ACTION.FETCH})
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
        dispatch({ type: ACTION.RESET_FORM })

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

    async function deleteNote({id}) {
        const index = state.notes.findIndex(n => n.id === id)
        const notes = [
            ...state.notes.slice(0,index),
            ...state.notes.slice(index + 1)
        ]
        dispatch({ type: ACTION.SET_NOTES, notes })
        try {
            await API.graphql({
              query: DELETE_NOTE,
              variables: { input: { id } }
            })
            console.log('successfully deleted note!')
        } catch (err) {
            console.log({ err })
        }
    }

    async function updateNote(note) {
        const index = state.notes.findIndex(n => n.id === note.id)
        const notes = [...state.notes]
        notes[index].completed = !note.completed
        dispatch({ type: 'SET_NOTES', notes})
        try {
            await API.graphql({
              query: UPDATE_NOTE,
              variables: { input: { id: note.id, completed: notes[index].completed } }
            })
            console.log('note successfully updated!')
          } catch (err) {
            console.log('error: ', err)
          }
    }

    useEffect(() => {
        fetchNotes()
        const subscription = API.graphql({
            query: onCreateNote
          })
            .subscribe({
              next: noteData => {
                const note = noteData.value.data.onCreateNote
                if (CLIENT_ID === note.clientId) return
                dispatch({ type: 'ADD_NOTE', note })
               } 
            })
        return () => subscription.unsubscribe()
    }, [])

    function onChange(e) {
        dispatch({ type: ACTION.SET_INPUT, name: e.target.name, value: e.target.value })
    }

    if(status === STATUS.PENDING) {
        return <Spinner />
    } else if (status === STATUS.REJECTED) {
        return <h1>Error</h1>
    } else if (status === STATUS.FULFILLED) {   
     return (
        <div className="w-full flex p-16 justify-between"> 
            <div className="w-7/12">
                {
                notes.length ? notes.map((note) => 
                    <Note 
                        key={note.id} 
                        note={note} 
                        deleteNote={deleteNote} 
                        updateNote={updateNote}
                    /> 
                ) : <h1 className="text-indigo-700 text-3xl">Start adding some notes...</h1>
                }
            </div>
            <div className="flex items-center flex-col w-4/12 h-60 p-6 shadow-md rounded-md">
                <h2 className="mb-3 text-indigo-700 text-xl font-medium">Create a Note</h2>
                <input
                    onChange={onChange}
                    value={state.form.name}
                    placeholder="Note Name"
                    name='name'
                    className="w-full p-1 text-sm my-2 border ring-0 border-gray-300 rounded-md"
                /> 
                <input
                    onChange={onChange}
                    value={state.form.description}
                    placeholder="Note description"
                    name='description'
                    className="w-full p-1 text-sm my-2 border ring-0 border-gray-300 rounded-md"
                /> 
                <button
                    onClick={createNote}
                    type="primary"
                    className="mt-3 border w-full h-8 rounded-md bg-indigo-700 text-indigo-100"
                >
                    Add
                </button>
            </div>
        </div>
    )
        }
}