import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import '@/style.css'
import { render } from 'preact'
import { LocationProvider } from 'preact-iso'
import { ToastContainer } from 'react-toastify'
import Resume from '@/pages/Resume/Resume'

export function App() {
	return (
		<LocationProvider>
			<main>
				<Resume />
			</main>
			<ToastContainer autoClose={2000} position='top-center' hideProgressBar={true} />
		</LocationProvider>
	)
}

render(<App />, document.getElementById('app'))
