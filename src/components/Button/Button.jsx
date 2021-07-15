import { Spinner } from "../Spinner/Spinner"

export const Button = ({onClick, title, loading = false}) => {
    return (
        <button type="submit" className=" flex justify-center items-center opacity-70 w-full mt-5 p-2 rounded-md bg-indigo-600 text-white hover:opacity-100">
            { loading && <Spinner/> }
            <span className={`${loading ? 'ml-4' : ''} font-bold`}>{title}</span>
        </button>
    )
}
