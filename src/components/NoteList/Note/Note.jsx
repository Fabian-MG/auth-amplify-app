
export const Note = ({note, deleteNote, updateNote}) => {
    return (
        <div className="h-28 p-4 mb-10 flex my-2 justify-between align-middle border-b rounded-md border-gray-300 border-opacity-50 hover:border-opacity-0 hover:shadow-lg duration-150" >
            <div className="text-left">
                <p>{note.name}</p>
                <p className="text-gray-400">{note.description}</p>
            </div>
            <div className="flex text-indigo-700">
                <p className="border-r border-gray-200 h-7 pr-2 mr-2 cursor-pointer" onClick={() => deleteNote(note)}>
                    Delete
                </p>
                <p className="h-7 cursor-pointer" onClick={() => updateNote(note)}>
                    {note.completed ? 'Complete' : 'Mark completed'}
                </p>
            </div>
        </div>
    )
}