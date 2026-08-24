import { useState, useCallback } from 'react';

export interface ConfirmConfig {
	title: string;
	description: string;
}

const useConfirmDialog = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [config, setConfig] = useState<ConfirmConfig | null>(null);
	const [resolveFn, setResolveFn] = useState<((value: boolean) => void) | null>(
		null
	);

	const showConfirmDialog = useCallback(
		(config: ConfirmConfig): Promise<boolean> => {
			setConfig(config);
			setIsOpen(true);

			return new Promise((resolve) => {
				setResolveFn(() => resolve);
			});
		},
		[]
	);

	const handleConfirm = useCallback(() => {
		if (resolveFn) {
			resolveFn(true);
		}
		setIsOpen(false);
		setConfig(null);
		setResolveFn(null);
	}, [resolveFn]);

	const handleCancel = useCallback(() => {
		if (resolveFn) {
			resolveFn(false);
		}
		setIsOpen(false);
		setConfig(null);
		setResolveFn(null);
	}, [resolveFn]);

	return {
		isDialogOpen: isOpen,
		dialogConfig: config,
		showConfirmDialog,
		handleConfirm,
		handleCancel,
	};
};

export default useConfirmDialog;
