type CloseButtonProps = {
    onClick: () => void
}

export default function CloseButton({ onClick }: CloseButtonProps) {
    return (
        <button onClick={onClick} className="flex items-center justify-center" aria-label="닫기">
            <img src="../../../icons/delete.svg" alt="닫기" />
        </button>
    )
}
