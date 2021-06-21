export const Note = ({note}) => {
    return (
        <div>
            <p>{note.name}</p>
            <p>{note.description}</p>
        </div>
    )
}