export const DownloadLetterButton = ({ label, fileUrl }) => {
	const handleDownload = () => {
		const link = document.createElement('a')
		link.href = fileUrl
		link.download = fileUrl.split('/').pop()
		link.click()
	}

	return (
		<span class='f-color-text text-start cursor-pointer' onClick={handleDownload}>
			<i class='bi bi-download me-2' />
			{label}
		</span>
	)
}
