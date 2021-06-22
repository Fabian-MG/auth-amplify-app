export const Note = ({note, deleteNote}) => {
    return (
        <div>
            <div>
                <p>{note.name}</p>
                <p>{note.description}</p>
            </div>
            <div>
                <p onClick={() => deleteNote(note)}>Delete</p>
            </div>
        </div>
    )
}