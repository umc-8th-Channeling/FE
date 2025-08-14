type ProfileImageProps = {
    imageUrl?: string | null
    className?: string
}

export default function ProfileImage({ imageUrl, className = 'w-[100px] h-[100px]' }: ProfileImageProps) {
    return (
        <div
            className={`rounded-full bg-[lightgray] bg-center bg-cover bg-no-repeat ${className}`}
            style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
            }}
        />
    )
}
