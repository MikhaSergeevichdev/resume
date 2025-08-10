import { toast } from 'react-toastify'

const CopyBtn = ( {textToCopy}: {textToCopy: string} ) => {
  const handleCopy = async () => {
      await navigator.clipboard.writeText(textToCopy)
      toast.success('Copied successfull')
  }

  return (
    <i 
      class="ms-3 bi bi-copy copy-btn"
      onClick={handleCopy}
      role="button"
    />
  )
}

export default CopyBtn