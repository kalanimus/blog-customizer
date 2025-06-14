import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setMenuIsOpen] = useState(false);
	const [selectedState, setSelectedState] =
		useState<ArticleStateType>(articleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => {
			if (!isMenuOpen) return;
			setMenuIsOpen(false);
		},
		onChange: () => {},
	});

	const handleSubmit = () => {
		setArticleState(selectedState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setSelectedState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setMenuIsOpen(!isMenuOpen);
				}}
			/>
			<aside
				ref={rootRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={selectedState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(option: OptionType) => {
							setSelectedState({ ...selectedState, fontFamilyOption: option });
						}}
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={selectedState.fontSizeOption}
						title='Размер шрифта'
						onChange={(option: OptionType) => {
							setSelectedState({ ...selectedState, fontSizeOption: option });
						}}
					/>
					<Select
						selected={selectedState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(option: OptionType) => {
							setSelectedState({ ...selectedState, fontColor: option });
						}}
					/>
					<Separator />
					<Select
						selected={selectedState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(option: OptionType) => {
							setSelectedState({ ...selectedState, backgroundColor: option });
						}}
					/>
					<Select
						selected={selectedState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(option: OptionType) => {
							setSelectedState({ ...selectedState, contentWidth: option });
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
