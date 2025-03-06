document.addEventListener('DOMContentLoaded', async () => {
	const email = sessionStorage.getItem('email');

	if (typeof Iterable === 'undefined' || typeof Iterable.initialize !== 'function') {
		console.error('Iterable SDK is not loaded.');
		return;
	}

	if (typeof Iterable_key === 'undefined' || !Iterable_key) {
		console.error('Iterable_key is not set.');
		return;
	}

	if (typeof window.JWTcallback !== 'function') {
		console.error('JWTcallback is not a function.');
		return;
	}

	try {
		window.IterableInstance = await Iterable.initialize(Iterable_key, window.JWTcallback);
		console.log('Iterable SDK initialized.');

		const testToken = await window.JWTcallback({ email });
		console.log('JWTcallback returned:', testToken);

		if (testToken) {
			await window.IterableInstance.setEmail(email);
			console.log('Iterable initialized with user:', email);
		} else {
			console.error('JWT token was not retrieved, setEmail skipped.');
			return;
		}

		const { request, pauseMessageStream, resumeMessageStream, triggerDisplayMessages } = Iterable.getInAppMessages(
			{
				// Here, configure the SDK. For more information, check out the
				// web SDK's GitHub repository: https://github.com/iterable/iterable-web-sdk
				count: 20,
				displayInterval: 1000,
				onOpenScreenReaderMessage: '...',
				onOpenNodeToTakeFocus: 'input',
				packageName: 'http://swko8wgwcwgkk8ksg0kow8gk.138.199.158.65.sslip.io/',
				rightOffset: '0px',
				topOffset: '0px',
				bottomOffset: '0px',
				handleLinks: 'external-new-tab',
				closeButton: {
					color: 'black',
					size: '16px',
					topOffset: '0px',
					rightOffset: '0px',
				},
			},
			{ display: 'immediate' }
		);

		await window.IterableInstance.setEmail(email);
		await request();
		console.log('In-app messages requested.');
	} catch (error) {
		console.error('Error during Iterable setup:', error);
	}
});