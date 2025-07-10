export default function Input({ ...props }) {
    return (
        <input
            {...props}
            className="w-full px-3 py-2 rounded-md bg-neutral-800 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-white"
        />
    )
}
