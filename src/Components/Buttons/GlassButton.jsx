
const GlassButton = ({ name, onClick, icon = '' }) => {
    return (
        <button
            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline flex flex-row gap-x-2"
            onClick={onClick}
        >
            {
                icon != '' ? <i className="fa-brands fa-google"></i> : ''
            }
            <span className="ml-4">
                {name}
            </span>
        </button>
    )
}

export default GlassButton
