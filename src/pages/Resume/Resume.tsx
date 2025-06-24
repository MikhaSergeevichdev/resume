import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './Resume.scss'
import { useRef } from 'preact/hooks'
import { getAvailableLangOptions } from '@/constants/app.constants'
import { lang } from '@/store/app.signals'
import { t } from '@/i18n'
import { Divider } from '@/components/ui/Divider/'
import { contacts } from '@/constants/contacts.constants'
import { Icon } from '@/components/ui/Icon'
import { exportElementToPDF, isEn, isRu, isUk } from '@/helpers/common.helpers'
import { DropDownInput } from '@/components/ui/DropDownInput/DropDownInput'
import { ListRenderer } from '@/components/ui/ListRenderer'
import { education, exp1, exp2, skills } from '@/constants/content.constant'
import { Logos } from '@/components/grids/Logos'
import { tryToExport } from '@/store/app.signals'
import { about } from '@/constants/content.constant'
import { DownloadLetterButton } from '@/components/ui/DownloadLetter'

const Resume = () => {
	const mainRef = useRef<HTMLDivElement>(null)
	const letterUrlEn = '/assets/letterEn.pdf'
	const letterUrlRu = '/assets/letterRu.pdf'
	const onDownload = () => {
		tryToExport.value = true

		if (!mainRef.current) return
		exportElementToPDF({
			element: mainRef.current,
			filename: `resume_${t('common.name')}.pdf`,
		})
	}

	return (
		<div class='container my-3' ref={mainRef}>
			<div class='d-flex justify-content-between header'>
				<div class='header__content d-flex w-100'>
					<img src='/assets/portrait.webp' alt='Avatar' class='header__avatar' width='200' />
					<span class='header__text ms-3 text-start'>
						<h1 class='mt-3 f-size-32 f-color-label'>{t('common.name')}</h1>
						<h3 class='mt-3 f-size-24 f-color-text'>{t('common.position')}</h3>
						<Divider />
						<span class='contacts f-size-16 f-color-text'>
							<p class='mb-2'>
								<i class='bi bi-geo-alt me-2' />
								{t('common.location')}
							</p>
							<p class='mb-2'>
								<i class='bi bi-file-earmark-person me-2' />
								{t('common.personal')}
							</p>
							<span class=''>
								{contacts.map((contact) => (
									<span class='me-3 d-flex'>
										<Icon name={contact.name} />
										<a href={contact.url} target='_blank'>
											{contact.title}
										</a>
									</span>
								))}
							</span>
						</span>
					</span>
				</div>

				{!tryToExport.value && (
					<div class='d-flex flex-col justify-content-start no-print'>
						<DropDownInput options={getAvailableLangOptions()} signal={lang} />
						<button
							class='btn d-flex justify-content-center gap-2 btn-primary mt-3'
							onClick={onDownload}
						>
							<i class='bi bi-download' />
						</button>
					</div>
				)}
			</div>

			<section class='mt-4 info_block edication'>
				<h3 class='bg-info-title ps-1 f-size-24 f-color-label text-start'>{t('titles.about')}</h3>
				<Divider noMarginTop />
				{about.map((p) => (
					<p class='ps-2 mt-2 f-color-text f-size-16 text-start'>{t(`about.${p}`)}</p>
				))}
			</section>

			<section class='mt-3 info_block edication'>
				<h3 class='bg-info-title ps-1 f-size-24 f-color-label text-start'>
					{t('titles.education')}
				</h3>
				<Divider noMarginTop />
				<ListRenderer list={education} />
			</section>

			<section class='mt-3 info_block experience'>
				<h3 class='bg-info-title ps-1 f-size-24 f-color-label text-start'>{t('titles.exp')}</h3>
				<Divider noMarginTop />
				<ListRenderer list={exp1} />
				<Divider />
				{tryToExport.value && <span class='pdf-divider' />}
				<ListRenderer list={exp2} />
				<span class='d-flex flex-col gap-2 pt-2 ps-3'>
					{isEn && isUk && (
						<DownloadLetterButton label={t('common.downloadLetterEn')} fileUrl={letterUrlEn} />
					)}
					{isUk && isRu && (
						<DownloadLetterButton label={t('common.downloadLetterRu')} fileUrl={letterUrlRu} />
					)}
				</span>
			</section>

			<section class='mt-4 info_block skils'>
				<h3 class='bg-info-title ps-1 f-size-24 f-color-label text-start'>{t('titles.skills')}</h3>
				<Divider noMarginTop />
				<ListRenderer list={skills} isGrid />
				<Logos />
			</section>
		</div>
	)
}

export default Resume
