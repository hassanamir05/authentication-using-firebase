
const Input = ({ type = 'text', placeholder = '', value = '', onChange }) => {
    return (
        <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
            type={type} placeholder={placeholder} onChange={onChange} />
    )
}

export default Input;
