export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div
            className="flex flex-col items-start gap-6
        w-[561px] h-[36px] p-2 rounded-lg
        bg-[rgba(255,255,255,0.10)]"
        >
            <input {...props} className="w-full h-full font-caption text-[#A8A8A8]" />
        </div>
    )
}
