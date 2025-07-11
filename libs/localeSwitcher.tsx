import { useRouter } from 'next/router';
import { useCallback } from 'react';

const LocaleSwitcher = () => {
	const router = useRouter();
	const { pathname, asPath, query, locale } = router;

	const handleChangeLanguage = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const selectedLocale = e.target.value;
			router.push({ pathname, query }, asPath, { locale: selectedLocale });
		},
		[pathname, asPath, query]
	);

	return (
		<select value={locale} onChange={handleChangeLanguage}>
			<option value="en">English</option>
			<option value="uz">Russian</option>
			<option value="ko">한국어</option>
		</select>
	);
};

export default LocaleSwitcher;
