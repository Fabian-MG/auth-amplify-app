
export const Note = ({note, deleteNote, updateNote}) => {
    return (
        <div>
            <div>
                <p>{note.name}</p>
                <p>{note.description}</p>
            </div>
            <div>
                <p onClick={() => deleteNote(note)}>
                    Delete
                </p>
                <p onClick={() => updateNote(note)}>
                    {note.completed ? 'Complete' : 'mark completed'}
                </p>
            </div>
        </div>
    )
}